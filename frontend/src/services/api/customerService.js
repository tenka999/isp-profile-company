import baseApi from "@/core/api/baseApi";

export const customerServiceApi = {
  // ================= TICKET =================

  findAllTickets: async () => {
    const res = await baseApi.get("/cs-ticket", {
      headers: { "require-auth": true },
    });

    if (res.status !== 200) throw new Error("Fetch ticket failed");
    return res.data.data;
  },

  findTicketById: async (id) => {
    const res = await baseApi.get(`/cs-ticket/${id}`, {
      headers: { "require-auth": true },
    });

    if (res.status !== 200) throw new Error("Fetch ticket failed");
    return res.data.data;
  },

  createTicket: async (payload) => {
    const res = await baseApi.post("/cs-ticket", payload, {
      headers: { "require-auth": true },
    });

    if (res.status !== 201) throw new Error("Create ticket failed");
    return res.data;
  },

  update: async (id, payload) => {
    console.log(payload, id);
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/cs-ticket/${id}`, formData, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update ticket");
    return response.data;
  },
  updateTicketStatus: async ({ id, status }) => {
    const res = await baseApi.put(
      `/cs-ticket/${id}/status`,
      { status },
      { headers: { "require-auth": true } },
    );

    if (res.status !== 200) throw new Error("Update status failed");
    return res.data;
  },

  // ================= MESSAGE =================

  getMessages: async (ticketId) => {
    const res = await baseApi.get(`/cs-ticket/${ticketId}/messages`, {
      headers: { "require-auth": true },
    });

    if (res.status !== 200) throw new Error("Fetch messages failed");
    return res.data.data;
  },
  getAllMessages: async () => {
    const res = await baseApi.get(`/cs-message`, {
      headers: { "require-auth": true },
    });

    if (res.status !== 200) throw new Error("Fetch messages failed");
    return res.data.data;
  },

  sendMessage: async (payload) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === "object") {
        formData.append(key, JSON.stringify(payload[key]));
      } else {
        formData.append(key, payload[key]);
      }
    });

    const res = await baseApi.post(`/cs-message/`, formData, {
      headers: { "require-auth": true },
    });

    if (res.status !== 201) throw new Error("Send message failed");
    return res.data;
  },
};

export default customerServiceApi;
