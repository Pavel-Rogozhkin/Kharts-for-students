import './FooterItem.css';

function FooterItem({ link, text }) {

    return (
        <li>
            <a
                className="footer__link"
                href={link}
                target="_blank"
                rel="noreferrer"
            >
                {text}
            </a>
        </li>
    );
    
};

export default FooterItem;
