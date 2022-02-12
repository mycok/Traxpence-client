import React from 'react';
import { Box } from '@material-ui/core';
import ContentLoader from 'react-content-loader';

function ExpenseLoader(props: any) {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={260}
      viewBox="0 0 400 260"
      backgroundColor="#392B43"
      foregroundColor="#392B43"
      {...props}
    >
      <rect x="0" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="0" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="300" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="650" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="650" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    </ContentLoader>
  );
}

export function ExpensesLoader() {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '85px',

      }}
    >
      <ExpenseLoader />
      <ExpenseLoader />
      <ExpenseLoader />
    </Box>
  );
}
