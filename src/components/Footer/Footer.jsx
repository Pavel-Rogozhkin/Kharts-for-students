import './Footer.css';
import { Route } from 'react-router-dom';
import FooterItem from '../FooterItem/Footeritem';

function Footer() {

    const paths = [
        "/",
        "/kharts",
    ];

    return (
        <Route exact path={paths}>
            <footer className='footer'>
                <p className="footer__text">
                    Учебный проект Kharts.
                </p>
                <div className='footer__container'>
                    <p className='footer_copyright'>&#169; {new Date().getFullYear()} Khokhlov Ivan & Rogozhkin Pavel</p>
                    <ul className='footer__list'>
                        <FooterItem
                            link='/'
                            text='Kharts'
                        />
                        <FooterItem
                            link='https://github.com/Pavel-Rogozhkin/Kharts'
                            text='Github'
                        />
                    </ul>
                </div>
            </footer>
        </Route>
    );
    
};

export default Footer;
