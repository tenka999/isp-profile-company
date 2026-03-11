import { useSecureLS } from "@/hooks/useSecureLS";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState,useRef } from "react";
import { Toast } from "primereact/toast";
// import { useBookApi as useUserApi } from "@/presentation/logics/app/books";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Title } from "chart.js";
import { useUserApi } from "@/presentation/logics/app/user";
import { ConfirmDialog,confirmDialog } from "primereact/confirmdialog";

const DataUsers = () => {
  const columns = [
    { field: "id", header: "ID" },
    { field: "uuid", header: "UUID" },
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "password", header: "Password" },
    { field: "role", header: "Role" },
    { field: "createdAt", header: "CreatedAt" },
    { field: "updatedAt", header: "UpdatedAt" },
    { field: "deletedAt", header: "DeletedAt" },
    { field: "createdById", header: "Created By" },
    { field: "updatedById", header: "Updated By" },
    { field: "deletedById", header: "Deleted By" }, 

   
  ];
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [visible, setVisible] = useState(false);
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const toast = useRef(null);
  // console.log("user", user.id);
  console.log("user", user);

  const { useAllUsers,deleteUser } = useUserApi(user);
  //* Required
  

  const { data, isPending, isError,error } = useAllUsers();
  console.log("books", data, isPending, isError, error);

  const handleClick = async () => {

  };

     const accept = (id) => {
       toast.current.show({
         severity: "info",
         summary: "Confirmed",
         detail: "You have accepted",
         life: 3000,
       });
       deleteUser.mutate({ id });
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

  function handleEditUser(rowData) {
    setName(rowData.name);
    setEmail(rowData.email);
    setPassword(rowData.password);
    setRole(rowData.role);
    setId(rowData.id);
    console.log("Editing user:", rowData);
    setVisible(true);
  }
  

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog/>
      <Button
        label="Add User"
        icon="pi pi-plus"
        onClick={() => setVisible(true)}
      />
      <Button
        label="click"
        icon="pi pi-plus"
        onClick={handleClick}
      />

      <AddBook visible={visible} setVisible={setVisible} name={name} email={email} password={password} role={role} setName={setName} setEmail={setEmail} setPassword={setPassword} setRole={setRole} id={id} />
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
          body={(body) => (
            <div className="flex ">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => {
                  handleEditUser(body);
                }}
              />
              <Button
                label="Delete"
                onClick={() => confirm2(body.id)}
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

function AddBook({ visible, setVisible,name, email, password, role ,setName,setEmail,setPassword,setRole,id}) {
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const { createUser,updateUser } = useUserApi(user);
  
  

   
  async function handleCreateBook(e) {
    e.preventDefault();
    // console.log("Submitting book:", name, email, password, role);
    try {
      console.log("Submitting book:", name, email, password, role);
      if(id){
        updateUser.mutate({
          id : id,
          payload : {
          name,
          email,
          password,
          role,
          updatedById: parseInt(user.id)
        } })   
      } else{
      createUser.mutate({
        name,
        email,
        password,
        role,
        createdById: parseInt(user.id)
      })}
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
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="email" className="text-primary-50 font-semibold">
              Email
            </label>
            <InputText
              id="email"
              label="email"
              name="email"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="password" className="text-primary-50 font-semibold">
              Password
            </label>
            <InputText
              id="password"
              label="password"
              name="password"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="role" className="text-primary-50 font-semibold">
              Role
            </label>
            <InputText
              id="role"
              label="role"
              name="role"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            ></InputText>
          </div>
          <div className="flex align-items-center gap-2">
            <Button
              label="Submit"
              text
              onClick={handleCreateBook}
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

export default DataUsers;
