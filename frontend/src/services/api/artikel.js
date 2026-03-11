import baseApi from "@/core/api/baseApi";

export const artikelApi = {
  // GET /artikel
  findAll: async () => {
    const response = await baseApi.get("/artikel", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch artikel");
    return response.data.data;
  },
  // GET /artikel/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/artikel/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch artikel");
    return response.data.data;
  },
  findSlug: async (slug) => {
    const response = await baseApi.get(`/article/${slug}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch artikel");
    return response.data.data;
  },

  // POST /artikel
  create: async (payload) => {
    console.log("payload", payload);
    const formData = new FormData();

    formData.append("judul", payload.judul);
    formData.append("slug", payload.slug);
    formData.append("konten", payload.konten);
    formData.append("status", payload.status);

    if (payload.gambar) {
      formData.append("gambar", payload.gambar);
      console.log("payload.gambarFile", payload.gambar);
    }

    const response = await baseApi.post("/artikel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "require-auth": true,
      },
    });

    return response.data.data;
  },

  // PUT /artikel/:id
  update: async (id, payload) => {
    const formData = new FormData();

    formData.append("judul", payload.judul);
    formData.append("slug", payload.slug);
    formData.append("konten", payload.konten);
    formData.append("status", payload.status);

    if (payload.gambar) {
      formData.append("gambar", payload.gambar);
    }

    const response = await baseApi.put(`/artikel/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "require-auth": true,
      },
    });

    if (response.status !== 200) throw new Error("Failed to update artikel");
    return response.data.data;
  },

  // DELETE /artikel/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/artikel/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete artikel");
    return response.data.data;
  },
  removes: async ({ ids }) => {
    console.log("ids", ids);
    const response = await baseApi.delete("/artikel/multiple-delete", {
      data: { ids },
      headers: {
        "require-auth": true,
      },
    });

    if (response.status !== 200) throw new Error("Failed to delete artikel");
    return response.data.data;
  },
};

export default artikelApi;
