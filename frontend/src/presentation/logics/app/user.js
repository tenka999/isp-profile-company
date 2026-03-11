import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usersApi from "@/services/api/users";

export const useUserApi = (user) => {
  const queryClient = useQueryClient();

  // Queries
  const useAllUsers = () =>
    useQuery({
      queryKey: ["users"],
      queryFn: usersApi.findAll,
    });

  const useUserById = (id) =>
    useQuery({
      queryKey: ["users", id],
      queryFn: () => usersApi.findOne(id),
      enabled: !!id,
    });

  const useUserByEmail = (email) =>
    useQuery({
      queryKey: ["users", "email", email],
      queryFn: () => usersApi.findByEmail(email),
      enabled: !!email,
    });

  // Mutations
  const createUser = useMutation({
    mutationFn: (payload) => usersApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, payload }) => usersApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["users", id]);
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id) => usersApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["users", id]);
    },
  });

  const deleteSelectedUser = useMutation({
    mutationFn: (ids) => usersApi.removeSelected(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const restoreSelectedUser = useMutation({
    mutationFn: (ids) => usersApi.restoreSelected(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return {
    useAllUsers,
    useUserById,
    useUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    deleteSelectedUser,
    restoreSelectedUser,
  };
};
