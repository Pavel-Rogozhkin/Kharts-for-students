import './MenuItem.css';
import { NavLink, Link } from 'react-router-dom';

function MenuItem({ exact, to, linkText, isProfile }) {

    return(
        <li className='menu__item'>
            {isProfile ?
                <Link
                    className='menu__profile'
                    to='/profile'
                >
                    Аккаунт
                </Link>
                :
                <NavLink
                    className='menu__link'
                    exact={exact}
                    to={to}
                    activeClassName='menu__link_active'
                >
                    {linkText}
                </NavLink>
            }
        </li>
    );

};

export default MenuItem;
