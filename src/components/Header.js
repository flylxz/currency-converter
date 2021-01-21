import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <nav>
        <ul className=''>
          <li>
            <NavLink to='/' activeClassName='selected'>
              CURRENCY CONVERTER
            </NavLink>
          </li>
          <li>
            <NavLink to='/list' activeClassName='selected'>
              EXCHANGE RATES
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
