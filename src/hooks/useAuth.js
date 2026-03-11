import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post('/login', credentials);
            return data;
        },
        onSuccess: (data) => {
            if (data.status) {
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                toast.success(data.message || 'Login successful');
                navigate('/');
            } else {
                toast.error(data.message || 'Login failed');
            }
        },
        onError: (error) => {
            console.error('Login error:', error);
        }
    });
};

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (userData) => {
            const { data } = await api.post('/register', userData);
            return data;
        },
        onSuccess: (data) => {
            if (data.status) {
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                toast.success(data.message || 'Registration successful');
                navigate('/');
            } else {
                toast.error(data.message || 'Registration failed');
            }
        },
        onError: (error) => {
            console.error('Registration error:', error);
        }
    });
};
