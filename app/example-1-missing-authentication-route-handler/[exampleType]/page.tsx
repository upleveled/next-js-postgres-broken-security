import MissingAuthenticationApiRoute from './MissingAuthenticationApiRoute';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    exampleType: string;
  }>;
};

export default function MissingAuthenticationApiRoutePage(props: Props) {
  return (
    <MissingAuthenticationApiRoute exampleType={(await props.params).exampleType} />
  );
}
