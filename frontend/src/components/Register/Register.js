import Form from "../Form/Form";

function Register({userRegister, useFormWithValidation, textErrorApiRegister}) {
    const toLogin = '/signin';

    const {values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const handleSubmit = (event) => {
      event.preventDefault();
      userRegister(values.email, values.password, values.name);
      resetForm();
    }

    const inputNameClassName = `form__input form__input_name ${errors.name === '' ? ' ' : 'form__input_error'}`

    return(
        <Form title='Добро пожаловать!' buttonName='Зарегистрироваться' question ='Уже зарегистрированы?' linkName='Войти' 
        to={toLogin}  handleSubmit={handleSubmit} handleChange={handleChange} isValid={isValid} errors={errors} textErrorApiRegister={textErrorApiRegister}>
            <>
            <label htmlFor='name' className='form__input-name'>Имя</label>
            <input name='name' className={inputNameClassName} minLength="2" maxLength="40" required></input>
            </>
        </Form>
    )
}

export default Register