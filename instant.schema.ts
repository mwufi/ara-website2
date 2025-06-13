// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/admin";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
    }),
    pomodoros: i.entity({
      task: i.string(),
      startTime: i.number(),
      endTime: i.number().optional(),
      duration: i.number().optional(), // in minutes
      completed: i.boolean(),
      createdAt: i.number(),
    }),
    notes: i.entity({
      content: i.string(),
      date: i.string(), // Format: YYYY-MM-DD
      createdAt: i.number().indexed(),
      updatedAt: i.number().indexed(),
    }),
    signups: i.entity({
      email: i.string().unique().indexed(),
      message: i.string(),
      createdAt: i.number().indexed(),
    }),
    calculatorRooms: i.entity({
      roomId: i.string().unique().indexed(),
      outcomes: i.json<Array<{name: string; payoff: number}>>(),
      scenarios: i.json<Array<{name: string; probabilities: number[]}>>(),
      ownershipPercentages: i.json<Array<{name: string; multiplier: number; scenario: string}>>(),
      createdAt: i.number().indexed(),
      updatedAt: i.number().indexed(),
    }),
  },
  links: {},
  rooms: {
    calculator: {
      presence: i.entity({
        name: i.string(),
        color: i.string(),
      }),
    },
  },
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema { }
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
