import baseApi from "@/core/api/baseApi";
import { data } from "react-router";

export const contactApi = {
  // GET /contact
  findAll: async () => {
    const response = await baseApi.get("/contact", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch contact");
    return response.data.data;
  },

  // GET /contact/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/contact/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch contact");
    return response.data.data;
  },

  // POST /contact (public biasanya — auth optional)
  create: async (payload) => {
    console.log("payload", payload);
    const response = await baseApi.post("/contact", payload);

    if (response.status !== 201) throw new Error("Failed to create contact");
    return response.data.data;
  },

  // DELETE /contact/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/contact/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete contact");
    return response.data.data;
  },
  removes: async ({ ids }) => {
    const response = await baseApi.delete(`/contact/multiple-delete`, {
      data: { ids },
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete contact");
    return response.data.data;
  },

  updateStatus: async (id, status) => {
    console.log("id", id, status);
    const response = await baseApi.patch(
      `/contact/${id}/status`,
      {
        status,
      },
      {
        headers: { "require-auth": true },
      },
    );
    if (response.status !== 200) throw new Error("Failed to update contact");
    return response.data.data;
  },
};

export default contactApi;
