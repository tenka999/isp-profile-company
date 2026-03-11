// /* eslint-disable no-unused-vars */
// import baseApi from '@/core/api/baseApi'

// const bookApi = {
//   findMany: async (_params = {}) => {
//     try {
//       const response = await baseApi.get('/books', {
//         headers: {
//           'require-auth': true
//         }
//       })
//       console.log(response.data, 'response.data')
//       if (response.status !== 200) {
//         throw new Error('Failed to fetch books')
//       }
//       const { data } = response.data
//       console.log('data',data)
//       return data
//     } catch (error) {
//       console.error(error)
//       throw error
//     }
//   }
// }

// export default bookApi

import baseApi from "@/core/api/baseApi";
export const booksApi = {
  // GET /books (all)
  findAll: async () => {
    const response = await baseApi.get("/books", {
      headers: {
        "require-auth": true
      }
    });
    if (response.status !== 200) throw new Error("Failed to fetch books");
    return response.data.data;
  },

  // GET /books/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/books/${id}`);
    if (response.status !== 200) throw new Error("Failed to fetch book");
    return response.data.data;
  },

  // GET /books/deleted
  findAllDeleted: async () => {
    const response = await baseApi.get("/books/deleted");
    if (response.status !== 200)
      throw new Error("Failed to fetch deleted books");
    return response.data.data;
  },

  // GET /books/updated
  findAllUpdated: async () => {
    const response = await baseApi.get("/books/updated");
    if (response.status !== 200)
      throw new Error("Failed to fetch updated books");
    return response.data.data;
  },

  // GET /books/exist
  findAllExist: async () => {
    console.log("findAllExist");
    const response = await baseApi.get("/books/exist");
    if (response.status !== 200)
      throw new Error("Failed to fetch existing books");
    return response.data.data;
  },

  // POST /books (with cover + pdf upload)
  create: async (payload) => {
    console.log("payload", payload);
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.post("/books", formData, {
      headers: { "require-auth": true , 
        // 'Content-Type': 'multipart/form-data'
      },
      method: "POST",
      body: formData,
    });

    if (response.status !== 201) throw new Error("Failed to create book");
    return response.data.data;
  },

  // PUT /books/:id (update book with optional cover/pdf)
  update: async (id, payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const response = await baseApi.put(`/books/${id}`, formData, {
      headers: {  "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update book");
    return response.data.data;
  },

  // DELETE /books/:id
  remove: async ({id}) => {
    console.log('id',id)
    const response = await baseApi.delete(`/books/${id}`, {
      headers: { "require-auth": true },
    });
    if (response.status !== 200) throw new Error("Failed to delete book");
    return response.data.data;
  },
};

export default booksApi;