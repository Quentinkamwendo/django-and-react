// RegistrationForm.js

// import React from 'react';
import { useContext } from 'react';
import { StateContext } from '../ContextProvider';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
function RegistrationForm() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, setError } = useForm();
    const navigate = useNavigate();
    const { setAuthData, loading, setLoading } = useContext(StateContext);


    const registrationMutation = useMutation(
        async (data) => await axios.post('/api/auth/register/', data)
        ,
        {
            onSuccess: (response) => {
                setLoading(false);
                const token = response.data.token; // Assuming the token is returned in the response
                // sessionStorage.setItem('token', token);
                const user = response.data.user;
                setAuthData(token, user)
                queryClient.setQueryData(['token'], token);
                navigate('/dashboard');
                toast.success('Registration successful', { icon: '🚀', duration: 10000 });
            },
            onError: (error) => {
                setLoading(false);
                toast.error(error.response.data.username);
                setError('email', { message: error.response.data.email });
                setError('username', { message: error.response.data.username });
                setError('password', { message: error.response.data.password });
            },
        }
    );

    const onSubmit = (data) => {
        setLoading(true);
        registrationMutation.mutate(data);
    };

    return (
        <div className="w-full max-w-xs mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        {...register('email')}
                        className="shadow form-input border rounded w-full py-2 px-3 text-gray-700"
                        id="email"
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <p className="text-red-500 text-xs italic">{registrationMutation.isError ? registrationMutation.error.message : null}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        {...register('username')}
                        className="shadow form-input rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        {...register('password')}
                        className="shadow form-input rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {loading ? <CircularProgress color='inherit' /> : 'Register'}
                    </button>
                </div>
            </form>
            <p className='bg-gradient-to-r from-yellow-300 via-slate-400 to-cyan-500 p-2'>
                Already have an account 
                <Link className='font-semibold gap-1 text-violet-600 hover:text-violet-800' to={'/auth/login'}>
                    Login
                </Link>
            </p>
        </div>
    );
}

export default RegistrationForm;
