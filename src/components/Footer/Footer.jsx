import './Footer.css';
import { Route } from 'react-router-dom';
import FooterItem from '../FooterItem/Footeritem';

function Footer() {

    const paths = [
        "/",
        "/movies",
        "/saved-movies",
    ];

    return (
        <Route exact path={paths}>
            <footer className='footer'>
                <p className="footer__text">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </p>
                <div className='footer__container'>
                    <p className='footer_copyright'>&#169; {new Date().getFullYear()} </p>
                    <ul className='footer__list'>
                        <FooterItem
                            link='https://practicum.yandex.ru'
                            text='Яндекс.Практикум'
                        />
                        <FooterItem
                            link='https://github.com/Yandex-Practicum'
                            text='Github'
                        />
                    </ul>
                </div>
            </footer>
        </Route>
    );
    
};

export default Footer;
