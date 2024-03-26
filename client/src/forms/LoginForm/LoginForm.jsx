import PropType from 'prop-types';

import { useState } from 'react';

const LoginForm = ({ authLogin, authLoading }) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        authLogin(email, pass);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
                required
            />

            <label htmlFor='pass'>Contraseña:</label>
            <input
                type='password'
                id='pass'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete='new-password'
                required
            />

            <button disabled={authLoading}>Loguearse</button>
        </form>
    );
};

LoginForm.propTypes = {
    authLogin: PropType.func.isRequired,
    authLoading: PropType.bool.isRequired,
};

export default LoginForm;
