import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const useSubmitSupportMessage = () => {
    return useMutation({
        mutationFn: async (supportData) => {
            const { data } = await api.post('/support', supportData);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Message sent successfully");
        },
        onError: (error) => {
            console.error('Support message error:', error);
        }
    });
};
