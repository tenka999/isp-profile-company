import baseApi from "@/core/api/baseApi";

export const genresApi = {
  // GET /genres (all)
  findAll: async () => {
    const response = await baseApi.get("/genres");
    if (response.status !== 200) throw new Error("Failed to fetch genres");
    return response.data.data;
  },

  // GET /genres/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/genres/${id}`);
    if (response.status !== 200) throw new Error("Failed to fetch genre");
    return response.data.data;
  },

  // POST /genres
  create: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/genres", formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create genre");
    return response.data.data;
  },

  // PUT /genres/:id
  update: async (id, payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/genres/${id}`, formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update genre");
    return response.data.data;
  },

  // DELETE /genres/:id
  remove: async ({id}) => {
    const response = await baseApi.delete(`/genres/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to delete genre");
    return response.data.data;
  },
};

export default genresApi;
