import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customerServiceApi from "@/services/api/customerService";

export const useCustomerServiceApi = () => {
  const queryClient = useQueryClient();

  // ========= TICKETS =========

  const useAllTickets = () =>
    useQuery({
      queryKey: ["cs-ticket"],
      queryFn: customerServiceApi.findAllTickets,
    });

  const useTicketById = (id) =>
    useQuery({
      queryKey: ["cs-ticket", id],
      queryFn: () => customerServiceApi.findTicketById(id),
      enabled: !!id,
    });

  const createTicket = useMutation({
    mutationFn: customerServiceApi.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(["cs-ticket"]);
    },
  });

  const updateTicket = useMutation({
    mutationFn: ({ id, payload }) => customerServiceApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["cs-ticket"]);
      queryClient.invalidateQueries(["cs-ticket", id]);
    },
  });

  // const updateTicketStatus = useMutation({
  //   mutationFn: customerServiceApi.updateTicketStatus,
  //   onSuccess: (_, { id }) => {
  //     queryClient.invalidateQueries(["cs-ticket"]);
  //     queryClient.invalidateQueries(["cs-ticket", id]);
  //   },
  // });

  // ========= MESSAGES =========

  const useMessages = (ticketId) =>
    useQuery({
      queryKey: ["cs-messages", ticketId],
      queryFn: () => customerServiceApi.getMessages(ticketId),
      enabled: !!ticketId,
      refetchInterval: 3000, // 🔥 pseudo realtime
    });
  const useAllMessages = () =>
    useQuery({
      queryKey: ["cs-messages"],
      queryFn: () => customerServiceApi.getAllMessages(),
    });

  const sendMessage = useMutation({
    mutationFn: (payload) => customerServiceApi.sendMessage(payload),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries(["cs-messages", ticketId]);
    },
  });

  return {
    useAllTickets,
    useTicketById,
    createTicket,
    updateTicket,
    // updateTicketStatus,
    useMessages,
    useAllMessages,
    sendMessage,
  };
};
