import { useSecureLS } from "@/hooks/useSecureLS";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { use, useState,useRef } from "react";
import { Toast } from "primereact/toast";
import { useCategoryApi } from "@/presentation/logics/app/categories";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Title } from "chart.js";
import { ConfirmDialog,confirmDialog } from "primereact/confirmdialog";

const DataCategory = () => {
  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
  ];
  const [visible, setVisible] = useState(false);
  // const { getItem } = useSecureLS();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  // const user = getItem("user");
  // console.log("user", user.id);

  const { useAllCategories,deleteCategory } = useCategoryApi();
  // console.log("existBooks", existBooks.data);
  // const books = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: () => .findMany(),
  //   enabled: !!user.id,
  // });

  // console.log("allBooks", allBooks);

  const { data, isPending, isError, error } = useAllCategories();

  const toast = useRef(null);
     const accept = (id) => {
       toast.current.show({
         severity: "info",
         summary: "Confirmed",
         detail: "You have accepted",
         life: 3000,
       });
       deleteCategory.mutate({ id });
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


  function handleEdit(rowData) {
    setId(rowData.id);
    setName(rowData.name);
    setVisible(true);
  }

 const handleClick = async () => {
   setVisible(true);
   setName("");
   setId(null);
 };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />

      <Button
        label="Add Category"
        icon="pi pi-plus"
        onClick={handleClick}
      />

      <AddBook
        visible={visible}
        setVisible={setVisible}
        name={name}
        setName={setName}
        id={id}
      />
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
          body={(rowData) => (
            <div className="flex ">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                onClick={() => handleEdit(rowData)}
                className="p-button-rounded p-button-success mr-2"
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                onClick={() => confirm2(rowData.id)}
                className="p-button-rounded p-button-warning"
              />
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

function AddBook({ visible, setVisible,name,setName,id }) {
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const { createCategory,updateCategory } = useCategoryApi(user);
  

   
  async function handleCreateBook(e) {
    console.log("Creating book:",  name, id );
    e.preventDefault();
    try {
      if(id){
        updateCategory.mutate({
          id,
          payload :{
            name,
          }
        })
      }else{
      createCategory.mutate({
        name,
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
          <form onSubmit={ (e) => handleCreateBook(e)} >
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="name" className="text-primary-50 font-semibold">
              Name
            </label>
            <InputText
              id="name"
              label="name"
              name="name"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default DataCategory;
