'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { init } from '@instantdb/react';
import { Button } from '@/components/ui/button';
import { Trash2, TrendingUp, Copy, ChevronDown, ChevronUp, Edit2, Users } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import schema from '@/instant.schema';
import { id } from '@instantdb/react'

// Initialize InstantDB
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID || '';
const db = init({ appId: APP_ID, schema });

interface Outcome {
  name: string;
  payoff: number;
}

interface Scenario {
  name: string;
  probabilities: number[];
}

interface OwnershipPercentage {
  name: string;
  multiplier: number;
  scenario: string;
}

interface CalculatorData {
  outcomes: Outcome[];
  scenarios: Scenario[];
  ownershipPercentages: OwnershipPercentage[];
}

const DEFAULT_DATA: CalculatorData = {
  outcomes: [
    { name: "$1M revenue", payoff: 1000000 },
    { name: "$10M revenue", payoff: 10000000 },
    { name: "$50M revenue", payoff: 50000000 },
    { name: "$100M revenue", payoff: 100000000 }
  ],
  scenarios: [
    { name: "Ara", probabilities: [0.60, 0.50, 0.25, 0.10] },
    { name: "Dex", probabilities: [0.90, 0.60, 0.30, 0.10] },
    { name: "Ara + Dex", probabilities: [0.95, 0.85, 0.60, 0.30] }
  ],
  ownershipPercentages: [
    { name: "50% of Ara", multiplier: 0.5, scenario: "Ara" },
    { name: "50% of Dex", multiplier: 0.5, scenario: "Dex" },
    { name: "10% of Ara + Dex", multiplier: 0.1, scenario: "Ara + Dex" }
  ]
};

