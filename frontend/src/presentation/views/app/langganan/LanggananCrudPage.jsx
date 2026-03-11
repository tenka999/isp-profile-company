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
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Calendar } from "primereact/calendar";
import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useLanggananApi } from "@/presentation/logics/app/useLanggananApi";
import { useUserApi } from "@/presentation/logics/app/user";
import { useLayananApi } from "@/presentation/logics/app/useLayananApi";

import "../../../../styles/app.css";

const LanggananCrudPage = () => {
  let emptyLangganan = {
    id: null,
    userId: null,
    layananId: null,
    alamatPemasangan: "",
    status: "PENDING",
  };

  const [langganans, setLangganans] = useState([]);
  const [langgananDialog, setLanggananDialog] = useState(false);
  const [deleteLanggananDialog, setDeleteLanggananDialog] = useState(false);
  const [deleteLangganansDialog, setDeleteLangganansDialog] = useState(false);
  const [langganan, setLangganan] = useState(emptyLangganan);
  const [selectedLangganans, setSelectedLangganans] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLangganans, setDataLangganans] = useState([]);

  // State untuk relasi dropdown
  const [users, setUsers] = useState([]);
  const [layanans, setLayanans] = useState([]);

  const toast = useRef(null);
  const dt = useRef(null);

  const statusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "Diproses", value: "DIPROSES" },
    { label: "Diterima", value: "DITERIMA" },
    { label: "Ditolak", value: "DITOLAK" },
  ];

  const {
    useAllLangganan,
    createLangganan,
    updateLangganan,
    deleteLangganan,
    deleteLangganans,
  } = useLanggananApi();

  const { useAllUsers } = useUserApi();
  const { useAllLayanan } = useLayananApi();

  const { data: langgananData, isPending: langgananPending } =
    useAllLangganan();
  const { data: userData } = useAllUsers();
  const { data: layananData } = useAllLayanan();

  useEffect(() => {
    fetchLangganans();
  }, [langgananData]);

  useEffect(() => {
    if (userData) {
      setUsers(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (layananData) {
      setLayanans(layananData);
    }
  }, [layananData]);

  const fetchLangganans = async () => {
    try {
      setLoading(true);
      setLangganans(langgananData);
      setDataLangganans(langgananData);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data langganan",
        life: 3000,
      });
      setLoading(false);
    }
  };

  // ─── DROPDOWN OPTIONS ─────────q───────────────────────────────────────────────

  const userOptions =
    users?.map((u) => ({
      label: `${u.nama} (${u.email})`,
      value: u.id,
    })) || [];

  const layananOptionsFilter =
    layanans?.filter((l) => l.status === "AKTIF") || [];

  const layananOptions =
    layananOptionsFilter?.map((l) => ({
      label: `${l.namaLayanan} - ${l.kecepatanMbps} Mbps`,
      value: l.id,
    })) || [];

  // ─── EXPORT ──────────────────────────────────────────────────────────────────

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `langganan_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedLangganans?.length > 0,
    });
  };

  const exportExcel = () => {
    const exportData = dataLangganans.map((item) => ({
      ID: item.id,
      User: item.user?.nama || "-",
      Layanan: item.layanan?.namaLayanan || "-",
      Alamat: item.alamatPemasangan,
      Status: item.status,
      "Tanggal Pengajuan": item.tanggalPengajuan
        ? new Date(item.tanggalPengajuan).toLocaleDateString("id-ID")
        : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Langganan");
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
      head: [["User", "Layanan", "Alamat", "Status", "Tanggal"]],
      body: dataLangganans.map((item) => [
        item.user?.nama || "-",
        item.layanan?.namaLayanan || "-",
        item.alamatPemasangan,
        item.status,
        item.tanggalPengajuan
          ? new Date(item.tanggalPengajuan).toLocaleDateString("id-ID")
          : "-",
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

  const totalLangganans = langganans?.length || 0;
  const pendingCount =
    langganans?.filter((l) => l.status === "PENDING").length || 0;
  const diprosesCount =
    langganans?.filter((l) => l.status === "DIPROSES").length || 0;
  const diterimaCount =
    langganans?.filter((l) => l.status === "DITERIMA").length || 0;
  const ditolakCount =
    langganans?.filter((l) => l.status === "DITOLAK").length || 0;
  const selectedCount = selectedLangganans?.length || 0;

  const totalAnim = useCountUp(totalLangganans);
  const pendingAnim = useCountUp(pendingCount);
  const diprosesAnim = useCountUp(diprosesCount);
  const diterimaAnim = useCountUp(diterimaCount);
  const ditolakAnim = useCountUp(ditolakCount);
  const selectedAnim = useCountUp(selectedCount);

  // ─── DIALOG CONTROLS ─────────────────────────────────────────────────────────

  const openNew = () => {
    setLangganan(emptyLangganan);
    setSubmitted(false);
    setLanggananDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setLanggananDialog(false);
  };

  const hideDeleteLanggananDialog = () => {
    setDeleteLanggananDialog(false);
  };

  const hideDeleteLangganansDialog = () => {
    setDeleteLangganansDialog(false);
  };

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  const saveLangganan = async () => {
    setSubmitted(true);

    if (
      langganan.userId &&
      langganan.layananId &&
      langganan.alamatPemasangan.trim()
    ) {
      let _langganans = [...langganans];
      const payload = { ...langganan };

      try {
        if (langganan.id) {
          const response = await updateLangganan.mutateAsync({
            id: langganan.id,
            payload,
          });
          const updated = response?.data ?? response;
          _langganans[_langganans.findIndex((val) => val.id === langganan.id)] =
            updated;
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: response?.message ?? "Langganan berhasil diupdate",
            life: 3000,
          });
        } else {
          const result = await createLangganan.mutateAsync(payload);
          const newLangganan = result?.data ?? result;
          _langganans.push(newLangganan);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: result?.message ?? "Langganan berhasil ditambahkan",
            life: 3000,
          });
        }

        setLangganans(_langganans);
        setLanggananDialog(false);
        setLangganan(emptyLangganan);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan langganan",
          life: 3000,
        });
      }
    }
  };

  const editLangganan = (rowData) => {
    setLangganan({ ...rowData });
    setLanggananDialog(true);
  };

  const confirmDeleteLangganan = (rowData) => {
    setLangganan(rowData);
    setDeleteLanggananDialog(true);
  };

  const deleteLanggananItem = async () => {
    try {
      const response = await deleteLangganan.mutateAsync({ id: langganan.id });
      let _langganans = langganans.filter((val) => val.id !== langganan.id);
      setLangganans(_langganans);
      setDeleteLanggananDialog(false);
      setLangganan(emptyLangganan);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: response?.message ?? "Langganan berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus langganan",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteLangganansDialog(true);
  };

  const deleteSelectedLangganans = async () => {
    try {
      const ids = selectedLangganans.map((val) => val.id);
      const response = await deleteLangganans.mutateAsync({ ids });
      let _langganans = langganans.filter(
        (val) => !selectedLangganans.includes(val),
      );
      setLangganans(_langganans);
      setDeleteLangganansDialog(false);
      setSelectedLangganans(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Langganan yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus langganan yang dipilih",
        life: 3000,
      });
    }
  };

  // ─── INPUT HANDLERS ──────────────────────────────────────────────────────────

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _langganan = { ...langganan };
    _langganan[name] = val;
    setLangganan(_langganan);
  };

  // ─── FILTER ──────────────────────────────────────────────────────────────────

  const applyFilter = (filters) => {
    const filtered = langganans.filter((item) => {
      const statusMatch = filters.status
        ? filters.status === "all"
          ? true
          : item.status === filters.status
        : true;
      return statusMatch;
    });
    setDataLangganans(filtered);
  };

  // ─── BODY TEMPLATES ──────────────────────────────────────────────────────────

  const statusBodyTemplate = (rowData) => {
    const statusConfig = {
      PENDING: { label: "Pending", severity: "warning", icon: "pi-clock" },
      DIPROSES: {
        label: "Diproses",
        severity: "info",
        icon: "pi-spin pi-spinner",
      },
      DITERIMA: {
        label: "Diterima",
        severity: "success",
        icon: "pi-check-circle",
      },
      DITOLAK: {
        label: "Ditolak",
        severity: "danger",
        icon: "pi-times-circle",
      },
    };

    const config = statusConfig[rowData.status] || statusConfig.PENDING;

    return (
      <Tag value={config.label} severity={config.severity} icon={config.icon} />
    );
  };

  const userBodyTemplate = (rowData) => {
    if (!rowData.user) return <span className="text-400">-</span>;
    return (
      <div className="flex flex-column gap-1">
        <span className="font-semibold">{rowData.user.nama}</span>
        <small className="text-500">{rowData.user.email}</small>
      </div>
    );
  };

  const layananBodyTemplate = (rowData) => {
    if (!rowData.layanan) return <span className="text-400">-</span>;
    return (
      <div className="flex flex-column gap-1">
        <span className="font-semibold">{rowData.layanan.namaLayanan}</span>
        <small className="text-500">
          {rowData.layanan.kecepatanMbps} Mbps - Rp{" "}
          {rowData.layanan.hargaBulanan?.toLocaleString("id-ID")}
        </small>
      </div>
    );
  };

  const alamatBodyTemplate = (rowData) => {
    return (
      <div style={{ maxWidth: "200px" }}>
        <span className="text-sm">{rowData.alamatPemasangan}</span>
      </div>
    );
  };

  const tanggalBodyTemplate = (rowData) => {
    return rowData.tanggalPengajuan
      ? new Date(rowData.tanggalPengajuan).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "-";
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editLangganan(rowData)}
          tooltip="Edit"
          tooltipOptions={{ position: "top" }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteLangganan(rowData)}
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
          disabled={!selectedLangganans || !selectedLangganans.length}
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
      <h4 className="m-0">Kelola Langganan</h4>
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

  const langgananDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveLangganan} />
    </React.Fragment>
  );

  const deleteLanggananDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteLanggananDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteLanggananItem}
      />
    </React.Fragment>
  );

  const deleteLangganansDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteLangganansDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedLangganans}
      />
    </React.Fragment>
  );

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="grid">
      {/* ── STAT CARDS ── */}
      <div className="col-12 md:col-6 lg:col-2">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "all" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Total</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-users text-3xl text-blue-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-2">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "PENDING" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Pending</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-orange-500">{pendingAnim}</h3>
            </div>
          </div>
          <i className="pi pi-clock text-3xl text-orange-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-2">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "DIPROSES" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Diproses</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-blue-500">{diprosesAnim}</h3>
            </div>
          </div>
          <i className="pi pi-spin pi-spinner text-3xl text-blue-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-2">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "DITERIMA" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Diterima</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-green-500">{diterimaAnim}</h3>
            </div>
          </div>
          <i className="pi pi-check-circle text-3xl text-green-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-2">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "DITOLAK" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Ditolak</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-red-500">{ditolakAnim}</h3>
            </div>
          </div>
          <i className="pi pi-times-circle text-3xl text-red-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-2">
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
            value={dataLangganans}
            selection={selectedLangganans}
            onSelectionChange={(e) => setSelectedLangganans(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} langganan"
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
              header="User"
              body={userBodyTemplate}
              sortable
              field="user.nama"
              style={{ minWidth: "14rem" }}
            />
            <Column
              header="Layanan"
              body={layananBodyTemplate}
              sortable
              field="layanan.namaLayanan"
              style={{ minWidth: "16rem" }}
            />
            <Column
              header="Alamat Pemasangan"
              body={alamatBodyTemplate}
              sortable
              field="alamatPemasangan"
              style={{ minWidth: "16rem" }}
            />
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              header="Tanggal Pengajuan"
              body={tanggalBodyTemplate}
              sortable
              field="tanggalPengajuan"
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
            visible={langgananDialog}
            style={{ width: "600px" }}
            header={langganan.id ? "Edit Langganan" : "Tambah Langganan Baru"}
            modal
            className="p-fluid"
            footer={langgananDialogFooter}
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
                    Informasi Langganan
                  </small>
                  <small style={{ color: "#0d47a1" }}>
                    Lengkapi data langganan berikut. Field dengan tanda{" "}
                    <span style={{ color: "red" }}>*</span> wajib diisi. Tanggal
                    pengajuan akan otomatis tercatat saat data disimpan.
                  </small>
                </div>
              </div>

              {/* Customer & Package Section */}
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
                    className="pi pi-users"
                    style={{ fontSize: "1.2rem", color: "#2196F3" }}
                  ></i>
                  Data Pelanggan & Paket
                </h4>

                {/* User Dropdown */}
                <div className="field">
                  <label htmlFor="userId" className="required-field">
                    User / Pelanggan
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                    </span>
                    <Dropdown
                      id="userId"
                      value={langganan.userId}
                      options={userOptions}
                      onChange={(e) => onInputChange(e, "userId")}
                      placeholder="Pilih User"
                      filter
                      filterBy="label"
                      emptyMessage="Tidak ada user tersedia"
                      emptyFilterMessage="User tidak ditemukan"
                      showClear
                      className={classNames({
                        "w-full": true,
                        "p-invalid": submitted && !langganan.userId,
                      })}
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
                                className="pi pi-user"
                                style={{ fontSize: "0.9rem" }}
                              ></i>
                              <span>
                                {option.label || option.nama || option.name}
                              </span>
                            </div>
                          );
                        }
                        return (
                          <span>
                            {langganan.userId ? "User terpilih" : "Pilih User"}
                          </span>
                        );
                      }}
                      itemTemplate={(option) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              padding: "0.5rem 0",
                            }}
                          >
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: "#e3f2fd",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#1976D2",
                                fontWeight: "600",
                              }}
                            >
                              {option.label?.charAt(0) ||
                                option.nama?.charAt(0) ||
                                "U"}
                            </div>
                            <div>
                              <div style={{ fontWeight: "500" }}>
                                {option.label || option.nama}
                              </div>
                              {option.email && (
                                <small style={{ color: "#6c757d" }}>
                                  {option.email}
                                </small>
                              )}
                            </div>
                          </div>
                        );
                      }}
                    />
                  </div>

                  {submitted && !langganan.userId && (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      User/pelanggan harus dipilih
                    </small>
                  )}
                </div>

                {/* Layanan Dropdown */}
                <div className="field" style={{ marginTop: "1rem" }}>
                  <label htmlFor="layananId" className="required-field">
                    Paket Layanan
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
                    <Dropdown
                      id="layananId"
                      value={langganan.layananId}
                      options={layananOptions}
                      onChange={(e) => {
                        onInputChange(e, "layananId");
                      }}
                      placeholder="Pilih Paket Layanan"
                      filter
                      filterBy="label"
                      emptyMessage="Tidak ada layanan tersedia"
                      emptyFilterMessage="Layanan tidak ditemukan"
                      showClear
                      className={classNames({
                        "w-full": true,
                        "p-invalid": submitted && !langganan.layananId,
                      })}
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
                                className="pi pi-wifi"
                                style={{ fontSize: "0.9rem" }}
                              ></i>
                              <span>{option.label || option.namaLayanan}</span>
                            </div>
                          );
                        }
                        return (
                          <span>
                            {langganan.layananId
                              ? "Paket terpilih"
                              : "Pilih Paket"}
                          </span>
                        );
                      }}
                      itemTemplate={(option) => {
                        const harga = option.hargaBulanan || option.harga;
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              padding: "0.5rem 0",
                            }}
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                backgroundColor: "#e8f5e9",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#2e7d32",
                              }}
                            >
                              <i
                                className="pi pi-wifi"
                                style={{ fontSize: "1.2rem" }}
                              ></i>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: "500" }}>
                                {option.label || option.namaLayanan}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "1rem",
                                  fontSize: "0.8rem",
                                  color: "#6c757d",
                                }}
                              >
                                {option.kecepatanMbps && (
                                  <span>⚡ {option.kecepatanMbps} Mbps</span>
                                )}
                                {harga > 0 && (
                                  <span>
                                    💰 Rp {harga.toLocaleString("id-ID")}/bln
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                  </div>

                  {submitted && !langganan.layananId && (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Paket layanan harus dipilih
                    </small>
                  )}

                  {/* Quick Package Summary */}
                  {langganan.layananId && (
                    <div
                      style={{
                        marginTop: "0.5rem",
                        padding: "0.5rem 1rem",
                        // backgroundColor: "#f8f9fa",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        flexWrap: "wrap",
                        fontSize: "0.85rem",
                      }}
                    >
                      <span style={{ color: "#495057" }}>
                        <i
                          className="pi pi-check-circle"
                          style={{ color: "#4caf50", marginRight: "0.25rem" }}
                        ></i>
                        <strong>Detail Paket:</strong>
                      </span>
                      {(() => {
                        const selected = layananOptions?.find(
                          (opt) => opt.value === langganan.layananId,
                        );
                        return (
                          <>
                            <span>
                              {selected?.label || selected?.namaLayanan}
                            </span>
                            {selected?.kecepatanMbps && (
                              <span>⚡ {selected.kecepatanMbps} Mbps</span>
                            )}
                            {selected?.hargaBulanan > 0 && (
                              <span>
                                💰 Rp{" "}
                                {selected.hargaBulanan.toLocaleString("id-ID")}
                                /bln
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>

              {/* Installation Address Section */}
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
                    className="pi pi-map-marker"
                    style={{ fontSize: "1.2rem", color: "#f44336" }}
                  ></i>
                  Alamat Pemasangan
                </h4>

                <div className="field">
                  <label htmlFor="alamatPemasangan" className="required-field">
                    Alamat Lengkap
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-home"></i>
                    </span>
                    <InputTextarea
                      id="alamatPemasangan"
                      value={langganan.alamatPemasangan}
                      onChange={(e) => onInputChange(e, "alamatPemasangan")}
                      required
                      rows={4}
                      placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 02, Kel. Gambir, Kec. Gambir, Jakarta Pusat"
                      className={classNames({
                        "p-invalid": submitted && !langganan.alamatPemasangan,
                        "w-full": true,
                      })}
                      maxLength={500}
                      autoResize
                    />
                  </div>

                  {submitted && !langganan.alamatPemasangan ? (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Alamat pemasangan harus diisi
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
                        Masukkan alamat lengkap untuk survey dan pemasangan
                      </small>
                      <small
                        style={{
                          color:
                            langganan.alamatPemasangan?.length > 400
                              ? "#f59e0b"
                              : "#6c757d",
                        }}
                      >
                        {langganan.alamatPemasangan?.length || 0}/500
                      </small>
                    </div>
                  )}
                </div>

                {/* Address Helper (optional) */}
                {!langganan.alamatPemasangan && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                      backgroundColor: "#fff3e0",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      color: "#e65100",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <i className="pi pi-exclamation-triangle"></i>
                    <span>
                      Pastikan alamat yang dimasukkan lengkap untuk memudahkan
                      tim teknisi melakukan survey dan pemasangan.
                    </span>
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
                    className="pi pi-tag"
                    style={{ fontSize: "1.2rem", color: "#ff9800" }}
                  ></i>
                  Status Langganan
                </h4>

                <div className="field">
                  <label htmlFor="status" className="required-field">
                    Status Pengajuan
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-verified"></i>
                    </span>
                    <Dropdown
                      id="status"
                      value={langganan.status}
                      options={
                        statusOptions || [
                          {
                            label: "Pending",
                            value: "PENDING",
                            icon: "pi pi-clock",
                            color: "#ff9800",
                            severity: "warning",
                          },
                          {
                            label: "Diproses",
                            value: "DIPROSES",
                            icon: "pi pi-spinner",
                            color: "#2196F3",
                            severity: "info",
                          },
                          {
                            label: "Diterima",
                            value: "DITERIMA",
                            icon: "pi pi-check-circle",
                            color: "#4caf50",
                            severity: "success",
                          },
                          {
                            label: "Ditolak",
                            value: "DITOLAK",
                            icon: "pi pi-times-circle",
                            color: "#f44336",
                            severity: "danger",
                          },
                        ]
                      }
                      onChange={(e) => onInputChange(e, "status")}
                      placeholder="Pilih Status"
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
                        return (
                          <span>{langganan.status || "Pilih Status"}</span>
                        );
                      }}
                      itemTemplate={(option) => {
                        const severityColors = {
                          warning: { bg: "#fff3e0", text: "#e65100" },
                          info: { bg: "#e3f2fd", text: "#0d47a1" },
                          success: { bg: "#e8f5e9", text: "#2e7d32" },
                          danger: { bg: "#ffebee", text: "#c62828" },
                        };
                        const colors = severityColors[option.severity] || {
                          bg: "#0000",
                          text: "#fff",
                        };

                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              padding: "0.5rem 0",
                              backgroundColor: colors.bg,
                              borderRadius: "4px",
                              margin: "2px 0",
                            }}
                          >
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: option.color + "20",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: option.color,
                              }}
                            >
                              <i className={option.icon}></i>
                            </div>
                            <div>
                              <div
                                style={{
                                  fontWeight: "500",
                                  color: colors.text,
                                }}
                              >
                                {option.label}
                              </div>
                              <small style={{ color: colors.text + "80" }}>
                                {getStatusDescription(option.value)}
                              </small>
                            </div>
                          </div>
                        );
                      }}
                    />
                  </div>

                  {submitted && !langganan.status && (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Status harus dipilih
                    </small>
                  )}

                  {/* Status Helper */}
                  {langganan.status && (
                    <div style={{ marginTop: "0.75rem" }}>
                      {langganan.status === "PENDING" && (
                        <div
                          style={{
                            backgroundColor: "#fff3e0",
                            color: "#e65100",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          <i
                            className="pi pi-clock"
                            style={{ fontSize: "1rem" }}
                          ></i>
                          <span>
                            Pengajuan sedang <strong>menunggu</strong> diproses
                            oleh tim kami.
                          </span>
                        </div>
                      )}
                      {langganan.status === "DIPROSES" && (
                        <div
                          style={{
                            backgroundColor: "#e3f2fd",
                            color: "#0d47a1",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          <i
                            className="pi pi-spinner"
                            style={{ fontSize: "1rem" }}
                          ></i>
                          <span>
                            Pengajuan sedang <strong>diproses</strong>. Tim kami
                            akan segera menghubungi.
                          </span>
                        </div>
                      )}
                      {langganan.status === "DITERIMA" && (
                        <div
                          style={{
                            backgroundColor: "#e8f5e9",
                            color: "#2e7d32",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          <i
                            className="pi pi-check-circle"
                            style={{ fontSize: "1rem" }}
                          ></i>
                          <span>
                            Pengajuan <strong>diterima</strong>. Jadwal
                            pemasangan akan diatur.
                          </span>
                        </div>
                      )}
                      {langganan.status === "DITOLAK" && (
                        <div
                          style={{
                            backgroundColor: "#ffebee",
                            color: "#c62828",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          <i
                            className="pi pi-times-circle"
                            style={{ fontSize: "1rem" }}
                          ></i>
                          <span>
                            Pengajuan <strong>ditolak</strong>. Silakan hubungi
                            customer service untuk informasi lebih lanjut.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline Info for existing subscriptions */}
              {langganan.id && (
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
                      className="pi pi-calendar"
                      style={{ fontSize: "1.2rem", color: "#9c27b0" }}
                    ></i>
                    Timeline Pengajuan
                  </h4>

                  <div
                    style={{
                      // backgroundColor: "#f8f9fa",
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#e3f2fd",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#1976D2",
                        }}
                      >
                        <i className="pi pi-calendar-plus"></i>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                          Tanggal Pengajuan
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "1.1rem" }}>
                          {langganan.tanggalPengajuan
                            ? new Date(
                                langganan.tanggalPengajuan,
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Status */}
                    <div
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#fff",
                        borderRadius: "6px",
                        border: "1px solid #e9ecef",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor:
                            langganan.status === "DITERIMA"
                              ? "#4caf50"
                              : langganan.status === "DITOLAK"
                                ? "#f44336"
                                : langganan.status === "DIPROSES"
                                  ? "#2196F3"
                                  : "#ff9800",
                        }}
                      ></div>
                      <span style={{ color: "#495057" }}>
                        Status saat ini: <strong>{langganan.status}</strong>
                      </span>
                      <span
                        style={{
                          color: "#6c757d",
                          marginLeft: "auto",
                          fontSize: "0.85rem",
                        }}
                      >
                        <i
                          className="pi pi-hashtag"
                          style={{ marginRight: "0.25rem" }}
                        ></i>
                        ID: {langganan.id}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info for new subscriptions */}
              {!langganan.id && (
                <div className="form-section" style={{ marginTop: "1.5rem" }}>
                  <div
                    style={{
                      // backgroundColor: "#f8f9fa",
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid #e9ecef",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <i
                      className="pi pi-info-circle"
                      style={{ color: "#2196F3", fontSize: "1.5rem" }}
                    ></i>
                    <div>
                      <div
                        style={{ fontWeight: "500", marginBottom: "0.25rem" }}
                      >
                        Informasi Penting
                      </div>
                      <small style={{ color: "#6c757d", lineHeight: "1.5" }}>
                        • Setelah menyimpan data, tim kami akan melakukan
                        verifikasi dan survey lokasi.
                        <br />• Status awal pengajuan akan otomatis menjadi{" "}
                        <strong>PENDING</strong>.<br />• Pastikan semua data
                        yang diisi sudah benar untuk mempercepat proses.
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Helper function for status descriptions */}
            {(() => {
              window.getStatusDescription = (status) => {
                const descriptions = {
                  PENDING: "Menunggu diproses",
                  DIPROSES: "Sedang diproses",
                  DITERIMA: "Disetujui",
                  DITOLAK: "Ditolak",
                };
                return descriptions[status] || "";
              };
              return null;
            })()}

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

              .p-inputgroup .p-dropdown,
              .p-inputgroup textarea {
                border-left: none;
              }

              .p-inputgroup .p-dropdown:focus,
              .p-inputgroup textarea:focus {
                box-shadow: none;
                border-color: #2196f3;
              }

              .p-dropdown-item {
                padding: 0.5rem;
              }

              .info-message {
                border-left: 4px solid #2196f3;
              }
            `}</style>
          </Dialog>
          {/* ── CONFIRM DELETE SINGLE ── */}
          <Dialog
            visible={deleteLanggananDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteLanggananDialogFooter}
            onHide={hideDeleteLanggananDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {langganan && (
                <span>
                  Apakah Anda yakin ingin menghapus langganan dari{" "}
                  <b>{langganan.user?.nama}</b>?
                </span>
              )}
            </div>
          </Dialog>

          {/* ── CONFIRM DELETE MULTIPLE ── */}
          <Dialog
            visible={deleteLangganansDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteLangganansDialogFooter}
            onHide={hideDeleteLangganansDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah Anda yakin ingin menghapus langganan yang dipilih?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default LanggananCrudPage;
