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
import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCoverageAreaApi } from "@/presentation/logics/app/useCoverageAreaApi";

import "../../../../styles/app.css";

const CoverageAreaCrudPage = () => {
  let emptyCoverageArea = {
    id: null,
    namaArea: "",
    status: "TERSEDIA",
  };

  const [coverageAreas, setCoverageAreas] = useState([]);
  const [coverageAreaDialog, setCoverageAreaDialog] = useState(false);
  const [deleteCoverageAreaDialog, setDeleteCoverageAreaDialog] =
    useState(false);
  const [deleteCoverageAreasDialog, setDeleteCoverageAreasDialog] =
    useState(false);
  const [coverageArea, setCoverageArea] = useState(emptyCoverageArea);
  const [selectedCoverageAreas, setSelectedCoverageAreas] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataCoverageAreas, setDataCoverageAreas] = useState([]);

  const toast = useRef(null);
  const dt = useRef(null);

  const {
    useAllCoverageArea,
    createCoverageArea,
    updateCoverageArea,
    deleteCoverageArea,
    deleteCoverageAreas,
  } = useCoverageAreaApi();
  const { data, isLoading, isPending } = useAllCoverageArea();
  const statusOptions = [
    { label: "Tersedia", value: "TERSEDIA" },
    { label: "Tidak Tersedia", value: "TIDAK_TERSEDIA" },
  ];

  useEffect(() => {
    fetchCoverageAreas();
  }, [data]);

  const fetchCoverageAreas = async () => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setCoverageAreas(data);
      setDataCoverageAreas(data);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data coverage area",
        life: 3000,
      });
      setLoading(false);
    }
  };

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `coverage_area_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedCoverageAreas?.length > 0,
    });
  };

  const exportExcel = () => {
    const data = dataCoverageAreas;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CoverageArea");
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
    const data = dataCoverageAreas;
    autoTable(doc, {
      head: ["Nama Area", "Status"],
      body: data.map((item) => [item.namaArea, item.status]),
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

  const totalCoverageAreas = coverageAreas?.length || 0;
  // const tersedia =
  //   coverageAreas?.filter((val) => val.status === "TERSEDIA").length || 0;
  // const tidaktersedia =
  //   coverageAreas?.filter((val) => val.status === "TIDAK_TERSEDIA").length || 0;
  console.log(coverageAreas);
  const tersedia =
    coverageAreas?.filter((val) => val.status === "TERSEDIA").length || 0;
  const tidaktersedia =
    coverageAreas?.filter((val) => val.status === "TIDAK_TERSEDIA").length || 0;
  const selectedCount = selectedCoverageAreas?.length || 0;
  const totalAnim = useCountUp(totalCoverageAreas);
  const tersediaAnim = useCountUp(tersedia);
  const tidaktersediaAnim = useCountUp(tidaktersedia);
  const selectedAnim = useCountUp(selectedCount);

  const openNew = () => {
    setCoverageArea(emptyCoverageArea);
    setSubmitted(false);
    setCoverageAreaDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCoverageAreaDialog(false);
  };

  const hideDeleteCoverageAreaDialog = () => {
    setDeleteCoverageAreaDialog(false);
  };

  const hideDeleteCoverageAreasDialog = () => {
    setDeleteCoverageAreasDialog(false);
  };

  const saveCoverageArea = async () => {
    setSubmitted(true);
    console.log(coverageAreas);

    if (coverageArea.namaArea.trim()) {
      let _coverageAreas = [...coverageAreas];
      let _coverageArea = { ...coverageArea };

      try {
        if (coverageArea.id) {
          const response = await updateCoverageArea.mutateAsync({
            id: coverageArea.id,
            payload: _coverageArea,
          });
          const updatedCoverageArea = response.data.data;
          // _coverageAreas[
          //   _coverageAreas.findIndex((item) => item.id === coverageArea.id)
          // ] = updatedCoverageArea;

          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "CoverageArea berhasil diupdate",
            life: 3000,
          });
        } else {
          const response = await createCoverageArea.mutateAsync(_coverageArea);
          console.log(response);
          const newCoverageArea = response?.data ?? result;
          _coverageAreas.push(newCoverageArea);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "CoverageArea berhasil ditambahkan",
            life: 3000,
          });
        }

        setCoverageAreas(_coverageAreas);
        setDataCoverageAreas(_coverageAreas);
        setCoverageAreaDialog(false);
        setCoverageArea(emptyCoverageArea);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan coverage area",
          life: 3000,
        });
      }
    }
  };

  const editCoverageArea = (coverageArea) => {
    setCoverageArea({ ...coverageArea });
    setCoverageAreaDialog(true);
  };

  const confirmDeleteCoverageArea = (coverageArea) => {
    setCoverageArea(coverageArea);
    setDeleteCoverageAreaDialog(true);
  };

  const deleteCoverageAreaItem = async () => {
    try {
      let _coverageAreas = coverageAreas.filter(
        (val) => val.id !== coverageArea.id,
      );
      await deleteCoverageArea.mutateAsync({ id: coverageArea.id });
      setCoverageAreas(_coverageAreas);
      setDeleteCoverageAreaDialog(false);
      setCoverageArea(emptyCoverageArea);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "CoverageArea berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus coverage area",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteCoverageAreasDialog(true);
  };

  const deleteSelectedCoverageAreas = async () => {
    try {
      let _coverageAreas = coverageAreas.filter(
        (val) => !selectedCoverageAreas.includes(val),
      );
      const ids = selectedCoverageAreas.map((val) => val.id);
      const response = await deleteCoverageAreas.mutateAsync({
        ids: ids,
      });
      setCoverageAreas(_coverageAreas);
      setDeleteCoverageAreasDialog(false);
      setSelectedCoverageAreas(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "CoverageArea yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus coverage area yang dipilih",
        life: 3000,
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _coverageArea = { ...coverageArea };
    _coverageArea[`${name}`] = val;
    setCoverageArea(_coverageArea);
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
          disabled={!selectedCoverageAreas || !selectedCoverageAreas.length}
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
          onClick={() => editCoverageArea(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteCoverageArea(rowData)}
        />
      </div>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return rowData.createdAt
      ? new Date(rowData.createdAt).toLocaleDateString("id-ID")
      : "";
  };

  const statusBodyTemplate = (rowData) => {
    const available = rowData.status === "TERSEDIA";

    return (
      <Tag
        value={available ? "Tersedia" : "Tidak Tersedia"}
        severity={available ? "success" : "danger"}
        icon={available ? "pi pi-check-circle" : "pi pi-times-circle"}
      />
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Kelola CoverageArea</h4>
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

  const coverageAreaDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveCoverageArea} />
    </React.Fragment>
  );

  const deleteCoverageAreaDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCoverageAreaDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteCoverageAreaItem}
      />
    </React.Fragment>
  );

  const deleteCoverageAreasDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCoverageAreasDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedCoverageAreas}
      />
    </React.Fragment>
  );

  const applyFilter = (filters) => {
    console.log(filters);

    const filteredUsers = coverageAreas.filter((artikel) => {
      const statusMatch = filters.status
        ? filters.status === "ALL"
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
    setDataCoverageAreas(filteredUsers);
  };

  return (
    <div className="grid">
      <div className="col-12 md:col-3">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              status: "ALL",
            });
          }}
        >
          <div>
            <small>Total CoverageArea</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-map-marker text-3xl text-cyan-500" />
        </div>
      </div>
      <div className="col-12 md:col-3">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              status: "TERSEDIA",
            });
          }}
        >
          <div>
            <small>Tersedia</small>
            <div className="flex align-items-center gap-2">
              <h3>{tersediaAnim}</h3>
            </div>
          </div>
          <i className="pi pi-check-circle text-3xl text-green-500" />
        </div>
      </div>
      <div className="col-12 md:col-3">
        <div
          className="stat-card"
          onClick={() => {
            applyFilter({
              status: "TIDAK_TERSEDIA",
            });
          }}
        >
          <div>
            <small>Tidak Tersedia</small>
            <div className="flex align-items-center gap-2">
              <h3>{tidaktersediaAnim}</h3>
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
            value={dataCoverageAreas}
            selection={selectedCoverageAreas}
            onSelectionChange={(e) => setSelectedCoverageAreas(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} coverage area"
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
              field="namaArea"
              header="Nama Area"
              sortable
              style={{ minWidth: "15rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
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
            visible={coverageAreaDialog}
            style={{ width: "500px" }}
            header={
              coverageArea.id ? "Edit Area Layanan" : "Tambah Area Layanan Baru"
            }
            modal
            className="p-fluid"
            footer={coverageAreaDialogFooter}
            onHide={hideDialog}
            draggable={false}
            closeOnEscape
          >
            {/* Form Content */}
            <div className="dialog-content" style={{ padding: "0.5rem 1rem" }}>
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
                  Area layanan menentukan wilayah jangkauan pengiriman atau
                  layanan kami.
                </small>
              </div>

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
                    className="pi pi-map-marker"
                    style={{ fontSize: "1.2rem", color: "#2196F3" }}
                  ></i>
                  Informasi Area
                </h4>

                {/* Nama Area Field */}
                <div className="field">
                  <label htmlFor="namaArea" className="required-field">
                    Nama Area
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-map"></i>
                    </span>
                    <InputText
                      id="namaArea"
                      value={coverageArea.namaArea}
                      onChange={(e) => onInputChange(e, "namaArea")}
                      placeholder="Contoh: Jakarta Pusat, Surabaya, Bandung"
                      required
                      autoFocus={!coverageArea.id}
                      maxLength={100}
                      className={classNames({
                        "p-invalid": submitted && !coverageArea.namaArea,
                      })}
                    />
                  </div>

                  {submitted && !coverageArea.namaArea ? (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Nama area harus diisi
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
                        Masukkan nama wilayah/kota area layanan
                      </small>
                      <small
                        style={{
                          color:
                            coverageArea.namaArea?.length > 80
                              ? "#f59e0b"
                              : "#6c757d",
                        }}
                      >
                        {coverageArea.namaArea?.length || 0}/100
                      </small>
                    </div>
                  )}
                </div>

                {/* Status Field */}
                <div className="field" style={{ marginTop: "1.5rem" }}>
                  <label htmlFor="status" className="required-field">
                    Status Area
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>

                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-power-off"></i>
                    </span>
                    <Dropdown
                      id="status"
                      value={coverageArea.status}
                      options={
                        statusOptions || [
                          { label: "Tersedia", value: "TERSEDIA" },
                          { label: "Tidak Tersedia", value: "TIDAK_TERSEDIA" },
                        ]
                      }
                      onChange={(e) => onInputChange(e, "status")}
                      placeholder="Pilih Status Area"
                      className={classNames({
                        "w-full": true,
                        "p-invalid": submitted && !coverageArea.status,
                      })}
                      optionLabel="label"
                      optionValue="value"
                      showClear={false}
                    />
                  </div>

                  {submitted && !coverageArea.status && (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Status area harus dipilih
                    </small>
                  )}

                  {/* Status Helper */}
                  {coverageArea.status && (
                    <div
                      className="status-helper"
                      style={{ marginTop: "0.5rem" }}
                    >
                      {coverageArea.status === "TERSEDIA" ? (
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
                          <i
                            className="pi pi-check-circle"
                            style={{ fontSize: "1rem" }}
                          ></i>
                          <span>
                            Area ini <strong>tersedia</strong> untuk layanan.
                            Pelanggan dapat memilih area ini.
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
                          <i
                            className="pi pi-ban"
                            style={{ fontSize: "1rem" }}
                          ></i>
                          <span>
                            Area ini <strong>tidak tersedia</strong> untuk
                            layanan. Pelanggan tidak dapat memilih area ini.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats Section (for existing areas) */}
              {coverageArea.id && (
                <div className="form-section" style={{ marginTop: "2rem" }}>
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
                      className="pi pi-chart-bar"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    Informasi Layanan
                  </h4>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      // backgroundColor: "#e9ecef",
                      padding: "1rem",
                      borderRadius: "6px",
                    }}
                  >
                    <div className="stat-item">
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#6c757d",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <i
                          className="pi pi-tag"
                          style={{ marginRight: "0.25rem" }}
                        ></i>
                        ID Area
                      </div>
                      <div style={{ fontWeight: "500", fontSize: "1.1rem" }}>
                        #{coverageArea.id}
                      </div>
                    </div>

                    <div className="stat-item">
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#6c757d",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <i
                          className="pi pi-calendar"
                          style={{ marginRight: "0.25rem" }}
                        ></i>
                        Status Saat Ini
                      </div>
                      <div>
                        {coverageArea.status === "TERSEDIA" ? (
                          <span
                            style={{
                              backgroundColor: "#4caf50",
                              color: "white",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "4px",
                              fontSize: "0.85rem",
                              fontWeight: "500",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <i className="pi pi-check"></i>
                            Tersedia
                          </span>
                        ) : (
                          <span
                            style={{
                              backgroundColor: "#f44336",
                              color: "white",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "4px",
                              fontSize: "0.85rem",
                              fontWeight: "500",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <i className="pi pi-times"></i>
                            Tidak Tersedia
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example Areas (for new areas) */}
              {!coverageArea.id && (
                <div className="example-section" style={{ marginTop: "2rem" }}>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#6c757d",
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <i
                      className="pi pi-lightbulb"
                      style={{ color: "#ffc107" }}
                    ></i>
                    Contoh Area Layanan:
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {[
                      "Jakarta Pusat",
                      "Surabaya",
                      "Bandung",
                      "Medan",
                      "Semarang",
                      "Makassar",
                    ].map((area, index) => (
                      <span
                        key={index}
                        onClick={() =>
                          onInputChange({ target: { value: area } }, "namaArea")
                        }
                        style={{
                          padding: "0.25rem 0.75rem",
                          backgroundColor: "#e9ecef",
                          borderRadius: "16px",
                          fontSize: "0.85rem",
                          color: "#495057",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          border: "1px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#2196F3";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#e9ecef";
                          e.currentTarget.style.color = "#495057";
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                  <small
                    style={{
                      color: "#6c757d",
                      display: "block",
                      marginTop: "0.5rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    Klik contoh di atas untuk mengisi otomatis
                  </small>
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
              .p-inputgroup .p-dropdown {
                border-left: none;
              }

              .p-inputgroup input:focus,
              .p-inputgroup .p-dropdown:focus {
                box-shadow: none;
                border-color: #2196f3;
              }

              .example-section span:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
            `}</style>
          </Dialog>

          <Dialog
            visible={deleteCoverageAreaDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteCoverageAreaDialogFooter}
            onHide={hideDeleteCoverageAreaDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {coverageArea && (
                <span>
                  Apakah Anda yakin ingin menghapus{" "}
                  <b>{coverageArea.namaArea}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteCoverageAreasDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteCoverageAreasDialogFooter}
            onHide={hideDeleteCoverageAreasDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah Anda yakin ingin menghapus coverage area yang dipilih?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CoverageAreaCrudPage;
