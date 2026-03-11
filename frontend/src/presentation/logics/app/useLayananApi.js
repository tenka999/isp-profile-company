import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import layananApi from "@/services/api/layanan";
import benefitApi from "@/services/api/benefit";

export const useLayananApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllLayanan = () =>
    useQuery({
      queryKey: ["layanan"],
      queryFn: layananApi.findAll,
    });

  const useLayananById = (id) =>
    useQuery({
      queryKey: ["layanan", id],
      queryFn: () => layananApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createLayanan = useMutation({
    mutationFn: (payload) => layananApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["layanan"]);
    },
  });

  const updateLayanan = useMutation({
    mutationFn: ({ id, payload }) => layananApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["layanan"]);
      queryClient.invalidateQueries(["layanan", id]);
    },
  });

  const deleteLayanan = useMutation({
    mutationFn: (id) => layananApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["layanan"]);
    },
  });

  // ===== BENEFIT =====

  const createBenefit = useMutation({
    mutationFn: (payload) => benefitApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["layanan"]);
    },
  });

  const deleteBenefit = useMutation({
    mutationFn: (id) => benefitApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["layanan"]);
    },
  });

  return {
    useAllLayanan,
    useLayananById,

    createLayanan,
    updateLayanan,
    deleteLayanan,

    createBenefit,
    deleteBenefit,
  };
};
