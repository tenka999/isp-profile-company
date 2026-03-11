import { useSecureLS } from "@/hooks/useSecureLS";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Title } from "chart.js";
import { useBookDetailApi } from "@/presentation/logics/app/detail-book";
import { useParams } from "react-router";

const DataDetailBooks = () => {
  const {id} = useParams();
  const columns = [
    { field: "id", header: "ID" },
    { field: "originaltitle", header: "Original Title" },
    { field: "rating", header: "Rating" },
    { field: "review_count", header: "Review Count" },
    { field: "pages", header: "Pages" },
    { field: "language", header: "Language" },
    { field: "bookId", header: "Book Id" },
    { field: "description", header: "Description" },
    { field: "createdAt", header: "Created At" },
    { field: "updatedAt", header: "Updated At" },
    { field: "deletedAt", header: "Deleted At" },
    { field: "createdById", header: "Created By" },
    { field: "updatedById", header: "Updated By" },
    { field: "deletedById", header: "Deleted By" },

   
  ];
  const [visible, setVisible] = useState(false);
  const { getItem } = useSecureLS();
  const user = getItem("user");
  // console.log("user", user.id);

  const { findById } = useBookDetailApi(user);
  // console.log("existBooks", existBooks.data);
  // const books = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: () => .findMany(),
  //   enabled: !!user.id,
  // });

  // console.log("allBooks", allBooks);

  const { data, isPending, isError, error } = findById(id);

  // console.log("books", data, isPending, isError, error);


  // const { data: dataId } = useBookById(5);
  const handleClick = async () => {

    console.log("Fetching book with id:", data);
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="card">
      <Button
        label="Add Detail Book"
        icon="pi pi-plus"
        onClick={() => setVisible(true)}
      />
      <Button
        label="click"
        icon="pi pi-plus"
        onClick={handleClick}
      />

      <AddBook visible={visible} setVisible={setVisible} />
      <DataTable
        value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        scrollable
        scrollHeight="70dvh"
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column header="No" body={(rowData, { rowIndex }) => rowIndex + 1} />
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={col.body}
            sortable
          ></Column>
        ))}
        <Column
          header="Action"
          body={() => (
            <div className="flex ">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success mr-2"
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                className="p-button-rounded p-button-warning"
              />
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

function AddBook({ visible, setVisible }) {
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const { createBookDetail } = useBookDetailApi(user);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(0);
  const [ISBN, setISBN] = useState(0);
  const [cover, setCover] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [genreId, setGenreId] = useState(1);
  const [pdf, setPdf] = useState("");
  const [stock, setStock] = useState(0);
  

   
  async function handleCreateBook(e) {
    e.preventDefault();
    try {
      createBookDetail.mutate({
        title,
        author,
        year,
        ISBN,
        cover,
        categoryId,
        genreId,
        pdf,
        stock,
        createdById: user.id
      })   
      } catch (err) {
        console.log("Gagal menambahkan buku. :", err.message);
      }
      setVisible(false);
  }

  return (
    <Dialog
      visible={visible}
      modal
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
      content={({ hide }) => (
        <div
          className="flex flex-column px-8 py-5 gap-4 overflow-auto"
          style={{
            borderRadius: "12px",
            backgroundImage:
              "radial-gradient(circle at left top, var(--indigo-900), var(--gray-600))",
          }}
        >
          <form onSubmit={ (e) => handleCreateBook(e)} >
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="title" className="text-primary-50 font-semibold">
              Title
            </label>
            <InputText
              id="title"
              label="title"
              name="title"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="author" className="text-primary-50 font-semibold">
              Author
            </label>
            <InputText
              id="author"
              label="author"
              name="author"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="year" className="text-primary-50 font-semibold">
              Year
            </label>
            <InputText
              id="year"
              label="year"
              name="year"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="isbn" className="text-primary-50 font-semibold">
              ISBN
            </label>
            <InputText
              id="isbn"
              label="ISBN"
              name="ISBN"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="number"
              value={ISBN}
              onChange={(e) => setISBN(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="cover" className="text-primary-50 font-semibold">
              Cover
            </label>
            <InputText
              id="cover"
              label="cover"
              name="cover"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="file"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="category" className="text-primary-50 font-semibold">
              Category
            </label>
            <InputText
              id="category"
              label="category"
              name="categoryId"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="genre" className="text-primary-50 font-semibold">
              Genre
            </label>
            <InputText
              id="genre"
              label="genre"
              name="genreId"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="number"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="pdfurl" className="text-primary-50 font-semibold">
              PDF
            </label>
            <InputText
              id="pdfurl"
              label="pdfurl"
              name="pdf"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="file"
              value={pdf}
              onChange={(e) => setPdf(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="stock" className="text-primary-50 font-semibold">
              Stock
            </label>
            <InputText
              id="stock"
              label="stock"
              name="stock"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            ></InputText>
          </div>
          <div className="flex align-items-center gap-2">
            <Button
              label="Submit"
              text
              className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
            <Button
              label="Cancel"
              onClick={(e) => hide(e)}
              text
              className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
          </div>
          </form>
        </div>
      )}
    ></Dialog>
  );
}

export default DataDetailBooks;
