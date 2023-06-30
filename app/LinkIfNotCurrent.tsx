'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function LinkIfNotCurrent<RouteType>({
  matchParentSegment,
  ...props
}: LinkProps<RouteType> & {
  matchParentSegment?: boolean;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (
    pathname === props.href ||
    (matchParentSegment &&
      pathname.startsWith((props.href as string).match(/^(\/.+\/)[^/]+$/)![1]!))
  ) {
    return <span>{props.children}</span>;
  }

  return <Link {...props} />;
}
