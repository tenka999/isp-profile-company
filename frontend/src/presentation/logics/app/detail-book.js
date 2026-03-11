import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import booksDetailApi from "@/services/api/detail-book";

export const useBookDetailApi = (user) => {
  console.log("User ID:", user.id);
  const queryClient = useQueryClient();

  // Queries
  const allBookDetails = useQuery({
    queryKey: ["booksdetail"],
    queryFn: booksDetailApi.findAll,
  });

  const deletedBookDetails = useQuery({
    queryKey: ["booksdetail", "deleted"],
    queryFn: booksDetailApi.findAllDeleted,
    enabled: false,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const findById = (id) => useQuery({
        queryKey: ["booksdetail", id],
        queryFn: () => booksDetailApi.findOne(id),
        enabled: !!id,
      });

  const existBookDetails = useQuery({
    queryKey: ["booksdetail", "exist"],
    queryFn: booksDetailApi.findAllExist,
    enabled: !!user?.id,
  });

  // Mutations
  const createBookDetail = useMutation({
    mutationFn: (payload) => booksDetailApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["booksdetail"]);
    },
  });

  const updateBookDetail = useMutation({
    mutationFn: ({ id, payload }) => booksDetailApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["booksdetail"]);
      queryClient.invalidateQueries(["booksdetail", id]);
    },
  });

  const deleteBookDetail = useMutation({
    mutationFn: (id) => booksDetailApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["booksdetail"]);
      queryClient.invalidateQueries(["booksdetail", "deleted"]);
    },
  });

  return {
    allBookDetails,
    deletedBookDetails,
    existBookDetails,
    createBookDetail,
    updateBookDetail,
    deleteBookDetail,
    findById,
  };
};
