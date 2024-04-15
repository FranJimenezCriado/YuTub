import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import { Navigate } from 'react-router-dom';

import LoginForm from '../../forms/LoginForm/LoginForm';

const LoginPage = () => {
    const { authUser, authLogin, authLoading } = useContext(AuthContext);

    if (authUser) {
        return <Navigate to='/' />;
    }

    return (
        <main>
            <LoginForm authLogin={authLogin} authLoading={authLoading} />
        </main>
    );
};

export default LoginPage;
