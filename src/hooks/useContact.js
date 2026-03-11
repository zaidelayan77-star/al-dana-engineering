import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const useSubmitContact = () => {
    return useMutation({
        mutationFn: async (contactData) => {
            const { data } = await api.post('/contacts', contactData);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Message sent successfully! We'll be in touch soon.");
        },
        onError: (error) => {
            console.error('Contact submission error:', error);
        }
    });
};

export const useGetContacts = () => {
    return useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const { data } = await api.get('/contacts');
            return data.data; // Assuming API wraps list in `data.data` as shown
        }
    });
};

export const useGetContact = (id) => {
    return useQuery({
        queryKey: ['contacts', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await api.get(`/contacts/${id}`);
            return data.data; // Assuming API wraps single resource in `data.data`
        },
        enabled: !!id
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/contacts/${id}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Message deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
        onError: (error) => {
            console.error('Contact delete error:', error);
        }
    });
};
