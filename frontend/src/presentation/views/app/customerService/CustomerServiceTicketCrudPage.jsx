import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Badge } from "primereact/badge";
import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useUserApi } from "@/presentation/logics/app/user";
import { useCustomerServiceApi } from "@/presentation/logics/app/useCustomerServiceApi";

import { useLanggananApi } from "@/presentation/logics/app/useLanggananApi";

import "../../../../styles/app.css";

const CustomerServiceTicketCrudPage = () => {
  let emptyTicket = {
    id: null,
    userId: null,
    langgananId: null,
    judul: "",
    status: "OPEN",
  };

  const [tickets, setTickets] = useState([]);
  const [ticketDialog, setTicketDialog] = useState(false);
  const [deleteTicketDialog, setDeleteTicketDialog] = useState(false);
  const [deleteTicketsDialog, setDeleteTicketsDialog] = useState(false);
  const [ticket, setTicket] = useState(emptyTicket);
  const [selectedTickets, setSelectedTickets] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataTickets, setDataTickets] = useState([]);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  // State untuk relasi dropdown
  const [users, setUsers] = useState([]);
  const [langganans, setLangganans] = useState([]);

  const toast = useRef(null);
  const dt = useRef(null);

  const statusOptions = [
    { label: "Open", value: "OPEN" },
    { label: "Diproses", value: "DIPROSES" },
    { label: "Selesai", value: "SELESAI" },
  ];

  const {
    useAllTickets,
    createTicket,
    updateTicket,
    updateTicketStatus,
    deleteTicket,
    deleteTickets,
    useAllMessages,
  } = useCustomerServiceApi();

  const { useAllUsers } = useUserApi();
  const { useAllLangganan } = useLanggananApi();

  const { data: ticketData, isPending: ticketPending } = useAllTickets();
  const { data: userData } = useAllUsers();
  const { data: langgananData } = useAllLangganan();
  const { data: messageData } = useAllMessages();

  useEffect(() => {
    fetchTickets();
  }, [ticketData]);

  useEffect(() => {
    if (userData) {
      setUsers(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (langgananData) {
      setLangganans(langgananData);
    }
  }, [langgananData]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setTickets(ticketData);
      setDataTickets(ticketData);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data tiket",
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

  const langgananOptions =
    langganans?.map((l) => ({
      label: `${l.user?.nama || "N/A"} - ${l.layanan?.namaLayanan || "N/A"}`,
      value: l.id,
    })) || [];

  // ─── EXPORT ──────────────────────────────────────────────────────────────────

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `cs_tickets_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedTickets?.length > 0,
    });
  };

  const exportExcel = () => {
    const exportData = dataTickets.map((item) => ({
      ID: item.id,
      User: item.user?.nama || "-",
      Judul: item.judul,
      Status: item.status,
      "Total Pesan": item.messages?.length || 0,
      "Dibuat Pada": item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("id-ID")
        : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CS Tickets");
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
      head: [["ID", "User", "Judul", "Status", "Total Pesan"]],
      body: dataTickets.map((item) => [
        item.id,
        item.user?.nama || "-",
        item.judul,
        item.status,
        item.messages?.length || 0,
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

  const totalTickets = tickets?.length || 0;
  const openCount = tickets?.filter((t) => t.status === "OPEN").length || 0;
  const diprosesCount =
    tickets?.filter((t) => t.status === "DIPROSES").length || 0;
  const selesaiCount =
    tickets?.filter((t) => t.status === "SELESAI").length || 0;
  const selectedCount = selectedTickets?.length || 0;

  const totalAnim = useCountUp(totalTickets);
  const openAnim = useCountUp(openCount);
  const diprosesAnim = useCountUp(diprosesCount);
  const selesaiAnim = useCountUp(selesaiCount);
  const selectedAnim = useCountUp(selectedCount);

  // ─── DIALOG CONTROLS ─────────────────────────────────────────────────────────

  const openNew = () => {
    setTicket(emptyTicket);
    setSubmitted(false);
    setTicketDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setTicketDialog(false);
  };

  const hideDeleteTicketDialog = () => {
    setDeleteTicketDialog(false);
  };

  const hideDeleteTicketsDialog = () => {
    setDeleteTicketsDialog(false);
  };

  const openDetail = async (ticket) => {
    setTicket(ticket);
    const data = messageData.filter((m) => m.ticketId === ticket.id);

    setMessages(data);
    setVisible(true);
  };

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  const saveTicket = async () => {
    setSubmitted(true);

    if (ticket.userId && ticket.langgananId && ticket.judul.trim()) {
      let _tickets = [...tickets];
      const payload = { ...ticket };

      try {
        if (ticket.id) {
          const response = await updateTicket.mutateAsync({
            id: ticket.id,
            payload: payload,
          });

          console.log(response);

          // const updated = response?.data ?? response;
          // _tickets[_tickets.findIndex((val) => val.id === ticket.id)] = updated;
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: response?.message ?? "Tiket berhasil diupdate",
            life: 3000,
          });
        } else {
          const result = await createTicket.mutateAsync(payload);
          const newTicket = result?.data ?? result;
          _tickets.push(newTicket);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: result?.message ?? "Tiket berhasil ditambahkan",
            life: 3000,
          });
        }

        setTickets(_tickets);
        setTicketDialog(false);
        setTicket(emptyTicket);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan tiket",
          life: 3000,
        });
      }
    }
  };

  const editTicket = (rowData) => {
    setTicket({ ...rowData });
    setTicketDialog(true);
  };

  const confirmDeleteTicket = (rowData) => {
    setTicket(rowData);
    setDeleteTicketDialog(true);
  };

  const deleteTicketItem = async () => {
    try {
      const response = await deleteTicket.mutateAsync({ id: ticket.id });
      let _tickets = tickets.filter((val) => val.id !== ticket.id);
      setTickets(_tickets);
      setDeleteTicketDialog(false);
      setTicket(emptyTicket);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: response?.message ?? "Tiket berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus tiket",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteTicketsDialog(true);
  };

  const deleteSelectedTickets = async () => {
    try {
      const ids = selectedTickets.map((val) => val.id);
      const response = await deleteTickets.mutateAsync({ ids });
      let _tickets = tickets.filter((val) => !selectedTickets.includes(val));
      setTickets(_tickets);
      setDeleteTicketsDialog(false);
      setSelectedTickets(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Tiket yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus tiket yang dipilih",
        life: 3000,
      });
    }
  };

  // ─── INPUT HANDLERS ──────────────────────────────────────────────────────────

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _ticket = { ...ticket };
    _ticket[name] = val;
    setTicket(_ticket);
  };

  // ─── FILTER ──────────────────────────────────────────────────────────────────

  const applyFilter = (filters) => {
    const filtered = tickets.filter((item) => {
      const statusMatch = filters.status
        ? filters.status === "all"
          ? true
          : item.status === filters.status
        : true;
      return statusMatch;
    });
    setDataTickets(filtered);
  };

  // ─── BODY TEMPLATES ──────────────────────────────────────────────────────────

  const statusBodyTemplate = (rowData) => {
    const statusConfig = {
      OPEN: { label: "Open", severity: "warning", icon: "pi-inbox" },
      DIPROSES: {
        label: "Diproses",
        severity: "info",
        icon: "pi-spin pi-spinner",
      },
      SELESAI: {
        label: "Selesai",
        severity: "success",
        icon: "pi-check-circle",
      },
    };

    const config = statusConfig[rowData.status] || statusConfig.OPEN;

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

  const langgananBodyTemplate = (rowData) => {
    console.log(rowData.langganan.layanan);
    if (!rowData.langganan) return <span className="text-400">-</span>;
    return (
      <div className="flex flex-column gap-1">
        <span className="font-semibold">
          {rowData.langganan.layanan?.namaLayanan || "N/A"}
        </span>
        <small className="text-500">
          {rowData.langganan.layanan?.kecepatanMbps || 0} Mbps
        </small>
      </div>
    );
  };

  const messagesBodyTemplate = (rowData) => {
    const count = rowData.messages?.length || 0;
    return (
      <div className="flex align-items-center gap-2">
        <i className="pi pi-comments text-blue-500" />
        <Badge value={count} severity={count > 0 ? "info" : "secondary"} />
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return rowData.createdAt
      ? new Date(rowData.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";
  };

  const closedAtBodyTemplate = (rowData) => {
    return rowData.closedAt ? (
      <div className="flex flex-column gap-1">
        <span className="text-sm">
          {new Date(rowData.closedAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <small className="text-500">
          {new Date(rowData.closedAt).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>
      </div>
    ) : (
      <span className="text-400">-</span>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          severity="info"
          onClick={() => {
            openDetail(rowData);
            toast.current.show({
              severity: "info",
              summary: "Info",
              detail: `Lihat detail tiket #${rowData.id}`,
              life: 2000,
            });
          }}
          tooltip="Lihat Detail & Pesan"
          tooltipOptions={{ position: "top" }}
        />

        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          onClick={() => editTicket(rowData)}
          tooltip="Edit"
          tooltipOptions={{ position: "top" }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteTicket(rowData)}
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
          label="Tambah Tiket"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Hapus"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedTickets || !selectedTickets.length}
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
      <h4 className="m-0">Kelola Tiket Customer Service</h4>
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

  const ticketDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveTicket} />
    </React.Fragment>
  );

  const deleteTicketDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteTicketDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteTicketItem}
      />
    </React.Fragment>
  );

  const deleteTicketsDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteTicketsDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedTickets}
      />
    </React.Fragment>
  );

  const messageTemplate = () => {
    return (
      <div className="flex flex-column gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 border-round shadow-1 bg-green-500 ${
              msg.sender.role === "ADMIN"
                ? "bg-blue-500 align-self-end"
                : "bg-gray-500 align-self-start"
            }`}
            style={{ maxWidth: "70%" }}
          >
            <div className="text-sm font-bold mb-1  ">
              {msg.sender.role === "ADMIN" ? "CS" : "Customer"}
            </div>
            <div>{msg.message}</div>
            <div className="text-l text-0 mt-2 ">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    );
  };

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
            <small>Total Tiket</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-ticket text-3xl text-blue-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "OPEN" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Open</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-orange-500">{openAnim}</h3>
            </div>
          </div>
          <i className="pi pi-inbox text-3xl text-orange-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3">
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

      <div className="col-12 md:col-6 lg:col-3">
        <div
          className="stat-card"
          onClick={() => applyFilter({ status: "SELESAI" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Selesai</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-green-500">{selesaiAnim}</h3>
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
            value={dataTickets}
            selection={selectedTickets}
            onSelectionChange={(e) => setSelectedTickets(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} tiket"
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
              field="judul"
              header="Judul Tiket"
              sortable
              style={{ minWidth: "16rem" }}
            />
            <Column
              header="Layanan"
              body={langgananBodyTemplate}
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Pesan"
              body={messagesBodyTemplate}
              sortable
              field="messages.length"
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
              header="Dibuat"
              body={createdAtBodyTemplate}
              sortable
              field="createdAt"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Ditutup"
              body={closedAtBodyTemplate}
              sortable
              field="closedAt"
              style={{ minWidth: "10rem" }}
            />
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "10rem" }}
            />
          </DataTable>

          {/* ── CREATE / EDIT DIALOG ── */}
          <Dialog
            visible={ticketDialog}
            style={{ width: "520px" }}
            header={ticket.id ? "Edit Tiket" : "Buat Tiket Baru"}
            modal
            className="p-fluid"
            footer={ticketDialogFooter}
            onHide={hideDialog}
          >
            {/* User Dropdown */}
            <div className="field">
              <label htmlFor="userId">
                User / Pelanggan <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="userId"
                value={ticket.userId}
                options={userOptions}
                onChange={(e) => onInputChange(e, "userId")}
                placeholder="Pilih User"
                filter
                filterBy="label"
                emptyMessage="Tidak ada user"
                emptyFilterMessage="User tidak ditemukan"
                className={classNames({
                  "p-invalid": submitted && !ticket.userId,
                })}
              />
              {submitted && !ticket.userId && (
                <small className="p-error">User harus dipilih.</small>
              )}
            </div>

            {/* Langganan Dropdown */}
            <div className="field">
              <label htmlFor="langgananId">
                Langganan Terkait <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="langgananId"
                value={ticket.langgananId}
                options={langgananOptions}
                onChange={(e) => onInputChange(e, "langgananId")}
                placeholder="Pilih Langganan"
                filter
                filterBy="label"
                emptyMessage="Tidak ada langganan"
                emptyFilterMessage="Langganan tidak ditemukan"
                className={classNames({
                  "p-invalid": submitted && !ticket.langgananId,
                })}
              />
              {submitted && !ticket.langgananId && (
                <small className="p-error">Langganan harus dipilih.</small>
              )}
            </div>

            {/* Judul */}
            <div className="field">
              <label htmlFor="judul">
                Judul Tiket <span className="text-red-500">*</span>
              </label>
              <InputText
                id="judul"
                value={ticket.judul}
                onChange={(e) => onInputChange(e, "judul")}
                required
                placeholder="Contoh: Gangguan koneksi internet"
                className={classNames({
                  "p-invalid": submitted && !ticket.judul,
                })}
              />
              {submitted && !ticket.judul && (
                <small className="p-error">Judul tiket harus diisi.</small>
              )}
            </div>

            {/* Status */}
            <div className="field">
              <label htmlFor="status">
                Status <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="status"
                value={ticket.status}
                options={statusOptions}
                onChange={(e) => onInputChange(e, "status")}
                placeholder="Pilih Status"
              />
            </div>
          </Dialog>

          {/* ── CONFIRM DELETE SINGLE ── */}
          <Dialog
            visible={deleteTicketDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteTicketDialogFooter}
            onHide={hideDeleteTicketDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {ticket && (
                <span>
                  Apakah Anda yakin ingin menghapus tiket{" "}
                  <b>"{ticket.judul}"</b>?
                </span>
              )}
            </div>
          </Dialog>

          {/* ── CONFIRM DELETE MULTIPLE ── */}
          <Dialog
            visible={deleteTicketsDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteTicketsDialogFooter}
            onHide={hideDeleteTicketsDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>Apakah Anda yakin ingin menghapus tiket yang dipilih?</span>
            </div>
          </Dialog>

          <Dialog
            header={`Ticket Detail #${ticket?.id}`}
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
          >
            {ticket && (
              <div className="mb-4">
                <h4>{ticket.userId}</h4>
                <p>Status: {ticket.status}</p>
                {messageTemplate()}
              </div>
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceTicketCrudPage;
