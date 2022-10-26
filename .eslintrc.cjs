const config = {
  extends: ['@upleveled/upleveled'],
};

try {
  if (process.platform === 'win32') {
    throw new Error(
      'SafeQL currently disabled on Windows https://github.com/ts-safeql/safeql/issues/80',
    );
  }

  // Abort early if either of these modules are not installed
  require.resolve('@ts-safeql/eslint-plugin');
  require.resolve('dotenv-safe');

  // @ts-ignore 2307 (module not found) -- The require.resolve() above will ensure that dotenv-safe is available before this line by throwing if it is not available
  require('dotenv-safe').config();

  if (
    !process.env.PGHOST ||
    !process.env.PGUSERNAME ||
    !process.env.PGPASSWORD ||
    !process.env.PGDATABASE
  ) {
    throw new Error('Environment variables are not set');
  }

  /** @type {string[]} */
  (config.plugins).push('@ts-safeql/eslint-plugin');
  /** @type {Partial<import('eslint').Linter.RulesRecord>} */
  (config.rules)['@ts-safeql/check-sql'] = [
    'error',
    {
      connections: [
        {
          databaseUrl: `postgres://${process.env.PGUSERNAME}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`,
          tagName: 'sql',
          fieldTransform: 'camel',
          transform: '{type}[]',
        },
      ],
    },
  ];
} catch (err) {
  // Swallow errors to avoid noisy ESLint logs in non-database projects
  console.error('err', err);
}

module.exports = config;
