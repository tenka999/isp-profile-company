import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import likedReviewsApi from "@/services/api/liked-reviews";

export const useLikedReviewApi = () => {
  const queryClient = useQueryClient();

  // Queries
  const useAllLikedReviews = () =>
    useQuery({
      queryKey: ["liked-reviews"],
      queryFn: likedReviewsApi.findAll,
    });

  const useLikedReviewById = (id) =>
    useQuery({
      queryKey: ["liked-reviews", id],
      queryFn: () => likedReviewsApi.findOne(id),
      enabled: !!id,
    });

  const useTotalLikedReviewByUser = (userId) =>
    useQuery({
      queryKey: ["liked-reviews", "user", userId],
      queryFn: () => likedReviewsApi.findTotalByUser(userId),
      enabled: !!userId,
    });

  const useTotalLikedReviewByBook = (bookId) =>
    useQuery({
      queryKey: ["liked-reviews", "book", bookId],
      queryFn: () => likedReviewsApi.findTotalByBook(bookId),
      enabled: !!bookId,
    });

  // Mutations
  const toggleLikeReview = useMutation({
    mutationFn: (payload) => likedReviewsApi.toggle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["liked-reviews"]);
    },
  });

  return {
    useAllLikedReviews,
    useLikedReviewById,
    useTotalLikedReviewByUser,
    useTotalLikedReviewByBook,
    toggleLikeReview,
  };
};
