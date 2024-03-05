import db from './_db';
import { v1 as uuid } from 'uuid';
import { GraphQLError } from 'graphql';

let persons = db.persons;

export const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (_root, args) => {
      // If argument phone yesno is not provided, simply return all persons
      if (!args.phone) {
        return persons;
      }

      /**
       * byPhone is a helper filter function. If the args.phone argument === YES,
       * - If the person has person.phone property, return true
       * - otherwise return false
       * 
       * Meanwhile if the args.phone argument === NO,
       * - If the person has person.phone property, return False
       * - otherwise return true
       * @param person a person object
       * @returns boolean depending on the value of args.phone and whether person.phone is present
       */
      const byPhone = person => args.phone === 'YES' ? person.phone : !person.phone
      return persons.filter(byPhone);
    },
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
    addPerson: (_root: unknown, args ) => {
      // If the name already exist, throw error
      if (persons.find(p => p.name === args.name)) {
        throw new GraphQLError('Name must be unique!', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        });
      }
      const newPerson = {
        ...args,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
      };
      persons = persons.concat(newPerson);
    },
    editNumber: (_root, args) => {
      // First find if the argument name exist in the db
      const matchingPerson = persons.find(p => p.name === args.name)
      if (!matchingPerson) {
        return null;
      }

      // Update persons
      const updatedPerson = { ...matchingPerson, phone: args.phone }
      persons = persons.map(p => p.name === args.name ? updatedPerson : p)
      return updatedPerson

    }
  },
};
