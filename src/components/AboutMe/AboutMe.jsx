import './AboutMe.css';
import Caption from '../Caption/Caption';
import photo from '../../images/me.jpg';

function AboutMe() {
    
    return(
        <section className='about-me'>
            <Caption text='Студент' />
            <div className='about-me__container'>
                <div className='about-me__profile'>
                    <h3 className='about-me__name'>Павел</h3>
                    <p className='about-me__job'>
                        Фронтенд-разработчик, 31 год
                    </p>
                    <p className='about-me__resume'>
                        Привет, меня зовут Павел, я из Самары. 
                        Закончил факультет аэромеханики и летательной техники МФТИ. 
                        Я люблю слушать музыку, плавание, бильярд.<br />
                        Работаю инженером-програмистов в области автоматизации промышленности. 
                        Программирую на графическом языке программирования «G», немного знаю Python, VBS и знаком со SCADA системами. 
                        Долгое время работал во ФГУП "ЦАГИ", а так же в "КАМАЗ" и в настоящее время в ГК "РТСофт".<br />
                        После прохождения курса "Веб-разработчик" от Яндекс.Практикума" планирую и дальше развиваться в этой сфере и участвовать в разработке интересных проектов.
                    </p>
                    <a
                        className='about-me__link'
                        href='https://github.com/Pavel-Rogozhkin'
                        target="_blank"
                        rel="noreferrer"
                    >
                        Github
                    </a>
                </div>
                <img 
                    className='about-me__img'
                    src={photo}
                    alt='Фото студента'
                />
            </div>
        </section>
    );

};

export default AboutMe;
