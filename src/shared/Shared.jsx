import { NavLink } from 'react-router';
import style from './Shared.module.css';

function Shared({ title }) {
  return (
    <>
      <h1>{title == '/' ? 'Home' : title == '/about' ? 'About' : '404'}</h1>
      <nav className={style.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${style.active} ${style.a}`
              : `${style.inactive} ${style.a}`
          }
          to={'/'}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${style.a} ${style.active} `
              : `${style.a} ${style.inactive} `
          }
          to={'/about'}
        >
          About
        </NavLink>
      </nav>
    </>
  );
}

export default Shared;
