import PropType from 'prop-types';

import { useState } from 'react';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

import './LoginForm.css';

const LoginForm = ({ authLogin, authLoading }) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        authLogin(email, pass);
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit} className='form'>
                <h1>Login</h1>

                <div className='input-box'>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='email'
                        required
                    />
                    <EmailIcon className='icon'/>
                </div>

                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Password'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        autoComplete='new-password'
                        required
                    />
                    <LockIcon className='icon'/>
                </div>

                <div className='remember-forgot'>
                    <label><input type="checkbox" />Remember me</label>
                    <a href="/users/password/recover">Forgot password?</a>
                </div>

                <button disabled={authLoading}>Login</button>

                <div className='register-link'>
                    <p>Dont have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    authLogin: PropType.func.isRequired,
    authLoading: PropType.bool.isRequired,
};

export default LoginForm;
