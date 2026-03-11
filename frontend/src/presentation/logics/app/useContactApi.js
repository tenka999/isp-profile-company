import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import contactApi from "@/services/api/contact";

export const useContactApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllContact = () =>
    useQuery({
      queryKey: ["contact"],
      queryFn: contactApi.findAll,
    });

  const useContactById = (id) =>
    useQuery({
      queryKey: ["contact", id],
      queryFn: () => contactApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createContact = useMutation({
    mutationFn: (payload) => contactApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["contact"]);
    },
  });

  const deleteContact = useMutation({
    mutationFn: (id) => contactApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["contact"]);
    },
  });
  const deleteContacts = useMutation({
    mutationFn: (ids) => contactApi.removes(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["contact"]);
    },
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, payload }) => contactApi.updateStatus(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["contact"]);
      queryClient.invalidateQueries(["contact", id]);
    },
  });

  return {
    useAllContact,
    useContactById,

    updateStatus,
    createContact,
    deleteContact,
    deleteContacts,
  };
};
