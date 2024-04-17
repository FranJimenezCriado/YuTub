import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import toast from 'react-hot-toast';

import { activateUserService } from '../../services/userService';

const ValidateUserPage = () => {
    const navigate = useNavigate();

    const { registrationCode } = useParams();

    useEffect(() => {
        const fetchValidateUser = async () => {
            try {
                await activateUserService(registrationCode);

                navigate('/login');
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchValidateUser();
    }, [navigate, registrationCode]);

    return (
        <main>
            <h2>User Validation</h2>

            <p>Validating user, please, wait.</p>
        </main>
    );
};

export default ValidateUserPage;
