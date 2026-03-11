import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import categoriesApi from "@/services/api/categories";

export const useCategoryApi = () => {
  const queryClient = useQueryClient();

  // Queries
  const useAllCategories = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: categoriesApi.findAll,
    });

  const useCategoryById = (id) =>
    useQuery({
      queryKey: ["categories", id],
      queryFn: () => categoriesApi.findOne(id),
      enabled: !!id,
    });

  // Mutations
  const createCategory = useMutation({
    mutationFn: (payload) => categoriesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, payload }) => categoriesApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["categories"]);
      queryClient.invalidateQueries(["categories", id]);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id) => categoriesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  return {
    useAllCategories,
    useCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
