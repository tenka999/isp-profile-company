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
import { Avatar } from "primereact/avatar";
import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useCustomerServiceApi } from "@/presentation/logics/app/useCustomerServiceApi";
// import { useCustomerServiceTicketApi } from "@/presentation/logics/app/useCustomerServiceTicketApi";
import { useUserApi } from "@/presentation/logics/app/user";

import "../../../../styles/app.css";

const CustomerServiceMessageCrudPage = () => {
  let emptyMessage = {
    id: null,
    ticketId: null,
    senderId: null,
    pesan: "",
  };

  const [messages, setMessages] = useState([]);
  const [messageDialog, setMessageDialog] = useState(false);
  const [deleteMessageDialog, setDeleteMessageDialog] = useState(false);
  const [deleteMessagesDialog, setDeleteMessagesDialog] = useState(false);
  const [message, setMessage] = useState(emptyMessage);
  const [selectedMessages, setSelectedMessages] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataMessages, setDataMessages] = useState([]);

  // State untuk relasi dropdown
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const toast = useRef(null);
  const dt = useRef(null);

  // const {
  //   useAllMessages,
  //   createMessage,
  //   updateMessage,
  //   deleteMessage,
  //   deleteMessages,

  // } = useCustomerServiceMessageApi();

  const {
    useAllTickets,
    useMessages,
    createTicket,
    sendMessage,
    useAllMessages,
  } = useCustomerServiceApi();

  const { useAllUsers } = useUserApi();

  const { data: messageData, isPending: messagePending } = useAllMessages();
  const { data: ticketData } = useAllTickets();
  const { data: userData } = useAllUsers();

  useEffect(() => {
    fetchMessages();
  }, [messageData]);

  useEffect(() => {
    if (ticketData) {
      setTickets(ticketData);
    }
  }, [ticketData]);

  useEffect(() => {
    if (userData) {
      setUsers(userData);
    }
  }, [userData]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setMessages(messageData);
      setDataMessages(messageData);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data pesan",
        life: 3000,
      });
      setLoading(false);
    }
  };

  // ─── DROPDOWN OPTIONS ────────────────────────────────────────────────────────

  const ticketOptions =
    tickets?.map((t) => ({
      label: `#${t.id} - ${t.judul} (${t.status})`,
      value: t.id,
    })) || [];

  const userOptions =
    users?.map((u) => ({
      label: `${u.nama} (${u.email})`,
      value: u.id,
    })) || [];

  // ─── EXPORT ──────────────────────────────────────────────────────────────────

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `cs_messages_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedMessages?.length > 0,
    });
  };

  const exportExcel = () => {
    const exportData = dataMessages.map((item) => ({
      ID: item.id,
      "Ticket ID": item.ticketId,
      "Judul Ticket": item.ticket?.judul || "-",
      Pengirim: item.sender?.nama || "-",
      Pesan: item.pesan,
      Tanggal: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("id-ID")
        : "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CS Messages");
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
      head: [["Ticket", "Pengirim", "Pesan"]],
      body: dataMessages.map((item) => [
        item.ticket?.judul || "-",
        item.sender?.nama || "-",
        item.pesan.substring(0, 50) + (item.pesan.length > 50 ? "..." : ""),
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

  const totalMessages = messages?.length || 0;
  const selectedCount = selectedMessages?.length || 0;

  const totalAnim = useCountUp(totalMessages);
  const selectedAnim = useCountUp(selectedCount);

  // Hitung pesan per status tiket
  const openTicketMessages =
    messages?.filter((m) => m.ticket?.status === "OPEN").length || 0;
  const processedTicketMessages =
    messages?.filter((m) => m.ticket?.status === "DIPROSES").length || 0;
  const closedTicketMessages =
    messages?.filter((m) => m.ticket?.status === "SELESAI").length || 0;

  const openAnim = useCountUp(openTicketMessages);
  const processedAnim = useCountUp(processedTicketMessages);
  const closedAnim = useCountUp(closedTicketMessages);

  // ─── DIALOG CONTROLS ─────────────────────────────────────────────────────────

  const openNew = () => {
    setMessage(emptyMessage);
    setSubmitted(false);
    setMessageDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setMessageDialog(false);
  };

  const hideDeleteMessageDialog = () => {
    setDeleteMessageDialog(false);
  };

  const hideDeleteMessagesDialog = () => {
    setDeleteMessagesDialog(false);
  };

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  const saveMessage = async () => {
    setSubmitted(true);

    if (message.ticketId && message.senderId && message.pesan.trim()) {
      // let _messages = [...messages];
      const payload = { ...message, ticketId: parseInt(message.ticketId) };

      try {
        if (message.id) {
          const response = await updateMessage.mutateAsync({
            id: message.id,
            payload,
          });
          const updated = response?.data ?? response;
          // _messages[_messages.findIndex((val) => val.id === message.id)] =
          // updated;
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: response?.message ?? "Pesan berhasil diupdate",
            life: 3000,
          });
        } else {
          const result = await sendMessage.mutateAsync(payload);
          const newMessage = result?.data ?? result;
          // _messages.push (newMessage);
          console.log("newMessage", result);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: result?.message ?? "Pesan berhasil ditambahkan",
            life: 3000,
          });
        }

        setMessages(messages);
        setMessageDialog(false);
        setMessage(emptyMessage);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan pesan",
          life: 3000,
        });
      }
    }
  };

  const editMessage = (rowData) => {
    setMessage({ ...rowData });
    setMessageDialog(true);
  };

  const confirmDeleteMessage = (rowData) => {
    setMessage(rowData);
    setDeleteMessageDialog(true);
  };

  const deleteMessageItem = async () => {
    try {
      const response = await deleteMessage.mutateAsync({ id: message.id });
      let _messages = messages.filter((val) => val.id !== message.id);
      setMessages(_messages);
      setDeleteMessageDialog(false);
      setMessage(emptyMessage);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: response?.message ?? "Pesan berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus pesan",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteMessagesDialog(true);
  };

  const deleteSelectedMessages = async () => {
    try {
      const ids = selectedMessages.map((val) => val.id);
      const response = await deleteMessages.mutateAsync({ ids });
      let _messages = messages.filter((val) => !selectedMessages.includes(val));
      setMessages(_messages);
      setDeleteMessagesDialog(false);
      setSelectedMessages(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Pesan yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus pesan yang dipilih",
        life: 3000,
      });
    }
  };

  // ─── INPUT HANDLERS ──────────────────────────────────────────────────────────

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _message = { ...message };
    _message[name] = val;
    setMessage(_message);
  };

  // ─── FILTER ──────────────────────────────────────────────────────────────────

  const applyFilter = (filters) => {
    const filtered = messages.filter((item) => {
      const statusMatch = filters.ticketStatus
        ? item.ticket?.status === filters.ticketStatus
        : true;
      return statusMatch;
    });
    setDataMessages(filtered);
  };

  // ─── BODY TEMPLATES ──────────────────────────────────────────────────────────

  const ticketBodyTemplate = (rowData) => {
    if (!rowData.ticket) return <span className="text-400">-</span>;

    const statusConfig = {
      OPEN: { severity: "warning", icon: "pi-inbox" },
      DIPROSES: { severity: "info", icon: "pi-spin pi-spinner" },
      SELESAI: { severity: "success", icon: "pi-check-circle" },
    };

    const config = statusConfig[rowData.ticket.status] || statusConfig.OPEN;

    return (
      <div className="flex flex-column gap-2">
        <div className="flex align-items-center gap-2">
          <span className="font-semibold">#{rowData.ticket.id}</span>
          <Tag
            value={rowData.ticket.status}
            severity={config.severity}
            icon={config.icon}
            className="text-xs"
          />
        </div>
        <span className="text-sm text-600">{rowData.ticket.judul}</span>
      </div>
    );
  };

  const senderBodyTemplate = (rowData) => {
    if (!rowData.sender) return <span className="text-400">-</span>;

    const initials = rowData.sender.nama
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
            backgroundColor: "#2196F3",
            color: "#ffffff",
          }}
        />
        <div className="flex flex-column">
          <span className="font-semibold">{rowData.sender.nama}</span>
          <small className="text-500">{rowData.sender.email}</small>
        </div>
      </div>
    );
  };

  const pesanBodyTemplate = (rowData) => {
    const maxLength = 80;
    const truncated =
      rowData.pesan.length > maxLength
        ? rowData.pesan.substring(0, maxLength) + "..."
        : rowData.pesan;

    return (
      <div className="flex flex-column gap-1">
        <span className="text-sm">{truncated}</span>
        {rowData.pesan.length > maxLength && (
          <small className="text-400 italic">
            {rowData.pesan.length} karakter
          </small>
        )}
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    if (!rowData.createdAt) return "-";

    const date = new Date(rowData.createdAt);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let timeAgo;
    if (diffMins < 1) {
      timeAgo = "Baru saja";
    } else if (diffMins < 60) {
      timeAgo = `${diffMins} menit lalu`;
    } else if (diffHours < 24) {
      timeAgo = `${diffHours} jam lalu`;
    } else if (diffDays < 7) {
      timeAgo = `${diffDays} hari lalu`;
    } else {
      timeAgo = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    return (
      <div className="flex flex-column gap-1">
        <span className="text-sm">{timeAgo}</span>
        <small className="text-500">
          {date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>
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
          onClick={() => editMessage(rowData)}
          tooltip="Edit"
          tooltipOptions={{ position: "top" }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteMessage(rowData)}
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
          label="Tambah Pesan"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Hapus"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedMessages || !selectedMessages.length}
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
      <h4 className="m-0">Kelola Pesan Customer Service</h4>
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

  const messageDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveMessage} />
    </React.Fragment>
  );

  const deleteMessageDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteMessageDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteMessageItem}
      />
    </React.Fragment>
  );

  const deleteMessagesDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteMessagesDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedMessages}
      />
    </React.Fragment>
  );

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="grid">
      {/* ── STAT CARDS ── */}
      <div className="col-12 md:col-6 lg:col-3">
        <div className="stat-card" style={{ cursor: "pointer" }}>
          <div>
            <small>Total Pesan</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-comments text-3xl text-blue-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3">
        <div
          className="stat-card"
          onClick={() => applyFilter({ ticketStatus: "OPEN" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Tiket Open</small>
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
          onClick={() => applyFilter({ ticketStatus: "DIPROSES" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Tiket Diproses</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-blue-500">{processedAnim}</h3>
            </div>
          </div>
          <i className="pi pi-spin pi-spinner text-3xl text-blue-500" />
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3">
        <div
          className="stat-card"
          onClick={() => applyFilter({ ticketStatus: "SELESAI" })}
          style={{ cursor: "pointer" }}
        >
          <div>
            <small>Tiket Selesai</small>
            <div className="flex align-items-center gap-2">
              <h3 className="text-green-500">{closedAnim}</h3>
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
            value={dataMessages}
            selection={selectedMessages}
            onSelectionChange={(e) => setSelectedMessages(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} pesan"
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
              header="Tiket"
              body={ticketBodyTemplate}
              sortable
              field="ticket.id"
              style={{ minWidth: "16rem" }}
            />
            <Column
              header="Pengirim"
              body={senderBodyTemplate}
              sortable
              field="sender.nama"
              style={{ minWidth: "16rem" }}
            />
            <Column
              header="Pesan"
              body={pesanBodyTemplate}
              sortable
              field="pesan"
              style={{ minWidth: "20rem" }}
            />
            <Column
              header="Waktu"
              body={createdAtBodyTemplate}
              sortable
              field="createdAt"
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
            visible={messageDialog}
            style={{ width: "520px" }}
            header={message.id ? "Edit Pesan" : "Kirim Pesan Baru"}
            modal
            className="p-fluid"
            footer={messageDialogFooter}
            onHide={hideDialog}
          >
            {/* Ticket Dropdown */}
            <div className="field">
              <label htmlFor="ticketId">
                Tiket <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="ticketId"
                value={message.ticketId}
                options={ticketOptions}
                onChange={(e) => onInputChange(e, "ticketId")}
                placeholder="Pilih Tiket"
                filter
                filterBy="label"
                emptyMessage="Tidak ada tiket"
                emptyFilterMessage="Tiket tidak ditemukan"
                className={classNames({
                  "p-invalid": submitted && !message.ticketId,
                })}
              />
              {submitted && !message.ticketId && (
                <small className="p-error">Tiket harus dipilih.</small>
              )}
            </div>

            {/* Sender Dropdown */}
            <div className="field">
              <label htmlFor="senderId">
                Pengirim <span className="text-red-500">*</span>
              </label>
              <Dropdown
                id="senderId"
                value={message.senderId}
                options={userOptions}
                onChange={(e) => onInputChange(e, "senderId")}
                placeholder="Pilih Pengirim"
                filter
                filterBy="label"
                emptyMessage="Tidak ada user"
                emptyFilterMessage="User tidak ditemukan"
                className={classNames({
                  "p-invalid": submitted && !message.senderId,
                })}
              />
              {submitted && !message.senderId && (
                <small className="p-error">Pengirim harus dipilih.</small>
              )}
            </div>

            {/* Pesan */}
            <div className="field">
              <label htmlFor="pesan">
                Pesan <span className="text-red-500">*</span>
              </label>
              <InputTextarea
                id="pesan"
                value={message.pesan}
                onChange={(e) => onInputChange(e, "pesan")}
                required
                rows={5}
                placeholder="Ketik pesan Anda di sini..."
                className={classNames({
                  "p-invalid": submitted && !message.pesan,
                })}
              />
              {submitted && !message.pesan && (
                <small className="p-error">Pesan harus diisi.</small>
              )}
              <small className="text-500">
                {message.pesan.length} karakter
              </small>
            </div>
          </Dialog>

          {/* ── CONFIRM DELETE SINGLE ── */}
          <Dialog
            visible={deleteMessageDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteMessageDialogFooter}
            onHide={hideDeleteMessageDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {message && (
                <span>Apakah Anda yakin ingin menghapus pesan ini?</span>
              )}
            </div>
          </Dialog>

          {/* ── CONFIRM DELETE MULTIPLE ── */}
          <Dialog
            visible={deleteMessagesDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteMessagesDialogFooter}
            onHide={hideDeleteMessagesDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>Apakah Anda yakin ingin menghapus pesan yang dipilih?</span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceMessageCrudPage;
