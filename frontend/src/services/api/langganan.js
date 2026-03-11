import baseApi from "@/core/api/baseApi";

export const langgananApi = {
  // GET /langganan
  findAll: async () => {
    const response = await baseApi.get("/langganan", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch langganan");
    return response.data.data;
  },

  // GET /langganan/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/langganan/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch langganan");
    return response.data.data;
  },

  // POST /langganan
  create: async (payload) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/langganan", formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create langganan");
    return response.data.data;
  },

  // PUT /langganan/:id
  update: async (id, payload) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/langganan/${id}`, formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update langganan");
    return response.data.data;
  },

  // DELETE /langganan/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/langganan/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete langganan");
    return response.data.data;
  },

  removes: async ({ ids }) => {
    console.log("ids", ids);
    const response = await baseApi.delete("/langganan /multiple-delete", {
      data: { ids },
      headers: {
        "require-auth": true,
      },
    });

    if (response.status !== 200) throw new Error("Failed to delete artikel");
    return response.data.data;
  },
};

export default langgananApi;
