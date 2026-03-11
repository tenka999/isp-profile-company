import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import artikelApi from "@/services/api/artikel";

export const useArtikelApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllArtikel = () =>
    useQuery({
      queryKey: ["artikel"],
      queryFn: artikelApi.findAll,
    });

  const useArtikelById = (id) =>
    useQuery({
      queryKey: ["artikel", id],
      queryFn: () => artikelApi.findOne(id),
      enabled: !!id,
    });

  const useArtikelBySlug = (slug) =>
    useQuery({
      queryKey: ["artikel", slug],
      queryFn: () => artikelApi.findSlug(slug),
    });

  // ===== MUTATIONS =====

  const createArtikel = useMutation({
    mutationFn: (payload) => artikelApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["artikel"]);
    },
  });

  const updateArtikel = useMutation({
    mutationFn: ({ id, payload }) => artikelApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["artikel"]);
      queryClient.invalidateQueries(["artikel", id]);
    },
  });

  const deleteArtikel = useMutation({
    mutationFn: (id) => artikelApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["artikel"]);
    },
  });

  const deleteArtikels = useMutation({
    mutationFn: (ids) => artikelApi.removes(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["artikel"]);
    },
  });

  return {
    useAllArtikel,
    useArtikelById,
    useArtikelBySlug,

    createArtikel,
    updateArtikel,
    deleteArtikel,
    deleteArtikels,
  };
};
