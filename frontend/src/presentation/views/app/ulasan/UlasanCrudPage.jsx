import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Rating } from "primereact/rating";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useUlasanApi } from "@/presentation/logics/app/useUlasanApi";
import { useUserApi } from "@/presentation/logics/app/user";
import { useLayananApi } from "@/presentation/logics/app/useLayananApi";

import "../../../../styles/app.css";
import { OverlayPanel } from "primereact/overlaypanel";

const UlasanCrudPage = () => {
  let emptyUlasan = {
    id: null,
    userId: null,
    layananId: null,
    rating: 0,
    komentar: "",
    helpfulCount: 0,
    status: "PENDING",
  };

  const [ulasans, setUlasans] = useState([]);
  const [ulasanDialog, setUlasanDialog] = useState(false);
  const [deleteUlasanDialog, setDeleteUlasanDialog] = useState(false);
  const [deleteUlasansDialog, setDeleteUlasansDialog] = useState(false);
  const [ulasan, setUlasan] = useState(emptyUlasan);
  const [selectedUlasans, setSelectedUlasans] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataUlasans, setDataUlasans] = useState([]);
  const [filterLayanan, setFilterLayanan] = useState(null);

  // State untuk relasi dropdown
  const [users, setUsers] = useState([]);
  const [layanans, setLayanans] = useState([]);

  const toast = useRef(null);
  const dt = useRef(null);

  const filterRef = useRef(null);

  const statusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  const {
    useAllUlasan,
    createUlasan,
    updateUlasan,
    deleteUlasan,
    deleteUlasans,
    approveUlasan,
    rejectUlasan,
  } = useUlasanApi();

  const { useAllUsers } = useUserApi();
  const { useAllLayanan } = useLayananApi();

  const { data: ulasanData, isPending: ulasanPending } = useAllUlasan();
  const { data: userData } = useAllUsers();
  const { data: layananData } = useAllLayanan();

  useEffect(() => {
    fetchUlasans();
  }, [ulasanData]);

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

  const fetchUlasans = async () => {
    try {
      setLoading(true);
      setUlasans(ulasanData);
      setDataUlasans(ulasanData);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data ulasan",
        life: 3000,
      });
      setLoading(false);
    }
  };

  // ─── DROPDOWN OPTIONS ────────────────────────────────────────────────────────

  const userOptions =
    users?.map((u) => ({
      label: `${u.nama} (${u.email})`,
      value: u.id,
    })) || [];

  const layananOptions =
    layanans?.map((l) => ({
      label: `${l.namaLayanan} - ${l.kecepatanMbps} Mbps`,
      value: l.id,
    })) || [];

  // ─── EXPORT ──────────────────────────────────────────────────────────────────

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `ulasan_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedUlasans?.length > 0,
    });
  };

  const exportExcel = () => {
    const exportData = dataUlasans.map((item) => ({
      ID: item.id,
      User: item.user?.nama || "-",
      Layanan: item.layanan?.namaLayanan || "-",
      Rating: item.rating,
      Komentar: item.komentar,
      Helpful: item.helpfulCount,
      Status: item.status,
      Tanggal: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("id-ID")
        : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ulasan");
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
      head: [["User", "Layanan", "Rating", "Status"]],
      body: dataUlasans.map((item) => [
        item.user?.nama || "-",
        item.layanan?.namaLayanan || "-",
        `${item.rating}/5`,
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

  const totalUlasans = ulasans?.length || 0;
  const pendingCount =
    ulasans?.filter((u) => u.status === "PENDING").length || 0;
  const approvedCount =
    ulasans?.filter((u) => u.status === "APPROVED").length || 0;
  const rejectedCount =
    ulasans?.filter((u) => u.status === "REJECTED").length || 0;
  const selectedCount = selectedUlasans?.length || 0;

  // Hitung rata-rata rating
  const avgRating = dataUlasans?.length
    ? (
        dataUlasans.reduce((sum, u) => sum + (u.rating || 0), 0) /
        dataUlasans.length
      ).toFixed(1)
    : 0;

  const totalAnim = useCountUp(totalUlasans);
  const pendingAnim = useCountUp(pendingCount);
  const approvedAnim = useCountUp(approvedCount);
  const rejectedAnim = useCountUp(rejectedCount);
  const selectedAnim = useCountUp(selectedCount);

  // ─── DIALOG CONTROLS ─────────────────────────────────────────────────────────

  const openNew = () => {
    setUlasan(emptyUlasan);
    setSubmitted(false);
    setUlasanDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUlasanDialog(false);
  };

  const hideDeleteUlasanDialog = () => {
    setDeleteUlasanDialog(false);
  };

  const hideDeleteUlasansDialog = () => {
    setDeleteUlasansDialog(false);
  };

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  const saveUlasan = async () => {
    setSubmitted(true);

    if (ulasan.userId && ulasan.rating > 0 && ulasan.komentar.trim()) {
      let _ulasans = [...ulasans];
      const payload = { ...ulasan };

      try {
        if (ulasan.id) {
          const response = await updateUlasan.mutateAsync({
            id: ulasan.id,
            payload,
          });
          const updated = response?.data ?? response;
          _ulasans[_ulasans.findIndex((val) => val.id === ulasan.id)] = updated;
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: response?.message ?? "Ulasan berhasil diupdate",
            life: 3000,
          });
        } else {
          const result = await createUlasan.mutateAsync(payload);
          const newUlasan = result?.data ?? result;
          _ulasans.push(newUlasan);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: result?.message ?? "Ulasan berhasil ditambahkan",
            life: 3000,
          });
        }

        setUlasans(_ulasans);
        setUlasanDialog(false);
        setUlasan(emptyUlasan);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan ulasan",
          life: 3000,
        });
      }
    }
  };

  const editUlasan = (rowData) => {
    setUlasan({ ...rowData });
    setUlasanDialog(true);
  };

  const confirmDeleteUlasan = (rowData) => {
    setUlasan(rowData);
    setDeleteUlasanDialog(true);
  };

  const deleteUlasanItem = async () => {
    try {
      const response = await deleteUlasan.mutateAsync({ id: ulasan.id });
      let _ulasans = ulasans.filter((val) => val.id !== ulasan.id);
      setUlasans(_ulasans);
      setDeleteUlasanDialog(false);
      setUlasan(emptyUlasan);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: response?.message ?? "Ulasan berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus ulasan",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteUlasansDialog(true);
  };

  const deleteSelectedUlasans = async () => {
    try {
      const ids = selectedUlasans.map((val) => val.id);
      const response = await deleteUlasans.mutateAsync({ ids });
      let _ulasans = ulasans.filter((val) => !selectedUlasans.includes(val));
      setUlasans(_ulasans);
      setDeleteUlasansDialog(false);
      setSelectedUlasans(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Ulasan yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus ulasan yang dipilih",
        life: 3000,
      });
    }
  };

  // ─── APPROVAL ACTIONS ────────────────────────────────────────────────────────

  const handleApprove = async (rowData) => {
    try {
      console.log(rowData);
      const response = await approveUlasan.mutateAsync({ id: rowData.id });
      let _ulasans = [...ulasans];
      const index = _ulasans.findIndex((val) => val.id === rowData.id);
      _ulasans[index] = { ..._ulasans[index], status: "APPROVED" };
      setUlasans(_ulasans);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Ulasan disetujui",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menyetujui ulasan",
        life: 3000,
      });
    }
  };

  const handleReject = async (rowData) => {
    console.log(rowData);
    try {
      const response = await rejectUlasan.mutateAsync({ id: rowData.id });
      let _ulasans = [...ulasans];
      const index = _ulasans.findIndex((val) => val.id === rowData.id);
      _ulasans[index] = { ..._ulasans[index], status: "REJECTED" };
      setUlasans(_ulasans);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Ulasan ditolak",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menolak ulasan",
        life: 3000,
      });
    }
  };

  // ─── INPUT HANDLERS ──────────────────────────────────────────────────────────

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _ulasan = { ...ulasan };
    _ulasan[name] = val;
    setUlasan(_ulasan);
  };

  const onRatingChange = (e) => {
    let _ulasan = { ...ulasan };
    _ulasan.rating = e.value;
    setUlasan(_ulasan);
  };

  // ─── FILTER ──────────────────────────────────────────────────────────────────

  const applyFilter = (filters) => {
    const filtered = ulasans.filter((item) => {
      const statusMatch = filters.status
        ? filters.status === "all"
          ? true
          : item.status === filters.status
        : true;
      return statusMatch;
    });
    setDataUlasans(filtered);
  };
  const applyFilterLayanan = (filters) => {
    console.log(filters.layanan);
    const filtered = ulasans.filter((item) => {
      const statusMatch = item.layanan.id === filters.layanan;
      return statusMatch;
    });
    setDataUlasans(filtered);
  };
  // ─── BODY TEMPLATES ──────────────────────────────────────────────────────────

  const statusBodyTemplate = (rowData) => {
    const statusConfig = {
      PENDING: { label: "Pending", severity: "warning", icon: "pi-clock" },
      APPROVED: {
        label: "Approved",
        severity: "success",
        icon: "pi-check-circle",
      },
      REJECTED: {
        label: "Rejected",
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

    const initials = rowData.user.nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    return (
      <div className="flex align-items-center gap-2">
        <Avatar
          label={initials}
          shape="circle"
          style={{
            backgroundColor: "#9C27B0",
            color: "#ffffff",
          }}
        />
        <div className="flex flex-column">
          <span className="font-semibold">{rowData.user.nama}</span>
          <small className="text-500">{rowData.user.email}</small>
        </div>
      </div>
    );
  };

  const layananBodyTemplate = (rowData) => {
    if (!rowData.layanan)
      return <span className="text-400">Tidak ada layanan</span>;

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

  const ratingBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <Rating value={rowData.rating} readOnly cancel={false} />
        <span className="font-semibold text-lg">{rowData.rating}/5</span>
      </div>
    );
  };

  const komentarBodyTemplate = (rowData) => {
    const maxLength = 60;
    const truncated =
      rowData.komentar.length > maxLength
        ? rowData.komentar.substring(0, maxLength) + "..."
        : rowData.komentar;

    return (
      <div className="flex flex-column gap-1">
        <span className="text-sm">{truncated}</span>
        {rowData.komentar.length > maxLength && (
          <small className="text-400 italic">
            {rowData.komentar.length} karakter
          </small>
        )}
      </div>
    );
  };

  const helpfulBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <i className="pi pi-thumbs-up text-blue-500" />
        <Badge value={rowData.helpfulCount || 0} severity="info" />
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return rowData.createdAt
      ? new Date(rowData.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "-";
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2 flex-wrap">
        {rowData.status === "PENDING" && (
          <>
            <Button
              icon="pi pi-check"
              rounded
              outlined
              severity="success"
              onClick={() => handleApprove(rowData)}
              tooltip="Setujui"
              tooltipOptions={{ position: "top" }}
            />
            <Button
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              onClick={() => handleReject(rowData)}
              tooltip="Tolak"
              tooltipOptions={{ position: "top" }}
            />
          </>
        )}
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          onClick={() => editUlasan(rowData)}
          tooltip="Edit"
          tooltipOptions={{ position: "top" }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteUlasan(rowData)}
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
          label="Tambah Ulasan"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Hapus"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedUlasans || !selectedUlasans.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Filter"
          icon="pi pi-filter"
          severity="info"
          outlined
          onClick={(e) => filterRef.current.toggle(e)}
        />

        <OverlayPanel ref={filterRef}>
          <div className="flex flex-column gap-3 w-16rem">
            <span className="font-semibold">Filter User</span>

            {/* <InputText
                      placeholder="Cari nama/email..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    /> */}

            <Dropdown
              value={filterLayanan}
              options={layananOptions}
              onChange={(e) => setFilterLayanan(e.value)}
              placeholder="Pilih layanan"
              className="w-full"
            />

            {/* DeletedAt */}

            {/* APPLY */}
            <Button
              label="Terapkan"
              icon="pi pi-check"
              onClick={() => {
                applyFilterLayanan({
                  layanan: filterLayanan,
                });
                filterRef.current.hide();
              }}
            />

            {/* RESET */}
            <Button
              label="Reset"
              icon="pi pi-refresh"
              severity="secondary"
              outlined
              onClick={() => {
                setKeyword("");
                setFilterRole(null);
                // setShowDeleted(false);
                setDeletedStatus("active");
                setDataUsers(users);

                filterRef.current.hide();
              }}
            />
          </div>
        </OverlayPanel>
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
      <h4 className="m-0">Kelola Ulasan & Rating</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <input
          type="search"
          className="p-inputtext p-component"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari..."
        />
      </span>
    </div>
  );

  // ─── DIALOG FOOTERS ──────────────────────────────────────────────────────────

  const ulasanDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveUlasan} />
    </React.Fragment>
  );

  const deleteUlasanDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteUlasanDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteUlasanItem}
      />
    </React.Fragment>
  );

  const deleteUlasansDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteUlasansDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedUlasans}
      />
    </React.Fragment>
  );

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="grid">
      {/* ── STAT CARDS ── */}
      <div className="col-12 md:col-6 lg:col-3">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "all" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Total Ulasan</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-star-fill text-3xl text-yellow-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3">
        <div className="stat-card">
          <div>
            <small>Rata-rata Rating</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-yellow-500">{avgRating}</h3>
              <i className="pi pi-star-fill text-yellow-500" />
            </div>
          </div>
          <Rating value={Math.round(avgRating)} readOnly cancel={false} />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3">
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

      <div className="col-12 md:col-6 lg:col-3">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "APPROVED" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Approved</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-green-500">{approvedAnim}</h3>
            </div>
          </div>
          <i className="pi pi-check-circle text-3xl text-green-500" />
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
            value={dataUlasans}
            selection={selectedUlasans}
            onSelectionChange={(e) => setSelectedUlasans(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} ulasan"
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
              style={{ minWidth: "16rem" }}
            />
            <Column
              header="Layanan"
              body={layananBodyTemplate}
              sortable
              field="layanan.namaLayanan"
              style={{ minWidth: "14rem" }}
            />
            <Column
              header="Rating"
              body={ratingBodyTemplate}
              sortable
              field="rating"
              style={{ minWidth: "14rem" }}
            />
            <Column
              header="Komentar"
              body={komentarBodyTemplate}
              sortable
              field="komentar"
              style={{ minWidth: "18rem" }}
            />
            <Column
              header="Helpful"
              body={helpfulBodyTemplate}
              sortable
              field="helpfulCount"
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            />
            <Column
              header="Tanggal"
              body={createdAtBodyTemplate}
              sortable
              field="createdAt"
              style={{ minWidth: "10rem" }}
            />
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "14rem" }}
            />
          </DataTable>

          {/* ── CREATE / EDIT DIALOG ── */}
          <Dialog
            visible={ulasanDialog}
            style={{ width: "520px" }}
            header={ulasan.id ? "Edit Ulasan" : "Tambah Ulasan"}
            modal
            className="p-fluid"
            footer={ulasanDialogFooter}
            onHide={hideDialog}
          >
            {/* User Dropdown */}
            <div className="field">
              <label htmlFor="userId">
                User / Pelanggan <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="userId"
                value={ulasan.userId}
                options={userOptions}
                onChange={(e) => onInputChange(e, "userId")}
                placeholder="Pilih User"
                filter
                filterBy="label"
                emptyMessage="Tidak ada user"
                emptyFilterMessage="User tidak ditemukan"
                className={classNames({
                  "p-invalid": submitted && !ulasan.userId,
                })}
              />
              {submitted && !ulasan.userId && (
                <small className="p-error">User harus dipilih.</small>
              )}
            </div>

            {/* Layanan Dropdown (Optional) */}
            <div className="field">
              <label htmlFor="layananId">Layanan (Opsional)</label>
              <Dropdown
                id="layananId"
                value={ulasan.layananId}
                options={layananOptions}
                onChange={(e) => onInputChange(e, "layananId")}
                placeholder="Pilih Layanan"
                filter
                filterBy="label"
                emptyMessage="Tidak ada layanan"
                emptyFilterMessage="Layanan tidak ditemukan"
                showClear
              />
              <small className="text-500">
                Kosongkan jika ulasan untuk perusahaan secara umum
              </small>
            </div>

            {/* Rating */}
            <div className="field">
              <label htmlFor="rating">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex align-items-center gap-3">
                <Rating
                  id="rating"
                  value={ulasan.rating}
                  onChange={onRatingChange}
                  cancel={false}
                  className={classNames({
                    "p-invalid": submitted && ulasan.rating === 0,
                  })}
                />
                <span className="font-semibold text-xl">{ulasan.rating}/5</span>
              </div>
              {submitted && ulasan.rating === 0 && (
                <small className="p-error">
                  Rating harus dipilih (min. 1 bintang).
                </small>
              )}
            </div>

            {/* Komentar */}
            <div className="field">
              <label htmlFor="komentar">
                Komentar <span className="text-red-500">*</span>
              </label>
              <InputTextarea
                id="komentar"
                value={ulasan.komentar}
                onChange={(e) => onInputChange(e, "komentar")}
                required
                rows={5}
                placeholder="Tulis ulasan Anda di sini..."
                className={classNames({
                  "p-invalid": submitted && !ulasan.komentar,
                })}
              />
              {submitted && !ulasan.komentar && (
                <small className="p-error">Komentar harus diisi.</small>
              )}
              <small className="text-500">
                {ulasan.komentar.length} karakter
              </small>
            </div>

            {/* Status */}
            <div className="field">
              <label htmlFor="status">
                Status <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="status"
                value={ulasan.status}
                options={statusOptions}
                onChange={(e) => onInputChange(e, "status")}
                placeholder="Pilih Status"
              />
            </div>
          </Dialog>

          {/* ── CONFIRM DELETE SINGLE ── */}
          <Dialog
            visible={deleteUlasanDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteUlasanDialogFooter}
            onHide={hideDeleteUlasanDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {ulasan && (
                <span>
                  Apakah Anda yakin ingin menghapus ulasan dari{" "}
                  <b>{ulasan.user?.nama}</b>?
                </span>
              )}
            </div>
          </Dialog>

          {/* ── CONFIRM DELETE MULTIPLE ── */}
          <Dialog
            visible={deleteUlasansDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteUlasansDialogFooter}
            onHide={hideDeleteUlasansDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah Anda yakin ingin menghapus ulasan yang dipilih?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UlasanCrudPage;
