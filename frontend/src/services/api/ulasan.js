import baseApi from "@/core/api/baseApi";

export const ulasanApi = {
  // GET /ulasan
  findAll: async () => {
    const response = await baseApi.get("/ulasan", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch ulasan");
    return response.data.data;
  },

  // GET /ulasan/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/ulasan/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch ulasan");
    return response.data.data;
  },

  // POST /ulasan
  create: async (payload) => {
    const response = await baseApi.post("/ulasan", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create ulasan");
    return response.data.data;
  },

  // PUT /ulasan/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/ulasan/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update ulasan");
    return response.data.data;
  },

  // DELETE /ulasan/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/ulasan/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete ulasan");
    return response.data.data;
  },

  // approve: async ({ id }) => {
  //   console.log(id);
  //   const response = await baseApi.put(`/ulasan/approve/${id}`, {
  //     headers: { "require-auth": true },
  //   });

  //   if (response.status !== 200) throw new Error("Failed to approve ulasan");
  //   return response.data;
  // },

  // reject: async ({ id }) => {
  //   console.log(id);
  //   const response = await baseApi.put(`/ulasan/reject/${id}`, {
  //     headers: { "require-auth": true },
  //   });

  //   if (response.status !== 200) throw new Error("Failed to reject ulasan");
  //   return response.data;
  // },

  approve: async ({ id }) => {
    console.log("id", id);
    const response = await baseApi.put(
      `/ulasan/approve/${id}`,
      {},
      {
        headers: { "require-auth": true },
      },
    );
    if (response.status !== 200) throw new Error("Failed to delete user");
    return response.data;
  },
  reject: async ({ id }) => {
    console.log("id", id);
    const response = await baseApi.put(
      `/ulasan/reject/${id}`,
      {},
      {
        headers: { "require-auth": true },
      },
    );
    if (response.status !== 200) throw new Error("Failed to delete user");
    return response.data;
  },
};

export default ulasanApi;
