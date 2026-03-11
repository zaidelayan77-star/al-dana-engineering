import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

export const useGetProfile = (userId) => {
    return useQuery({
        queryKey: ['profile', userId],
        queryFn: async () => {
            if (!userId) return null;
            const { data } = await api.get(`/profile/${userId}`);
            return data.user;
        },
        enabled: !!userId,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, profileData }) => {
            const { data } = await api.put(`/profile/${userId}`, profileData);
            return data;
        },
        onSuccess: (data, variables) => {
            toast.success("Profile updated successfully");
            // Update the cache with the new data
            queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] });

            // Also update the local storage user if needed
            const currentUserStr = localStorage.getItem('user');
            if (currentUserStr) {
                try {
                    const currentUser = JSON.parse(currentUserStr);
                    // Assuming API might return the updated user in data.user or we just merge it
                    const updatedUser = { ...currentUser, ...variables.profileData };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } catch (e) {
                    console.error("Error updating local storage user:", e);
                }
            }
        },
        onError: (error) => {
            console.error('Update profile error:', error);
            // toast error is already handled by api interceptor, but we can have fallback
        }
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async ({ userId, passwordData }) => {
            const { data } = await api.put(`/change-password/${userId}`, passwordData);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Password updated successfully");
        },
        onError: (error) => {
            console.error('Change password error:', error);
        }
    });
};

export const useUpdateEmail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, emailData }) => {
            const { data } = await api.put(`/update-email/${userId}`, emailData);
            return data;
        },
        onSuccess: (data, variables) => {
            toast.success(data.message || "Email updated successfully");

            // Update the cache with the new email
            queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] });

            // Update local storage user
            const currentUserStr = localStorage.getItem('user');
            if (currentUserStr) {
                try {
                    const currentUser = JSON.parse(currentUserStr);
                    const updatedUser = { ...currentUser, email: variables.emailData.email };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } catch (e) {
                    console.error("Error updating local storage user:", e);
                }
            }
        },
        onError: (error) => {
            console.error('Update email error:', error);
        }
    });
};
