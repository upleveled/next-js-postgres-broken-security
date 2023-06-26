const config = {};

if (process.env.POSTGRES_URL) {
  config.ssl = true;

  // Set standard environment variables
  process.env.PGHOST = process.env.POSTGRES_HOST;
  process.env.PGDATABASE = process.env.POSTGRES_DATABASE;
  process.env.PGUSERNAME = process.env.POSTGRES_USER;
  process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;
}

export const options = config;
