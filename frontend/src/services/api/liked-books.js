import baseApi from "@/core/api/baseApi";

export const likedBooksApi = {
  // GET /liked-books (all)
  findAll: async () => {
    const response = await baseApi.get("/liked-books");
    if (response.status !== 200) throw new Error("Failed to fetch liked books");
    return response.data.data;
  },

  // GET /liked-books/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/liked-books/${id}`);
    if (response.status !== 200) throw new Error("Failed to fetch liked book");
    return response.data.data;
  },

  // GET /liked-books/user/:id
  findTotalByUser: async (userId) => {
    const response = await baseApi.get(`/liked-books/user/${userId}`);
    if (response.status !== 200)
      throw new Error("Failed to fetch user liked books total");
    return response.data.data;
  },

  // GET /liked-books/book/:id
  findTotalByBook: async (bookId) => {
    const response = await baseApi.get(`/liked-books/book/${bookId}`);
    if (response.status !== 200)
      throw new Error("Failed to fetch book liked total");
    return response.data.data;
  },

  // POST /liked-books/toggle
  toggle: async (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/liked-books/toggle", formData, {
      headers: { "require-auth": true },
    });

    if (![200, 201].includes(response.status))
      throw new Error("Failed to toggle like");
    return response.data.data;
  },
};

export default likedBooksApi;
