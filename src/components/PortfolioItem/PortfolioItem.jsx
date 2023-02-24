import './PortfolioItem.css';

function PortfolioItem({ link, text }) {

    return (
        <li className="portfolio__item">
            <a
                className="portfolio__link"
                href={link}
                target="_blank"
                rel="noreferrer"
            >
                {text}
            </a>
        </li>
    );

};

export default PortfolioItem;
