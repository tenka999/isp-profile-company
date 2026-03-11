import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useNotifApi } from "@/presentation/logics/app/useNotifApi";
import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Tag } from "primereact/tag";

import "../../../../styles/app.css";
import SecureStorage from "@/helpers/SecureStorage";

const UlasanCrudPage = () => {
  let emptyContact = {
    id: null,
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  };

  const [contacts, setContacts] = useState([]);
  const [contactDialog, setContactDialog] = useState(false);
  const [deleteContactDialog, setDeleteContactDialog] = useState(false);
  const [deleteContactsDialog, setDeleteContactsDialog] = useState(false);
  const [contact, setContact] = useState(emptyContact);
  const [selectedContacts, setSelectedContacts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataContacts, setDataContacts] = useState([]);
  const user = SecureStorage.getStorage("user");

  const toast = useRef(null);
  const dt = useRef(null);

  const { useAllNotif, deleteNotif, deleteNotifs } = useNotifApi();

  const { data, isPending, isError, error, refetch } = useAllNotif();
  console.log(data);
  useEffect(() => {
    fetchContacts();
  }, [data]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setDataContacts(data);
      setContacts(data);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data contact",
        life: 3000,
      });
      setLoading(false);
    }
  };

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `contact_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedContacts?.length > 0,
    });
  };

  const exportExcel = () => {
    const data = dataContacts;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contact");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `${getFileName()}.xlsx`,
    );
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const data = dataContacts;
    autoTable(doc, {
      head: [["Nama", "Email", "Telepon", "Pesan"]],
      body: data.map((item) => [
        item.nama,
        item.email,
        item.telepon,
        item.pesan,
      ]),
    });
    doc.save(`${getFileName()}.pdf`);
  };

  const exportItems = [
    {
      label: "CSV",
      icon: "pi pi-file",
      command: exportCSV,
    },
    {
      label: "Excel",
      icon: "pi pi-file-excel",
      command: exportExcel,
    },
    {
      label: "PDF",
      icon: "pi pi-file-pdf",
      command: exportPDF,
    },
  ];

  const totalContacts = contacts?.length || 0;
  const selectedCount = selectedContacts?.length || 0;
  const newContacts =
    contacts?.filter((val) => val.status === "UNREAD").length || 0;
  const readContacts =
    contacts?.filter((val) => val.status === "READ").length || 0;
  const repliedContacts =
    contacts?.filter((val) => val.status === "FOLLOWED_UP").length || 0;
  const totalAnim = useCountUp(totalContacts);
  const unreadAnim = useCountUp(newContacts);
  const readAnim = useCountUp(readContacts);
  const repliedAnim = useCountUp(repliedContacts);
  const selectedAnim = useCountUp(selectedCount);

  const openNew = () => {
    setContact(emptyContact);
    setSubmitted(false);
    setContactDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setContactDialog(false);
  };

  const hideDeleteContactDialog = () => {
    setDeleteContactDialog(false);
  };

  const hideDeleteContactsDialog = () => {
    setDeleteContactsDialog(false);
  };

  const saveContact = async () => {
    setSubmitted(true);

    if (contact.nama.trim() && contact.email.trim() && contact.pesan.trim()) {
      let _contacts = [...contacts];
      let _contact = { ...contact, userId: user.id };

      try {
        if (contact.id) {
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Contact berhasil diupdate",
            life: 3000,
          });
        } else {
          const result = await createUlasan.mutateAsync(_contact);
          const newContact = result?.data ?? result;
          _contacts.push(newContact);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Contact berhasil ditambahkan",
            life: 3000,
          });
        }

        setContacts(_contacts);
        setContactDialog(false);
        setContact(emptyContact);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan contact",
          life: 3000,
        });
      }
    }
  };

  const editContact = (contact) => {
    setContact({ ...contact });
    setContactDialog(true);
  };

  const confirmDeleteContact = (contact) => {
    setContact(contact);
    setDeleteContactDialog(true);
  };

  const deleteContactItem = async () => {
    try {
      let _contacts = contacts.filter((val) => val.id !== contact.id);
      console.log(_contacts);
      const result = await deleteNotif.mutateAsync({ id: contact.id });
      const deletedContact = result?.data ?? result;
      setContacts(_contacts);
      setDataContacts(_contacts);
      setDeleteContactDialog(false);
      setContact(emptyContact);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Contact berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus contact",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteContactsDialog(true);
  };

  const deleteSelectedContacts = async () => {
    try {
      let _contacts = contacts.filter((val) => !selectedContacts.includes(val));
      const ids = selectedContacts.map((val) => val.id);
      const response = await deleteNotifs.mutateAsync({
        ids: ids,
      });
      setContacts(_contacts);
      setDataContacts(_contacts);
      setDeleteContactsDialog(false);
      setSelectedContacts(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Contact yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus contact yang dipilih",
        life: 3000,
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _contact = { ...contact };
    _contact[`${name}`] = val;
    setContact(_contact);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Hapus"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedContacts || !selectedContacts.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <SplitButton
          label="Export"
          icon="pi pi-download"
          model={exportItems}
          outlined
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    const getNextStatus = (status) => {
      if (status === "NEW") return "READ";
      if (status === "READ") return "FOLLOWED_UP";
      return null;
    };

    const nextStatus = getNextStatus(rowData.status);

    const getIcon = () => {
      if (nextStatus === "READ") return "pi pi-eye";
      if (nextStatus === "FOLLOWED_UP") return "pi pi-check-circle";
      return null;
    };

    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteContact(rowData)}
        />

        {nextStatus && (
          <Button
            icon={getIcon()}
            rounded
            outlined
            severity="info"
            tooltip={nextStatus === "READ" ? "Mark Read" : "Followed Up"}
            onClick={() => {
              console.log(
                "nextStatus",
                nextStatus,
                rowData.id,
                // updateStatus.mutate,
              );
              updateStatus.mutate({
                id: rowData.id,
                payload: nextStatus,
              });
            }}
          />
        )}
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleDateString("id-ID");
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Kelola Contact</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari..."
        />
      </span>
    </div>
  );

  const contactDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveContact} />
    </React.Fragment>
  );

  const deleteContactDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteContactDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteContactItem}
      />
    </React.Fragment>
  );

  const deleteContactsDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteContactsDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedContacts}
      />
    </React.Fragment>
  );

  const statusBodyTemplate = (rowData) => {
    const map = {
      UNREAD: { label: "Belum Dibaca", severity: "danger" },
      READ: { label: "Sudah Dibaca", severity: "info" },
    };

    const status = map[rowData.status];

    return <Tag value={status.label} severity={status.severity} />;
  };

  const applyFilter = (filters) => {
    console.log(filters);
    const filteredUsers = contacts.filter((user) => {
      const roleMatch = filters.status
        ? filters.status === "ALL"
          ? true
          : user.status === filters.status
        : true;

      // user.status === filters.status : true;
      return roleMatch;
    });
    setDataContacts(filteredUsers);
  };
  return (
    <div className="grid">
      <div className="col-2 md:col-3">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              status: "ALL",
            });
          }}
        >
          <div>
            <small>Total Contact</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-inbox text-3xl text-blue-500" />
        </div>
      </div>
      <div className="col-2 md:col-3">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              status: "UNREAD",
            });
          }}
        >
          <div>
            <small>UNREAD</small>
            <div className="flex align-items-center gap-2">
              <h3>{unreadAnim}</h3>
            </div>
          </div>
          <i className="pi pi-envelope text-3xl text-red-500" />
        </div>
      </div>
      <div className="col-2 md:col-3">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              status: "READ",
            });
          }}
        >
          <div>
            <small>READ</small>
            <div className="flex align-items-center gap-2">
              <h3>{readAnim}</h3>
            </div>
          </div>
          <i className="pi pi-eye text-3xl text-blue-500" />
        </div>
      </div>

      <div className="col-2 md:col-3">
        <div className="stat-card">
          <div>
            <small>Dipilih</small>
            <div className="flex align-items-center gap-2">
              <h3>{selectedAnim}</h3>
            </div>
          </div>
          <i className="pi pi-list text-3xl" />
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={dataContacts}
            selection={selectedContacts}
            onSelectionChange={(e) => setSelectedContacts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} contact"
            globalFilter={globalFilter}
            header={header}
            loading={loading}
          >
            <Column selectionMode="multiple" exportable={false}></Column>
            <Column
              field="id"
              header="ID"
              sortable
              style={{ minWidth: "4rem" }}
            ></Column>
            <Column
              field="judul"
              header="Judul"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>

            <Column
              field="pesan"
              header="Pesan"
              sortable
              style={{ minWidth: "15rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              sortable
              body={statusBodyTemplate}
              style={{ minWidth: "15rem" }}
            ></Column>
            <Column
              field="createdAt"
              header="Dibuat Pada"
              body={createdAtBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>

          <Dialog
            visible={contactDialog}
            style={{ width: "450px" }}
            header="Detail Contact"
            modal
            className="p-fluid"
            footer={contactDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="nama">Nama</label>
              <InputText
                id="nama"
                value={contact.nama}
                onChange={(e) => onInputChange(e, "nama")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !contact.nama,
                })}
              />
              {submitted && !contact.nama && (
                <small className="p-error">Nama harus diisi.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={contact.email}
                onChange={(e) => onInputChange(e, "email")}
                required
                className={classNames({
                  "p-invalid": submitted && !contact.email,
                })}
              />
              {submitted && !contact.email && (
                <small className="p-error">Email harus diisi.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="telepon">Telepon</label>
              <InputText
                id="telepon"
                value={contact.telepon}
                onChange={(e) => onInputChange(e, "telepon")}
              />
            </div>

            <div className="field">
              <label htmlFor="pesan">Pesan</label>
              <InputTextarea
                id="pesan"
                value={contact.pesan}
                onChange={(e) => onInputChange(e, "pesan")}
                required
                rows={5}
                className={classNames({
                  "p-invalid": submitted && !contact.pesan,
                })}
              />
              {submitted && !contact.pesan && (
                <small className="p-error">Pesan harus diisi.</small>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteContactDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteContactDialogFooter}
            onHide={hideDeleteContactDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {contact && (
                <span>
                  Apakah Anda yakin ingin menghapus <b>{contact.nama}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteContactsDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteContactsDialogFooter}
            onHide={hideDeleteContactsDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah Anda yakin ingin menghapus contact yang dipilih?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UlasanCrudPage;
