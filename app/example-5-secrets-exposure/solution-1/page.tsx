import { getUsers } from '../../../database/users';
import Common, { type Colors } from '../common';

export const dynamic = 'force-dynamic';

export default async function SecretsExposurePage() {
  const colorsResponse = await fetch(
    `https://reqres.in/api/colors?apiKey=${process.env.API_KEY!}`,
  );
  const colors: Colors = await colorsResponse.json();

  const users = await getUsers();

  return <Common colors={colors} users={users} />;
}
