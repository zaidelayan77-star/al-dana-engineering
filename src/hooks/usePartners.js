import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

// Get all partners
export const useGetPartners = () => {
    return useQuery({
        queryKey: ['partners'],
        queryFn: async () => {
            const { data } = await api.get('/partners');
            return data.data || data;
        }
    });
};

// Get specific partner details
export const useGetPartner = (id) => {
    return useQuery({
        queryKey: ['partners', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await api.get(`/partners/${id}`);
            return data.data || data;
        },
        enabled: !!id
    });
};

// Create Partner
export const useCreatePartner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (partnerData) => {
            // partnerData should be FormData for file upload
            const { data } = await api.post('/partners', partnerData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success("Partner added successfully");
            queryClient.invalidateQueries({ queryKey: ['partners'] });
        },
        onError: (error) => {
            console.error('Create partner error:', error);
            toast.error(error.response?.data?.message || "Failed to add partner");
        }
    });
};

// Update Partner
export const useUpdatePartner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, partnerData }) => {
            // Note: Laravel often requires _method=PUT in POST request for multipart/form-data updates
            const { data } = await api.post(`/partners/${id}`, partnerData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success("Partner updated successfully");
            queryClient.invalidateQueries({ queryKey: ['partners'] });
        },
        onError: (error) => {
            console.error('Update partner error:', error);
            toast.error(error.response?.data?.message || "Failed to update partner");
        }
    });
};

// Delete Partner
export const useDeletePartner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/partners/${id}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Partner deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['partners'] });
        },
        onError: (error) => {
            console.error('Delete partner error:', error);
            toast.error("Failed to delete partner");
        }
    });
};
