import baseApi from "@/core/api/baseApi";

export const likedReviewsApi = {
  // GET /liked-reviews (all)
  findAll: async () => {
    const response = await baseApi.get("/liked-reviews");
    if (response.status !== 200) throw new Error("Failed to fetch liked reviews");
    return response.data.data;
  },

  // GET /liked-reviews/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/liked-reviews/${id}`);
    if (response.status !== 200) throw new Error("Failed to fetch liked review");
    return response.data.data;
  },

  // GET /liked-reviews/user/:id
  findTotalByUser: async (userId) => {
    const response = await baseApi.get(`/liked-reviews/user/${userId}`);
    if (response.status !== 200) throw new Error("Failed to fetch user liked reviews total");
    return response.data.data;
  },

  // GET /liked-reviews/book/:id
  findTotalByBook: async (bookId) => {
    const response = await baseApi.get(`/liked-reviews/book/${bookId}`);
    if (response.status !== 200) throw new Error("Failed to fetch book liked reviews total");
    return response.data.data;
  },

  // POST /liked-reviews/toggle
  toggle: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/liked-reviews/toggle", formData, {
      headers: { "require-auth": true },
    });

    if (![200, 201].includes(response.status)) throw new Error("Failed to toggle like review");
    return response.data.data;
  },
};

export default likedReviewsApi;
