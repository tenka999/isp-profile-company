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
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useLayananApi } from "@/presentation/logics/app/useLayananApi";

import "../../../../styles/app.css";

const MAX_BENEFIT = 10;

const LayananCrudPage = () => {
  let emptyLayanan = {
    id: null,
    namaLayanan: "",
    hargaBulanan: 0,
    biayaInstalasi: 0,
    kecepatanMbps: 0,
    deskripsi: "",
    status: "AKTIF",
  };

  const [layanans, setLayanans] = useState([]);
  const [layananDialog, setLayananDialog] = useState(false);
  const [deleteLayananDialog, setDeleteLayananDialog] = useState(false);
  const [deleteLayanansDialog, setDeleteLayanansDialog] = useState(false);
  const [layanan, setLayanan] = useState(emptyLayanan);
  const [selectedLayanans, setSelectedLayanans] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLayanans, setDataLayanans] = useState([]);

  // State untuk dynamic benefit inputs
  const [benefits, setBenefits] = useState([{ nama_benefit: "" }]);

  const toast = useRef(null);
  const dt = useRef(null);

  const statusOptions = [
    { label: "Aktif", value: "AKTIF" },
    { label: "Non-Aktif", value: "NONAKTIF" },
  ];

  const {
    useAllLayanan,
    createLayanan,
    updateLayanan,
    deleteLayanan,
    deleteLayanans,
  } = useLayananApi();

  const { data, isPending } = useAllLayanan();

  useEffect(() => {
    fetchLayanans();
  }, [data]);

  const fetchLayanans = async () => {
    try {
      setLoading(true);
      setLayanans(data);
      setDataLayanans(data);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data layanan",
        life: 3000,
      });
      setLoading(false);
    }
  };

  // ─── BENEFIT HANDLERS ────────────────────────────────────────────────────────

  const addBenefit = () => {
    if (benefits.length >= MAX_BENEFIT) return;
    setBenefits([...benefits, { nama_benefit: "" }]);
  };

  const removeBenefit = (index) => {
    if (benefits.length === 1) return; // minimal 1 benefit
    const updated = benefits.filter((_, i) => i !== index);
    setBenefits(updated);
  };

  const onBenefitChange = (value, index) => {
    console.log(value, index);
    const updated = benefits.map((b, i) =>
      i === index ? { ...b, nama_benefit: value } : b,
    );
    setBenefits(updated);
  };
  const onBenefitChangee = (value, index) => {
    console.log(value, index);
    const updated = benefits.map((b, i) => console.log(b, i));
    console.log(updated);
  };

  // ─── EXPORT ──────────────────────────────────────────────────────────────────

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `layanan_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedLayanans?.length > 0,
    });
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataLayanans);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Layanan");
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
    autoTable(doc, {
      head: [
        [
          "Nama Layanan",
          "Harga Bulanan",
          "Biaya Instalasi",
          "Kecepatan",
          "Status",
        ],
      ],
      body: dataLayanans.map((item) => [
        item.namaLayanan,
        `Rp ${item.hargaBulanan?.toLocaleString("id-ID")}`,
        `Rp ${item.biayaInstalasi?.toLocaleString("id-ID")}`,
        `${item.kecepatanMbps} Mbps`,
        item.status,
      ]),
    });
    doc.save(`${getFileName()}.pdf`);
  };

  const exportItems = [
    { label: "CSV", icon: "pi pi-file", command: exportCSV },
    { label: "Excel", icon: "pi pi-file-excel", command: exportExcel },
    { label: "PDF", icon: "pi pi-file-pdf", command: exportPDF },
  ];

  // ─── STATS ───────────────────────────────────────────────────────────────────

  const totalLayanans = layanans?.length || 0;
  const activeLayanans =
    layanans?.filter((l) => l.status === "AKTIF").length || 0;
  const inactiveLayanans =
    layanans?.filter((l) => l.status === "NONAKTIF").length || 0;
  const selectedCount = selectedLayanans?.length || 0;

  const totalAnim = useCountUp(totalLayanans);
  const activeAnim = useCountUp(activeLayanans);
  const inactiveAnim = useCountUp(inactiveLayanans);
  const selectedAnim = useCountUp(selectedCount);

  // ─── DIALOG CONTROLS ─────────────────────────────────────────────────────────

  const openNew = () => {
    setLayanan(emptyLayanan);
    setBenefits([{ nama_benefit: "" }]);
    setSubmitted(false);
    setLayananDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setLayananDialog(false);
  };

  const hideDeleteLayananDialog = () => {
    setDeleteLayananDialog(false);
  };

  const hideDeleteLayanansDialog = () => {
    setDeleteLayanansDialog(false);
  };

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  const saveLayanan = async () => {
    setSubmitted(true);

    if (layanan.namaLayanan.trim() && layanan.deskripsi.trim()) {
      let _layanans = [...layanans];

      // Filter benefit yang tidak kosong
      const filteredBenefits = benefits.filter(
        (b) => b.nama_benefit.trim() !== "",
      );

      const payload = {
        ...layanan,
        benefit: filteredBenefits,
      };

      try {
        if (layanan.id) {
          const response = await updateLayanan.mutateAsync({
            id: layanan.id,
            payload,
          });
          const updated = response?.data ?? response;
          _layanans[_layanans.findIndex((val) => val.id === layanan.id)] =
            updated;
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: response?.message ?? "Layanan berhasil diupdate",
            life: 3000,
          });
        } else {
          const result = await createLayanan.mutateAsync(payload);
          console.log("payload", result);
          const newLayanan = result?.data ?? result;
          _layanans.push(newLayanan);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: result?.message ?? "Layanan berhasil ditambahkan",
            life: 3000,
          });
        }

        setLayanans(_layanans);
        setLayananDialog(false);
        setLayanan(emptyLayanan);
        setBenefits([{ nama_benefit: "" }]);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan layanan",
          life: 3000,
        });
      }
    }
  };

  const editLayanan = (rowData) => {
    setLayanan({ ...rowData });
    // Populate benefits dari data layanan yang sudah ada
    if (rowData.benefit && rowData.benefit.length > 0) {
      setBenefits(rowData.benefit.map((b) => ({ ...b })));
    } else {
      setBenefits([{ nama_benefit: "" }]);
    }
    setLayananDialog(true);
  };

  const confirmDeleteLayanan = (rowData) => {
    setLayanan(rowData);
    setDeleteLayananDialog(true);
  };

  const deleteLayananItem = async () => {
    try {
      const response = await deleteLayanan.mutateAsync({ id: layanan.id });
      let _layanans = layanans.filter((val) => val.id !== layanan.id);
      setLayanans(_layanans);
      setDeleteLayananDialog(false);
      setLayanan(emptyLayanan);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: response?.message ?? "Layanan berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus layanan",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteLayanansDialog(true);
  };

  const deleteSelectedLayanans = async () => {
    try {
      const ids = selectedLayanans.map((val) => val.id);
      const response = await deleteLayanans.mutateAsync({ ids });
      let _layanans = layanans.filter((val) => !selectedLayanans.includes(val));
      setLayanans(_layanans);
      setDeleteLayanansDialog(false);
      setSelectedLayanans(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Layanan yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus layanan yang dipilih",
        life: 3000,
      });
    }
  };

  // ─── INPUT HANDLERS ──────────────────────────────────────────────────────────

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _layanan = { ...layanan };
    _layanan[name] = val;
    setLayanan(_layanan);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value ?? 0;
    let _layanan = { ...layanan };
    _layanan[name] = val;
    setLayanan(_layanan);
  };

  // ─── FILTER ──────────────────────────────────────────────────────────────────

  const applyFilter = (filters) => {
    const filtered = layanans.filter((item) => {
      const statusMatch = filters.status
        ? filters.status === "all"
          ? true
          : item.status === filters.status
        : true;
      return statusMatch;
    });
    setDataLayanans(filtered);
  };

  // ─── BODY TEMPLATES ──────────────────────────────────────────────────────────

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status === "AKTIF" ? "Aktif" : "Non-Aktif"}
        severity={rowData.status === "AKTIF" ? "success" : "danger"}
        icon={
          rowData.status === "AKTIF"
            ? "pi pi-check-circle"
            : "pi pi-times-circle"
        }
      />
    );
  };

  const hargaBodyTemplate = (rowData) => {
    return `Rp ${rowData.hargaBulanan?.toLocaleString("id-ID")}`;
  };

  const instalasiBodyTemplate = (rowData) => {
    return `Rp ${rowData.biayaInstalasi?.toLocaleString("id-ID")}`;
  };

  const kecepatanBodyTemplate = (rowData) => {
    return `${rowData.kecepatanMbps} Mbps`;
  };

  const benefitBodyTemplate = (rowData) => {
    if (!rowData.benefit || rowData.benefit.length === 0) {
      return <span className="text-400">-</span>;
    }
    return (
      <div className="flex flex-wrap gap-1">
        {rowData.benefit.map((b, i) => (
          <Tag
            key={i}
            value={b.nama_benefit}
            severity="info"
            icon="pi pi-check"
            className="text-xs"
          />
        ))}
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return rowData.createdAt
      ? new Date(rowData.createdAt).toLocaleDateString("id-ID")
      : "";
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editLayanan(rowData)}
          tooltip="Edit"
          tooltipOptions={{ position: "top" }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteLayanan(rowData)}
          tooltip="Hapus"
          tooltipOptions={{ position: "top" }}
        />
      </div>
    );
  };

  // ─── TOOLBAR ─────────────────────────────────────────────────────────────────

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
          disabled={!selectedLayanans || !selectedLayanans.length}
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

  // ─── HEADER ──────────────────────────────────────────────────────────────────

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Kelola Layanan</h4>
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

  // ─── DIALOG FOOTERS ──────────────────────────────────────────────────────────

  const layananDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveLayanan} />
    </React.Fragment>
  );

  const deleteLayananDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteLayananDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteLayananItem}
      />
    </React.Fragment>
  );

  const deleteLayanansDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteLayanansDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedLayanans}
      />
    </React.Fragment>
  );

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="grid">
      {/* ── STAT CARDS ── */}
      <div className="col-12 md:col-3">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "all" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Total Layanan</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-server text-3xl text-blue-500" />
        </div>
      </div>

      <div className="col-12 md:col-3">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "AKTIF" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Aktif</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-green-500">{activeAnim}</h3>
            </div>
          </div>
          <i className="pi pi-check-circle text-3xl text-green-500" />
        </div>
      </div>

      <div className="col-12 md:col-3">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "NONAKTIF" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Non-Aktif</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-red-500">{inactiveAnim}</h3>
            </div>
          </div>
          <i className="pi pi-times-circle text-3xl text-red-500" />
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

      {/* ── TABLE CARD ── */}
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          />

          <DataTable
            ref={dt}
            value={dataLayanans}
            selection={selectedLayanans}
            onSelectionChange={(e) => setSelectedLayanans(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} layanan"
            globalFilter={globalFilter}
            header={header}
            loading={loading}
          >
            <Column selectionMode="multiple" exportable={false} />
            <Column
              field="id"
              header="ID"
              sortable
              style={{ minWidth: "4rem" }}
            />
            <Column
              field="namaLayanan"
              header="Nama Layanan"
              sortable
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="hargaBulanan"
              header="Harga Bulanan"
              body={hargaBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="biayaInstalasi"
              header="Biaya Instalasi"
              body={instalasiBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              field="kecepatanMbps"
              header="Kecepatan"
              body={kecepatanBodyTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            />
            <Column
              header="Benefit"
              body={benefitBodyTemplate}
              style={{ minWidth: "14rem" }}
            />
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="createdAt"
              header="Dibuat Pada"
              body={createdAtBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            />
          </DataTable>

          {/* ── CREATE / EDIT DIALOG ── */}
          <Dialog
            visible={layananDialog}
            style={{ width: "650px" }}
            header={layanan.id ? "Edit Layanan" : "Tambah Layanan Baru"}
            modal
            className="p-fluid"
            footer={layananDialogFooter}
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
                // overflowY: "auto",
                padding: "0.5rem 1.5rem",
              }}
            >
              {/* Header Info */}
              <div
                className="info-message"
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <i
                  className="pi pi-info-circle"
                  style={{ color: "#2196F3", fontSize: "1.2rem" }}
                ></i>
                <div>
                  <small
                    style={{
                      color: "#0d47a1",
                      display: "block",
                      fontWeight: "500",
                    }}
                  >
                    Informasi Layanan
                  </small>
                  <small style={{ color: "#0d47a1" }}>
                    Lengkapi detail layanan internet berikut. Field dengan tanda{" "}
                    <span style={{ color: "red" }}>*</span> wajib diisi.
                  </small>
                </div>
              </div>

              {/* Basic Information Section */}
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
                    className="pi pi-tag"
                    style={{ fontSize: "1.2rem", color: "#2196F3" }}
                  ></i>
                  Informasi Dasar
                </h4>

                {/* Nama Layanan */}
                <div className="field">
                  <label htmlFor="namaLayanan" className="required-field">
                    Nama Layanan
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-wifi"></i>
                    </span>
                    <InputText
                      id="namaLayanan"
                      value={layanan.namaLayanan}
                      onChange={(e) => onInputChange(e, "namaLayanan")}
                      placeholder="Contoh: Paket Internet 50Mbps"
                      required
                      autoFocus={!layanan.id}
                      maxLength={100}
                      className={classNames({
                        "p-invalid": submitted && !layanan.namaLayanan,
                      })}
                    />
                  </div>

                  {submitted && !layanan.namaLayanan ? (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Nama layanan harus diisi
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
                        Nama paket yang akan ditampilkan ke pelanggan
                      </small>
                      <small
                        style={{
                          color:
                            layanan.namaLayanan?.length > 80
                              ? "#f59e0b"
                              : "#6c757d",
                        }}
                      >
                        {layanan.namaLayanan?.length || 0}/100
                      </small>
                    </div>
                  )}
                </div>

                {/* Deskripsi */}
                <div className="field" style={{ marginTop: "1rem" }}>
                  <label htmlFor="deskripsi" className="required-field">
                    Deskripsi Layanan
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-align-left"></i>
                    </span>
                    <InputTextarea
                      id="deskripsi"
                      value={layanan.deskripsi}
                      onChange={(e) => onInputChange(e, "deskripsi")}
                      required
                      rows={3}
                      placeholder="Jelaskan detail layanan, keunggulan, dan informasi penting lainnya..."
                      className={classNames({
                        "p-invalid": submitted && !layanan.deskripsi,
                        "w-full": true,
                      })}
                      maxLength={500}
                      autoResize
                    />
                  </div>

                  {submitted && !layanan.deskripsi ? (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Deskripsi harus diisi
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
                        Deskripsi lengkap tentang layanan ini
                      </small>
                      <small
                        style={{
                          color:
                            layanan.deskripsi?.length > 400
                              ? "#f59e0b"
                              : "#6c757d",
                        }}
                      >
                        {layanan.deskripsi?.length || 0}/500
                      </small>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing & Speed Section */}
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
                    className="pi pi-chart-line"
                    style={{ fontSize: "1.2rem", color: "#4caf50" }}
                  ></i>
                  Harga & Spesifikasi
                </h4>

                <div
                  className="grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                  }}
                >
                  {/* Harga Bulanan */}
                  <div className="field">
                    <label htmlFor="hargaBulanan" className="required-field">
                      Harga Bulanan
                      <span
                        className="asterisk"
                        style={{ color: "red", marginLeft: "0.25rem" }}
                      >
                        *
                      </span>
                    </label>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-money-bill"></i>
                      </span>
                      <InputNumber
                        id="hargaBulanan"
                        value={layanan.hargaBulanan}
                        onValueChange={(e) =>
                          onInputNumberChange(e, "hargaBulanan")
                        }
                        mode="currency"
                        currency="IDR"
                        locale="id-ID"
                        minFractionDigits={0}
                        maxFractionDigits={0}
                        placeholder="Rp 0"
                        className={classNames({
                          "p-invalid": submitted && !layanan.hargaBulanan,
                        })}
                      />
                    </div>
                    {submitted && !layanan.hargaBulanan && (
                      <small className="p-error">
                        <i
                          className="pi pi-exclamation-circle"
                          style={{ marginRight: "0.25rem" }}
                        ></i>
                        Harga bulanan harus diisi
                      </small>
                    )}
                  </div>

                  {/* Biaya Instalasi */}
                  <div className="field">
                    <label htmlFor="biayaInstalasi">
                      Biaya Instalasi
                      <span
                        className="optional-badge"
                        style={{
                          fontSize: "0.7rem",
                          backgroundColor: "#e9ecef",
                          padding: "0.15rem 0.4rem",
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
                        <i className="pi pi-wrench"></i>
                      </span>
                      <InputNumber
                        id="biayaInstalasi"
                        value={layanan.biayaInstalasi}
                        onValueChange={(e) =>
                          onInputNumberChange(e, "biayaInstalasi")
                        }
                        mode="currency"
                        currency="IDR"
                        locale="id-ID"
                        minFractionDigits={0}
                        maxFractionDigits={0}
                        placeholder="Rp 0"
                      />
                    </div>
                    <small
                      className="field-hint"
                      style={{
                        color: "#6c757d",
                        display: "block",
                        marginTop: "0.25rem",
                      }}
                    >
                      Biaya sekali di awal
                    </small>
                  </div>

                  {/* Kecepatan */}
                  <div className="field">
                    <label htmlFor="kecepatanMbps" className="required-field">
                      Kecepatan
                      <span
                        className="asterisk"
                        style={{ color: "red", marginLeft: "0.25rem" }}
                      >
                        *
                      </span>
                    </label>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-sort-amount-up"></i>
                      </span>
                      <InputNumber
                        id="kecepatanMbps"
                        value={layanan.kecepatanMbps}
                        onValueChange={(e) =>
                          onInputNumberChange(e, "kecepatanMbps")
                        }
                        suffix=" Mbps"
                        placeholder="50"
                        min={1}
                        max={1000}
                        className={classNames({
                          "p-invalid": submitted && !layanan.kecepatanMbps,
                        })}
                      />
                    </div>
                    {submitted && !layanan.kecepatanMbps && (
                      <small className="p-error">
                        <i
                          className="pi pi-exclamation-circle"
                          style={{ marginRight: "0.25rem" }}
                        ></i>
                        Kecepatan harus diisi
                      </small>
                    )}
                  </div>
                </div>

                {/* Price Summary (optional visual helper) */}
                {layanan.hargaBulanan > 0 && (
                  <div
                    style={{
                      marginTop: "0.75rem",
                      padding: "0.5rem 1rem",
                      // backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ color: "#495057" }}>
                      <i
                        className="pi pi-tag"
                        style={{ marginRight: "0.25rem", color: "#4caf50" }}
                      ></i>
                      <strong>Ringkasan:</strong>
                    </span>
                    <span>
                      Rp {layanan.hargaBulanan?.toLocaleString("id-ID")}/bulan
                    </span>
                    {layanan.biayaInstalasi > 0 && (
                      <span>
                        + Rp {layanan.biayaInstalasi?.toLocaleString("id-ID")}{" "}
                        (instalasi)
                      </span>
                    )}
                    <span>• {layanan.kecepatanMbps || 0} Mbps</span>
                  </div>
                )}
              </div>

              {/* Status Section */}
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
                    className="pi pi-power-off"
                    style={{ fontSize: "1.2rem", color: "#ff9800" }}
                  ></i>
                  Status Layanan
                </h4>

                <div className="field">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-verified"></i>
                    </span>
                    <Dropdown
                      id="status"
                      value={layanan.status}
                      options={
                        statusOptions || [
                          {
                            label: "Aktif",
                            value: "AKTIF",
                            icon: "pi pi-check-circle",
                            color: "#4caf50",
                          },
                          {
                            label: "Non-Aktif",
                            value: "NONAKTIF",
                            icon: "pi pi-ban",
                            color: "#f44336",
                          },
                        ]
                      }
                      onChange={(e) => onInputChange(e, "status")}
                      placeholder="Pilih Status Layanan"
                      className="w-full"
                      optionLabel="label"
                      optionValue="value"
                      valueTemplate={(option) => {
                        if (option) {
                          return (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <i
                                className={option.icon}
                                style={{ color: option.color }}
                              ></i>
                              <span>{option.label}</span>
                            </div>
                          );
                        }
                        return <span>{layanan.status || "Pilih Status"}</span>;
                      }}
                      itemTemplate={(option) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "0.25rem 0",
                            }}
                          >
                            <i
                              className={option.icon}
                              style={{ color: option.color }}
                            ></i>
                            <span>{option.label}</span>
                          </div>
                        );
                      }}
                    />
                  </div>

                  {/* Status Helper */}
                  {layanan.status && (
                    <div style={{ marginTop: "0.5rem" }}>
                      {layanan.status === "AKTIF" ? (
                        <div
                          style={{
                            backgroundColor: "#e8f5e9",
                            color: "#2e7d32",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          <i className="pi pi-check-circle"></i>
                          <span>
                            Layanan <strong>aktif</strong> dan dapat dipilih
                            oleh pelanggan
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{
                            backgroundColor: "#ffebee",
                            color: "#c62828",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          <i className="pi pi-ban"></i>
                          <span>
                            Layanan <strong>non-aktif</strong> dan tidak akan
                            ditampilkan ke pelanggan
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Benefits Section */}
              <div className="form-section" style={{ marginTop: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <h4
                    className="a"
                    style={{
                      margin: 0,
                      color: "#495057",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <i
                      className="pi pi-star"
                      style={{ fontSize: "1.2rem", color: "#ffc107" }}
                    ></i>
                    Benefit Layanan
                  </h4>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Tag
                      value={`${benefits.filter((b) => b.nama_benefit?.trim()).length} / ${MAX_BENEFIT}`}
                      severity={
                        benefits.filter((b) => b.nama_benefit?.trim()).length >=
                        MAX_BENEFIT
                          ? "danger"
                          : benefits.filter((b) => b.nama_benefit?.trim())
                                .length >=
                              MAX_BENEFIT - 3
                            ? "warning"
                            : "info"
                      }
                      className="px-3"
                    />
                    <Button
                      type="button"
                      icon="pi pi-plus"
                      label="Tambah Benefit"
                      size="small"
                      severity="info"
                      outlined
                      onClick={addBenefit}
                      disabled={benefits.length >= MAX_BENEFIT}
                      tooltip={
                        benefits.length >= MAX_BENEFIT
                          ? `Maksimal ${MAX_BENEFIT} benefit`
                          : `Tambah benefit (${benefits.length}/${MAX_BENEFIT})`
                      }
                      tooltipOptions={{ position: "top" }}
                    />
                  </div>
                </div>

                {/* Benefits List */}
                <div
                  className="benefits-container"
                  style={{
                    // backgroundColor: "#f8f9fa",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  {benefits.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        color: "#6c757d",
                      }}
                    >
                      <i
                        className="pi pi-star"
                        style={{
                          fontSize: "2rem",
                          opacity: 0.3,
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <p>Belum ada benefit ditambahkan</p>
                      <Button
                        type="button"
                        icon="pi pi-plus"
                        label="Tambah Benefit Pertama"
                        size="small"
                        onClick={addBenefit}
                      />
                    </div>
                  ) : (
                    benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="benefit-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom:
                            index < benefits.length - 1 ? "0.75rem" : 0,
                          padding: "0.5rem",
                          // backgroundColor: "#fff",
                          borderRadius: "6px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "6px",
                            backgroundColor: "#e3f2fd",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#1976D2",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </div>

                        <div style={{ flex: 1 }}>
                          <InputText
                            value={benefit.nama_benefit}
                            onChange={(e) =>
                              onBenefitChange(e.target.value, index)
                            }
                            placeholder={`Contoh: Streaming 4K, Unlimited FUP, dll.`}
                            className="w-full"
                            maxLength={100}
                          />
                          {benefit.nama_benefit && (
                            <small
                              style={{
                                display: "block",
                                textAlign: "right",
                                color: "#6c757d",
                                marginTop: "0.15rem",
                              }}
                            >
                              {benefit.nama_benefit.length}/100
                            </small>
                          )}
                        </div>

                        <Button
                          type="button"
                          icon="pi pi-trash"
                          rounded
                          outlined
                          severity="danger"
                          onClick={() => removeBenefit(index)}
                          disabled={benefits.length === 1}
                          tooltip="Hapus benefit"
                          tooltipOptions={{ position: "top" }}
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            flexShrink: 0,
                          }}
                        />
                      </div>
                    ))
                  )}

                  {benefits.length > 0 && benefits.length < MAX_BENEFIT && (
                    <div style={{ marginTop: "0.75rem", textAlign: "center" }}>
                      <Button
                        type="button"
                        outlined
                        icon="pi pi-plus"
                        label="Tambah Benefit Lainnya"
                        text
                        size="small"
                        onClick={addBenefit}
                        disabled={benefits.length >= MAX_BENEFIT}
                      />
                    </div>
                  )}

                  {benefits.length >= MAX_BENEFIT && (
                    <div
                      style={{
                        marginTop: "0.75rem",
                        padding: "0.5rem",
                        // backgroundColor: "#fff3e0",
                        borderRadius: "4px",
                        color: "#e65100",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                      }}
                    >
                      <i className="pi pi-exclamation-triangle"></i>
                      <span>
                        Maksimal {MAX_BENEFIT} benefit telah tercapai. Hapus
                        beberapa benefit untuk menambah yang baru.
                      </span>
                    </div>
                  )}
                </div>

                {/* Benefit Suggestions */}
                {benefits.length < MAX_BENEFIT && (
                  <div style={{ marginTop: "0.75rem" }}>
                    <small
                      style={{
                        color: "#6c757d",
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <i
                        className="pi pi-lightbulb"
                        style={{ marginRight: "0.25rem", color: "#ffc107" }}
                      ></i>
                      Saran benefit:
                    </small>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      {[
                        "Streaming 4K",
                        "Unlimited FUP",
                        "Prioritas Layanan",
                        "Anti Buffering",
                        "Gratis WiFi Mesh",
                        "24/7 Support",
                      ].map((suggestion, idx) => (
                        <span
                          key={idx}
                          onClick={() => {
                            if (benefits.length < MAX_BENEFIT) {
                              onBenefitChange(suggestion, benefits.length - 1);
                            }
                          }}
                          style={{
                            padding: "0.25rem 0.75rem",
                            backgroundColor: "#e9ecef",
                            borderRadius: "16px",
                            fontSize: "0.8rem",
                            color: "#495057",
                            cursor:
                              benefits.length < MAX_BENEFIT
                                ? "pointer"
                                : "not-allowed",
                            opacity: benefits.length < MAX_BENEFIT ? 1 : 0.5,
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            if (benefits.length < MAX_BENEFIT) {
                              e.currentTarget.style.backgroundColor = "#2196F3";
                              e.currentTarget.style.color = "white";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (benefits.length < MAX_BENEFIT) {
                              e.currentTarget.style.backgroundColor = "#e9ecef";
                              e.currentTarget.style.color = "#495057";
                            }
                          }}
                        >
                          {suggestion}
                        </span>
                      ))}
                    </div>
                    <small
                      style={{
                        color: "#6c757d",
                        display: "block",
                        marginTop: "0.25rem",
                        fontSize: "0.7rem",
                      }}
                    >
                      Klik saran di atas untuk menambah benefit dengan cepat
                    </small>
                  </div>
                )}
              </div>

              {/* Metadata for existing services */}
              {layanan.id && (
                <div className="form-section" style={{ marginTop: "1.5rem" }}>
                  <div
                    style={{
                      // backgroundColor: "#f8f9fa",
                      border: "1px solid #e9ecef",
                      padding: "0.75rem 1rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      color: "#6c757d",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <span>
                      <i
                        className="pi pi-calendar"
                        style={{ marginRight: "0.5rem" }}
                      ></i>
                      Dibuat:{" "}
                      {layanan.createdAt
                        ? new Date(layanan.createdAt).toLocaleDateString(
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
                      ID Layanan: {layanan.id}
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
                min-width: 2.5rem;
                justify-content: center;
              }

              .p-inputgroup input,
              .p-inputgroup textarea,
              .p-inputgroup .p-dropdown,
              .p-inputgroup .p-inputnumber {
                border-left: none;
              }

              .p-inputgroup input:focus,
              .p-inputgroup textarea:focus,
              .p-inputgroup .p-dropdown:focus,
              .p-inputgroup .p-inputnumber:focus {
                box-shadow: none;
                border-color: #2196f3;
              }

              .benefit-item {
                transition: all 0.2s;
              }

              .benefit-item:hover {
                transform: translateX(2px);
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
              }

              .benefit-suggestion span:hover {
                transform: translateY(-1px);
                cursor: pointer;
              }
            `}</style>
          </Dialog>

          {/* ── CONFIRM DELETE SINGLE ── */}
          <Dialog
            visible={deleteLayananDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteLayananDialogFooter}
            onHide={hideDeleteLayananDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {layanan && (
                <span>
                  Apakah Anda yakin ingin menghapus <b>{layanan.namaLayanan}</b>
                  ?
                </span>
              )}
            </div>
          </Dialog>

          {/* ── CONFIRM DELETE MULTIPLE ── */}
          <Dialog
            visible={deleteLayanansDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteLayanansDialogFooter}
            onHide={hideDeleteLayanansDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah Anda yakin ingin menghapus layanan yang dipilih?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default LayananCrudPage;
