import {useQuery} from '@tanstack/react-query';
import {getCurrentUser} from './apis/apis';

export const useAuth = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry: false,
    });
};