import { getSdk } from '@jaime-sandbox-2/graphql-sdk';
import { GraphQLClient } from 'graphql-request';

const URL =
  process.env.STAGE === 'build' || !process.env.DEPLOY_URL
    ? 'http://localhost:5000/graphql'
    : `${process.env.DEPLOY_URL}${process.env.GRAPHQL_SERVER_URL}` ?? 'http://localhost:5000/graphql';

const sdk = getSdk(new GraphQLClient(URL));

export default sdk;
