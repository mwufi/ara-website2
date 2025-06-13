'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { init } from '@instantdb/react';
import { Button } from '@/components/ui/button';
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
            <CardTitle>Revenue Stages & Payoffs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-4">
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
                        <Input
                          value={scenario.name}
                          onChange={(e) => updateScenarioName(scenarioIndex, e.target.value)}
                          className="font-medium min-w-[120px]"
                        />
                      </td>
                      {data.outcomes.map((_, outcomeIndex) => (
                        <td key={outcomeIndex} className="p-2">
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              value={(scenario.probabilities[outcomeIndex] * 100).toFixed(0)}
                              onChange={(e) => updateProbability(scenarioIndex, outcomeIndex, e.target.value)}
                              className="w-20 text-center"
                              min="0"
                              max="100"
                            />
                            <span className="text-sm">%</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Ownership Configuration */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Ownership Configuration</CardTitle>
              <Button onClick={addOwnership} size="sm">Add Ownership</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.ownershipPercentages.map((ownership, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border rounded-lg">
                  <div>
                    <Label>Name</Label>
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
                    />
                  </div>
                  <div>
                    <Label>Ownership %</Label>
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={(ownership.multiplier * 100).toFixed(0)}
                        onChange={(e) => updateOwnershipMultiplier(index, e.target.value)}
                        min="0"
                        max="100"
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div>
                    <Label>Scenario</Label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
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
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expected Payoffs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Expected Payoffs Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Ownership</th>
                    {data.outcomes.map((outcome, index) => (
                      <th key={index} className="text-center p-2 min-w-[120px]">
                        {outcome.name}
                      </th>
                    ))}
                    <th className="text-center p-2 min-w-[120px] font-bold">Total Expected</th>
                  </tr>
                </thead>
                <tbody>
                  {data.ownershipPercentages.map((ownership, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2 font-medium">{ownership.name}</td>
                      {payoffBreakdowns[ownership.name]?.map((payoff, outcomeIndex) => (
                        <td key={outcomeIndex} className="p-2 text-center">
                          {formatCurrency(payoff)}
                        </td>
                      )) || data.outcomes.map((_, i) => (
                        <td key={i} className="p-2 text-center">$0</td>
                      ))}
                      <td className="p-2 text-center font-bold text-green-600">
                        {formatCurrency(expectedPayoffs[ownership.name] || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}