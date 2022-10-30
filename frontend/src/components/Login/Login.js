import Form from "../Form/Form";

function Login({userAuthorization, useFormWithValidation, textErrorApiLogin}) {
    const toRegister = '/signup'

    const {values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    function handleSubmit(evt) {
      evt.preventDefault();
      userAuthorization(values.email, values.password);
      resetForm();
    }

    return(
        <Form title='Рады видеть!' buttonName='Войти' question ='Еще не зарегистрированы?' 
        linkName='Регистрация' to={toRegister} handleSubmit={handleSubmit} handleChange={handleChange} isValid={isValid} errors={errors} textErrorApiLogin={textErrorApiLogin}/>
    )
}

export default Login