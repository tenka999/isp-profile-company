import baseApi from "@/core/api/baseApi";


export const profileApi = {
  // findOne: async (_params = {}) => {
  //   try {
  //     const response = await baseApi.get(`/profiles/${_params.id}`, {
  //       headers: {
  //         "require-auth": true,
  //       },
  //     });
  //     console.log('response.data',  response.data);
  //     if (response.status !== 200) {
  //       throw new Error("Failed to fetch profile");
  //     }
  //     const { data } = response.data;
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // },
  // GET /profiles
  findAll: async () => {
    const response = await baseApi.get("/profiles", {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to fetch profiles");
    return response.data.data; // assuming { data: [...] }
  },

  // GET /profiles/:id
  findOne: async (id) => {
    console.log("id", id);
    const response = await baseApi.get(`profiles/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to fetch profile");
    return response.data.data; // assuming { data: {...} }
  },

  // GET /profiles/email/:email
  findByEmail: async (email) => {
    console.log("dataEmail", email);
    const response = await baseApi.get(`/profiles/email/${email}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to fetch profile");
    return response.data.data;
  },

  // PUT /profiles/:id (with FormData)
  update: async (id, payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/profiles/${id}`, formData, {
      headers: {
        "require-auth": true,
      },
    });

    if (response.status !== 200) throw new Error("Failed to update profile");
    return response.data.data;
  },

  // DELETE /profiles/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/profiles/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to delete profile");
    return response.data.data;
  },
};

export default profileApi