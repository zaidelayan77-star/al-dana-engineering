import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const useGetAdminUsers = () => {
    return useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const { data } = await api.get('/admin/users');
            return data.data;
        }
    });
};

export const useGetAdminUser = (id) => {
    return useQuery({
        queryKey: ['admin-users', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await api.get(`/admin/users/${id}`);
            return data.data;
        },
        enabled: !!id
    });
};

export const useDeleteAdminUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/admin/users/${id}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success("User deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
        onError: (error) => {
            console.error('Delete user error:', error);
        }
    });
};
