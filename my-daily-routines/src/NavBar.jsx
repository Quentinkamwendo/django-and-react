import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MenuIcon } from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const [hasSessionToken, setHasSessionToken] = useState(false);

    useEffect(() => {
        const sessionToken = localStorage.getItem("sessionToken");
        setHasSessionToken(!!sessionToken)
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("sessionToken");
        setHasSessionToken(false);
        handleClose();
    };



    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        onClick={handleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Your App
                    </Typography>
                    {hasSessionToken ? (
                        <>
                            <div className='hidden md:flex'>
                                <Link to={"/dashboard"} className='text-white px-4 py-2'>
                                    Dashboard
                                </Link>
                                <Button
                                    onClick={handleLogout}
                                    color='inherit'
                                    className='text-white'
                                >
                                    Logout
                                </Button>
                                <Button
                                    onClick={handleMenu}
                                    color='inherit'
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                >
                                    User Name
                                </Button>

                            </div>
                        </>
                    ) : (
                        <>
                            <div className='hidden md:flex'>
                                <Link to="/signup" className='text-white px-4 py-2'>
                                    Sign Up
                                </Link>
                                <Link to="/login" className='text-white px-4 py-2'>
                                    Login
                                </Link>
                            </div>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
