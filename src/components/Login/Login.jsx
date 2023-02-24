import './Login.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useFormWithValidation from '../../utils/useFormWithValidation';
import { EMAIL_REGEX } from '../../utils/consts';

function Login({
    onLogin,
    loading,
    errorMessage,
}) {

    const {
        values,
        handleChange,
        errors,
        isValid,
        resetForm,
    } = useFormWithValidation();

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    function handleSubmitLogin(e) {
        e.preventDefault();
        onLogin(values)
    };

    return (
        <div className='login'>
            <Logo />
            <h2 className='login__title'>
                Рады видеть!
            </h2>
            <Form
                onSubmit={handleSubmitLogin}
                isValid={isValid && !loading}
                name='login'
                place='login'
                buttonText={loading ?
                    'Вход...'
                    :
                    'Войти'
                }
                errorMessage={errorMessage}
            >
                <Input 
                    place='login'
                    name='email'
                    label='E-mail'
                    type='email'
                    value={values.email || ''}
                    placeholder='E-mail'
                    errorMessage={errors.email}
                    onChange={handleChange}
                    pattern={EMAIL_REGEX}
                />
                <Input 
                    place='login'
                    name='password'
                    label='Пароль'
                    type='password'
                    value={values.password || ''}
                    placeholder='Пароль'
                    errorMessage={errors.password}
                    onChange={handleChange}
                />
            </Form>
            <div className='login__flex'>
                <span className='login__caption login__text'>
                    Ещё не зарегистрированы?
                </span>
                <Link
                    className='login__link login__text'
                    to='/signup'
                >
                    Регистрация
                </Link>
            </div>
        </div>
    );

};

export default Login;
