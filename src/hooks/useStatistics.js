import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useProjectsStats = () => {
    return useQuery({
        queryKey: ['statistics', 'projects'],
        queryFn: async () => {
            const { data } = await api.get('/statistics/projects');
            return data.data || data;
        }
    });
};

export const useUsersStats = () => {
    return useQuery({
        queryKey: ['statistics', 'users'],
        queryFn: async () => {
            const { data } = await api.get('/statistics/users');
            return data.data || data;
        }
    });
};

export const useMessagesStats = () => {
    return useQuery({
        queryKey: ['statistics', 'messages'],
        queryFn: async () => {
            const { data } = await api.get('/statistics/messages');
            return data.data || data;
        }
    });
};

export const useWorkflowStats = () => {
    return useQuery({
        queryKey: ['statistics', 'workflow'],
        queryFn: async () => {
            const { data } = await api.get('/statistics/workflow');
            return data.data || data;
        }
    });
};
