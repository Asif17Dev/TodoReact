import React from 'react';
import style from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/GetClasses';

const buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
};
function Button({ children, type, varient = 'primary', ...rest }) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={getClasses([
        style.button,
        style[`button--${buttonTypes[varient]}`],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, ...rest }) {
  return (
    <select
      className={getClasses([style.button, style.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
