import { GraphQLScalarType, Kind } from 'graphql';

export const DateOfBirthScalar = new GraphQLScalarType({
  name: 'DateOfBirth',
  description: 'Date custom scalar type',
  parseValue(value: string | number | Date) {
    return new Date(value); // value from the client
  },
  serialize(value: string | number | Date) {
    if (value instanceof Date) {
      return value.toISOString(); // value sent to the client
    }
    if (typeof value === 'string') {
      return new Date(value).toISOString();
    }
    return new Date(value).toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});
