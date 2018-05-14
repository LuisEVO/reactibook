import React from 'react';
import classes from './Header.css'

const header = (props) => (
  <div className={classes.Header}>
    <div className={classes.Logo}>
      Reactibook
    </div>
    <div>
      {props.children}
    </div>
  </div>
);

export default header