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
import { useFaqApi } from "@/presentation/logics/app/useFaqApi";
import { InputSwitch } from "primereact/inputswitch";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "../../../../styles/app.css";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router";

import { Dropdown } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputNumber } from "primereact/inputnumber";

const FaqCrudPage = () => {
  let emptyFaq = {
    id: null,
    pertanyaan: "",
    jawaban: "",
  };

  const [faqs, setFaqs] = useState([]);
  const [faqDialog, setFaqDialog] = useState(false);
  const [deleteFaqDialog, setDeleteFaqDialog] = useState(false);
  const [deleteFaqsDialog, setDeleteFaqsDialog] = useState(false);
  const [faq, setFaq] = useState(emptyFaq);
  const [selectedFaqs, setSelectedFaqs] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataFaqs, setDataFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState(null);
  const [filterKategori, setFilterKategori] = useState(null);

  const filterRef = useRef(null);

  const {
    useAllFaq,
    createFaq,
    deleteFaq,
    updateFaq,
    updateActive,
    deleteFaqs,
  } = useFaqApi();

  const { data, isPending } = useAllFaq();

  const toast = useRef(null);
  const dt = useRef(null);

  const navigate = useNavigate();

  const kategoriOptions = [
    { label: "Umum", value: "UMUM" },
    { label: "Teknis", value: "TEKNIS" },
    { label: "Pembayaran", value: "PEMBAYARAN" },
    { label: "Lainnya", value: "LAINNYA" },
  ];

  useEffect(() => {
    fetchFaqs();
  }, [data]);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setDataFaqs(data);
      setFaqs(data);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data faq",
        life: 3000,
      });
      setLoading(false);
    }
  };

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `faq_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedFaqs?.length > 0,
    });
  };

  const exportExcel = () => {
    const data = dataFaqs;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Faq");
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
    const data = dataFaqs;
    autoTable(doc, {
      head: [["Pertanyaan", "Jawaban"]],
      body: data.map((item) => [item.pertanyaan, item.jawaban]),
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

  const totalFaqs = faqs?.length || 0;
  const kategoriFaqs = filteredFaqs?.length || 0;
  const selectedCount = selectedFaqs?.length || 0;
  const totalAnim = useCountUp(totalFaqs);
  const kategoriAnim = useCountUp(kategoriFaqs);
  const selectedAnim = useCountUp(selectedCount);

  const openNew = () => {
    setFaq(emptyFaq);
    setSubmitted(false);
    setFaqDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setFaqDialog(false);
  };

  const hideDeleteFaqDialog = () => {
    setDeleteFaqDialog(false);
  };

  const hideDeleteFaqsDialog = () => {
    setDeleteFaqsDialog(false);
  };

  const saveFaq = async () => {
    setSubmitted(true);

    if (faq.pertanyaan.trim() && faq.jawaban.trim()) {
      let _faqs = [...faqs];
      let _faq = { ...faq };

      try {
        if (faq.id) {
          await updateFaq.mutateAsync({
            id: faq.id,
            payload: _faq,
          });

          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Faq berhasil diupdate",
            life: 3000,
          });
        } else {
          await createFaq.mutateAsync(_faq);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Faq berhasil ditambahkan",
            life: 3000,
          });
        }

        setFaqs(_faqs);
        setFaqDialog(false);
        setFaq(emptyFaq);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan faq",
          life: 3000,
        });
      }
    }
  };

  const editFaq = (faq) => {
    setFaq({ ...faq });
    setFaqDialog(true);
  };

  const confirmDeleteFaq = (faq) => {
    setFaq(faq);
    setDeleteFaqDialog(true);
  };

  const deleteFaqItem = async () => {
    try {
      let _faqs = faqs.filter((val) => val.id !== faq.id);
      const response = await deleteFaq.mutateAsync({ id: faq.id });
      setFaqs(_faqs);
      setDeleteFaqDialog(false);
      setFaq(emptyFaq);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Faq berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus faq",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteFaqsDialog(true);
  };

  const deleteSelectedFaqs = async () => {
    try {
      let _faqs = faqs.filter((val) => !selectedFaqs.includes(val));
      const ids = selectedFaqs.map((val) => val.id);
      const response = await deleteFaqs.mutateAsync({
        ids: ids,
      });
      setFaqs(_faqs);
      setDeleteFaqsDialog(false);
      setSelectedFaqs(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Faq yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus faq yang dipilih",
        life: 3000,
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _faq = { ...faq };
    _faq[`${name}`] = val;
    setFaq(_faq);
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
          disabled={!selectedFaqs || !selectedFaqs.length}
        />
      </div>
    );
  };

  const applyFilter = (filters) => {
    console.log(filters);

    const filteredUsers = faqs.filter((user) => {
      const roleMatch = filters.kategori
        ? user.kategori === filters.kategori
        : true;

      return roleMatch;
    });
    setFilteredFaqs(filteredUsers);
    setDataFaqs(filteredUsers);
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Reorder"
          icon="pi pi-sort"
          severity="warning"
          outlined
          onClick={(e) => navigate("/app/faq/reorder")}
        />
        <Button
          label="Filter"
          icon="pi pi-filter"
          severity="info"
          outlined
          onClick={(e) => filterRef.current.toggle(e)}
        />

        <OverlayPanel ref={filterRef}>
          <div className="flex flex-column gap-3 w-16rem">
            <span className="font-semibold">Filter Kategori</span>
            <Dropdown
              value={filterKategori}
              options={kategoriOptions}
              onChange={(e) => setFilterKategori(e.value)}
              placeholder="Pilih Kategori"
              className="w-full"
            />

            {/* APPLY */}
            <Button
              label="Terapkan"
              icon="pi pi-check"
              onClick={() => {
                applyFilter({
                  kategori: filterKategori,
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
                setFilterKategori(null);
                // setShowDeleted(false);
                setDataFaqs(data);
                setFilteredFaqs(null);

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
  const confirmToggle = (rowData, value) => {
    const data = { ...rowData, isActive: value };
    console.log(rowData, data);
    (handleToggle(rowData.id, data),
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Faq berhasil diupdate",
        life: 3000,
      }));
  };

  const handleToggle = (id, status) => {
    console.log(id, status);
    updateActive.mutate({
      id,
      payload: status,
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editFaq(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteFaq(rowData)}
        />
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleDateString("id-ID");
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Kelola Faq</h4>
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

  const faqDialogFooter = (
    <React.Fragment>
      <div className="mt-4 ">
        <Button
          label="Batal"
          icon="pi pi-times"
          outlined
          onClick={hideDialog}
        />
        <Button label="Simpan" icon="pi pi-check" onClick={saveFaq} />
      </div>
    </React.Fragment>
  );

  const deleteFaqDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteFaqDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteFaqItem}
      />
    </React.Fragment>
  );

  const deleteFaqsDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteFaqsDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedFaqs}
      />
    </React.Fragment>
  );

  const statusBodyTemplate = (rowData) => {
    const map = {
      umum: { label: "Umum", icon: "pi pi-info-circle", severity: "info" },
      teknis: { label: "Teknis", icon: "pi pi-cog", severity: "warning" },
      pembayaran: {
        label: "Pembayaran",
        icon: "pi pi-credit-card",
        severity: "success",
      },
      lainnya: {
        label: "Lainnya",
        icon: "pi pi-ellipsis-h",
        severity: "secondary",
      },
    };

    const key = rowData.kategori?.toLowerCase();
    const cat = map[key] || {
      label: "Unknown",
      icon: "pi pi-question-circle",
      severity: "secondary",
    };
    return <Tag value={cat.label} icon={cat.icon} severity={cat.severity} />;
  };

  const activeBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.isActive ? "Aktif" : "Tidak Aktif"}
        severity={rowData.isActive ? "success" : "danger"}
      />
    );
  };

  const statusTemplate = (rowData) => (
    <div className="statusActiveFaq">
      <div className="flex align-items-center gap-2">
        <InputSwitch
          checked={rowData.isActive}
          onChange={(e) => confirmToggle(rowData, e.value)}
        />
      </div>
      <Tag
        value={rowData.isActive ? "Aktif" : "Tidak Aktif"}
        severity={rowData.isActive ? "success" : "danger"}
        icon={rowData.isActive ? "pi pi-check-circle" : "pi pi-times-circle"}
      />
    </div>
  );

  return (
    <div className="grid">
      <div className="col-12 md:col-4">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              kategori: "ALL",
            });
          }}
        >
          <div>
            <small>Total Faq</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-question-circle text-3xl text-teal-500" />
        </div>
      </div>

      <div className="col-12 md:col-4">
        <div className="stat-card">
          <div>
            <small>Kategori {dataFaqs?.kategori}</small>
            <div className="flex align-items-center gap-2">
              <h3>{kategoriAnim}</h3>
            </div>
          </div>
          <i className="pi pi-chart-bar text-3xl text-blue-500" />
        </div>
      </div>
      <div className="col-12 md:col-4">
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
            value={dataFaqs}
            selection={selectedFaqs}
            onSelectionChange={(e) => setSelectedFaqs(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} faq"
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
              field="pertanyaan"
              header="Pertanyaan"
              sortable
              style={{ minWidth: "15rem" }}
            ></Column>
            <Column
              field="jawaban"
              header="Jawaban"
              sortable
              style={{ minWidth: "15rem" }}
            ></Column>

            <Column
              field="kategori"
              header="Kategori"
              sortable
              body={statusBodyTemplate}
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="isActive"
              header="Dipublikasikan"
              sortable
              // body={activeBodyTemplate}
              body={statusTemplate}
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
            visible={faqDialog}
            style={{ width: "600px" }}
            header={faq.id ? "Edit FAQ" : "Tambah FAQ Baru"}
            modal
            className="p-fluid"
            footer={faqDialogFooter}
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
              {/* Header Info with Stats (for existing FAQ) */}
              {faq.id && (
                <div
                  className="stats-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                    // backgroundColor: "#f8f9fa",
                    padding: "1rem",
                    border: "1px solid #dee2e6",
                    borderRadius: "8px",
                  }}
                >
                  <div className="stat-item" style={{ textAlign: "center" }}>
                    <i
                      className="pi pi-eye"
                      style={{ color: "#2196F3", fontSize: "1.2rem" }}
                    ></i>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        marginTop: "0.25rem",
                      }}
                    >
                      {faq.views || 0}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>
                      Dilihat
                    </div>
                  </div>
                  <div className="stat-item" style={{ textAlign: "center" }}>
                    <i
                      className="pi pi-thumbs-up"
                      style={{ color: "#4caf50", fontSize: "1.2rem" }}
                    ></i>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        marginTop: "0.25rem",
                      }}
                    >
                      {faq.helpful || 0}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>
                      Membantu
                    </div>
                  </div>
                  <div className="stat-item" style={{ textAlign: "center" }}>
                    <i
                      className="pi pi-thumbs-down"
                      style={{ color: "#f44336", fontSize: "1.2rem" }}
                    ></i>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        marginTop: "0.25rem",
                      }}
                    >
                      {faq.notHelpful || 0}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>
                      Tidak Membantu
                    </div>
                  </div>
                  <div className="stat-item" style={{ textAlign: "center" }}>
                    <i
                      className="pi pi-chart-line"
                      style={{ color: "#ff9800", fontSize: "1.2rem" }}
                    ></i>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        marginTop: "0.25rem",
                      }}
                    >
                      {(
                        (faq.helpful / (faq.helpful + faq.notHelpful)) * 100 ||
                        0
                      ).toFixed(0)}
                      %
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6c757d" }}>
                      Kepuasan
                    </div>
                  </div>
                </div>
              )}

              {/* Main Form Section */}
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
                    className="pi pi-question-circle"
                    style={{ fontSize: "1.2rem", color: "#2196F3" }}
                  ></i>
                  Detail FAQ
                </h4>

                {/* Pertanyaan Field */}
                <div className="field">
                  <label htmlFor="pertanyaan" className="required-field">
                    Pertanyaan
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-question"></i>
                    </span>
                    <InputTextarea
                      id="pertanyaan"
                      value={faq.pertanyaan}
                      onChange={(e) => onInputChange(e, "pertanyaan")}
                      required
                      autoFocus={!faq.id}
                      rows={3}
                      placeholder="Contoh: Bagaimana cara melakukan pembayaran?"
                      className={classNames({
                        "p-invalid": submitted && !faq.pertanyaan,
                        "w-full": true,
                      })}
                      maxLength={500}
                      autoResize
                    />
                  </div>

                  {submitted && !faq.pertanyaan ? (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Pertanyaan harus diisi
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
                        Tulis pertanyaan yang sering diajukan
                      </small>
                      <small
                        style={{
                          color:
                            faq.pertanyaan?.length > 400
                              ? "#f59e0b"
                              : "#6c757d",
                        }}
                      >
                        {faq.pertanyaan?.length || 0}/500
                      </small>
                    </div>
                  )}
                </div>

                {/* Jawaban Field */}
                <div className="field" style={{ marginTop: "1.5rem" }}>
                  <label htmlFor="jawaban" className="required-field">
                    Jawaban
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-comment"></i>
                    </span>
                    <InputTextarea
                      id="jawaban"
                      value={faq.jawaban}
                      onChange={(e) => onInputChange(e, "jawaban")}
                      required
                      rows={6}
                      placeholder="Tulis jawaban yang jelas dan informatif..."
                      className={classNames({
                        "p-invalid": submitted && !faq.jawaban,
                        "w-full": true,
                      })}
                      maxLength={2000}
                      autoResize
                    />
                  </div>

                  {submitted && !faq.jawaban ? (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Jawaban harus diisi
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
                        Berikan jawaban yang lengkap dan mudah dipahami
                      </small>
                      <small
                        style={{
                          color:
                            faq.jawaban?.length > 1600 ? "#f59e0b" : "#6c757d",
                        }}
                      >
                        {faq.jawaban?.length || 0}/2000
                      </small>
                    </div>
                  )}
                </div>
              </div>

              {/* Settings Section */}
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
                  <i className="pi pi-cog" style={{ fontSize: "1.2rem" }}></i>
                  Pengaturan FAQ
                </h4>

                <div
                  className="grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  {/* Kategori Dropdown */}
                  <div className="field">
                    <label htmlFor="kategori" className="required-field">
                      Kategori
                      <span
                        className="asterisk"
                        style={{ color: "red", marginLeft: "0.25rem" }}
                      >
                        *
                      </span>
                    </label>
                    <Dropdown
                      id="kategori"
                      value={faq.kategori}
                      options={[
                        { label: "Umum", value: "UMUM", icon: "pi pi-globe" },
                        {
                          label: "Pembayaran",
                          value: "PEMBAYARAN",
                          icon: "pi pi-credit-card",
                        },
                        { label: "Teknis", value: "TEKNIS", icon: "pi pi-cog" },
                        {
                          label: "Lainnya",
                          value: "LAINNYA",
                          icon: "pi pi-ellipsis-h",
                        },
                      ]}
                      onChange={(e) => onInputChange(e, "kategori")}
                      placeholder="Pilih Kategori"
                      className={classNames({
                        "w-full": true,
                        "p-invalid": submitted && !faq.kategori,
                      })}
                      optionLabel="label"
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
                              <i className={option.icon}></i>
                              <span>{option.label}</span>
                            </div>
                          );
                        }
                        return <span>{faq.kategori || "Pilih Kategori"}</span>;
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
                              style={{ fontSize: "0.9rem" }}
                            ></i>
                            <span>{option.label}</span>
                          </div>
                        );
                      }}
                    />
                    {submitted && !faq.kategori && (
                      <small className="p-error">
                        <i
                          className="pi pi-exclamation-circle"
                          style={{ marginRight: "0.25rem" }}
                        ></i>
                        Kategori harus dipilih
                      </small>
                    )}
                  </div>

                  {/* Urutan Field */}
                  <div className="field">
                    <label htmlFor="urutan">
                      Urutan Tampil
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
                        <i className="pi pi-sort-numeric-up-alt"></i>
                      </span>
                      <InputNumber
                        id="urutan"
                        value={faq.urutan || 0}
                        onValueChange={(e) => onInputChange(e, "urutan")}
                        min={0}
                        max={999}
                        showButtons
                        buttonLayout="horizontal"
                        incrementButtonIcon="pi pi-plus"
                        crementButtonIcon="pi pi-minus"
                        mode="decimal"
                        placeholder="0"
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
                      Nilai lebih kecil akan tampil lebih atas
                    </small>
                  </div>
                </div>

                {/* Active Status Toggle */}
                <div className="field" style={{ marginTop: "1rem" }}>
                  <div
                    className="card"
                    style={{
                      // backgroundColor: "#f8f9fa",
                      padding: "1rem",
                      borderRadius: "6px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label
                          style={{
                            fontWeight: "500",
                            display: "block",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Status Aktif
                        </label>
                        <small style={{ color: "#6c757d" }}>
                          FAQ yang tidak aktif tidak akan ditampilkan kepada
                          pengguna
                        </small>
                      </div>
                      <InputSwitch
                        checked={faq.isActive}
                        onChange={(e) => onInputChange(e, "isActive")}
                        tooltip={
                          faq.isActive
                            ? "Klik untuk nonaktifkan"
                            : "Klik untuk aktifkan"
                        }
                        tooltipOptions={{ position: "left" }}
                      />
                    </div>

                    {/* Status Badge */}
                    {faq.isActive !== undefined && (
                      <div style={{ marginTop: "0.75rem" }}>
                        {faq.isActive ? (
                          <span
                            style={{
                              backgroundColor: "#4caf50",
                              color: "white",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "16px",
                              fontSize: "0.85rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <i className="pi pi-check-circle"></i>
                            FAQ Aktif & Ditampilkan
                          </span>
                        ) : (
                          <span
                            style={{
                              backgroundColor: "#f44336",
                              color: "white",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "16px",
                              fontSize: "0.85rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <i className="pi pi-ban"></i>
                            FAQ Tidak Aktif
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Metadata Section */}
              {faq.id && (
                <div className="form-section" style={{ marginTop: "1.5rem" }}>
                  <div
                    style={{
                      // backgroundColor: "#f8f9fa",
                      padding: "1rem",
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
                      Dibuat:{" "}
                      {faq.createdAt
                        ? new Date(faq.createdAt).toLocaleString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "-"}
                    </span>
                    <span>
                      <i
                        className="pi pi-hashtag"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      ID: {faq.id}
                    </span>
                  </div>
                </div>
              )}

              {/* Preview Section */}
              {faq.pertanyaan && faq.jawaban && (
                <div className="form-section" style={{ marginTop: "1.5rem" }}>
                  <div
                    style={{
                      border: "1px solid #e9ecef",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        // backgroundColor: "#f8f9fa",
                        padding: "0.75rem 1rem",
                        borderBottom: "1px solid #e9ecef",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <i className="pi pi-eye" style={{ color: "#2196F3" }}></i>
                      Preview Tampilan
                    </div>
                    <div style={{ padding: "1rem" }}>
                      <div
                        style={{
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                          color: "#2196F3",
                        }}
                      >
                        Q: {faq.pertanyaan}
                      </div>
                      <div
                        style={{
                          color: "#495057",
                          lineHeight: "1.5",
                        }}
                      >
                        A:{" "}
                        {faq.jawaban.length > 150
                          ? faq.jawaban.substring(0, 150) + "..."
                          : faq.jawaban}
                      </div>
                    </div>
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

              .p-inputgroup textarea {
                border-left: none;
                resize: vertical;
              }

              .p-inputgroup textarea:focus {
                box-shadow: none;
                border-color: #2196f3;
              }

              .stats-grid {
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              }

              .stat-item {
                transition: transform 0.2s;
              }

              .stat-item:hover {
                transform: translateY(-2px);
              }
            `}</style>
          </Dialog>

          <Dialog
            visible={deleteFaqDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteFaqDialogFooter}
            onHide={hideDeleteFaqDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {faq && (
                <span>
                  Apakah Anda yakin ingin menghapus <b>{faq.pertanyaan}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteFaqsDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteFaqsDialogFooter}
            onHide={hideDeleteFaqsDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>Apakah Anda yakin ingin menghapus faq yang dipilih?</span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default FaqCrudPage;
