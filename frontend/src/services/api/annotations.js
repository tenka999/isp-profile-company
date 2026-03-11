import baseApi from "@/core/api/baseApi";

export const annotationsApi = {
  // GET /annotations
  findAll: async () => {
    const response = await baseApi.get("/annotations");
    if (response.status !== 200) throw new Error("Failed to fetch annotations");
    return response.data.data;
  },

  // GET /annotations/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/annotations/${id}`);
    if (response.status !== 200) throw new Error("Failed to fetch annotation");
    return response.data.data;
  },

  // GET /annotations/book/:bookId
  findByBookId: async (bookId) => {
    const response = await baseApi.get(`/annotations/book/${bookId}`);
    if (response.status !== 200)
      throw new Error("Failed to fetch annotations by book");
    return response.data.data;
  },

  // POST /annotations
  create: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/annotations", formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create annotation");
    return response.data.data;
  },

  // PUT /annotations/:id
  update: async (id, payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/annotations/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status !== 200) throw new Error("Failed to update annotation");
    return response.data.data;
  },

  // DELETE /annotations/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/annotations/${id}`);
    if (response.status !== 200) throw new Error("Failed to delete annotation");
    return response.data.data;
  },
};

export default annotationsApi;
