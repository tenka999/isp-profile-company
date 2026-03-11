/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
// import booksApi from '@/services/api/books'
// import { useQuery } from '@tanstack/react-query'

// export const bookKeys = {
//   all: ['books'],
//   lists: () => [...bookKeys.all, 'list'],
//   list: (filters) => [...bookKeys.lists(), { filters }],
//   details: () => [...bookKeys.all, 'detail'],
//   detail: (id) => [...bookKeys.details(), id]
// }

// export const useFindManyBooks = () => {
//   return useQuery({
//     queryKey: bookKeys.lists(),
//     queryFn: () => booksApi.findMany()
//   })
// }

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import booksApi  from "@/services/api/books";

export const useBookApi = (user) => {
  const queryClient = useQueryClient();

  // Queries
  const useAllBooks = () => useQuery({
    queryKey: ["books"],
    queryFn: booksApi.findAll,
  });

  // const bookById = (id) => {
  //   console.log("Fetching book with id:", id);
  //   return useQuery({
  //     queryKey: ["books", id],
  //     queryFn: () => booksApi.findOne(id),
  //     enabled: !!id,
  //   });
  // };

  const findById = (id) => useQuery({
      queryKey: ["books", id],
      queryFn: () => booksApi.findOne(id),
      enabled: !!id,
    });
  


  // const deletedBooks = useQuery({
  //   queryKey: ["books"],
  //   queryFn: booksApi.findAllDeleted,
  //   enabled: false,
  // });

  // const updatedBooks = useQuery({
  //   queryKey: ["books"],
  //   queryFn: booksApi.findAllUpdated,
  //   enabled: false,
  // });

  // const existBooks = useQuery({
  //   queryKey: ["books"],
  //   queryFn: booksApi.findAllExist,
  //   enabled: false
  // });

  // Mutations
  const createBook = useMutation({
    mutationFn: (payload) => booksApi.create(payload),
    onSuccess: () => {
      console.log("Book created successfully");
      queryClient.invalidateQueries({
        queryKey: ["books"]
      });
    },
  });

  const updateBook = useMutation({
    mutationFn: ({ id, payload }) => booksApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["books"]);
      queryClient.invalidateQueries(["book", id]);
    },
  });

  const deleteBook = useMutation({
    mutationFn: (id) => booksApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      queryClient.invalidateQueries(["books", "deleted"]);
    },
  });

  return {
    useAllBooks,
    findById,
    // deletedBooks,
    // updatedBooks,
    // existBooks,
    createBook,
    updateBook,
    deleteBook,
  };
};
