import React from 'react';
import { QuickView } from '@components';

export default function DividedContent(props: any) {
  const { children } = props;
  return (
    <QuickView
      paddingVertical={30}
      style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}
    >
      {children}
    </QuickView>
  );
}
