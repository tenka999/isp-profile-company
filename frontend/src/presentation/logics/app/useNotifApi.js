import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import notifApi from "@/services/api/notif";

export const useNotifApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllNotif = () =>
    useQuery({
      queryKey: ["notif"],
      queryFn: notifApi.findAll,
    });

  const useNotifById = (id) =>
    useQuery({
      queryKey: ["notif", id],
      queryFn: () => notifApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createNotif = useMutation({
    mutationFn: (payload) => notifApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["notif"]);
    },
  });

  const markNotifRead = useMutation({
    mutationFn: (id) => notifApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notif"]);
    },
  });

  const deleteNotif = useMutation({
    mutationFn: (id) => notifApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notif"]);
    },
  });
  const deleteNotifs = useMutation({
    mutationFn: (ids) => notifApi.removes(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["notif"]);
    },
  });

  return {
    useAllNotif,
    useNotifById,

    createNotif,
    markNotifRead,
    deleteNotif,
    deleteNotifs,
  };
};
