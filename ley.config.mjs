import fs from 'node:fs';
import dotenv from 'dotenv';

// End replacement for dotenv-safe
export function config() {
  if (process.env.FLY_IO) return;

  dotenv.config();

  // Replacement for unmaintained dotenv-safe package
  // https://github.com/rolodato/dotenv-safe/issues/128#issuecomment-1383176751
  //
  // FIXME: Remove this and switch to dotenv/safe if this proposal gets implemented:
  // https://github.com/motdotla/dotenv/issues/709
  const unconfiguredEnvVars = Object.keys(
    dotenv.parse(fs.readFileSync('./.env.example')),
  ).filter((exampleKey) => !process.env[exampleKey]);

  if (unconfiguredEnvVars.length > 0) {
    throw new Error(
      `.env.example environment ${
        unconfiguredEnvVars.length > 1 ? 'variables' : 'variable'
      } ${unconfiguredEnvVars.join(', ')} not configured in .env file`,
    );
  }

  if (process.env.POSTGRES_URL) {
    // Set standard environment variables for Postgres.js
    process.env.PGHOST = process.env.POSTGRES_HOST;
    process.env.PGDATABASE = process.env.POSTGRES_DATABASE;
    process.env.PGUSERNAME = process.env.POSTGRES_USER;
    process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;
    process.env.SSL = true;
  }
}

config();

const options = {
  ssl: process.env.SSL,
};

export default options;
