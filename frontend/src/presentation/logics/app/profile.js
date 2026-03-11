/* eslint-disable react-hooks/rules-of-hooks */
// import profileApi from "@/services/api/profile";
// import { useMutation, useQuery } from "@tanstack/react-query";
// // import { useQueryClient } from "@tanstack/react-query";
// // import { all } from "axios";


// export const profileKeys = {
//   all: ["profile"],
//   lists: () => [...profileKeys.all, "list"],
//   list: (filters) => [...profileKeys.lists(), { filters }],
//   details: () => [...profileKeys.all, "detail"],
//   detail: (id) => [...profileKeys.details(), id],
// };

// export const useProfileApi = (user) => {
// //  const queryClient = useQueryClient();
 
//  const allProfile = useQuery({
//    queryKey: ["profiles"],
//    queryFn: profileApi.findAll,
//    enabled: !!user?.id, // only fetch if user exists
//  });

//  const profile = useQuery({
//    queryKey: ["profile", user?.id],
//    queryFn: () => profileApi.findOne(user.id),
//    enabled: !!user?.id,
//  });




//   const updateProfile =  useMutation({
//     mutationFn: async (credentials) => profileApi.updateProfile(credentials),
  
//     onError: (error) => {
//       console.error('Login failed:', error);
//     }
//   });

//   return { profile,allProfile, updateProfile };
// };


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import profileApi from "@/services/api/profile";

export const useProfileApi = (user) => {
  console.log("userid", user.id);
  const queryClient = useQueryClient();

  // Get all profiles
  const allProfiles = useQuery({
    queryKey: ["profiles"],
    queryFn: profileApi.findAll,
    enabled: !!user, // only fetch if user exists
  });

  // Get one profile by ID
  const profile = (id) => useQuery({
    queryKey: ["profile", id],
    queryFn: () => profileApi.findOne(id),
    enabled: !!id,
  });

  // Update profile (FormData)
  const updateProfile = useMutation({
    mutationFn: ({ id, payload }) => profileApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile", user?.id]);
      queryClient.invalidateQueries(["profiles"]);
    },
  });

  // Delete profile
  const deleteProfile = useMutation({
    mutationFn: (id) => profileApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
  });

  return { allProfiles, profile, updateProfile, deleteProfile };
};
