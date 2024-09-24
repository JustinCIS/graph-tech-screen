import { Context } from "apollo-server-core";
import { GraphQLFieldResolver } from "graphql";

type Args = { id: string };

const Query: Record<string, GraphQLFieldResolver<{}, Context, any>> = {
  swapiCharacterById: async (_, args: Args, ctx) => {
    const response = await fetch(`https://swapi.dev/api/people/${args.id}`);
    return response.json();
  },
};

const StarWarsCharacter = {
  name: (character: any) => {
    return character.name;
  },
  height: (character: any) => {
    return character.height;
  },
  mass: (character: any) => {
    return character.mass;
  },
  gender: (character: any) => {
    return (character.gender.toUpperCase() === 'MALE' || character.gender.toUpperCase() === 'FEMALE') ? character.gender.toUpperCase() :  'NONE';
  },
};

// You can add new Object Resolvers to the default export and the server will pick them up automatically
export default {
  Query,
  StarWarsCharacter,
};
