import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import coverageAreaApi from "@/services/api/coverageArea";

export const useCoverageAreaApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllCoverageArea = () =>
    useQuery({
      queryKey: ["coverage-area"],
      queryFn: coverageAreaApi.findAll,
    });

  const useCoverageAreaById = (id) =>
    useQuery({
      queryKey: ["coverage-area", id],
      queryFn: () => coverageAreaApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createCoverageArea = useMutation({
    mutationFn: (payload) => coverageAreaApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["coverage-area"]);
    },
  });

  const updateCoverageArea = useMutation({
    mutationFn: ({ id, payload }) => coverageAreaApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["coverage-area"]);
      queryClient.invalidateQueries(["coverage-area", id]);
    },
  });

  const deleteCoverageArea = useMutation({
    mutationFn: (id) => coverageAreaApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["coverage-area"]);
    },
  });
  const deleteCoverageAreas = useMutation({
    mutationFn: (ids) => coverageAreaApi.removes(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["coverage-area"]);
    },
  });

  return {
    useAllCoverageArea,
    useCoverageAreaById,

    createCoverageArea,
    updateCoverageArea,
    deleteCoverageArea,
    deleteCoverageAreas,
  };
};
