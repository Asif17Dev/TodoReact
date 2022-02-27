import React from 'react';
import style from '../styles/modules/title.module.scss';

function PageTitle({ children = 'TITLE', ...rest }) {
  return (
    <p className={style.title} {...rest}>
      {children}
    </p>
  );
}

export default PageTitle;
