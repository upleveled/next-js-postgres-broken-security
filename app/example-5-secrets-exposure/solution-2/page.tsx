import { getUsers } from '../../../database/users';
import SecretsExposure from './SecretsExposure';

export default async function MissingAuthenticationServerComponent() {
  const users = await getUsers();

  return <SecretsExposure users={users} />;
}
