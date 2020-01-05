import React from 'react';
import Topbar from './Topbar';
import { withTheme } from '@material-ui/core/styles';

const Layout = () => {
  return (
    <div>
      <Topbar />
    </div>
  );
};

export default withTheme(Layout);
