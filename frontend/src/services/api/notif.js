import baseApi from "@/core/api/baseApi";

export const notifApi = {
  // GET /notif
  findAll: async () => {
    const response = await baseApi.get("/notif", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch notif");
    return response.data.data;
  },

  // GET /notif/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/notif/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch notif");
    return response.data.data;
  },

  // POST /notif
  create: async (payload) => {
    const response = await baseApi.post("/notif", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create notif");
    return response.data.data;
  },

  // PUT /notif/:id/read
  markAsRead: async (id) => {
    const response = await baseApi.put(
      `/notif/${id}/read`,
      {},
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to update notif");
    return response.data.data;
  },

  // DELETE /notif/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/notif/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete notif");
    return response.data.data;
  },
  removes: async ({ ids }) => {
    console.log("ids", ids);
    const response = await baseApi.delete("/notif/multiple-delete", {
      data: { ids },
      headers: {
        "require-auth": true,
      },
    });

    if (response.status !== 200) throw new Error("Failed to delete artikel");
    return response.data.data;
  },
};

export default notifApi;
