import baseApi from "@/core/api/baseApi";

export const coverageAreaApi = {
  // GET /coverage-area
  findAll: async () => {
    const response = await baseApi.get("/coverage-area", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch coverage area");
    return response.data.data;
  },

  // GET /coverage-area/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/coverage-area/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch coverage area");
    return response.data.data;
  },

  // POST /coverage-area
  create: async (payload) => {
    const response = await baseApi.post("/coverage-area", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201)
      throw new Error("Failed to create coverage area");
    return response.data;
  },

  // PUT /coverage-area/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/coverage-area/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to update coverage area");
    return response.data;
  },

  // DELETE /coverage-area/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/coverage-area/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to delete coverage area");
    return response.data.data;
  },
  removes: async ({ ids }) => {
    const response = await baseApi.delete(`/coverage-area/multiple-delete`, {
      data: { ids },
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to delete coverage area");
    return response.data.data;
  },
};

export default coverageAreaApi;
