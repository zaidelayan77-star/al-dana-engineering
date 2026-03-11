import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/api';

// Admin: Get all projects
export const useGetProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await api.get('/projects');
            return data.data || data;
        }
    });
};

// Admin/User: Get specific project details
export const useGetProject = (id) => {
    return useQuery({
        queryKey: ['projects', id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await api.get(`/projects/${id}`);
            return data.data || data;
        },
        enabled: !!id
    });
};

// Admin: Create Project
export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (projectData) => {
            const { data } = await api.post('/projects', projectData);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Project created successfully");
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (error) => {
            console.error('Create project error:', error);
            toast.error(error.response?.data?.message || "Failed to create project");
        }
    });
};

// Admin: Update Project
export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, projectData }) => {
            const { data } = await api.put(`/projects/${id}`, projectData);
            return data;
        },
        onSuccess: (data, variables) => {
            toast.success(data.message || "Project updated successfully");
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['projects', variables.id] });
        },
        onError: (error) => {
            console.error('Update project error:', error);
            toast.error(error.response?.data?.message || "Failed to update project");
        }
    });
};

// Admin: Delete Project
export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/projects/${id}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Project deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (error) => {
            console.error('Delete project error:', error);
            toast.error("Failed to delete project");
        }
    });
};

// User: Get their projects
export const useGetUserProjects = (userId) => {
    return useQuery({
        queryKey: ['user-projects', userId],
        queryFn: async () => {
            if (!userId) return null;
            const { data } = await api.get(`/users/${userId}/projects`);
            return data.data || data;
        },
        enabled: !!userId
    });
};

// Workflow Stages Control
export const useUpdateStageStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ projectId, stageNumber, statusData }) => {
            const { data } = await api.put(`/projects/${projectId}/stages/${stageNumber}/status`, statusData);
            return data;
        },
        onSuccess: (data, variables) => {
            toast.success("Stage status updated");
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId] });
            queryClient.invalidateQueries({ queryKey: ['user-projects'] });
        },
        onError: (error) => {
            toast.error("Failed to update stage status");
        }
    });
};

export const useUpdateStageDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ projectId, stageNumber, stageData }) => {
            const { data } = await api.put(`/projects/${projectId}/stages/${stageNumber}`, stageData);
            return data;
        },
        onSuccess: (data, variables) => {
            toast.success("Stage details updated");
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId] });
            queryClient.invalidateQueries({ queryKey: ['user-projects'] });
        },
        onError: (error) => {
            toast.error("Failed to update stage details");
        }
    });
};

// Media Control
export const useUploadStageMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ projectId, stageNumber, formData }) => {
            const { data } = await api.post(`/projects/${projectId}/stages/${stageNumber}/media`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        },
        onSuccess: (data, variables) => {
            toast.success("Media uploaded successfully");
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId] });
            queryClient.invalidateQueries({ queryKey: ['user-projects'] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to upload media");
        }
    });
};

export const useDeleteMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (mediaId) => {
            const { data } = await api.delete(`/media/${mediaId}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Media deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['user-projects'] });
        },
        onError: (error) => {
            toast.error("Failed to delete media");
        }
    });
};
