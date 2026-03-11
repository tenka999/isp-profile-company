import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import faqApi from "@/services/api/faq";

export const useFaqApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllFaq = () =>
    useQuery({
      queryKey: ["faq"],
      queryFn: faqApi.findAll,
    });

  const useFaqById = (id) =>
    useQuery({
      queryKey: ["faq", id],
      queryFn: () => faqApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createFaq = useMutation({
    mutationFn: (payload) => faqApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["faq"]);
    },
  });

  const updateFaq = useMutation({
    mutationFn: ({ id, payload }) => faqApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["faq"]);
      queryClient.invalidateQueries(["faq", id]);
    },
  });
  const updateFaqOrders = useMutation({
    mutationFn: ({ id, payload }) => faqApi.updateOrder(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["faq"]);
      queryClient.invalidateQueries(["faq", id]);
    },
  });
  const updateActive = useMutation({
    mutationFn: ({ id, payload }) => faqApi.updateActive(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["faq"]);
      queryClient.invalidateQueries(["faq", id]);
    },
  });

  const deleteFaq = useMutation({
    mutationFn: (id) => faqApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["faq"]);
    },
  });
  const deleteFaqs = useMutation({
    mutationFn: (ids) => faqApi.removes(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["faq"]);
    },
  });

  return {
    useAllFaq,
    useFaqById,

    createFaq,
    updateFaq,
    updateFaqOrders,
    updateActive,
    deleteFaq,
    deleteFaqs,
  };
};
