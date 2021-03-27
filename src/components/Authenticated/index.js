import React, { Suspense } from 'react';
import WunaLoader from '../common/WunaLoader/WunaLoader';
const Layout = React.lazy(() => import('components/Authenticated/Layout'));

export default function Authenticated() {
  return (
    <Suspense fallback={WunaLoader}>
      <Layout />
    </Suspense>
  );
}
