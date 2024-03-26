import PropType from 'prop-types';

import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

import toast from 'react-hot-toast';

import {
    getPrivateProfileService,
    signInService,
    signUpService,
    updateAvatarService,
    updateUsernameAndEmailService,
} from '../services/userService';

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState(
        localStorage.getItem('authToken') || null
    );

    const [authUser, setAuthUser] = useState(null);

    const [authLoading, setAuthLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setAuthLoading(true);

                const user = await getPrivateProfileService(authToken);

                setAuthUser(user);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setAuthLoading(false);
            }
        };

        if (authToken) {
            fetchUser();
        }
    }, [authToken]);

    const authRegister = async (username, email, password) => {
        try {
            setAuthLoading(true);

            const message = await signUpService(username, email, password);

            toast.success(message);

            navigate('/login');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const authLogin = async (email, password) => {
        try {
            setAuthLoading(true);

            const authToken = await signInService(email, password);

            setAuthToken(authToken);

            localStorage.setItem('authToken', authToken);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const authLogout = () => {
        setAuthUser(null);

        setAuthToken(null);

        localStorage.removeItem('authToken');
    };

    const authEditUser = async (username, email) => {
        try {
            setAuthLoading(true);

            const { message, user } = await updateUsernameAndEmailService(
                username,
                email,
                authToken
            );

            setAuthUser({
                ...authUser,
                username: user.username ? user.username : authUser.username,
                email: user.email ? user.email : authUser.email,
            });

            toast.success(message);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const authEditUserAvatar = async (avatar) => {
        try {
            setAuthLoading(true);

            const { message, avatarName } = await updateAvatarService(
                avatar,
                authToken
            );

            setAuthUser({
                ...authUser,
                avatar: avatarName,
            });
            toast.success(message);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                authUser,
                authRegister,
                authLogin,
                authLogout,
                authEditUser,
                authEditUserAvatar,
                authLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropType.node.isRequired,
};
