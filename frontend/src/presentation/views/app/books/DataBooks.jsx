import { useSecureLS } from "@/hooks/useSecureLS";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState,useRef } from "react";
import { Toast } from "primereact/toast";
import { useBookApi } from "@/presentation/logics/app/books";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Title } from "chart.js";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmDialog,confirmDialog } from "primereact/confirmdialog";
import { serializeQuery } from "prisma-query-tools";
import { useNavigate } from "react-router";
const DataBooks = () => {
  const parseQuery = serializeQuery({page:1,limit:1});
  console.log('parseQuery',parseQuery);
  const columns = [
    { field: "id", header: "ID" },
    { field: "uuid", header: "UUID" },
    { field: "title", header: "Title" },
    { field: "author", header: "Author" },
    { field: "year", header: "Year" },
    { field: "ISBN", header: "ISBN" },
    { field: "stock", header: "Stock" },
    { field: "genreId", header: "Genre Id" },
    { field: "categoryId", header: "Category Id" },
    { field: "createdAt", header: "Created At" },
    { field: "updatedAt", header: "Updated At" },
    { field: "deletedAt", header: "Deleted At" },
    { field: "createdById", header: "Created By" },
    { field: "updatedById", header: "Updated By" },
    { field: "deletedById", header: "Deleted By" },

   
  ];
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(0);
  const [ISBN, setISBN] = useState(0);
  const [cover, setCover] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [genreId, setGenreId] = useState(1);
  const [pdf, setPdf] = useState("");
  const [id, setId] = useState("");
  const [stock, setStock] = useState(0);
  const [visible, setVisible] = useState(false);
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const isAdmin = user.role === 'admin';
   const toast = useRef(null);

  const { useAllBooks, deleteBook } = useBookApi(user);
  const navigate = useNavigate();
   const accept = (id) => {
     toast.current.show({
       severity: "info",
       summary: "Confirmed",
       detail: "You have accepted",
       life: 3000,
     });
     deleteBook.mutate({ id });
   };

   const reject = () => {
     toast.current.show({
       severity: "warn",
       summary: "Rejected",
       detail: "You have rejected",
       life: 3000,
     });
   };

     const confirm2 = (id) => {
       confirmDialog({
         message: "Do you want to delete this record?",
         header: "Delete Confirmation",
         icon: "pi pi-info-circle",
         defaultFocus: "reject",
         acceptClassName: "p-button-danger",
         accept: () => accept(id),
         reject,
       });
     };
  // console.log("user", user.id);

  // console.log("existBooks", existBooks.data);
  // const books = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: () => .findMany(),
  //   enabled: !!user.id,
  // });

  // console.log("useAllBooks", useAllBooks);

  const { data, isPending, isError, error, refetch } = useAllBooks();

  // console.log("books", data, isPending, isError, error);


  const handleClick = async () => {

  };

  function handleEdit(rowData) {
    console.log("rowData", rowData);
    setTitle(rowData.title);
    setAuthor(rowData.author);
    setYear(rowData.year);
    setISBN(rowData.ISBN);
    setCover(rowData.cover);
    setCategoryId(rowData.categoryId);
    setGenreId(rowData.genreId);
    setPdf(rowData.pdf);
    setStock(rowData.stock);
    setVisible(true);
    setId(rowData.id);
  }

  function handleDetail(rowData) {
    console.log("Viewing details for book:", rowData.id);
    navigate(`/app/detailbook/${rowData.id}`);

    
    // Implement the logic to view book details
  }



  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <Button
        label="Add Book"
        icon="pi pi-plus"
        onClick={() => setVisible(true)}
      />
      <Button label="click" icon="pi pi-plus" onClick={handleClick} />

      <AddBook
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        title={title}
        author={author}
        year={year}
        ISBN={ISBN}
        cover={cover}
        categoryId={categoryId}
        genreId={genreId}
        pdf={pdf}
        stock={stock}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setYear={setYear}
        setISBN={setISBN}
        setCover={setCover}
        setCategoryId={setCategoryId}
        setGenreId={setGenreId}
        setPdf={setPdf}
        setStock={setStock}
        id={id}
      />
      <DataTable
        value={data}
        paginator
        rows={50}
        rowsPerPageOptions={[10, 25, 50]}
        scrollable
        scrollHeight="70dvh"
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        loading={useAllBooks.isLoading || useAllBooks.isFetching || isPending}
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
          body={(rowData) => (
            <div className="flex ">
              {!rowData.deletedAt && (
                <>
                  <Button
                    label="Edit"
                    onClick={() => handleEdit(rowData)}
                    icon="pi pi-pencil"
                    size="small"
                    className="p-button-rounded p-button-success mr-2"
                  />

                  <Button
                    label="Delete"
                    onClick={() => confirm2(rowData.id)}
                    icon="pi pi-trash"
                    size="small"
                    rounded
                    severity="danger"
                    className="p-button-rounded p-button-success mr-2"
                  />
                  <Button
                    label="Detail"
                    onClick={() => handleDetail(rowData)}
                    icon="pi pi-info-circle"
                    size="small"
                    className="p-button-rounded p-button-success mr-2"
                  />
                </>
              )}
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

function AddBook({ visible, setVisible, refetch, title, author, year, ISBN, cover, categoryId, genreId, pdf, stock,setTitle,setAuthor,setYear,setISBN,setCover,setCategoryId,setGenreId,setPdf,setStock,id }) {
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const { createBook } = useBookApi();
  const { updateBook } = useBookApi();

   
  async function handleCreateBook(e) {
    e.preventDefault();
    const safePdf = pdf === undefined ? "" : pdf;
    console.log(id,'id',user.id,title,author,year,ISBN,cover,categoryId,genreId,safePdf,stock, );
    try {
        if (id) {
        await updateBook.mutateAsync({
          id : id,
          payload :{ 
          title,
          author,
          year,
          ISBN,
          cover,
          categoryId,
          genreId,
          pdf : safePdf,
          stock,
          updatedById: user.id}
        });
      } else {
        await createBook.mutateAsync({
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
      });}
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
          {/* <form onSubmit={ (e) => handleCreateBook(e)} > */}
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
            {/* <InputText
              id="category"
              label="category"
              name="categoryId"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            ></InputText> */}
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="genre" className="text-primary-50 font-semibold">
              Genre
            </label>
            {/* <InputText
              id="genre"
              label="genre"
              name="genreId"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="number"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
            ></InputText> */}
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
              onClick={(e) => handleCreateBook(e)}
              className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
            <Button
              label="Cancel"
              onClick={(e) => hide(e)}
              text
              className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
          </div>
          {/* </form> */}
        </div>
      )}
    ></Dialog>
  );
}

export default DataBooks;
