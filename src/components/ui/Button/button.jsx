import React from 'react';

import './button.scss';

export const ButtonType = {
  Delete: 'delete',
};

export const Button = (props) => (
  <button className="btn" data-type={props.type} {...props}>{props.children}</button>
)

export default Button;
