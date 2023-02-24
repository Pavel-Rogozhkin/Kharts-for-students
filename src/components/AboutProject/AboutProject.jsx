import './AboutProject.css';
import Caption from '../Caption/Caption';
import AboutProjectItem from '../AboutProjectItem/AboutProjectItem';

function AboutProject() {

    return (
        <section
            className='about-project'
            id='about-project'
        >
            <Caption text='О проекте' />
            <ul className="about-project__list">
                <AboutProjectItem
                    subcaption='Дипломный проект включал 5 этапов'
                    text='Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.'
                />
                <AboutProjectItem
                    subcaption='На выполнение диплома ушло 5 недель'
                    text='У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.'
                />
            </ul>
            <div className="about-project__diploma">
                <div className="about-project__line about-project__line_type_left">
                    <span className="about-project__span about-project__span_type_left">
                        1 неделя
                    </span>
                    <p className="about-project__x-end">
                        Back-end
                    </p>
                </div>
                <div className="about-project__line">
                    <span className="about-project__span about-project__span_type_right">
                        4 недели
                    </span>
                    <p className="about-project__x-end">
                        Front-end
                    </p>
                </div>
            </div>
        </section>
    );

};

export default AboutProject;
