import React from 'react';
import '../scss/header.scss';

function Header() {
  return (
    <header>
      <h1 data-text="Awesome">
        <span className="actual-text">&nbsp;&nbsp;MY&nbsp;TODOLIST&nbsp;&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;&nbsp;MY&nbsp;TODOLIST&nbsp;&nbsp;</span>
      </h1>
    </header>
  )
};

export default Header;