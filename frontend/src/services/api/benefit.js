import baseApi from "@/core/api/baseApi";

export const benefitApi = {
  // POST /benefit
  create: async (payload) => {
    const response = await baseApi.post("/benefit", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create benefit");
    return response.data.data;
  },

  // DELETE /benefit/:id
  remove: async ({ id }) => {
    const response = await baseApi.delete(`/benefit/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete benefit");
    return response.data.data;
  },
};

export default benefitApi;