export default function PayoffsCalculator() {
  const params = useParams();
  const roomId = params.roomId as string;
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [hiringImpact, setHiringImpact] = useState<{[key: string]: number[]}>({});

  // Room presence - use useMemo to ensure stable values
  const room = useMemo(() => db.room('calculator', roomId), [roomId]);
  const presenceData = useMemo(() => ({
    name: `User ${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }), []); // Empty dependency array means this is only created once

  const { user: myPresence, peers } = db.rooms.usePresence(room, {
    initialData: presenceData
  });

  // Query the calculator room data
  const { data: roomData, isLoading } = db.useQuery({
    calculatorRooms: {
      $: {
        where: {
          roomId: roomId
        }
      }
    }
  });

  const calculatorRoom = roomData?.calculatorRooms?.[0];

  // Initialize room if it doesn't exist
  useEffect(() => {
    if (!isLoading && !calculatorRoom) {
      const newRoomId = id();
      db.transact(
        db.tx.calculatorRooms[newRoomId].update({
          roomId: roomId,
          outcomes: DEFAULT_DATA.outcomes,
          scenarios: DEFAULT_DATA.scenarios,
          ownershipPercentages: DEFAULT_DATA.ownershipPercentages,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
      );
    }
  }, [isLoading, calculatorRoom, roomId]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Use data directly from InstantDB or default if not loaded yet
  const data: CalculatorData = calculatorRoom ? {
    outcomes: calculatorRoom.outcomes || DEFAULT_DATA.outcomes,
    scenarios: calculatorRoom.scenarios || DEFAULT_DATA.scenarios,
    ownershipPercentages: calculatorRoom.ownershipPercentages || DEFAULT_DATA.ownershipPercentages
  } : DEFAULT_DATA;

  // Calculate expected payoffs with breakdown by outcome
  const expectedPayoffs: { [key: string]: number } = {};
  const payoffBreakdowns: { [key: string]: number[] } = {};

  data.ownershipPercentages.forEach(ownership => {
    const scenario = data.scenarios.find(s => s.name === ownership.scenario);
    if (!scenario) return;

    let expectedValue = 0;
    const breakdowns: number[] = [];
    
    data.outcomes.forEach((outcome, index) => {
      const probability = scenario.probabilities[index] || 0;
      const payoff = probability * outcome.payoff * ownership.multiplier;
      breakdowns.push(payoff);
      expectedValue += payoff;
    });

    expectedPayoffs[ownership.name] = expectedValue;
    payoffBreakdowns[ownership.name] = breakdowns;
  });


  const updateProbability = (scenarioIndex: number, outcomeIndex: number, value: string) => {
    if (!calculatorRoom) return;
    const newValue = parseFloat(value) / 100 || 0;
    const newScenarios = [...data.scenarios];
    newScenarios[scenarioIndex].probabilities[outcomeIndex] = newValue;

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        scenarios: newScenarios,
        updatedAt: Date.now()
      })
    );
  };

  const updatePayoff = (outcomeIndex: number, value: string) => {
    if (!calculatorRoom) return;
    const newValue = parseFloat(value) || 0;
    const newOutcomes = [...data.outcomes];
    newOutcomes[outcomeIndex].payoff = newValue;

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        outcomes: newOutcomes,
        updatedAt: Date.now()
      })
    );
  };

  const updateOutcomeName = (outcomeIndex: number, value: string) => {
    if (!calculatorRoom) return;
    const newOutcomes = [...data.outcomes];
    newOutcomes[outcomeIndex].name = value;

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        outcomes: newOutcomes,
        updatedAt: Date.now()
      })
    );
  };

  const updateScenarioName = (scenarioIndex: number, value: string) => {
    if (!calculatorRoom) return;
    const oldName = data.scenarios[scenarioIndex].name;
    const newScenarios = [...data.scenarios];
    newScenarios[scenarioIndex].name = value;

    // Update ownershipPercentages that reference this scenario
    const newOwnershipPercentages = data.ownershipPercentages.map(ownership => {
      if (ownership.scenario === oldName) {
        return { ...ownership, scenario: value };
      }
      return ownership;
    });

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        scenarios: newScenarios,
        ownershipPercentages: newOwnershipPercentages,
        updatedAt: Date.now()
      })
    );
  };

  const updateOwnershipMultiplier = (ownershipIndex: number, value: string) => {
    if (!calculatorRoom) return;
    const newValue = parseFloat(value) / 100 || 0;
    const newOwnershipPercentages = [...data.ownershipPercentages];
    newOwnershipPercentages[ownershipIndex].multiplier = newValue;

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        ownershipPercentages: newOwnershipPercentages,
        updatedAt: Date.now()
      })
    );
  };

  const addScenario = () => {
    if (!calculatorRoom) return;
    const newScenarios = [...data.scenarios, {
      name: `Scenario ${data.scenarios.length + 1}`,
      probabilities: new Array(data.outcomes.length).fill(0.5)
    }];

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        scenarios: newScenarios,
        updatedAt: Date.now()
      })
    );
  };

  const duplicateScenario = (scenarioIndex: number) => {
    if (!calculatorRoom) return;
    const scenarioToDuplicate = data.scenarios[scenarioIndex];
    const newScenarios = [...data.scenarios, {
      name: `${scenarioToDuplicate.name} (Copy)`,
      probabilities: [...scenarioToDuplicate.probabilities]
    }];

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        scenarios: newScenarios,
        updatedAt: Date.now()
      })
    );
  };

  const addOwnership = () => {
    if (!calculatorRoom) return;
    if (data.scenarios.length > 0) {
      const newOwnershipPercentages = [...data.ownershipPercentages, {
        name: `Ownership ${data.ownershipPercentages.length + 1}`,
        multiplier: 0.1,
        scenario: data.scenarios[0].name
      }];

      db.transact(
        db.tx.calculatorRooms[calculatorRoom.id].update({
          ownershipPercentages: newOwnershipPercentages,
          updatedAt: Date.now()
        })
      );
    }
  };

  const addOutcome = () => {
    if (!calculatorRoom) return;
    const newOutcomes = [...data.outcomes, {
      name: `Stage ${data.outcomes.length + 1}`,
      payoff: 0
    }];
    
    // Add probability for new outcome to all scenarios
    const newScenarios = data.scenarios.map(scenario => ({
      ...scenario,
      probabilities: [...scenario.probabilities, 0]
    }));

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        outcomes: newOutcomes,
        scenarios: newScenarios,
        updatedAt: Date.now()
      })
    );
  };

  const deleteOutcome = (outcomeIndex: number) => {
    if (!calculatorRoom || data.outcomes.length <= 1) return;
    
    const newOutcomes = data.outcomes.filter((_, index) => index !== outcomeIndex);
    
    // Remove probability for this outcome from all scenarios
    const newScenarios = data.scenarios.map(scenario => ({
      ...scenario,
      probabilities: scenario.probabilities.filter((_, index) => index !== outcomeIndex)
    }));

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        outcomes: newOutcomes,
        scenarios: newScenarios,
        updatedAt: Date.now()
      })
    );
  };

  const deleteScenario = (scenarioIndex: number) => {
    if (!calculatorRoom || data.scenarios.length <= 1) return;
    
    const deletedScenarioName = data.scenarios[scenarioIndex].name;
    const newScenarios = data.scenarios.filter((_, index) => index !== scenarioIndex);
    
    // Update ownership percentages that reference the deleted scenario
    const newOwnershipPercentages = data.ownershipPercentages.map(ownership => {
      if (ownership.scenario === deletedScenarioName && newScenarios.length > 0) {
        return { ...ownership, scenario: newScenarios[0].name };
      }
      return ownership;
    });

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        scenarios: newScenarios,
        ownershipPercentages: newOwnershipPercentages,
        updatedAt: Date.now()
      })
    );
  };

  const deleteOwnership = (ownershipIndex: number) => {
    if (!calculatorRoom) return;
    
    const newOwnershipPercentages = data.ownershipPercentages.filter((_, index) => index !== ownershipIndex);

    db.transact(
      db.tx.calculatorRooms[calculatorRoom.id].update({
        ownershipPercentages: newOwnershipPercentages,
        updatedAt: Date.now()
      })
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading calculator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Startup Payoffs Calculator</h1>
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="outline">Room: {roomId}</Badge>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {myPresence && (
                <div
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white"
                  style={{ backgroundColor: myPresence.color }}
                  title={`${myPresence.name} (You)`}
                >
                  {myPresence.name?.charAt(0) || '?'}
                </div>
              )}
              {Object.entries(peers).slice(0, 5).map(([peerId, peer]) => (
                <div
                  key={peerId}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white"
                  style={{ backgroundColor: peer.color }}
                  title={peer.name}
                >
                  {peer.name?.charAt(0) || '?'}
                </div>
              ))}
              {Object.keys(peers).length > 5 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-xs font-semibold text-white">
                  +{Object.keys(peers).length - 5}
                </div>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {Object.keys(peers).length + 1} {Object.keys(peers).length === 0 ? 'user' : 'users'} online
            </span>
          </div>
        </div>
        <p className="text-gray-600">
          Adjust probabilities and payoffs to calculate expected values for different ownership scenarios
        </p>
      </div>

      <div className="grid gap-6">
        {/* Revenue Stages / Outcomes */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Revenue Stages & Payoffs</CardTitle>
              <Button onClick={addOutcome} size="sm">Add Stage</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={outcome.name}
                    onChange={(e) => updateOutcomeName(index, e.target.value)}
                    className="min-w-[150px]"
                  />
                  <div className="flex items-center gap-2">
                    <span>$</span>
                    <Input
                      type="number"
                      value={outcome.payoff}
                      onChange={(e) => updatePayoff(index, e.target.value)}
                      className="w-32"
                    />
                  </div>
                  <Button
                    onClick={() => deleteOutcome(index)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    disabled={data.outcomes.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Probabilities Matrix */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Probability of Reaching Each Stage</CardTitle>
              <Button onClick={addScenario} size="sm">Add Scenario</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Scenario</th>
                    {data.outcomes.map((outcome, index) => (
                      <th key={index} className="text-center p-2 min-w-[100px]">
                        {outcome.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.scenarios.map((scenario, scenarioIndex) => (
                    <tr key={scenarioIndex}>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Input
                            value={scenario.name}
                            onChange={(e) => updateScenarioName(scenarioIndex, e.target.value)}
                            className="font-medium min-w-[120px]"
                          />
                          <Button
                            onClick={() => duplicateScenario(scenarioIndex)}
                            size="sm"
                            variant="ghost"
                            title="Duplicate scenario"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => deleteScenario(scenarioIndex)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                            disabled={data.scenarios.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      {data.outcomes.map((_, outcomeIndex) => {
                        const probability = scenario.probabilities[outcomeIndex] * 100;
                        const color = probability > 70 ? 'bg-green-500' : probability > 40 ? 'bg-yellow-500' : 'bg-red-500';
                        
                        return (
                          <td key={outcomeIndex} className="p-2">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Slider
                                  value={[probability]}
                                  onValueChange={(value) => updateProbability(scenarioIndex, outcomeIndex, value[0].toString())}
                                  max={100}
                                  step={5}
                                  className="flex-1"
                                />
                                <span className="text-sm font-medium w-12 text-right">{probability.toFixed(0)}%</span>
                              </div>
                              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-300 ${color}`}
                                  style={{ width: `${probability}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Expected Payoffs & Ownership Configuration */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Ownership & Expected Payoffs</CardTitle>
              <Button onClick={addOwnership} size="sm">Add Ownership</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2 min-w-[200px]">Ownership</th>
                    {data.outcomes.map((outcome, index) => (
                      <th key={index} className="text-center p-2 min-w-[120px]">
                        {outcome.name}
                      </th>
                    ))}
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.ownershipPercentages.map((ownership, index) => {
                    const maxPayoff = Math.max(...(payoffBreakdowns[ownership.name] || [0]));
                    const isExpanded = expandedRows.has(index);
                    const ownershipPercent = ownership.multiplier * 100;
                    const scenario = data.scenarios.find(s => s.name === ownership.scenario);
                    
                    return (
                      <React.Fragment key={index}>
                        <tr className="border-t hover:bg-gray-50 transition-colors">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <Input
                                value={ownership.name}
                                onChange={(e) => {
                                  if (!calculatorRoom) return;
                                  const newOwnershipPercentages = [...data.ownershipPercentages];
                                  newOwnershipPercentages[index].name = e.target.value;

                                  db.transact(
                                    db.tx.calculatorRooms[calculatorRoom.id].update({
                                      ownershipPercentages: newOwnershipPercentages,
                                      updatedAt: Date.now()
                                    })
                                  );
                                }}
                                className="font-medium max-w-[150px]"
                              />
                              <span className="text-sm text-gray-500">
                                ({ownershipPercent.toFixed(0)}% of {ownership.scenario})
                              </span>
                            </div>
                          </td>
                          {payoffBreakdowns[ownership.name]?.map((payoff, outcomeIndex) => {
                            const intensity = maxPayoff > 0 ? payoff / maxPayoff : 0;
                            const bgColor = intensity > 0.7 ? 'bg-green-100' : intensity > 0.3 ? 'bg-yellow-100' : 'bg-red-100';
                            return (
                              <td key={outcomeIndex} className={`p-2 text-center ${bgColor}`}>
                                {formatCurrency(payoff)}
                              </td>
                            );
                          }) || data.outcomes.map((_, i) => (
                            <td key={i} className="p-2 text-center">$0</td>
                          ))}
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <Button
                                onClick={() => {
                                  setExpandedRows(prev => {
                                    const next = new Set(prev);
                                    if (next.has(index)) {
                                      next.delete(index);
                                    } else {
                                      next.add(index);
                                    }
                                    return next;
                                  });
                                }}
                                size="sm"
                                variant="ghost"
                              >
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </Button>
                              <Button
                                onClick={() => deleteOwnership(index)}
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-gray-50">
                            <td colSpan={data.outcomes.length + 2} className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm">Ownership Percentage</Label>
                                  <div className="space-y-2">
                                    <Slider
                                      value={[ownershipPercent]}
                                      onValueChange={(value) => updateOwnershipMultiplier(index, value[0].toString())}
                                      max={100}
                                      step={1}
                                      className="mt-2"
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                      <span>0%</span>
                                      <span className="font-medium">{ownershipPercent.toFixed(0)}%</span>
                                      <span>100%</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm">Scenario</Label>
                                  <select
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background mt-2"
                                    value={ownership.scenario}
                                    onChange={(e) => {
                                      if (!calculatorRoom) return;
                                      const newOwnershipPercentages = [...data.ownershipPercentages];
                                      newOwnershipPercentages[index].scenario = e.target.value;

                                      db.transact(
                                        db.tx.calculatorRooms[calculatorRoom.id].update({
                                          ownershipPercentages: newOwnershipPercentages,
                                          updatedAt: Date.now()
                                        })
                                      );
                                    }}
                                  >
                                    {data.scenarios.map((scenario) => (
                                      <option key={scenario.name} value={scenario.name}>
                                        {scenario.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Hiring Impact Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <CardTitle>Hiring Impact Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Simulate how hiring key talent could improve your success probabilities
            </p>
            <div className="space-y-4">
              {data.scenarios.map((scenario, scenarioIndex) => (
                <div key={scenarioIndex} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">{scenario.name} - Probability Improvements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.outcomes.map((outcome, outcomeIndex) => {
                      const currentProb = scenario.probabilities[outcomeIndex] * 100;
                      const improvement = hiringImpact[`${scenarioIndex}-${outcomeIndex}`] || 0;
                      const newProb = Math.min(100, currentProb + improvement);
                      
                      return (
                        <div key={outcomeIndex} className="space-y-2">
                          <Label className="text-sm">
                            {outcome.name}: {currentProb.toFixed(0)}% → {newProb.toFixed(0)}%
                          </Label>
                          <Slider
                            value={[improvement]}
                            onValueChange={(value) => {
                              setHiringImpact(prev => ({
                                ...prev,
                                [`${scenarioIndex}-${outcomeIndex}`]: value[0]
                              }));
                            }}
                            max={100 - currentProb}
                            step={5}
                            className="flex-1"
                          />
                          <div className="text-xs text-gray-500">
                            +{improvement}% improvement
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-sm font-medium">Impact on Expected Values:</p>
                    {data.ownershipPercentages
                      .filter(o => o.scenario === scenario.name)
                      .map(ownership => {
                        let improvedExpectedValue = 0;
                        data.outcomes.forEach((outcome, idx) => {
                          const improvement = hiringImpact[`${scenarioIndex}-${idx}`] || 0;
                          const newProb = Math.min(1, scenario.probabilities[idx] + improvement / 100);
                          improvedExpectedValue += newProb * outcome.payoff * ownership.multiplier;
                        });
                        const increase = improvedExpectedValue - (expectedPayoffs[ownership.name] || 0);
                        
                        return (
                          <div key={ownership.name} className="text-sm mt-1">
                            {ownership.name}: <span className="font-medium text-green-600">+{formatCurrency(increase)}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart Visualization */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <CardTitle>Expected Value Comparison</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.ownershipPercentages.map(ownership => ({
                    name: ownership.name,
                    value: expectedPayoffs[ownership.name] || 0,
                    ...Object.fromEntries(
                      data.outcomes.map((outcome, idx) => [
                        outcome.name,
                        payoffBreakdowns[ownership.name]?.[idx] || 0
                      ])
                    )
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend />
                  {data.outcomes.map((outcome, index) => {
                    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];
                    return (
                      <Bar 
                        key={index}
                        dataKey={outcome.name}
                        stackId="a"
                        fill={colors[index % colors.length]}
                      />
                    );
                  })}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}