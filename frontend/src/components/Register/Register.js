import Form from "../Form/Form";
import {useEffect} from 'react';

function Register({register, useFormWithValidation, textErrorApiRegister, errorSumbit}) {
    const toLogin = '/signin';

    const {values, handleChange, errors, isValid, resetForm, isValidEmail } = useFormWithValidation();

    useEffect(() => {
        resetForm();
      }, [])

    const handleSubmit = (event) => {
      event.preventDefault();
      register(values.email, values.password, values.name);
      resetForm();
    }

    const inputNameClassName = `form__input form__input_name ${errors.name === '' ? ' ' : 'form__input_error'}`

    return(
        <Form title='Добро пожаловать!' buttonName='Зарегистрироваться' question ='Уже зарегистрированы?' linkName='Войти' 
        to={toLogin}  handleSubmit={handleSubmit} handleChange={handleChange} isValid={isValid} errors={errors} textErrorApiRegister={textErrorApiRegister} isValidEmail={isValidEmail} errorSumbit={errorSumbit}>
            <>
            <label htmlFor='name' className='form__input-name'>Имя</label>
            <input name='name' className={inputNameClassName} minLength="2" maxLength="40" required></input>
            </>
        </Form>
    )
}

export default Register