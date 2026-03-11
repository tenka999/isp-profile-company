import baseApi from "@/core/api/baseApi";

export const borrowingsApi = {
  // GET /borrowings
  findAll: async () => {
    console.log("Fetching all borrowings");
    const response = await baseApi.get("/borrowings", {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to fetch borrowings");
    return response.data.data;
  },

  // GET /borrowings/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/borrowings/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to fetch borrowing");
    return response.data.data;
  },

  // GET /borrowings/status/:status
  findByStatus: async (status) => {
    const response = await baseApi.get(`/borrowings/status/${status}`);
    if (response.status !== 200)
      throw new Error("Failed to fetch borrowings by status");
    return response.data.data;
  },

  // GET /borrowings/deleted
  findAllDeleted: async () => {
    const response = await baseApi.get("/borrowings/deleted");
    if (response.status !== 200)
      throw new Error("Failed to fetch deleted borrowings");
    return response.data.data;
  },

  // GET /borrowings/exist
  findAllExist: async () => {
    const response = await baseApi.get("/borrowings/exist");
    if (response.status !== 200)
      throw new Error("Failed to fetch existing borrowings");
    return response.data.data;
  },

  // POST /borrowings
  create: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/borrowings", formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create borrowing");
    return response.data.data;
  },

  // PUT /borrowings/:id
  update: async (id, payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/borrowings/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status !== 200) throw new Error("Failed to update borrowing");
    return response.data.data;
  },

  // DELETE /borrowings/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/borrowings/${id}`);
    if (response.status !== 200) throw new Error("Failed to delete borrowing");
    return response.data.data;
  },
};

export default borrowingsApi;
