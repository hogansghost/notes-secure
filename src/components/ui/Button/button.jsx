import React from 'react';

import './button.scss';

export const Button = (props) => (
  <button className="btn" {...props}>{props.children}</button>
)

export default Button;
