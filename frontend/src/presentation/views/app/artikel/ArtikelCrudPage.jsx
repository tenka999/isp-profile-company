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
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";

import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useArtikelApi } from "@/presentation/logics/app/useArtikelApi";

import "../../../../styles/app.css";
import ArticleEditor from "./ArticleEditor";
import { Dropdown } from "primereact/dropdown";

const ArtikelCrudPage = () => {
  let emptyArtikel = {
    id: null,
    judul: "",
    slug: "",
    konten: "",
    gambar: "",
  };

  const [artikels, setArtikels] = useState([]);
  const [artikelDialog, setArtikelDialog] = useState(false);
  const [deleteArtikelDialog, setDeleteArtikelDialog] = useState(false);
  const [deleteArtikelsDialog, setDeleteArtikelsDialog] = useState(false);
  const [artikel, setArtikel] = useState(emptyArtikel);
  const [selectedArtikels, setSelectedArtikels] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataArtikels, setDataArtikels] = useState([]);
  const [gambar, setGambar] = useState(null);
  const [gambarPreview, setGambarPreview] = useState(null);
  const [gambarFile, setGambarFile] = useState(null);
  const [status, setStatus] = useState("DRAFT");
  const toast = useRef(null);
  const dt = useRef(null);

  const filterRef = useRef(null);

  const {
    useAllArtikel,
    createArtikel,
    updateArtikel,
    deleteArtikel,
    deleteArtikels,
  } = useArtikelApi();
  const { data, isPending } = useAllArtikel();
  useEffect(() => {
    fetchArtikels();
  }, [data]);

  const fetchArtikels = async () => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setArtikels(data);
      setDataArtikels(data);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data artikel",
        life: 3000,
      });
      setLoading(false);
    }
  };

  const statusOptions = [
    { label: "Draft", value: "DRAFT" },
    { label: "Publish", value: "PUBLISHED" },
  ];

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `artikel_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedArtikels?.length > 0,
    });
  };

  const exportExcel = () => {
    const data = dataArtikels;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Artikel");
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
    const data = dataArtikels;
    autoTable(doc, {
      head: ["Judul", "Slug"],
      body: data.map((item) => [item.judul, item.slug]),
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

  const totalArtikels = artikels?.length || 0;
  const selectedCount = selectedArtikels?.length || 0;
  const draftCount =
    artikels?.filter((val) => val.status === "DRAFT")?.length || 0;
  const publishCount =
    artikels?.filter((val) => val.status === "PUBLISHED")?.length || 0;
  const totalAnim = useCountUp(totalArtikels);
  const selectedAnim = useCountUp(selectedCount);
  const draftAnim = useCountUp(draftCount);
  const publishAnim = useCountUp(publishCount);

  const openNew = () => {
    setArtikel(emptyArtikel);
    setSubmitted(false);
    setArtikelDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setArtikelDialog(false);
  };

  const hideDeleteArtikelDialog = () => {
    setDeleteArtikelDialog(false);
  };

  const onFileChange = (e) => {
    const file = e.files[0];
    console.log("file", file);
    console.log("file", file);
    console.log("file.name", artikel);
    if (file) {
      setGambarFile(file); // ini untuk dikirim
      // console.log("file", gambarFile);
      setGambarPreview(URL.createObjectURL(file)); // ini untuk preview
    }
  };

  const hideDeleteArtikelsDialog = () => {
    setDeleteArtikelsDialog(false);
  };

  const saveArtikel = async () => {
    setSubmitted(true);
    console.log(gambarFile instanceof File); // harus true
    console.log(gambarFile);
    console.log(gambar, "artikel"); //blob:http://localhost:5173/ce8ceec1-3429-4e44-bb50-489b45144edc artikel
    console.log(artikel);
    if (
      artikel.judul.trim() &&
      artikel.konten.trim() &&
      artikel.status.trim()
      // gambar
    ) {
      // let _artikels = [...artikels];
      let _artikel = { ...artikel, gambar: gambarFile };

      try {
        if (artikel.id) {
          const reponse = await updateArtikel.mutateAsync({
            id: artikel.id,
            payload: _artikel,
          });

          const updatedArtikel = reponse?.data ?? reponse;
          _artikels[_artikels.findIndex((val) => val.id === artikel.id)] =
            updatedArtikel;

          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Artikel berhasil diupdate",
            life: 3000,
          });
        } else {
          const result = await createArtikel.mutateAsync(_artikel);
          const newArtikel = result?.data ?? result;
          _artikels.push(newArtikel);

          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Artikel berhasil ditambahkan",
            life: 3000,
          });
        }

        setArtikels(_artikels);
        setGambarFile(null);
        setGambarPreview(null);
        setArtikelDialog(false);
        setArtikel(emptyArtikel);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan artikel",
          life: 3000,
        });
      }
    }
  };

  const editArtikel = (artikel) => {
    setArtikel({ ...artikel });
    console.log("artikel", artikel);
    setGambarPreview(`http://localhost:5000/api/article/${artikel.gambar}`);
    setArtikelDialog(true);
  };

  const confirmDeleteArtikel = (artikel) => {
    setArtikel(artikel);
    setDeleteArtikelDialog(true);
  };

  const deleteArtikelItem = async () => {
    try {
      let _artikels = artikels.filter((val) => val.id !== artikel.id);
      const response = await deleteArtikel.mutateAsync({ id: artikel.id });

      setArtikels(_artikels);
      setGambarFile(null);
      setGambarPreview(null);
      setDeleteArtikelDialog(false);
      setArtikel(emptyArtikel);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Artikel berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus artikel",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteArtikelsDialog(true);
  };

  const applyFilter = (filters) => {
    console.log(filters);

    const filteredUsers = artikels.filter((artikel) => {
      const statusMatch = filters.status
        ? filters.status === "all"
          ? true
          : artikel.status === filters.status
        : true;
      //  artikel.status === filters.status
      // : true;
      return statusMatch;
    });
    // console.log(
    //   filters.deleted ? users.deletedAt != null : users.deletedAt == null,
    // );
    // console.log(users.filter((user) => user.deletedAt != null)); // === filters.deletedAt);
    console.log(filteredUsers);
    // console.log(users.filter((user) => user.role === filters.role));
    setDataArtikels(filteredUsers);
  };

  const deleteSelectedArtikels = async () => {
    try {
      let _artikels = artikels.filter((val) => !selectedArtikels.includes(val));
      const ids = selectedArtikels.map((val) => val.id);
      const response = await deleteArtikels.mutateAsync({
        ids: ids,
      });
      setArtikels(_artikels);
      setDeleteArtikelsDialog(false);
      setSelectedArtikels(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Artikel yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus artikel yang dipilih",
        life: 3000,
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _artikel = { ...artikel };
    _artikel[`${name}`] = val;
    setArtikel(_artikel);
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
          disabled={!selectedArtikels || !selectedArtikels.length}
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
          icon="pi pi-info-circle"
          rounded
          outlined
          severity="info"
          className="mr-2"
          // onClick={() => confirmDeleteArtikel(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editArtikel(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteArtikel(rowData)}
        />
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return rowData.createdAt
      ? new Date(rowData.createdAt).toLocaleDateString("id-ID")
      : "";
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Kelola Artikel</h4>
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

  const artikelDialogFooter = (
    <React.Fragment>
      <div className="" style={{ marginTop: "1rem" }}>
        <Button
          label="Batal"
          icon="pi pi-times"
          outlined
          onClick={hideDialog}
        />
        <Button label="Simpan" icon="pi pi-check" onClick={saveArtikel} />
      </div>
    </React.Fragment>
  );

  const deleteArtikelDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteArtikelDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteArtikelItem}
      />
    </React.Fragment>
  );

  const deleteArtikelsDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteArtikelsDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedArtikels}
      />
    </React.Fragment>
  );

  const imageBodyTemplate = (rowData) => {
    if (!rowData.gambar) {
      return <span>Tidak ada gambar</span>;
    }

    return (
      <Image
        src={`http://localhost:5000/api/article/${rowData.gambar}`}
        alt="artikel"
        width="300"
        preview
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    const isPublished = rowData.status === "PUBLISHED";

    return (
      <Tag
        value={isPublished ? "Published" : "Draft"}
        severity={isPublished ? "success" : "warning"}
        icon={isPublished ? "pi pi-check-circle" : "pi pi-file"}
      />
    );
  };

  return (
    <div className="grid">
      <div className="col-12 md:col-3">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              status: "all",
            });
          }}
        >
          <div>
            <small>Total Artikel</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-book text-3xl text-indigo-500" />
        </div>
      </div>

      <div className="col-12 md:col-3">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              status: "DRAFT",
            });
          }}
        >
          <div>
            <small>Draft</small>
            <div className="flex align-items-center gap-2">
              <h3>{draftAnim}</h3>
            </div>
          </div>
          <i className="pi pi-folder text-3xl text-blue-500" />
        </div>
      </div>
      <div className="col-12 md:col-3">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              status: "PUBLISHED",
            });
          }}
        >
          <div>
            <small>Publish</small>
            <div className="flex align-items-center gap-2">
              <h3>{publishAnim}</h3>
            </div>
          </div>
          <i className="pi pi-check-circle text-3xl text-green-500" />
        </div>
      </div>
      <div className="col-12 md:col-3">
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
            value={dataArtikels}
            selection={selectedArtikels}
            onSelectionChange={(e) => setSelectedArtikels(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} artikel"
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
              style={{ minWidth: "15rem" }}
            ></Column>
            <Column
              field="slug"
              header="Slug"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="konten"
              header="Konten"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              // field="gambar"
              header="Gambar"
              sortable
              body={imageBodyTemplate}
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              sortable
              body={statusBodyTemplate}
              style={{ minWidth: "12rem" }}
            />
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
            visible={artikelDialog}
            style={{ width: "600px" }}
            header={artikel.id ? "Edit Artikel" : "Tambah Artikel Baru"}
            modal
            className="p-fluid"
            footer={artikelDialogFooter}
            onHide={hideDialog}
            draggable={false}
            closeOnEscape
            maximizable
          >
            {/* Form Content with Scroll */}
            <div
              className="dialog-content"
              style={{
                maxHeight: "70vh",
                overflowY: "none",
                padding: "0.5rem 1rem",
              }}
            >
              {/* Basic Information Section */}
              <div className="form-section">
                <h4
                  style={{
                    margin: "0 0 1rem 0",
                    color: "#495057",
                    borderBottom: "1px solid #dee2e6",
                    paddingBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <i
                    className="pi pi-file-edit"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  Informasi Dasar
                </h4>

                <div className="field">
                  <label htmlFor="judul" className="required-field">
                    Judul Artikel
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>
                  <InputText
                    id="judul"
                    value={artikel.judul}
                    onChange={(e) => onInputChange(e, "judul")}
                    placeholder="Masukkan judul artikel yang menarik"
                    required
                    autoFocus={!artikel.id}
                    maxLength={200}
                    className={classNames({
                      "p-invalid": submitted && !artikel.judul,
                    })}
                  />
                  {submitted && !artikel.judul ? (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Judul artikel harus diisi
                    </small>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.25rem",
                      }}
                    >
                      <small
                        className="field-hint"
                        style={{ color: "#6c757d" }}
                      >
                        Buat judul yang menarik dan informatif
                      </small>
                      <small
                        style={{
                          color:
                            artikel.judul?.length > 180 ? "#f59e0b" : "#6c757d",
                        }}
                      >
                        {artikel.judul?.length || 0}/200
                      </small>
                    </div>
                  )}
                </div>

                {/* Slug Field (Optional - can be auto-generated) */}
                <div className="field">
                  <label htmlFor="slug">
                    Slug URL
                    <span
                      className="optional-badge"
                      style={{
                        fontSize: "0.75rem",
                        backgroundColor: "#e9ecef",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        marginLeft: "0.5rem",
                        color: "#6c757d",
                      }}
                    >
                      Auto-generate
                    </span>
                  </label>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-link"></i>
                    </span>
                    <InputText
                      id="slug"
                      value={artikel.slug}
                      onChange={(e) => onInputChange(e, "slug")}
                      placeholder="judul-artikel-yang-friendly"
                      disabled
                    />
                  </div>
                  <small
                    className="field-hint"
                    style={{
                      color: "#6c757d",
                      display: "block",
                      marginTop: "0.25rem",
                    }}
                  ></small>
                </div>
              </div>

              {/* Content Section */}
              <div className="form-section" style={{ marginTop: "1.5rem" }}>
                <h4
                  style={{
                    margin: "0 0 1rem 0",
                    color: "#495057",
                    borderBottom: "1px solid #dee2e6",
                    paddingBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <i
                    className="pi pi-pencil"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  Konten Artikel
                </h4>

                <div className="field">
                  <label htmlFor="konten" className="required-field">
                    Isi Konten
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>
                  <InputTextarea
                    id="konten"
                    value={artikel.konten}
                    onChange={(e) => onInputChange(e, "konten")}
                    required
                    rows={8}
                    cols={30}
                    placeholder="Tulis konten artikel di sini... Gunakan format yang jelas dan mudah dibaca"
                    className={classNames({
                      "p-invalid": submitted && !artikel.konten,
                      "w-full": true,
                    })}
                    autoResize
                    maxLength={5000}
                  />
                  {submitted && !artikel.konten ? (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Konten artikel harus diisi
                    </small>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "0.25rem",
                      }}
                    >
                      <small
                        style={{
                          color:
                            artikel.konten?.length > 4500
                              ? "#f59e0b"
                              : "#6c757d",
                        }}
                      >
                        {artikel.konten?.length || 0}/5000 karakter
                      </small>
                    </div>
                  )}
                </div>
              </div>

              {/* Media & Status Section */}
              <div className="form-section" style={{ marginTop: "1.5rem" }}>
                <h4
                  style={{
                    margin: "0 0 1rem 0",
                    color: "#495057",
                    borderBottom: "1px solid #dee2e6",
                    paddingBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <i className="pi pi-image" style={{ fontSize: "1.2rem" }}></i>
                  Media & Status
                </h4>

                <div
                  className="grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  {/* Status Dropdown */}
                  <div className="field">
                    <label htmlFor="status">
                      Status Publikasi
                      <span
                        className="asterisk"
                        style={{ color: "red", marginLeft: "0.25rem" }}
                      >
                        *
                      </span>
                    </label>
                    <Dropdown
                      id="status"
                      value={artikel.status}
                      options={statusOptions}
                      onChange={(e) => onInputChange(e, "status")}
                      placeholder="Pilih Status"
                      className={classNames({
                        "p-invalid": submitted && !artikel.status,
                      })}
                      optionLabel="label"
                      optionValue="value"
                      showClear={false}
                    />
                    {submitted && !artikel.status && (
                      <small className="p-error">
                        <i
                          className="pi pi-exclamation-circle"
                          style={{ marginRight: "0.25rem" }}
                        ></i>
                        Status harus dipilih
                      </small>
                    )}
                  </div>

                  {/* Additional metadata could go here */}
                  {artikel.id && (
                    <div className="field">
                      <label>Dibuat Pada</label>
                      <div
                        className="info-box"
                        style={{
                          border: "1px solid #ced4da", // Border color: "#f8f9fa",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.9rem",
                        }}
                      >
                        <i
                          className="pi pi-calendar"
                          style={{ marginRight: "0.5rem", color: "#6c757d" }}
                        ></i>
                        {artikel.createdAt
                          ? new Date(artikel.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
                          : "-"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Image Upload Section */}
                <div className="field" style={{ marginTop: "1rem" }}>
                  <label>
                    Gambar Featured
                    <span
                      className="optional-badge"
                      style={{
                        fontSize: "0.75rem",
                        backgroundColor: "#e9ecef",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        marginLeft: "0.5rem",
                        color: "#000",
                      }}
                    >
                      Maks. 2MB
                    </span>
                  </label>

                  <div
                    className="upload-area"
                    style={{
                      border: "2px dashed #dee2e6",
                      borderRadius: "6px",
                      padding: "1.5rem",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith("image/")) {
                        onFileChange({ files: [file] });
                      }
                    }}
                  >
                    <FileUpload
                      mode="basic"
                      accept="image/*"
                      name="gambar"
                      type="file"
                      maxFileSize={2000000}
                      chooseLabel={`${gambarPreview ? "Ganti Gambar" : "Pilih Gambar"}`}
                      auto
                      onSelect={onFileChange}
                      className="custom-fileupload"
                      disabled={gambarPreview}
                    />

                    <div
                      style={{
                        marginTop: "0.5rem",
                        color: "#6c757d",
                        fontSize: "0.85rem",
                      }}
                    >
                      <i
                        className="pi pi-cloud-upload"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Drag & drop atau klik untuk memilih gambar
                    </div>
                    <small
                      style={{
                        color: "#6c757d",
                        fontSize: "0.75rem",
                        display: "block",
                        marginTop: "0.25rem",
                      }}
                    >
                      Format: JPG, PNG, GIF (Maks. 2MB)
                    </small>
                  </div>

                  {/* Image Preview */}
                  {gambarPreview && (
                    <div
                      className="preview-section"
                      style={{
                        marginTop: "1rem",
                        padding: "1rem",
                        border: "1px solid #dee2e6",
                        borderRadius: "6px",
                        // backgroundColor: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <label style={{ fontWeight: "500" }}>
                          <i
                            className="pi pi-eye"
                            style={{ marginRight: "0.25rem" }}
                          ></i>
                          Preview Gambar
                        </label>
                        <Button
                          label="Hapus"
                          icon="pi pi-trash"
                          severity="danger"
                          text
                          size="small"
                          onClick={() => {
                            setGambarPreview(null);
                            setGambarFile(null);
                            // onFileChange({ e: null });
                            setArtikel((prevArtikel) => ({
                              ...prevArtikel,
                              gambar: null,
                            }));
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Image
                          src={gambarPreview}
                          alt="Preview"
                          width="100%"
                          height="auto"
                          preview
                          style={{
                            maxHeight: "200px",
                            objectFit: "contain",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SEO Preview Section (Optional enhancement) */}
              {artikel.judul && (
                <div className="form-section" style={{ marginTop: "1.5rem" }}>
                  <h4
                    className=""
                    style={{
                      margin: "0 0 1rem 0",
                      color: "#495057",
                      borderBottom: "1px solid #dee2e6",
                      paddingBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <i
                      className="pi pi-google"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    SEO Preview
                  </h4>

                  <div
                    className="seo-preview"
                    style={{
                      border: "1px solid #e9ecef",
                      borderRadius: "8px",
                      padding: "1rem",
                      backgroundColor: "#1f1f1f",
                    }}
                  >
                    <div
                      style={{
                        color: "#99c3ff",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {artikel.judul || "Judul Artikel"}
                    </div>
                    <div
                      style={{
                        color: "#bfbfbf",
                        fontSize: "0.85rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      www.Fiberix.com/artikel/{artikel.slug || "url-slug"}
                    </div>
                    <div style={{ color: "#bfbfbf", fontSize: "0.85rem" }}>
                      {(
                        artikel.konten ||
                        "Deskripsi artikel akan muncul di sini..."
                      ).substring(0, 160)}
                      ...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Styles */}
            <style jsx>{`
              .field {
                margin-bottom: 1.25rem;
              }

              .field label {
                font-weight: 500;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
              }

              .required-field:after {
                content: "*";
                color: red;
                margin-left: 0.25rem;
              }

              .custom-fileupload .p-button {
                width: 100%;
                justify-content: center;
              }

              .upload-area:hover {
                border-color: #2196f3;
                background-color: #e3f2fd22;
              }
            `}</style>
          </Dialog>

          <Dialog
            visible={deleteArtikelDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteArtikelDialogFooter}
            onHide={hideDeleteArtikelDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {artikel && (
                <span>
                  Apakah Anda yakin ingin menghapus <b>{artikel.judul}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteArtikelsDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteArtikelsDialogFooter}
            onHide={hideDeleteArtikelsDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah Anda yakin ingin menghapus artikel yang dipilih?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ArtikelCrudPage;
