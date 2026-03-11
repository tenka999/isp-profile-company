import baseApi from "@/core/api/baseApi";

export const kategoriGaleriApi = {
  // GET /kategori-galeri (all)
  findAll: async () => {
    const response = await baseApi.get("/kategori-galeri", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch artikel");
    return response.data.data;
  },
  // GET /kategori-galeri/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/kategori-galeri/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to fetch genre");
    return response.data.data;
  },

  // POST /kategori-galeri
  create: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/kategori-galeri", formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create genre");
    return response.data.data;
  },

  // PUT /kategori-galeri/:id
  update: async (id, payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/kategori-galeri/${id}`, formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update genre");
    return response.data.data;
  },

  // DELETE /kategori-galeri/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/kategori-galeri/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to delete genre");
    return response.data.data;
  },
};

export default kategoriGaleriApi;
