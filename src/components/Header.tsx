import * as React from 'react';
import Menu from './Menu';

export default function Header() {
  return (
    <>
      <div className="header">
        <Menu />
      </div>
      <div className="header-white"></div>
    </>
  );
}