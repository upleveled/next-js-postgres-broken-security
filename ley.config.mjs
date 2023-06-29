import dotenvSafe from 'dotenv-safe';
import { config } from './util/config.mjs';

dotenvSafe.config();

const options = {};

if (process.env.POSTGRES_URL) {
  config();
  options.ssl = true;
}

export default options;
