import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import likedBooksApi from "@/services/api/liked-books";

export const useLikedBookApi = () => {
  const queryClient = useQueryClient();

  // Queries
  const useAllLikedBooks = () =>
    useQuery({
      queryKey: ["liked-books"],
      queryFn: likedBooksApi.findAll,
    });

  const useLikedBookById = (id) =>
    useQuery({
      queryKey: ["liked-books", id],
      queryFn: () => likedBooksApi.findOne(id),
      enabled: !!id,
    });

  const useTotalLikedByUser = (userId) =>
    useQuery({
      queryKey: ["liked-books", "user", userId],
      queryFn: () => likedBooksApi.findTotalByUser(userId),
      enabled: !!userId,
    });

  const useTotalLikedByBook = (bookId) =>
    useQuery({
      queryKey: ["liked-books", "book", bookId],
      queryFn: () => likedBooksApi.findTotalByBook(bookId),
      enabled: !!bookId,
    });

  // Mutations
  const toggleLike = useMutation({
    mutationFn: (payload) => likedBooksApi.toggle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["liked-books"]);
    },
  });

  return {
    useAllLikedBooks,
    useLikedBookById,
    useTotalLikedByUser,
    useTotalLikedByBook,
    toggleLike,
  };
};
