import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import reviewsApi from "@/services/api/reviews";

export const useReviewApi = (user) => {
  const queryClient = useQueryClient();

  // Queries
  const allReviews = useQuery({
    queryKey: ["reviews"],
    queryFn: reviewsApi.findAll,
  });

  const useReviewById = (id) =>
    useQuery({
      queryKey: ["reviews", id],
      queryFn: () => reviewsApi.findOne(id),
      enabled: !!id,
    });

  const useReviewsByBook = (bookId) =>
    useQuery({
      queryKey: ["reviews", "book", bookId],
      queryFn: () => reviewsApi.findAllByBookId(bookId),
      enabled: !!bookId,
    });

  const useReviewsByUser = (userId) => 
    useQuery({
      queryKey: ["reviews", "user", userId],
      queryFn: () => reviewsApi.findAllByUserId(userId),
      enabled: !!userId,
    });

  const useReviewsByParent = (parentId) =>
    useQuery({
      queryKey: ["reviews", "parent", parentId],
      queryFn: () => reviewsApi.findAllByParentId(parentId),
      enabled: !!parentId,
    });

  const existReviews = useQuery({
    queryKey: ["reviews", "exist"],
    queryFn: reviewsApi.findAllExist,
    enabled: !!user?.id,
  });

  const deletedReviews = useQuery({
    queryKey: ["reviews", "deleted"],
    queryFn: reviewsApi.findAllDeleted,
    enabled: false,
  });

  // Mutations
  const upsertReview = useMutation({
    mutationFn: (payload) => reviewsApi.upsert(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const deleteReview = useMutation({
    mutationFn: (id) => reviewsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["reviews", "deleted"]);
    },
  });

  return {
    allReviews,
    useReviewById,
    useReviewsByBook,
    useReviewsByUser,
    useReviewsByParent,
    existReviews,
    deletedReviews,
    upsertReview,
    deleteReview,
  };
};
