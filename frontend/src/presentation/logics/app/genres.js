import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import genresApi from "@/services/api/genres";

export const useGenreApi = () => {
  const queryClient = useQueryClient();

  // Queries
  const useAllGenres = () =>
    useQuery({
      queryKey: ["genres"],
      queryFn: genresApi.findAll,
    });

  const useGenreById = (id) =>
    useQuery({
      queryKey: ["genres", id],
      queryFn: () => genresApi.findOne(id),
      enabled: !!id,
    });

  // Mutations
  const createGenre = useMutation({
    mutationFn: (payload) => genresApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["genres"]);
    },
  });

  const updateGenre = useMutation({
    mutationFn: ({ id, payload }) => genresApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["genres"]);
      queryClient.invalidateQueries(["genres", id]);
    },
  });

  const deleteGenre = useMutation({
    mutationFn: (id) => genresApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["genres"]);
    },
  });

  return {
    useAllGenres,
    useGenreById,
    createGenre,
    updateGenre,
    deleteGenre,
  };
};
