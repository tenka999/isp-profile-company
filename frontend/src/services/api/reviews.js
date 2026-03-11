import baseApi from "@/core/api/baseApi";

export const reviewsApi = {
  // GET /reviews
  findAll: async () => {
    const response = await baseApi.get("/reviews",
      {
        headers: { "require-auth": true },
      }
    );
    if (response.status !== 200) throw new Error("Failed to fetch reviews");
    return response.data.data;
  },

  // GET /reviews/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/reviews/${id}`);
    if (response.status !== 200) throw new Error("Failed to fetch review");
    return response.data.data;
  },

  // GET /reviews/book/:bookId
  findAllByBookId: async (bookId) => {
    const response = await baseApi.get(`/reviews/book/${bookId}`);
    if (response.status !== 200)
      throw new Error("Failed to fetch reviews by bookId");
    return response.data.data;
  },

  // GET /reviews/user/:userId
  findAllByUserId: async (userId) => {
    const response = await baseApi.get(`/reviews/user/${userId}`);
    if (response.status !== 200)
      throw new Error("Failed to fetch reviews by userId");
    return response.data.data;
  },

  // GET /reviews/parent/:parentId
  findAllByParentId: async (parentId) => {
    const response = await baseApi.get(`/reviews/parent/${parentId}`);
    if (response.status !== 200)
      throw new Error("Failed to fetch reviews by parentId");
    return response.data.data;
  },

  // GET /reviews/exist
  findAllExist: async () => {
    const response = await baseApi.get("/reviews/exist",{
      headers: { "require-auth": true },
    });
    if (response.status !== 200)
      throw new Error("Failed to fetch existing reviews");
    return response.data.data;
  },

  // GET /reviews/deleted
  findAllDeleted: async () => {
    const response = await baseApi.get("/reviews/deleted",{
      headers: { "require-auth": true },
    });
    if (response.status !== 200)
      throw new Error("Failed to fetch deleted reviews");
    return response.data.data;
  },

  // POST /reviews (upsert: create/update)
  upsert: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/reviews", formData, {
      headers: { "require-auth": true },
    });

    if (![200, 201].includes(response.status))
      throw new Error("Failed to upsert review");
    return response.data.data;
  },

  // DELETE /reviews/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/reviews/${id}`);
    if (response.status !== 200) throw new Error("Failed to delete review");
    return response.data.data;
  },
};

export default reviewsApi;
