import baseApi from "@/core/api/baseApi";

export const galeriApi = {
  // GET /galeri
  findAll: async () => {
    const response = await baseApi.get("/galeri", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch galeri");
    return response.data.data;
  },

  // GET /galeri/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/galeri/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch galeri");
    return response.data.data;
  },

  // POST /galeri
  create: async (payload) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      // khusus file
      if (value instanceof File) {
        formData.append(key, value);

        // object biasa (kategori dll)
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    const response = await baseApi.post("/galeri", formData, {
      headers: { "require-auth": true, "Content-Type": "multipart/form-data" },
    });

    if (response.status !== 201) throw new Error("Failed to create galeri");
    return response.data.data;
  },

  // PUT /galeri/:id
  update: async (id, payload) => {
    console.log("payload", payload);
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      // khusus file
      if (value instanceof File) {
        formData.append(key, value);

        // object biasa (kategori dll)
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    const response = await baseApi.put(`/galeri/${id}`, formData, {
      headers: { "require-auth": true, "Content-Type": "multipart/form-data" },
    });

    if (response.status !== 200) throw new Error("Failed to update galeri");
    return response.data.data;
  },

  // DELETE /galeri/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/galeri/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete galeri");
    return response.data.data;
  },
};

export default galeriApi;
