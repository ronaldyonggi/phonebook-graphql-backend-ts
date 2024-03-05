import db from './_db';
import { v1 as uuid } from 'uuid';
import { Person } from './types';

let persons = db.persons;

export const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (_root: unknown, args: { name: string }) =>
      persons.find((p) => p.name === args.name),
  },
  Person: {
    address: (root: { street: string; city: string }) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: (_root: unknown, args: Person ) => {
      const newPerson: Person = {
        ...args,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
      };
      persons = persons.concat(newPerson);
    },
  },
};
