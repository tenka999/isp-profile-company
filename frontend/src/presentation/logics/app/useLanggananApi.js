import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import langgananApi from "@/services/api/langganan";

export const useLanggananApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllLangganan = () =>
    useQuery({
      queryKey: ["langganan"],
      queryFn: langgananApi.findAll,
    });

  const useLanggananById = (id) =>
    useQuery({
      queryKey: ["langganan", id],
      queryFn: () => langgananApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createLangganan = useMutation({
    mutationFn: (payload) => langgananApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["langganan"]);
    },
  });

  const updateLangganan = useMutation({
    mutationFn: ({ id, payload }) => langgananApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["langganan"]);
      queryClient.invalidateQueries(["langganan", id]);
    },
  });

  const deleteLangganan = useMutation({
    mutationFn: (id) => langgananApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["langganan"]);
    },
  });
  const deleteLangganans = useMutation({
    mutationFn: (ids) => langgananApi.removes(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["langganan"]);
    },
  });

  return {
    useAllLangganan,
    useLanggananById,

    createLangganan,
    updateLangganan,
    deleteLangganan,
    deleteLangganans,
  };
};
