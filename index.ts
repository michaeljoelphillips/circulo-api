import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import resolverMap from './src/graphql';

const schema = makeExecutableSchema({
  resolvers: resolverMap,
  typeDefs: readFileSync('schema.graphql').toString('utf-8'),
});

express()
  .use(cors())
  .use('/graphql', graphqlHTTP({ schema }))
  .listen(8080);
