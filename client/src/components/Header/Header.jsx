import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import { Link } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

import SearchForm from '../../forms/SearchForm/SearchForm';

import useVideos from "../../hooks/useVideos.js"

import Button from '@mui/material/Button';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import AnchorTemporaryDrawer from "./Drawer/Drawer.jsx"

import userLogo from "../../../public/user.png"

import './Header.css';

const Header = ({setVideosFiltrados}) => {
    const { authUser, authLogout } = useContext(AuthContext);

    const {
        setSearchParams,
        loading
    } = useVideos();

    return (
        <header>
            <AnchorTemporaryDrawer/>
            <div className='logo'>
                <Link to='/'>
                    <img src='/home-logo.png' alt='YuTub logo' />
                </Link>
            </div>

            <SearchForm setVideosFiltrados={setVideosFiltrados} setSearchParams={setSearchParams} loading={loading} />

            <nav>
                <div className='user-data'>
                    {!authUser ? (
                        <>
                            {/* Si no estamos logueados (si existe usuario) mostramos el registro y el login. */}
                            <Button variant="outlined" href="/register">
                                <img width={30}
                                    alt='avatar sign'
                                    src={userLogo} 
                                />
                                Register
                            </Button>
                            <Button variant="outlined" href="/login">
                                <img width={30}
                                    alt='avatar sign'
                                    src={userLogo}  
                                />
                                Login
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* Si estamos logueados (si existe usuario) mostramos el botón de cerrar sesión. */}
                            <Link to='/upload'>
                                <Button
                                    size='large'
                                    component="button"
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    >
                                    Upload video
                                </Button>
                            </Link>
                            <Button variant="outlined" href="/profile">
                                <img width={30}
                                    alt='avatar sign'
                                    src={userLogo} 
                                />
                                Profile
                            </Button>
                            <Button onClick={authLogout} variant="outlined">
                                <img width={30}
                                    alt='avatar sign'
                                    src={userLogo}
                                />
                                Logout
                            </Button>
                            {authUser && (
                                <img
                                     src={
                                        authUser.avatar
                                        ? `${VITE_API_URL}/${authUser.avatar}`
                                        : '/default-avatar.jpg'
                                            }
                                        alt={`${authUser.username}'s avatar`}
                                />
                            )}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
