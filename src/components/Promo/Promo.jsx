import './Promo.css';
import web from '../../images/web.svg'

function Promo() {

    return (
        <section className='promo'>
            <div className='promo__container'>
                <div className='promo__description'>
                    <h1 className='promo__title'>
                        Учебный проект студента факультета Веб-разработки.
                    </h1>
                    <p className='promo__subtitle'>
                        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                    </p>
                    <a 
                        className='promo__link'
                        href='#about-project'
                    >
                        Узнать больше
                    </a>
                </div>
                <img
                    className='promo__img'
                    src={web}
                    alt='web'
                />
            </div>
        </section>
    );

};

export default Promo;
