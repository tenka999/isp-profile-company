import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import borrowingsApi from "@/services/api/borrowings";

export const useBorrowingApi = () => {
  const queryClient = useQueryClient();

  // Queries
  const useAllBorrowings = () =>
    useQuery({
      queryKey: ["borrowings"],
      queryFn: borrowingsApi.findAll,
    });

  const useBorrowingById = (id) =>
    useQuery({
      queryKey: ["borrowings", id],
      queryFn: () => borrowingsApi.findOne(id),
      enabled: !!id,
    });

  const useBorrowingsByStatus = (status) =>
    useQuery({
      queryKey: ["borrowings", "status", status],
      queryFn: () => borrowingsApi.findByStatus(status),
      enabled: !!status,
    });

  const useDeletedBorrowings = () =>
    useQuery({
      queryKey: ["borrowings", "deleted"],
      queryFn: borrowingsApi.findAllDeleted,
    });

  const useExistBorrowings = () =>
    useQuery({
      queryKey: ["borrowings", "exist"],
      queryFn: borrowingsApi.findAllExist,
    });

  // Mutations
  const createBorrowing = useMutation({
    mutationFn: (payload) => borrowingsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["borrowings"]);
    },
  });

  const updateBorrowing = useMutation({
    mutationFn: ({ id, payload }) => borrowingsApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["borrowings"]);
      queryClient.invalidateQueries(["borrowings", id]);
    },
  });

  const deleteBorrowing = useMutation({
    mutationFn: (id) => borrowingsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["borrowings"]);
      queryClient.invalidateQueries(["borrowings", "deleted"]);
    },
  });

  return {
    useAllBorrowings,
    useBorrowingById,
    useBorrowingsByStatus,
    useDeletedBorrowings,
    useExistBorrowings,
    createBorrowing,
    updateBorrowing,
    deleteBorrowing,
  };
};
