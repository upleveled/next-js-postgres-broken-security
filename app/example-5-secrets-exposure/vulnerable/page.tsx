import { getUsersWithPasswordHash } from '../../../database/users';
import SecretsExposure from './SecretsExposure';

export default async function MissingAuthenticationServerComponent() {
  const users = await getUsersWithPasswordHash();

  return <SecretsExposure apiKey={process.env.API_KEY!} users={users} />;
}
