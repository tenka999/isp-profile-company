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
import { SplitButton } from "primereact/splitbutton";
import { useCountUp } from "@/hooks/useCountUp";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "../../../../styles/app.css";

const BannerCrudPage = () => {
  let emptyBanner = {
    id: null,
    judul: "",
    gambar: "",
    link: "",
    status: "AKTIF",
  };

  const [banners, setBanners] = useState([]);
  const [bannerDialog, setBannerDialog] = useState(false);
  const [deleteBannerDialog, setDeleteBannerDialog] = useState(false);
  const [deleteBannersDialog, setDeleteBannersDialog] = useState(false);
  const [banner, setBanner] = useState(emptyBanner);
  const [selectedBanners, setSelectedBanners] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataBanners, setDataBanners] = useState([]);

  const toast = useRef(null);
  const dt = useRef(null);

  const statusOptions = [
    { label: "Aktif", value: "AKTIF" },
    { label: "Non-Aktif", value: "NONAKTIF" },
  ];

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      // TODO: Implement API call
      // const response = await fetch('/api/banners');
      // const data = await response.json();
      // setBanners(data);
      // setDataBanners(data);
      setLoading(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data banner",
        life: 3000,
      });
      setLoading(false);
    }
  };

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `banners_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedBanners?.length > 0,
    });
  };

  const exportExcel = () => {
    const data = dataBanners;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Banners");
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
    const data = dataBanners;
    autoTable(doc, {
      head: [["Judul", "Link", "Status"]],
      body: data.map((b) => [b.judul, b.link, b.status]),
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

  const totalBanners = banners?.length || 0;
  const activeBanners = banners?.filter((b) => b.status === "AKTIF").length || 0;
  const inactiveBanners = banners?.filter((b) => b.status === "NONAKTIF").length || 0;
  const selectedCount = selectedBanners?.length || 0;

  const totalAnim = useCountUp(totalBanners);
  const activeAnim = useCountUp(activeBanners);
  const inactiveAnim = useCountUp(inactiveBanners);
  const selectedAnim = useCountUp(selectedCount);

  const openNew = () => {
    setBanner(emptyBanner);
    setSubmitted(false);
    setBannerDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setBannerDialog(false);
  };

  const hideDeleteBannerDialog = () => {
    setDeleteBannerDialog(false);
  };

  const hideDeleteBannersDialog = () => {
    setDeleteBannersDialog(false);
  };

  const saveBanner = async () => {
    setSubmitted(true);

    if (banner.gambar.trim()) {
      let _banners = [...banners];
      let _banner = { ...banner };

      try {
        if (banner.id) {
          // Update
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Banner berhasil diupdate",
            life: 3000,
          });
        } else {
          // Create
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Banner berhasil ditambahkan",
            life: 3000,
          });
        }

        setBanners(_banners);
        setBannerDialog(false);
        setBanner(emptyBanner);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan banner",
          life: 3000,
        });
      }
    }
  };

  const editBanner = (banner) => {
    setBanner({ ...banner });
    setBannerDialog(true);
  };

  const confirmDeleteBanner = (banner) => {
    setBanner(banner);
    setDeleteBannerDialog(true);
  };

  const deleteBannerItem = async () => {
    try {
      let _banners = banners.filter((val) => val.id !== banner.id);
      setBanners(_banners);
      setDeleteBannerDialog(false);
      setBanner(emptyBanner);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Banner berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus banner",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setDeleteBannersDialog(true);
  };

  const deleteSelectedBanners = async () => {
    try {
      let _banners = banners.filter((val) => !selectedBanners.includes(val));
      setBanners(_banners);
      setDeleteBannersDialog(false);
      setSelectedBanners(null);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Banner yang dipilih berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus banner yang dipilih",
        life: 3000,
      });
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _banner = { ...banner };
    _banner[`${name}`] = val;
    setBanner(_banner);
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
          disabled={!selectedBanners || !selectedBanners.length}
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

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={rowData.status === "AKTIF" ? "success" : "danger"}
      />
    );
  };

  const imageBodyTemplate = (rowData) => {
    return rowData.gambar ? (
      <img
        src={rowData.gambar}
        alt={rowData.judul}
        className="shadow-2 border-round"
        style={{ width: "100px" }}
      />
    ) : (
      <span className="text-400">No image</span>
    );
  };

  const createdAtBodyTemplate = (rowData) => {
    return rowData.createdAt ? new Date(rowData.createdAt).toLocaleDateString("id-ID") : "";
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editBanner(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteBanner(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Kelola Banner</h4>
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

  const bannerDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveBanner} />
    </React.Fragment>
  );

  const deleteBannerDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteBannerDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteBannerItem}
      />
    </React.Fragment>
  );

  const deleteBannersDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteBannersDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedBanners}
      />
    </React.Fragment>
  );

  return (
    <div className="grid">
      <div className="col-12 md:col-3">
        <div className="stat-card">
          <div>
            <small>Total Banner</small>
            <div className="flex align-items-center gap-2">
              <h3>{totalAnim}</h3>
            </div>
          </div>
          <i className="pi pi-image text-3xl text-red-500" />
        </div>
      </div>

      <div className="col-12 md:col-3">
        <div className="stat-card">
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
        <div className="stat-card">
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
            value={dataBanners}
            selection={selectedBanners}
            onSelectionChange={(e) => setSelectedBanners(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} banner"
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
              field="gambar"
              header="Gambar"
              body={imageBodyTemplate}
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="judul"
              header="Judul"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="link"
              header="Link"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "8rem" }}
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
            visible={bannerDialog}
            style={{ width: "450px" }}
            header="Detail Banner"
            modal
            className="p-fluid"
            footer={bannerDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="judul">Judul</label>
              <InputText
                id="judul"
                value={banner.judul}
                onChange={(e) => onInputChange(e, "judul")}
                autoFocus
              />
            </div>

            <div className="field">
              <label htmlFor="gambar">Gambar (URL)</label>
              <InputText
                id="gambar"
                value={banner.gambar}
                onChange={(e) => onInputChange(e, "gambar")}
                required
                className={classNames({ "p-invalid": submitted && !banner.gambar })}
              />
              {submitted && !banner.gambar && (
                <small className="p-error">Gambar harus diisi.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="link">Link</label>
              <InputText
                id="link"
                value={banner.link}
                onChange={(e) => onInputChange(e, "link")}
              />
            </div>

            <div className="field">
              <label htmlFor="status">Status</label>
              <Dropdown
                id="status"
                value={banner.status}
                options={statusOptions}
                onChange={(e) => onInputChange(e, "status")}
                placeholder="Pilih Status"
              />
            </div>
          </Dialog>

          <Dialog
            visible={deleteBannerDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteBannerDialogFooter}
            onHide={hideDeleteBannerDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {banner && (
                <span>
                  Apakah Anda yakin ingin menghapus <b>{banner.judul}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteBannersDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteBannersDialogFooter}
            onHide={hideDeleteBannersDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>
                Apakah Anda yakin ingin menghapus banner yang dipilih?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default BannerCrudPage;
