export function config() {
  if (process.env.FLY_IO || process.env.POSTGRES_URL) {
    // Set standard environment variables for Postgres.js
    process.env.PGHOST = process.env.POSTGRES_HOST;
    process.env.PGDATABASE = process.env.POSTGRES_DATABASE;
    process.env.PGUSERNAME = process.env.POSTGRES_USER;
    process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;
  }
}
