import React from 'react';
import { CircularProgress } from '@material-ui/core';

type CircularLoaderProps = {
    styleClass: any,
}

function CircularLoader({ styleClass }: CircularLoaderProps) {
  return (
    <CircularProgress
      size={24}
      className={styleClass}
    />
  );
}

export default CircularLoader;
