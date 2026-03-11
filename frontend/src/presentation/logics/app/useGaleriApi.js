import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import galeriApi from "@/services/api/galeri";

export const useGaleriApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllGaleri = () =>
    useQuery({
      queryKey: ["galeri"],
      queryFn: galeriApi.findAll,
    });

  const useGaleriById = (id) =>
    useQuery({
      queryKey: ["galeri", id],
      queryFn: () => galeriApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createGaleri = useMutation({
    mutationFn: (payload) => galeriApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["galeri"]);
    },
  });

  const updateGaleri = useMutation({
    mutationFn: ({ id, payload }) => galeriApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["galeri"]);
      queryClient.invalidateQueries(["galeri", id]);
    },
  });

  const deleteGaleri = useMutation({
    mutationFn: (id) => galeriApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["galeri"]);
    },
  });

  return {
    useAllGaleri,
    useGaleriById,

    createGaleri,
    updateGaleri,
    deleteGaleri,
  };
};
