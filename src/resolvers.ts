import db from './_db';

let persons = db.persons;

export const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (_root: unknown, args: { name: string; }) => 
      persons.find(p => p.name === args.name)
  },
  Person: {
    address: (root: { street: string; city: string; }) => {
      return {
        street: root.street,
        city: root.city
      };
    }
  },
};