import React, { Suspense } from 'react';
import WunaLoader from '../common/WunaLoader/WunaLoader';
const Layout = React.lazy(() => import('./Layout'));

export default function UnAuthenticated() {
  return (
    <Suspense fallback={WunaLoader}>
      <Layout />
    </Suspense>
  );
}
