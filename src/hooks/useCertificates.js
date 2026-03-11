import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const useGetCertificates = () => {
    return useQuery({
        queryKey: ['certificates'],
        queryFn: async () => {
            const { data } = await api.get('/certificates');
            return data.data || data;
        }
    });
};

export const useGetCertificate = (id) => {
    return useQuery({
        queryKey: ['certificates', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await api.get(`/certificates/${id}`);
            return data.data || data;
        },
        enabled: !!id
    });
};

export const useCreateCertificate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.post('/certificates', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Certificate created successfully");
            queryClient.invalidateQueries({ queryKey: ['certificates'] });
        },
        onError: (error) => {
            console.error('Create certificate error:', error);
            toast.error(error.response?.data?.message || "Failed to create certificate");
        }
    });
};

export const useUpdateCertificate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, formData }) => {
            const { data } = await api.post(`/certificates/${id}`, formData, { // Using POST with _method=PUT because of FormData
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Certificate updated successfully");
            queryClient.invalidateQueries({ queryKey: ['certificates'] });
        },
        onError: (error) => {
            console.error('Update certificate error:', error);
            toast.error(error.response?.data?.message || "Failed to update certificate");
        }
    });
};

export const useDeleteCertificate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/certificates/${id}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Certificate deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['certificates'] });
        },
        onError: (error) => {
            console.error('Delete certificate error:', error);
            toast.error("Failed to delete certificate");
        }
    });
};
