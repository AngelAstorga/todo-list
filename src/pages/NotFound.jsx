import { Link } from 'react-router';
import style from './NotFOund.module.css';
function NotFound() {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link className={style.title} to="/">
        GO back Home
      </Link>
    </>
  );
}
export default NotFound;
