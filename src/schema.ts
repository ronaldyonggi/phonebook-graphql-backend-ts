export const typeDefs = `#graphql

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson (person: AddPersonInput!): Person
    editNumber(person: EditPersonInput): Person
  }

  input AddPersonInput {
    name: String!
    phone: Int
    street: String!
    city: String!
  }

  input EditPersonInput {
    name: String!
    phone: String!
  }

  enum YesNo {
    YES
    NO
  }
`;