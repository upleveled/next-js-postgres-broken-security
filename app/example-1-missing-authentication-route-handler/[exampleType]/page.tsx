import MissingAuthenticationApiRoute from './MissingAuthenticationApiRoute';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    exampleType: string;
  }>;
};

export default async function MissingAuthenticationApiRoutePage(props: Props) {
  return (
    <MissingAuthenticationApiRoute exampleType={(await props.params).exampleType} />
  );
}
