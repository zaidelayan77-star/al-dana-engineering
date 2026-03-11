import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const useGetAdminSupportTickets = () => {
    return useQuery({
        queryKey: ['admin-support'],
        queryFn: async () => {
            const { data } = await api.get('/admin/support');
            return data.data;
        }
    });
};

export const useGetAdminSupportTicket = (id) => {
    return useQuery({
        queryKey: ['admin-support', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await api.get(`/admin/support/${id}`);
            return data.data;
        },
        enabled: !!id
    });
};

export const useDeleteAdminSupportTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/admin/support/${id}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Ticket deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['admin-support'] });
        },
        onError: (error) => {
            console.error('Delete ticket error:', error);
        }
    });
};
