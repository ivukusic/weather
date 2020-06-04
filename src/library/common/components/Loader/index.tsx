import React from 'react';

import './Loader.style.scss';

export const Loader = (): JSX.Element => (
  <div className="lds-ellipsis">
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loader;
