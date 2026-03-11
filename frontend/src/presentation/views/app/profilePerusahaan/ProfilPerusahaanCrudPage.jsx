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
import { FileUpload } from "primereact/fileupload";
import { OverlayPanel } from "primereact/overlaypanel";
import { ProgressBar } from "primereact/progressbar";
import { useCountUp } from "@/hooks/useCountUp";
import { SplitButton } from "primereact/splitbutton";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../../../styles/app.css";

const ProfilPerusahaanCrudPage = () => {
  let emptyProfilPerusahaan = {
    id: null,
    namaPerusahaan: "",
    deskripsi: "",
    alamat: "",
    telepon: "",
    email: "",
    logo: "",
    lat: "",
    lng: "",
  };

  const [profilPerusahaans, setProfilPerusahaans] = useState([]);
  const [profilPerusahaanDialog, setProfilPerusahaanDialog] = useState(false);
  const [deleteProfilPerusahaanDialog, setDeleteProfilPerusahaanDialog] =
    useState(false);
  const [deleteProfilPerusahaansDialog, setDeleteProfilPerusahaansDialog] =
    useState(false);
  const [profilPerusahaan, setProfilPerusahaan] = useState(
    emptyProfilPerusahaan,
  );
  const [selectedProfilPerusahaans, setSelectedProfilPerusahaans] =
    useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataProfilPerusahaans, setDataProfilPerusahaans] = useState([]);

  const toast = useRef(null);
  const dt = useRef(null);
  const filterRef = useRef(null);

  // Ganti dengan API hook yang sesuai
  // const { useAllProfilPerusahaans, createProfilPerusahaan, updateProfilPerusahaan, deleteProfilPerusahaan, deleteSelectedProfilPerusahaan } = useProfilPerusahaanApi(profilPerusahaan);
  // const { data, isPending, isError, error } = useAllProfilPerusahaans();

  useEffect(() => {
    // Simulasi fetch data
    // if (data) {
    //   setProfilPerusahaans(data);
    //   setLoading(false);
    //   setDataProfilPerusahaans(data);
    // }
    fetchProfilPerusahaans();
  }, []);

  const fetchProfilPerusahaans = async () => {
    try {
      setLoading(true);
      // TODO: Implement API call
      // const response = await fetch('/api/profil-perusahaan');
      // const data = await response.json();
      // setProfilPerusahaans(data);
      // setDataProfilPerusahaans(data);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data profil perusahaan",
        life: 3000,
      });
      setLoading(false);
    }
  };

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `profil_perusahaan_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedProfilPerusahaans?.length > 0,
    });
  };

  const exportExcel = () => {
    const data = dataProfilPerusahaans;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ProfilPerusahaan");
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
    const data = dataProfilPerusahaans;
    autoTable(doc, {
      head: [["Nama Perusahaan", "Email", "Telepon", "Alamat"]],
      body: data.map((p) => [p.namaPerusahaan, p.email, p.telepon, p.alamat]),
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

  const totalProfilPerusahaans = profilPerusahaans?.length || 0;
  const selectedCount = selectedProfilPerusahaans?.length || 0;
  const totalAnim = useCountUp(totalProfilPerusahaans);
  const selectedAnim = useCountUp(selectedCount);

  const openNew = () => {
    setProfilPerusahaan(emptyProfilPerusahaan);
    setSubmitted(false);
    setProfilPerusahaanDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProfilPerusahaanDialog(false);
  };

  const hideDeleteProfilPerusahaanDialog = () => {
    setDeleteProfilPerusahaanDialog(false);
  };

  const hideDeleteProfilPerusahaansDialog = () => {
    setDeleteProfilPerusahaansDialog(false);
  };

  const saveProfilPerusahaan = async () => {
    setSubmitted(true);

    if (
      profilPerusahaan.namaPerusahaan.trim() &&
      profilPerusahaan.email.trim()
    ) {
      let _profilPerusahaans = [...profilPerusahaans];
      let _profilPerusahaan = { ...profilPerusahaan };

      try {
        if (profilPerusahaan.id) {
          // Update existing profil perusahaan
          // const response = await updateProfilPerusahaan.mutateAsync({
          //   id: profilPerusahaan.id,
          //   payload: _profilPerusahaan,
          // });
          // const newProfilPerusahaan = response?.data ?? response;
          // _profilPerusahaans[_profilPerusahaans.findIndex((val) => val.id === profilPerusahaan.id)] = newProfilPerusahaan;
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Profil perusahaan berhasil diupdate",
            life: 3000,
          });
        } else {
          // Create new profil perusahaan
          // const result = await createProfilPerusahaan.mutateAsync(_profilPerusahaan);
          // const newProfilPerusahaan = result?.data ?? result;
          // _profilPerusahaans.push(newProfilPerusahaan);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Profil perusahaan berhasil ditambahkan",
            life: 3000,
          });
        }

        setProfilPerusahaans(_profilPerusahaans);
        setProfilPerusahaanDialog(false);
        setProfilPerusahaan(emptyProfilPerusahaan);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan profil perusahaan",
          life: 3000,
        });
      }
    }
  };

  const editProfilPerusahaan = (profilPerusahaan) => {
    setProfilPerusahaan({ ...profilPerusahaan });
    setProfilPerusahaanDialog(true);
  };

  const confirmDeleteProfilPerusahaan = (profilPerusahaan) => {
    setProfilPerusahaan(profilPerusahaan);
    setDeleteProfilPerusahaanDialog(true);
  };

  const deleteProfilPerusahaanItem = async () => {
    try {
      // await deleteProfilPerusahaan.mutateAsync(profilPerusahaan.id);
      let _profilPerusahaans = profilPerusahaans.filter(
        (val) => val.id !== profilPerusahaan.id,
      );
      setProfilPerusahaans(_profilPerusahaans);
      setDeleteProfilPerusahaanDialog(false);
      setProfilPerusahaan(emptyProfilPerusahaan);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Profil perusahaan berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus profil perusahaan",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteProfilPerusahaansDialog(true);
  };

  const deleteSelectedProfilPerusahaans = async () => {
    try {
      // const ids = selectedProfilPerusahaans.map((p) => p.id);
      // await deleteSelectedProfilPerusahaan.mutateAsync(ids);
      let _profilPerusahaans = profilPerusahaans.filter(
        (val) => !selectedProfilPerusahaans.includes(val),
      );
      setProfilPerusahaans(_profilPerusahaans);
      setDeleteProfilPerusahaansDialog(false);
      setSelectedProfilPerusahaans(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Profil perusahaan yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus profil perusahaan yang dipilih",
        life: 3000,
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _profilPerusahaan = { ...profilPerusahaan };
    _profilPerusahaan[`${name}`] = val;
    setProfilPerusahaan(_profilPerusahaan);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Tambah"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Hapus"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={
            !selectedProfilPerusahaans || !selectedProfilPerusahaans.length
          }
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
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProfilPerusahaan(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProfilPerusahaan(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Kelola Profil Perusahaan</h4>
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

  const profilPerusahaanDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button
        label="Simpan"
        icon="pi pi-check"
        onClick={saveProfilPerusahaan}
      />
    </React.Fragment>
  );

  const deleteProfilPerusahaanDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProfilPerusahaanDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProfilPerusahaanItem}
      />
    </React.Fragment>
  );

  const deleteProfilPerusahaansDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProfilPerusahaansDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProfilPerusahaans}
      />
    </React.Fragment>
  );

  return (
    <div className="grid">
      <div className="col-12 md:col-6">
        <div className="stat-card">
          <div>
            <small>Total Profil Perusahaan</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-building text-3xl text-blue-500" />
        </div>
      </div>

      <div className="col-12 md:col-6">
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
            value={dataProfilPerusahaans}
            selection={selectedProfilPerusahaans}
            onSelectionChange={(e) => setSelectedProfilPerusahaans(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} profil perusahaan"
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
              field="namaPerusahaan"
              header="Nama Perusahaan"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="email"
              header="Email"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="telepon"
              header="Telepon"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="alamat"
              header="Alamat"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>

          <Dialog
            visible={profilPerusahaanDialog}
            style={{ width: "450px" }}
            header="Detail Profil Perusahaan"
            modal
            className="p-fluid"
            footer={profilPerusahaanDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="namaPerusahaan">Nama Perusahaan</label>
              <InputText
                id="namaPerusahaan"
                value={profilPerusahaan.namaPerusahaan}
                onChange={(e) => onInputChange(e, "namaPerusahaan")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !profilPerusahaan.namaPerusahaan,
                })}
              />
              {submitted && !profilPerusahaan.namaPerusahaan && (
                <small className="p-error">Nama perusahaan harus diisi.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="deskripsi">Deskripsi</label>
              <InputTextarea
                id="deskripsi"
                value={profilPerusahaan.deskripsi}
                onChange={(e) => onInputChange(e, "deskripsi")}
                rows={3}
              />
            </div>

            <div className="field">
              <label htmlFor="alamat">Alamat</label>
              <InputTextarea
                id="alamat"
                value={profilPerusahaan.alamat}
                onChange={(e) => onInputChange(e, "alamat")}
                rows={2}
              />
            </div>

            <div className="field">
              <label htmlFor="telepon">Telepon</label>
              <InputText
                id="telepon"
                value={profilPerusahaan.telepon}
                onChange={(e) => onInputChange(e, "telepon")}
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={profilPerusahaan.email}
                onChange={(e) => onInputChange(e, "email")}
                required
                className={classNames({
                  "p-invalid": submitted && !profilPerusahaan.email,
                })}
              />
              {submitted && !profilPerusahaan.email && (
                <small className="p-error">Email harus diisi.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="lat">Latitude</label>
              <InputText
                id="lat"
                value={profilPerusahaan.lat}
                onChange={(e) => onInputChange(e, "lat")}
              />
            </div>

            <div className="field">
              <label htmlFor="lng">Longitude</label>
              <InputText
                id="lng"
                value={profilPerusahaan.lng}
                onChange={(e) => onInputChange(e, "lng")}
              />
            </div>
          </Dialog>

          <Dialog
            visible={deleteProfilPerusahaanDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteProfilPerusahaanDialogFooter}
            onHide={hideDeleteProfilPerusahaanDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {profilPerusahaan && (
                <span>
                  Apakah Anda yakin ingin menghapus{" "}
                  <b>{profilPerusahaan.namaPerusahaan}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteProfilPerusahaansDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteProfilPerusahaansDialogFooter}
            onHide={hideDeleteProfilPerusahaansDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah Anda yakin ingin menghapus profil perusahaan yang
                dipilih?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProfilPerusahaanCrudPage;
