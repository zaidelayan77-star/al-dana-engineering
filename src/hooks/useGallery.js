import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const useGetGalleryItems = () => {
    return useQuery({
        queryKey: ['gallery'],
        queryFn: async () => {
            const { data } = await api.get('/gallery');
            // Assuming the API returns items in data.data or directly in data
            return data.data || data;
        }
    });
};

export const useGetGalleryItem = (id) => {
    return useQuery({
        queryKey: ['gallery', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await api.get(`/gallery/${id}`);
            return data.data || data;
        },
        enabled: !!id
    });
};

export const useCreateGalleryItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.post('/gallery', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Gallery item created successfully");
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
        onError: (error) => {
            console.error('Create gallery item error:', error);
            toast.error(error.response?.data?.message || "Failed to create gallery item");
        }
    });
};

export const useUpdateGalleryItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, formData }) => {
            const { data } = await api.put(`/gallery/${id}`, formData);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Gallery item updated successfully");
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
        onError: (error) => {
            console.error('Update gallery item error:', error);
            toast.error(error.response?.data?.message || "Failed to update gallery item");
        }
    });
};

export const useDeleteGalleryItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/gallery/${id}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Gallery item deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
        onError: (error) => {
            console.error('Delete gallery item error:', error);
            toast.error("Failed to delete gallery item");
        }
    });
};
