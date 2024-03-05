import db from './_db';
import { v1 as uuid } from 'uuid';
import { Person } from './types';
import { GraphQLError } from 'graphql';

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
      // If the name already exist, throw error
      if (persons.find(p => p.name === args.name)) {
        throw new GraphQLError('Name must be unique!', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        });
      }
      const newPerson: Person = {
        ...args,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
      };
      persons = persons.concat(newPerson);
    },
  },
};
