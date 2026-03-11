import baseApi from "@/core/api/baseApi";

export const categoriesApi = {
  // GET /categories
  findAll: async () => {
    const response = await baseApi.get("/categories");
    if (response.status !== 200) throw new Error("Failed to fetch categories");
    return response.data.data;
  },

  // GET /categories/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/categories/${id}`);
    if (response.status !== 200) throw new Error("Failed to fetch category");
    return response.data.data;
  },

  // POST /categories
  create: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/categories", formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create category");
    return response.data.data;
  },

  // PUT /categories/:id
  update: async (id, payload) => {

    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/categories/${id}`, formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update category");
    return response.data.data;
  },

  // DELETE /categories/:id
  remove: async ({id}) => {
    const response = await baseApi.delete(`/categories/${id}`,{
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to delete category");
    return response.data.data;
  },
};

export default categoriesApi;
