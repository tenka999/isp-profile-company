import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ulasanApi from "@/services/api/ulasan";

export const useUlasanApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllUlasan = () =>
    useQuery({
      queryKey: ["ulasan"],
      queryFn: ulasanApi.findAll,
    });

  const useUlasanById = (id) =>
    useQuery({
      queryKey: ["ulasan", id],
      queryFn: () => ulasanApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createUlasan = useMutation({
    mutationFn: (payload) => ulasanApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["ulasan"]);
    },
  });

  const updateUlasan = useMutation({
    mutationFn: ({ id, payload }) => ulasanApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["ulasan"]);
      queryClient.invalidateQueries(["ulasan", id]);
    },
  });

  const deleteUlasan = useMutation({
    mutationFn: (id) => ulasanApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["ulasan"]);
    },
  });

  const approveUlasan = useMutation({
    mutationFn: (id) => ulasanApi.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["ulasan"]);
    },
  });

  const rejectUlasan = useMutation({
    mutationFn: (id) => ulasanApi.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["ulasan"]);
    },
  });

  return {
    useAllUlasan,
    useUlasanById,

    createUlasan,
    updateUlasan,
    deleteUlasan,
    approveUlasan,
    rejectUlasan,
  };
};
