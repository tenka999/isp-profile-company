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

import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "../../../../styles/app.css";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";

import { useGaleriApi } from "@/presentation/logics/app/useGaleriApi";
import { useKategoriGaleriApi } from "@/presentation/logics/app/kategoriGaleri";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { ColorPicker } from "primereact/colorpicker";

const GaleriCrudPage = () => {
  let emptyGaleri = {
    id: null,
    judul: "",
    gambar: "",
    kategori: "",
    deskripsi: "",
  };

  const [galeris, setGaleris] = useState([]);
  const [galeriDialog, setGaleriDialog] = useState(false);
  const [deleteGaleriDialog, setDeleteGaleriDialog] = useState(false);
  const [deleteGalerisDialog, setDeleteGalerisDialog] = useState(false);
  const [galeri, setGaleri] = useState(emptyGaleri);
  const [selectedGaleris, setSelectedGaleris] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataGaleris, setDataGaleris] = useState([]);
  const [gambarPreview, setGambarPreview] = useState(null);
  const [gambarFile, setGambarFile] = useState(null);
  const [isNewKategori, setIsNewKategori] = useState(false);
  const inputRef = useRef(null);

  const [kategoriBaru, setKategoriBaru] = useState({
    nama: "",
    warna: "#6366F1",
  });

  const toast = useRef(null);
  const dt = useRef(null);

  const { createGaleri, useAllGaleri, updateGaleri, deleteGaleri } =
    useGaleriApi();

  const { useAllKategoriGaleri, createKategoriGaleri } = useKategoriGaleriApi();

  const { data: kategoriGaleris } = useAllKategoriGaleri();
  console.log("kategoriGaleris", kategoriGaleris);

  const kategoriOptions = kategoriGaleris?.map((kategori) => ({
    label: `${kategori.nama} - ${kategori.warna}`,
    value: kategori.id,
  }));

  console.log("kategoriOptions", kategoriOptions);
  console.log("VALUE:", galeri.kategori);
  console.log("OPTIONS:", kategoriOptions);
  const { data, isPending } = useAllGaleri();
  console.log("data", data);
  useEffect(() => {
    fetchGaleris();
  }, [data]);

  const fetchGaleris = async () => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setDataGaleris(data);
      setGaleris(data);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data galeri",
        life: 3000,
      });
      setLoading(false);
    }
  };

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `galeri_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedGaleris?.length > 0,
    });
  };

  const exportExcel = () => {
    const data = dataGaleris;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Galeri");
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
    const data = dataGaleris;
    autoTable(doc, {
      head: ["Judul", "Kategori", "Deskripsi"],
      body: data.map((item) => [item.judul, item.kategori, item.deskripsi]),
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

  const totalGaleris = galeris?.length || 0;
  const selectedCount = selectedGaleris?.length || 0;
  const totalAnim = useCountUp(totalGaleris);
  const selectedAnim = useCountUp(selectedCount);

  const openNew = () => {
    setGaleri(emptyGaleri);
    setSubmitted(false);
    setGaleriDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setGaleriDialog(false);
    setGambarPreview(null);
    setGambarFile(null);
  };

  const hideDeleteGaleriDialog = () => {
    setDeleteGaleriDialog(false);
  };

  const hideDeleteGalerisDialog = () => {
    setDeleteGalerisDialog(false);
  };

  const saveGaleri = async () => {
    setSubmitted(true);
    if (gambarFile) {
      let _galeris = [...galeris];
      let _galeri = {
        ...galeri,
        gambar: gambarFile,
        kategori: isNewKategori ? kategoriBaru : { id: galeri.kategori },
      };
      console.log("galeri", _galeri);

      try {
        if (galeri.id) {
          await updateGaleri.mutateAsync({
            id: galeri.id,
            payload: _galeri,
          });
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Galeri berhasil diupdate",
            life: 3000,
          });
        } else {
          await createGaleri.mutateAsync(_galeri);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Galeri berhasil ditambahkan",
            life: 3000,
          });
        }
        setGaleris(_galeris);
        setGaleriDialog(false);
        setGaleri(emptyGaleri);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan galeri",
          life: 3000,
        });
      }
    }
  };

  const editGaleri = (galeri) => {
    console.log("galeri", galeri.kategori.nama);
    setGaleri({ ...galeri });
    setGambarFile(galeri.gambar);
    setGambarPreview(`http://localhost:5000/api/gallery/${galeri.gambar}`);
    setGaleriDialog(true);
  };

  const confirmDeleteGaleri = (galeri) => {
    setGaleri(galeri);
    setDeleteGaleriDialog(true);
  };

  const deleteGaleriItem = async () => {
    try {
      let _galeris = galeris.filter((val) => val.id !== galeri.id);
      await deleteGaleri.mutateAsync({ id: galeri.id });
      setGaleris(_galeris);
      setDeleteGaleriDialog(false);
      setGaleri(emptyGaleri);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Galeri berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus galeri",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteGalerisDialog(true);
  };

  const deleteSelectedGaleris = async () => {
    try {
      let _galeris = galeris.filter((val) => !selectedGaleris.includes(val));
      setGaleris(_galeris);
      setDeleteGalerisDialog(false);
      setSelectedGaleris(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Galeri yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus galeri yang dipilih",
        life: 3000,
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _galeri = { ...galeri };
    _galeri[`${name}`] = val;
    setGaleri(_galeri, kategoriBaru);
    console.log("galeri", e);
  };
  const onInputChangeKat = (val, name) => {
    let _galeri = { ...galeri };
    _galeri[name] = val;
    setGaleri(_galeri);
    console.log("galeri", val);
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
          disabled={!selectedGaleris || !selectedGaleris.length}
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
          onClick={() => editGaleri(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteGaleri(rowData)}
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
      <h4 className="m-0">Kelola Galeri</h4>
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

  const galeriDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveGaleri} />
    </React.Fragment>
  );

  const deleteGaleriDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteGaleriDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteGaleriItem}
      />
    </React.Fragment>
  );

  const deleteGalerisDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteGalerisDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedGaleris}
      />
    </React.Fragment>
  );

  const onFileChange = (e) => {
    const file = e.files[0];
    console.log("file", file);
    console.log("file", file);
    if (file) {
      setGambarFile(file); // ini untuk dikirim
      // console.log("file", gambarFile);
      setGambarPreview(URL.createObjectURL(file)); // ini untuk preview
    }
  };

  const imageBodyTemplate = (rowData) => {
    if (!rowData.gambar) {
      return <span>Tidak ada gambar</span>;
    }

    return (
      <Image
        src={`http://localhost:5000/api/gallery/${rowData.gambar}`}
        alt="galeri"
        width="300"
        preview
      />
    );
  };
  const kategoriBodyTemplate = (rowData) => {
    const warna = rowData.kategori.warna;
    const value = rowData.kategori.nama;

    return (
      <Tag
        value={value}
        // severity={`info`}
        style={{ background: `${warna}` }}
        // icon={isPublished ? "pi pi-check-circle" : "pi pi-file"}
      />
    );
  };

  const handleSaveKategori = async (kategori) => {
    await createKategoriGaleri.mutateAsync(kategori);
    toast.current.show({
      severity: "success",
      summary: "Berhasil",
      detail: "Kategori berhasil ditambahkan",
      life: 3000,
    });
    setIsNewKategori(false);
    setKategoriBaru({ nama: "", warna: "#2196F3" });
  };

  return (
    <div className="grid">
      <div className="col-12 md:col-6">
        <div className="stat-card">
          <div>
            <small>Total Galeri</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-images text-3xl text-pink-500" />
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
            value={dataGaleris}
            selection={selectedGaleris}
            onSelectionChange={(e) => setSelectedGaleris(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} galeri"
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
              field="kategori.nama"
              header="Kategori"
              sortable
              body={kategoriBodyTemplate}
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="deskripsi"
              header="Deskripsi"
              sortable
              style={{ minWidth: "15rem" }}
            ></Column>
            <Column
              // field="gambar"
              header="Gambar"
              sortable
              body={imageBodyTemplate}
              style={{ minWidth: "12rem" }}
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
            visible={galeriDialog}
            style={{ width: "600px" }}
            header={galeri.id ? "Edit Galeri" : "Tambah Galeri Baru"}
            modal
            className="p-fluid"
            footer={galeriDialogFooter}
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
                paddingBottom: "60rem",
              }}
            >
              {/* Header Info */}
              <div
                className="info-message"
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <i
                  className="pi pi-info-circle"
                  style={{ color: "#2196F3", fontSize: "1.2rem" }}
                ></i>
                <small style={{ color: "#0d47a1" }}>
                  Unggah gambar untuk melengkapi koleksi galeri Anda. Format
                  yang didukung: JPG, PNG, GIF (Maks. 2MB)
                </small>
              </div>

              {/* Image Upload Section - Moved to top for better visibility */}
              <div className="form-section">
                <h4
                  className="a"
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
                    className="pi pi-image"
                    style={{ fontSize: "1.2rem", color: "#2196F3" }}
                  ></i>
                  Upload Gambar
                  <span
                    className="required-badge"
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: "#ffebee",
                      color: "#c62828",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Wajib
                  </span>
                </h4>

                <div className="field">
                  <div
                    className="upload-area"
                    style={{
                      border: `2px dashed ${gambarPreview ? "#4caf50" : "#dee2e6"}`,
                      borderRadius: "8px",
                      padding: gambarPreview ? "1rem" : "2rem",
                      textAlign: "center",
                      backgroundColor: "#0000",
                      cursor: "pointer",
                      transition: "all 0.2s",
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
                    <>
                      <FileUpload
                        ref={inputRef}
                        mode="basic"
                        accept="image/*"
                        name="gambar"
                        type="file"
                        maxFileSize={2000000}
                        chooseLabel={`${gambarPreview ? "Ganti Gambar" : "Pilih Gambar"}`}
                        auto
                        onSelect={onFileChange}
                        className="custom-fileupload mb-3"
                      />
                    </>
                    {!gambarPreview ? (
                      <>
                        {/* <input
                          type="file"
                          ref={inputRef}
                          hidden
                          accept="image/*"
                          onChange={onFileChange}
                        /> */}

                        <div
                          style={{
                            marginTop: "1rem",
                            color: "#6c757d",
                            fontSize: "0.85rem",
                          }}
                        >
                          <i
                            className="pi pi-cloud-upload"
                            style={{
                              marginRight: "0.25rem",
                              fontSize: "1.5rem",
                              display: "block",
                              marginBottom: "0.5rem",
                            }}
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
                          Format: JPG, PNG, GIF (Maks. 2MB • Rekomendasi:
                          1200x800px)
                        </small>
                      </>
                    ) : (
                      <div className="preview-section">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "1rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <i
                              className="pi pi-check-circle"
                              style={{ color: "#4caf50", fontSize: "1.2rem" }}
                            ></i>
                            <span
                              style={{ fontWeight: "500", color: "#2e7d32" }}
                            >
                              Gambar berhasil dipilih
                            </span>
                          </div>
                          {/* <Button
                            label="Ganti"
                            icon="pi pi-refresh"
                            severity="info"
                            outlined
                            size="small"
                            onClick={() => {
                              console.log(inputRef.current);
                              // Trigger file upload again
                              document
                                .querySelector(".custom-fileupload")
                                ?.click();
                            }}
                          /> */}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <Image
                            src={gambarPreview}
                            alt="Preview"
                            width="100%"
                            height="auto"
                            preview
                            style={{
                              maxHeight: "250px",
                              objectFit: "contain",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Information Section */}
              <div className="form-section" style={{ marginTop: "1.5rem" }}>
                <h4
                  className="a"
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
                    className="pi pi-info-circle"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  Informasi Galeri
                </h4>

                {/* Judul Field */}
                <div className="field">
                  <label htmlFor="judul">
                    Judul Gambar
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
                      Opsional
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-tag"></i>
                    </span>
                    <InputText
                      id="judul"
                      value={galeri.judul}
                      onChange={(e) => onInputChange(e, "judul")}
                      placeholder="Contoh: Kegiatan Workshop 2024"
                      maxLength={100}
                    />
                  </div>
                  {galeri.judul && (
                    <small
                      style={{
                        display: "block",
                        textAlign: "right",
                        color: "#6c757d",
                        marginTop: "0.25rem",
                      }}
                    >
                      {galeri.judul.length}/100
                    </small>
                  )}
                </div>

                {/* Deskripsi Field */}
                <div className="field" style={{ marginTop: "1rem" }}>
                  <label htmlFor="deskripsi">
                    Deskripsi
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
                      Opsional
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-align-left"></i>
                    </span>
                    <InputTextarea
                      id="deskripsi"
                      value={galeri.deskripsi}
                      onChange={(e) => onInputChange(e, "deskripsi")}
                      rows={3}
                      placeholder="Tambahkan deskripsi atau cerita di balik gambar ini..."
                      maxLength={500}
                      autoResize
                    />
                  </div>
                  {galeri.deskripsi && (
                    <small
                      style={{
                        display: "block",
                        textAlign: "right",
                        color: "#6c757d",
                        marginTop: "0.25rem",
                      }}
                    >
                      {galeri.deskripsi.length}/500
                    </small>
                  )}
                </div>
              </div>

              {/* Category Section */}
              <div className="form-section" style={{ marginTop: "1.5rem" }}>
                <h4
                  className="a"
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
                    className="pi pi-folder"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                  Kategori
                  <span
                    className="required-badge"
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: "#ffebee",
                      color: "#c62828",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Wajib
                  </span>
                </h4>

                <div className="field">
                  {!isNewKategori ? (
                    <>
                      <label
                        htmlFor="kategori"
                        style={{ marginBottom: "0.5rem", display: "block" }}
                      >
                        Pilih Kategori
                      </label>

                      <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-folder-open"></i>
                        </span>
                        <Dropdown
                          value={galeri.kategori.id || galeri.kategori}
                          options={kategoriOptions}
                          placeholder="Pilih Kategori"
                          className={classNames({
                            "w-full": true,
                            "p-invalid": submitted && !galeri.kategori,
                          })}
                          onChange={(e) => {
                            onInputChange(e, "kategori");
                          }}
                          optionLabel="label"
                          optionValue="value"
                          valueTemplate={(option) => {
                            console.log("option", option);
                            const namaKategori = kategoriGaleris.find(
                              (k) => k.id === option?.value,
                            );
                            console.log(namaKategori);
                            if (option && option.nama) {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "12px",
                                      height: "12px",
                                      borderRadius: "4px",
                                      backgroundColor:
                                        option.warna || "#2196F3",
                                      display: "inline-block",
                                    }}
                                  ></span>
                                  <span>{option.nama}</span>
                                </div>
                              );
                            }
                            return (
                              <span>
                                {namaKategori?.nama && namaKategori?.warna
                                  ? `${namaKategori.nama} - ${namaKategori.warna}`
                                  : "Pilih Kategori"}
                              </span>
                            );
                          }}
                          itemTemplate={(option) => {
                            console.log("item", option);
                            const namaKategori = kategoriGaleris.find(
                              (k) => k.id === option?.value,
                            );
                            console.log("nama", namaKategori);

                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  padding: "0.25rem 0",
                                }}
                              >
                                <span
                                  style={{
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "4px",
                                    backgroundColor:
                                      namaKategori.warna || "#2196F3",
                                    display: "inline-block",
                                  }}
                                ></span>
                                <span>{namaKategori.nama}</span>
                              </div>
                            );
                          }}
                        />
                      </div>

                      {submitted && !galeri.kategori && (
                        <small className="p-error">
                          <i
                            className="pi pi-exclamation-circle"
                            style={{ marginRight: "0.25rem" }}
                          ></i>
                          Kategori harus dipilih
                        </small>
                      )}

                      <div
                        style={{
                          marginTop: "0.75rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <small
                          className="field-hint"
                          style={{ color: "#6c757d" }}
                        >
                          Pilih kategori yang sesuai untuk gambar ini
                        </small>
                        <Button
                          label="Tambah Kategori Baru"
                          icon="pi pi-plus"
                          text
                          size="small"
                          onClick={() => setIsNewKategori(true)}
                          className="p-button-sm"
                          style={{ border: "1px solid #6c757d" }}
                        />
                      </div>
                    </>
                  ) : (
                    <div
                      className="new-category-form"
                      style={{
                        // backgroundColor: "#f8f9fa",
                        padding: "1.5rem",
                        borderRadius: "8px",
                        border: "1px solid #e9ecef",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <i
                          className="pi pi-plus-circle"
                          style={{ color: "#2196F3" }}
                        ></i>
                        <h5 style={{ margin: 0, color: "#495057" }}>
                          Tambah Kategori Baru
                        </h5>
                      </div>

                      {/* Nama Kategori */}
                      <div className="field" style={{ marginBottom: "1rem" }}>
                        <label
                          htmlFor="kategoriBaruNama"
                          className="required-field"
                        >
                          Nama Kategori
                          <span
                            className="asterisk"
                            style={{ color: "red", marginLeft: "0.25rem" }}
                          >
                            *
                          </span>
                        </label>
                        <InputText
                          id="kategoriBaruNama"
                          className="w-full"
                          placeholder="Contoh: Acara, Produk, Kegiatan"
                          value={kategoriBaru.nama}
                          onChange={(e) =>
                            setKategoriBaru({
                              ...kategoriBaru,
                              nama: e.target.value,
                            })
                          }
                          maxLength={50}
                        />
                      </div>

                      {/* Warna Kategori */}
                      <div className="field" style={{ marginBottom: "1.5rem" }}>
                        <label>
                          Warna Kategori
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
                            Opsional
                          </span>
                        </label>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <ColorPicker
                            value={kategoriBaru.warna}
                            onChange={(e) =>
                              setKategoriBaru({
                                ...kategoriBaru,
                                warna: e.value?.startsWith("#")
                                  ? e.value
                                  : `#${e.value}`,
                              })
                            }
                            format="hex"
                            style={{ width: "50px", height: "35px" }}
                          />

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              flex: 1,
                            }}
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "6px",
                                backgroundColor:
                                  kategoriBaru.warna || "#2196F3",
                                border: "2px solid #fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            ></div>
                            <InputText
                              value={kategoriBaru.warna || "#2196F3"}
                              onChange={(e) =>
                                setKategoriBaru({
                                  ...kategoriBaru,
                                  warna: e.target.value,
                                })
                              }
                              placeholder="#HEX"
                              style={{ width: "100px" }}
                            />
                          </div>

                          <span
                            className="px-3 py-1 rounded text-0"
                            style={{
                              background: kategoriBaru.warna || "#2196F3",
                              padding: "0.25rem 1rem",
                              borderRadius: "4px",
                              fontWeight: "500",
                            }}
                          >
                            Preview
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          label="Batal"
                          icon="pi pi-times"
                          severity="secondary"
                          outlined
                          size="small"
                          onClick={() => {
                            setIsNewKategori(false);
                            setKategoriBaru({ nama: "", warna: "#2196F3" });
                          }}
                        />
                        <Button
                          label="Simpan Kategori"
                          icon="pi pi-check"
                          severity="success"
                          size="small"
                          onClick={() => handleSaveKategori(kategoriBaru)}
                          disabled={!kategoriBaru.nama}
                        />
                      </div>

                      <div style={{ marginTop: "0.75rem" }}>
                        <small
                          className="cursor-pointer text-blue-500"
                          onClick={() => setIsNewKategori(false)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <i
                            className="pi pi-arrow-left"
                            style={{ fontSize: "0.75rem" }}
                          ></i>
                          Kembali ke daftar kategori
                        </small>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Existing Categories Quick View */}
              {!isNewKategori && kategoriOptions?.length > 0 && (
                <div className="form-section" style={{ marginTop: "1rem" }}>
                  <div
                    style={{
                      // backgroundColor: "#f8f9fa",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <i
                        className="pi pi-tags"
                        style={{ color: "#6c757d" }}
                      ></i>
                      <span style={{ color: "#495057", fontWeight: "500" }}>
                        Kategori Tersedia:
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      {kategoriOptions.map(
                        (kat) => (
                          console.log("kat", kat),
                          (
                            <span
                              key={kat.value}
                              onClick={() =>
                                onInputChangeKat(kat.value, "kategori")
                              }
                              style={{
                                padding: "0.25rem 0.75rem",
                                backgroundColor:
                                  kategoriGaleris.find(
                                    (k) => k.id === kat.value,
                                  )?.warna || "#e9ecef",
                                color: kategoriGaleris.find(
                                  (k) => k.id === kat.value,
                                ).warna
                                  ? "#000"
                                  : "#fff",
                                borderRadius: "16px",
                                fontSize: "0.8rem",
                                cursor: "pointer",
                                transition: "opacity 0.2s",
                                opacity: 1,
                                fontWeight: "600",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.opacity = "1")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.opacity =
                                  galeri.kategori === kat.id ? 1 : 0.7)
                              }
                            >
                              {
                                kategoriGaleris.find((k) => k.id === kat.value)
                                  .nama
                              }
                            </span>
                          )
                        ),
                      )}
                      {/* {kategoriOptions.length > 5 && (
                        <span style={{ color: "#6c757d", fontSize: "0.8rem" }}>
                          +{kategoriOptions.length - 5} lainnya
                        </span>
                      )} */}
                    </div>
                  </div>
                </div>
              )}

              {/* Metadata for existing gallery items */}
              {galeri.id && (
                <div className="form-section" style={{ marginTop: "1.5rem" }}>
                  <div
                    style={{
                      // backgroundColor: "#f8f9fa",
                      padding: "0.75rem 1rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      color: "#6c757d",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <i
                        className="pi pi-calendar"
                        style={{ marginRight: "0.5rem" }}
                      ></i>
                      Ditambahkan:{" "}
                      {galeri.createdAt
                        ? new Date(galeri.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </span>
                    <span>
                      <i
                        className="pi pi-hashtag"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      ID: {galeri.id}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Styles */}
            <style jsx>{`
              .field {
                margin-bottom: 1rem;
              }

              .field label {
                font-weight: 500;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
                font-size: 0.9rem;
              }

              .required-field:after {
                content: "*";
                color: red;
                margin-left: 0.25rem;
              }

              .p-inputgroup {
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
              }

              .p-inputgroup-addon {
                border-right: none;
              }

              .p-inputgroup input,
              .p-inputgroup textarea,
              .p-inputgroup .p-dropdown {
                border-left: none;
              }

              .p-inputgroup input:focus,
              .p-inputgroup textarea:focus,
              .p-inputgroup .p-dropdown:focus {
                box-shadow: none;
                border-color: #2196f3;
              }

              .upload-area:hover {
                border-color: #2196f3 !important;
              }

              .custom-fileupload .p-button {
                background: #2196f3;
                border: none;
                padding: 0.75rem 2rem;
              }

              .custom-fileupload .p-button:hover {
                background: #1976d2;
              }
            `}</style>
          </Dialog>

          <Dialog
            visible={deleteGaleriDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteGaleriDialogFooter}
            onHide={hideDeleteGaleriDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {galeri && (
                <span>
                  Apakah Anda yakin ingin menghapus <b>{galeri.judul}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteGalerisDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteGalerisDialogFooter}
            onHide={hideDeleteGalerisDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah Anda yakin ingin menghapus galeri yang dipilih?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default GaleriCrudPage;
