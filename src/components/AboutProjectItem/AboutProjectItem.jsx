import './AboutProjectItem.css';

function AboutProjectItem({ subcaption, text }) {

    return (
        <li className="about-project__item">
            <h3 className="about-project__subcaption">
                {subcaption}
            </h3>
            <p className="about-project__text">
                {text}
            </p>
        </li>
    );

};

export default AboutProjectItem;
