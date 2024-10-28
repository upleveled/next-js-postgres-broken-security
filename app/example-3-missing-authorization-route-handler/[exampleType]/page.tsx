import MissingAuthorizationApiRoute from './MissingAuthorizationApiRoute';

type Props = {
  params: Promise<{
    exampleType: string;
  }>;
};

export default async function MissingAuthorizationApiRoutePage(props: Props) {
  return (
    <MissingAuthorizationApiRoute exampleType={(await props.params).exampleType} />
  );
}
