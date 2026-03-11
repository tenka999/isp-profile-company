import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import genresApi from "@/services/api/kategoriGaleri";

export const useKategoriGaleriApi = () => {
  const queryClient = useQueryClient();

  // Queries
  const useAllKategoriGaleri = () =>
    useQuery({
      queryKey: ["kategori-galeri"],
      queryFn: genresApi.findAll,
    });

  const useKategoriGaleriById = (id) =>
    useQuery({
      queryKey: ["kategori-galeri", id],
      queryFn: () => genresApi.findOne(id),
      enabled: !!id,
    });

  // Mutations
  const createKategoriGaleri = useMutation({
    mutationFn: (payload) => genresApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["kategori-galeri"]);
    },
  });

  const updateKategoriGaleri = useMutation({
    mutationFn: ({ id, payload }) => genresApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["kategori-galeri"]);
      queryClient.invalidateQueries(["kategori-galeri", id]);
    },
  });

  const deleteKategoriGaleri = useMutation({
    mutationFn: (id) => genresApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["kategori-galeri"]);
    },
  });

  return {
    useAllKategoriGaleri,
    useKategoriGaleriById,
    createKategoriGaleri,
    updateKategoriGaleri,
    deleteKategoriGaleri,
  };
};
