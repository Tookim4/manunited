import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getTeam, removeFromTeam } from "./apis/teamApi";

export const useTeam = () => {
  return useQuery({
    queryKey: ["team"],
    queryFn: getTeam,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const removePlayer = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeFromTeam,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['team'] });
        },
      });
}