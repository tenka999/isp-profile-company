import baseApi from "@/core/api/baseApi";

export const faqApi = {
  // GET /faq
  findAll: async () => {
    const response = await baseApi.get("/faq", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch faq");
    return response.data.data;
  },

  // GET /faq/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/faq/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch faq");
    return response.data.data;
  },

  // POST /faq
  create: async (payload) => {
    const response = await baseApi.post("/faq", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create faq");
    return response.data.data;
  },

  // PUT /faq/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/faq/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update faq");
    return response.data.data;
  },
  updateOrder: async (id, payload) => {
    console.log(payload);
    const response = await baseApi.put(`/faq/${id}/order`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update faq");
    return response.data.data;
  },
  updateActive: async (id, payload) => {
    console.log(payload);
    const response = await baseApi.put(`/faq/${id}/active`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update faq");
    return response.data.data;
  },

  remove: async ({ id }) => {
    const response = await baseApi.delete(`/faq/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete artikel");
    return response.data.data;
  },

  // DELETE /faq/:id
  removes: async ({ ids }) => {
    console.log("ids", ids);
    const response = await baseApi.delete("/faq/multiple-delete", {
      data: { ids },
      headers: {
        "require-auth": true,
      },
    });

    if (response.status !== 200) throw new Error("Failed to delete artikel");
    return response.data.data;
  },
};

export default faqApi;
