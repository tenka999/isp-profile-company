import { useSecureLS } from "@/hooks/useSecureLS";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import { Toast } from "primereact/toast";
import { useBookApi } from "@/presentation/logics/app/books";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useProfileApi } from "@/presentation/logics/app/profile";

const DataProfile = () => {
  const columns = [
    { field: "id", header: "ID" },
    { field: "nim", header: "NIM" },
    { field: "nidn", header: "NIDN" },
    { field: "faculty", header: "Faculty" },
    { field: "major", header: "Major" },
    { field: "yearEntry", header: "Year Entry" },
    { field: "bio", header: "Bio" },
    { field: "createdAt", header: "Created At" },
    { field: "updatedAt", header: "Updated At" },
    { field: "deletedAt", header: "Deleted At" },
    { field: "createdById", header: "Created By" },
    { field: "updatedById", header: "Updated By" },
    { field: "deletedById", header: "Deleted By" },
  ];
    const [nim, setNim] = useState("");
    const [nidn, setNidn] = useState("");
    const [faculty, setFaculty] = useState("");
    const [major, setMajor] = useState(0);
    const [yearEntry, setYearEntry] = useState(0);
    const [bio, setBio] = useState("");
    const [id, setId] = useState(null);  
  const [visible, setVisible] = useState(false);
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const [selectedUser, setSelectedUser] = useState(null);
  const { allProfiles, profile } = useProfileApi(user);



  const fetchProfileDetail = profile(selectedUser);
  const { data, isPending, isError, error } = allProfiles;

  // console.log("books", data, isPending, isError, error);


  // const { data: dataId } = findById(5);
  const handleClick = async () => {

    console.log("Fetching book with id:", 1);
    fetchProfileDetail.refetch()

  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="card">
      <Button
        label="Add Profile"
        icon="pi pi-plus"
        onClick={() => setVisible(true)}
      />
      <Button
        label="click"
        icon="pi pi-plus"
        onClick={handleClick}
      />

      <AddBook visible={visible} setVisible={setVisible} nim={nim} nidn={nidn} faculty={faculty} major={major} yearEntry={yearEntry} bio={bio} id={id} setNim={setNim} setNidn={setNidn} setFaculty={setFaculty} setMajor={setMajor} setYearEntry={setYearEntry} setBio={setBio} setId={setId} />
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
          body={(data) => (
            <div className="flex ">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => setSelectedUser(data.id)}
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

function AddBook({ visible, setVisible ,nim ,nidn ,faculty ,major ,yearEntry ,bio ,id ,setNim ,setNidn ,setFaculty ,setMajor ,setYearEntry ,setBio ,setId }) {
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const { createProfile,updateProfile } = useProfileApi(user);


   
  async function handleCreateBook(e) {
    e.preventDefault();
    console.log("Creating book with data:", {
      nim,
      nidn,
      faculty,
      major,
      yearEntry,
      bio,
      id
    });
    try {
      if(id){
        updateProfile.mutate({
          id,
          payload: {
            nim,
            nidn,
            faculty,
            major,
            yearEntry,
            bio,
            updatedById: user.id
          }
        });
      } else {
        createProfile.mutate({
          nim,
          nidn,
          faculty,
          major,
          yearEntry,
          bio,
          createdById: user.id
        });
      }
    } catch (err) {
      console.log("Gagal menambahkan profile. :", err.message);
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
            <label htmlFor="nim" className="text-primary-50 font-semibold">
              NIM
            </label>
            <InputText
              id="nim"
              label="nim"
              name="nim"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="nidn" className="text-primary-50 font-semibold">
              NIDN
            </label>
            <InputText
              id="nidn"
              label="nidn"
              name="nidn"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              value={nidn}
              onChange={(e) => setNidn(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="faculty" className="text-primary-50 font-semibold">
              Faculty
            </label>
            <InputText
              id="faculty"
              label="faculty"
              name="faculty"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="text"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="major" className="text-primary-50 font-semibold">
              Major
            </label>
            <InputText
              id="major"
              label="major"
              name="major"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            ></InputText>
          </div>
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="yearEntry" className="text-primary-50 font-semibold">
              Year Entry
            </label>
            <InputText
              id="yearEntry"
              label="Year Entry"
              name="yearEntry"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="text"
              value={yearEntry}
              onChange={(e) => setYearEntry(e.target.value)}
            ></InputText>
          </div>
         
          <div className="inline-flex flex-column gap-2">
            <label htmlFor="bio" className="text-primary-50 font-semibold">
              Bio
            </label>
            <InputText
              id="bio"
              label="Bio"
              name="bio"
              className="bg-white-alpha-20 border-none p-3 text-primary-50"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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

export default DataProfile;
