import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import annotationsApi from "@/services/api/annotations";

export const useAnnotationApi = () => {
  const queryClient = useQueryClient();

  // Queries
  const useAllAnnotations = () =>
    useQuery({
      queryKey: ["annotations"],
      queryFn: annotationsApi.findAll,
    });

  const useAnnotationById = (id) =>
    useQuery({
      queryKey: ["annotations", id],
      queryFn: () => annotationsApi.findOne(id),
      enabled: !!id,
    });

  const useAnnotationsByBookId = (bookId) =>
    useQuery({
      queryKey: ["annotations", "book", bookId],
      queryFn: () => annotationsApi.findByBookId(bookId),
      enabled: !!bookId,
    });

  // Mutations
  const createAnnotation = useMutation({
    mutationFn: (payload) => annotationsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["annotations"]);
    },
  });

  const updateAnnotation = useMutation({
    mutationFn: ({ id, payload }) => annotationsApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["annotations"]);
      queryClient.invalidateQueries(["annotations", id]);
    },
  });

  const deleteAnnotation = useMutation({
    mutationFn: (id) => annotationsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["annotations"]);
    },
  });

  return {
    useAllAnnotations,
    useAnnotationById,
    useAnnotationsByBookId,
    createAnnotation,
    updateAnnotation,
    deleteAnnotation,
  };
};
