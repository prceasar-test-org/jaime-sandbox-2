require('dotenv').config();

const extensions = require('@jaime-sandbox-2/graphql-extensions');
const { resolve } = require('path');
const LastRevAppConfig = require('@last-rev/app-config');
// TODO extract this function into a package that doesnt required the runner
// const { parseBooleanEnvVar } = require('@jaime-sandbox-2/utils');
const parseBooleanEnvVar = (value = '') => {
  // values parsed as true: true, 1, yes, y, => ignore caps
  const val = value.toString().toLowerCase();
  return /^(true|1|yes|y)$/.test(val);
};

const config = new LastRevAppConfig({
  cms: 'Contentful',
  strategy: process.env.GRAPHQL_RUNNER_STRATEGY || 'fs',
  sites: [process.env.SITE],
  extensions,
  contentful: {
    contentPreviewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    contentDeliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    env: process.env.CONTENTFUL_ENV,
    usePreview: parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW)
  },
  algolia: {
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    contentTypeIds: ['blog'],
    indexDraftContent: parseBooleanEnvVar(process.env.ALGOLIA_INDEX_DRAFT_CONTENT)
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    tls: {}
  },
  fs: { contentDir: resolve(__dirname, './cms-sync') },
  logLevel: 'debug'
});

module.exports = config;
