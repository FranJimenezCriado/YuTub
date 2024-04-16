import PropType from 'prop-types';

import { useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

import toast from 'react-hot-toast';

const RegisterForm = ({ authRegister, authLoading }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pass === repeatedPass) {
            authRegister(username, email, pass);
        } else {
            toast.error('Passwords doesnt match');
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit} className='form'>
                <h1>Register</h1>

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
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete='username'
                        required
                    />
                    <PersonIcon className='icon'/>
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

                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Repeat Password'
                        value={repeatedPass}
                        onChange={(e) => setRepeatedPass(e.target.value)}
                        autoComplete='repeated-password'
                        required
                    />
                    <LockIcon className='icon'/>
                </div>

                <button disabled={authLoading}>Register</button>
            </form>
        </div>
    );
};

// Validamos las props.
RegisterForm.propTypes = {
    authRegister: PropType.func.isRequired,
    authLoading: PropType.bool.isRequired,
};

export default RegisterForm;
