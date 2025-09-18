import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getPlayers, createPlayer, deletePlayer } from "./apis/legendApi";

export default function usePlayers () {
  const queryClient = useQueryClient();

   const get_legends_query = useQuery ({
          queryKey: ['players'],
          queryFn: getPlayers,
          staleTime: 5 * 60 * 1000, // 5 minutes
          cacheTime: 30 * 60 * 1000, // 30 minutes
  });

   const create_legend_mutation = useMutation ({
          mutationFn: createPlayer,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
          },
  })

   const delete_legend_mutation = useMutation ({
          mutationFn: deletePlayer,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
          },
  })

  return{
    get_legends_query,
    create_legend_mutation,
    delete_legend_mutation
  }
}

