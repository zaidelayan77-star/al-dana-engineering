import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

// Get all team members
export const useGetTeamMembers = () => {
    return useQuery({
        queryKey: ['team-members'],
        queryFn: async () => {
            const { data } = await api.get('/team-members');
            return data.data || data;
        }
    });
};

// Get specific team member
export const useGetTeamMember = (id) => {
    return useQuery({
        queryKey: ['team-members', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await api.get(`/team-members/${id}`);
            return data.data || data;
        },
        enabled: !!id
    });
};

// Create Team Member
export const useCreateTeamMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (memberData) => {
            const { data } = await api.post('/team-members', memberData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success("Team member added successfully");
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
        },
        onError: (error) => {
            console.error('Create team member error:', error);
            toast.error(error.response?.data?.message || "Failed to add team member");
        }
    });
};

// Update Team Member
export const useUpdateTeamMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, memberData }) => {
            // Laravel-specific _method=PUT for multipart updates
            const { data } = await api.post(`/team-members/${id}`, memberData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success("Team member updated successfully");
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
        },
        onError: (error) => {
            console.error('Update team member error:', error);
            toast.error(error.response?.data?.message || "Failed to update team member");
        }
    });
};

// Delete Team Member
export const useDeleteTeamMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/team-members/${id}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Team member deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['team-members'] });
        },
        onError: (error) => {
            console.error('Delete team member error:', error);
            toast.error("Failed to delete team member");
        }
    });
};
