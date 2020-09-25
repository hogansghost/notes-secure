import React from 'react';

import './icon.scss';

export const Icon = ({
  children
}) => (
  <i className="icon"><span className="icon__inner">{children}</span></i>
)

export default Icon;
