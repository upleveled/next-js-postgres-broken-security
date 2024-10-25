import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';

type Props = {
  searchParams: Promise<{
    returnTo?: string | string[];
  };
};

export default async function LoginPage(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  console.log(sessionTokenCookie);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home
  if (session) {
    redirect('/');
  }

  // if no render login component
  return <LoginForm returnTo={(await props.searchParams).returnTo} />;
}
