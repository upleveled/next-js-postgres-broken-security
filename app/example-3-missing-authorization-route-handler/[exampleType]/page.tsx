import MissingAuthorizationApiRoute from './MissingAuthorizationApiRoute';

type Props = {
  params: Promise<{
    exampleType: string;
  }>;
};

export default function MissingAuthorizationApiRoutePage(props: Props) {
  return (
    <MissingAuthorizationApiRoute exampleType={(await props.params).exampleType} />
  );
}
