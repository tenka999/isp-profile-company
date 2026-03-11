import baseApi from "@/core/api/baseApi";

export const layananApi = {
  // GET /layanan
  findAll: async () => {
    const response = await baseApi.get("/layanan", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch layanan");
    return response.data.data;
  },

  // GET /layanan/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/layanan/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch layanan");
    return response.data.data;
  },

  // POST /layanan
  create: async (payload) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === "object") {
        formData.append(key, JSON.stringify(payload[key]));
      } else {
        formData.append(key, payload[key]);
      }
    });

    const response = await baseApi.post("/layanan", formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create layanan");
    return response.data;
  },

  // PUT /layanan/:id
  update: async (id, payload) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === "object") {
        formData.append(key, JSON.stringify(payload[key]));
      } else {
        formData.append(key, payload[key]);
      }
    });

    const response = await baseApi.put(`/layanan/${id}`, formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update layanan");
    return response.data;
  },

  // DELETE /layanan/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/layanan/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete layanan");
    return response.data.data;
  },
};

export default layananApi;
