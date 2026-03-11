import baseApi from "@/core/api/baseApi";

export const booksDetailApi = {
  // GET /booksdetail (all)
  findAll: async () => {
    const response = await baseApi.get("/booksdetail", {
      headers: { "require-auth": true },
    });
    if (response.status !== 200)
      throw new Error("Failed to fetch book details");
    return response.data.data;
  },

  // GET /booksdetail/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/booksdetail/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to fetch book detail");
    return response.data.data;
  },

  // GET /booksdetail/deleted
  findAllDeleted: async () => {
    const response = await baseApi.get("/booksdetail/deleted");
    if (response.status !== 200)
      throw new Error("Failed to fetch deleted book details");
    return response.data.data;
  },

  // GET /booksdetail/exist
  findAllExist: async () => {
    const response = await baseApi.get("/booksdetail/exist", {
      headers: { "require-auth": true },
    });
    if (response.status !== 200)
      throw new Error("Failed to fetch existing book details");
    return response.data.data;
  },

  // POST /booksdetail
  create: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/booksdetail", formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201)
      throw new Error("Failed to create book detail");
    return response.data.data;
  },

  // PUT /booksdetail/:id
  update: async (id, payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/booksdetail/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status !== 200)
      throw new Error("Failed to update book detail");
    return response.data.data;
  },

  // DELETE /booksdetail/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/booksdetail/${id}`);
    if (response.status !== 200)
      throw new Error("Failed to delete book detail");
    return response.data.data;
  },
};

export default booksDetailApi;
