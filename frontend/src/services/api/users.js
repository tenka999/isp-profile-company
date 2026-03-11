import baseApi from "@/core/api/baseApi";

export const usersApi = {
  // GET /users
  findAll: async () => {
    console.log("Fetching all users");
    const response = await baseApi.get("/users", {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to fetch users");
    return response.data.data;
  },

  // GET /users/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/users/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to fetch user");
    return response.data.data;
  },

  // GET /users/email/:email
  findByEmail: async (email) => {
    const response = await baseApi.get(`/users/email/${email}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200)
      throw new Error("Failed to fetch user by email");
    return response.data.data;
  },

  // POST /users
  create: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/users", formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create user");
    return response.data;
  },

  // PUT /users/:id
  update: async (id, payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/users/${id}`, formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update user");
    return response.data;
  },

  // DELETE /users/:id
  remove: async ({ id }) => {
    console.log("id", id);
    const response = await baseApi.delete(`/users/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to delete user");
    return response.data;
  },
  removeSelected: async ({ ids }) => {
    console.log("ids", ids);
    const response = await baseApi.post(
      `/users/multiple-delete`,
      {
        ids: ids,
      },
      {
        headers: { "require-auth": true },
      },
    );
    // if (response.status !== 201) throw new Error("Failed to delete user");
    return response.data;
  },

  restoreSelected: async ({ ids }) => {
    console.log("ids", ids);
    const response = await baseApi.post(
      `/users/multiple-restore`,
      {
        ids: ids,
      },
      {
        headers: { "require-auth": true },
      },
    );
    // if (response.status !== 201) throw new Error("Failed to delete user");
    return response.data;
  },
};

export default usersApi;
