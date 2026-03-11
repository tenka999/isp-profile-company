import React, { useState, useEffect, useRef, act, refetch } from "react";
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
import { useUserApi } from "@/presentation/logics/app/user";
import { Password } from "primereact/password";
import baseApi from "@/core/api/baseApi";
import { OverlayPanel } from "primereact/overlaypanel";
import { Checkbox } from "primereact/checkbox";
import { ProgressBar } from "primereact/progressbar";
import { Card } from "primereact/card";
import { useCountUp } from "@/hooks/useCountUp";
import { SplitButton } from "primereact/splitbutton";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { InputMask } from "primereact/inputmask";

import "../../../../styles/app.css";

const UserCrudPage = () => {
  let emptyUser = {
    id: null,
    nama: "",
    email: "",
    telepon: "",
    password: "",
    role: "USER",
  };

  const [users, setUsers] = useState([]);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataUsers, setDataUsers] = useState([]);
  const [lastDeletedIds, setLastDeletedIds] = useState([]);
  const [clicked, setClicked] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);

  const filterRef = useRef(null);

  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);

  const [filterRole, setFilterRole] = useState(null);
  const [keyword, setKeyword] = useState("");
  // const [showDeleted, setShowDeleted] = useState(false); // deletedAt
  const [deletedStatus, setDeletedStatus] = useState("active");

  const {
    useAllUsers,
    createUser,
    updateUser,
    deleteUser,
    deleteSelectedUser,
    restoreSelectedUser,
  } = useUserApi(user);

  const roleOptions = [
    { label: "User", value: "USER" },
    { label: "Admin", value: "ADMIN" },
  ];

  const deletedOptions = [
    { label: "Aktif", value: "active" },
    { label: "Terhapus", value: "deleted" },
    { label: "Semua", value: "all" },
  ];

  const { data, isPending, isError, error } = useAllUsers();

  useEffect(() => {
    if (data) {
      setUsers(data);
      setLoading(false);
      setDataUsers(data);
    }
  }, [data]);

  //   useEffect(() => {
  //     // Fetch users from API
  //     fetchUsers();
  //   }, []);

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    return `users_${date}`;
  };

  const exportCSV = () => {
    dt.current.exportCSV({
      selectionOnly: selectedUsers?.length > 0,
    });
  };

  const exportExcel = () => {
    const data = dataUsers;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

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

    const data = dataUsers;

    autoTable(doc, {
      head: [["Nama", "Email", "Telepon", "Role", "Status"]],
      body: data.map((u) => [
        u.nama,
        u.email,
        u.telepon,
        u.role,
        u.deletedAt ? "Terhapus" : "Aktif",
      ]),
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

  const fetchUsers = async () => {
    try {
      setLoading(true);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal memuat data user",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users?.length || 0;

  const activeUsers = users?.filter((u) => u.deletedAt === null).length || 0;

  const deletedUsers = users?.filter((u) => u.deletedAt !== null).length || 0;

  const selectedCount = selectedUsers?.length || 0;

  const totalAnim = useCountUp(totalUsers);
  const activeAnim = useCountUp(activeUsers);
  const deletedAnim = useCountUp(deletedUsers);
  const selectedAnim = useCountUp(selectedCount);

  const trendUp = activeUsers >= deletedUsers; // contoh logic

  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const hideDeleteUsersDialog = () => {
    setDeleteUsersDialog(false);
  };

  const saveUser = async () => {
    setSubmitted(true);

    if (user.nama.trim() && user.email.trim()) {
      let _users = [...users];
      let _user = { ...user };

      try {
        if (user.id) {
          // Update existing user
          const response = await updateUser.mutateAsync({
            id: user.id,
            payload: _user,
          });
          const newUser = response?.data ?? response;
          _users[_users.findIndex((val) => val.id === user.id)] = newUser;
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: response?.message ?? "User berhasil diupdate",
            life: 3000,
          });
        } else {
          // Create new user
          console.log("user", _user);
          const result = await createUser.mutateAsync(_user);
          const newUser = result?.data ?? result;
          _users.push(newUser);
          toast.current.show({
            severity: "success",
            summary: "Berhasil",
            detail: result?.message ?? "User berhasil ditambahkan",
            life: 3000,
          });
        }

        setUsers(_users);
        setUserDialog(false);
        setUser(emptyUser);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Gagal menyimpan user",
          life: 3000,
        });
      }
    }
  };

  const editUser = (user) => {
    setUser({ ...user });
    setUserDialog(true);
  };

  const confirmDeleteUser = (user) => {
    setUser(user);
    setDeleteUserDialog(true);
  };

  const handleUndo = async (ids) => {
    await axios.post("/api/users/restore", {
      ids: ids,
    });
  };

  const handleDeleteUser = async () => {
    try {
      const response = deleteUser.mutate({ id: user.id });

      // const deletedUser = response?.data ?? response;

      //   const newUsers = users.filter((val) => val.id !== user.id);
      //   setUsers(newUsers);

      setDeleteUserDialog(false);
      setUser(emptyUser);

      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: response?.message ?? "User berhasil dihapus",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menghapus user",
        life: 3000,
      });
    }
  };

  const confirmDeleteSelected = () => {
    setSelectedUsers(users.filter((u) => selectedUsers.includes(u)));
    setDeleteUsersDialog(true);
  };

  const deleteSelectedUsers = async () => {
    const ids = selectedUsers.map((u) => u.id);

    await deleteSelectedUser.mutateAsync({ ids });

    setDeleteUsersDialog(false);

    toast.current.show({
      severity: "warn",
      life: clicked ? 0 : 5000,
      summary: "User dihapus",
      detail: (
        <div className="flex flex-column gap-2 undo-toast">
          <div className="flex align-items-center justify-content-between gap-3">
            <span>{ids.length} user dihapus</span>

            <Button
              label="Undo"
              size="small"
              text
              onClick={() => {
                undoDelete(ids);
                setClicked(true);
              }}
            />
          </div>

          <div className="progress" />
        </div>
      ),
    });

    setSelectedUsers([]);
  };

  const undoDelete = async (ids) => {
    console.log(ids);
    if (!ids.length) return;
    console.log("last", ids);

    await restoreSelectedUser.mutateAsync({
      ids: ids,
    });

    toast.current.show({
      severity: "success",
      summary: "Berhasil",
      detail: "Delete dibatalkan",
      life: 3000,
    });

    setLastDeletedIds([]);
    // toast.current.clear();
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...user };
    _user[`${name}`] = val;
    setUser(_user);
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
          disabled={!selectedUsers || !selectedUsers.length}
        />
        <Button
          label="Restore"
          icon="pi pi-refresh"
          severity="info"
          outlined
          disabled={!selectedUsers?.length}
          onClick={bulkRestore}
        />
      </div>
    );
  };

  const bulkRestore = async () => {
    const ids = selectedUsers.map((u) => u.id);

    // await usersApi.bulkRestore(ids);
    // await axios.put("/api/users/multiple-restore", {

    const respone = await restoreSelectedUser.mutateAsync({ ids: ids });
    // });

    toast.current.show({
      severity: "success",
      summary: "Berhasil",
      detail: "User berhasil direstore",
    });

    // refetch(); // react-query reload
    setSelectedUsers(null);
  };

  const applyFilter = (filters) => {
    console.log(filters);
    // const filteredUsers = users.filter((user) => {
    //   return filters.role != null ? user.role === filters.role : user;
    // });
    // const filteredUsers = users.filter((user) => {
    //   return filters.deleted ? user.deletedAt != null : user.deletedAt == null;
    // });
    const filteredUsers = users.filter((user) => {
      const roleMatch = filters.role ? user.role === filters.role : true;

      const deletedMatch =
        filters.deletedStatus === "all"
          ? true
          : filters.deletedStatus === "deleted"
            ? user.deletedAt !== null
            : user.deletedAt === null;

      return roleMatch && deletedMatch;
    });
    console.log(
      filters.deleted ? users.deletedAt != null : users.deletedAt == null,
    );
    console.log(users.filter((user) => user.deletedAt != null)); // === filters.deletedAt);
    console.log(filteredUsers);
    // console.log(users.filter((user) => user.role === filters.role));
    setDataUsers(filteredUsers);
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
              value={filterRole}
              options={roleOptions}
              onChange={(e) => setFilterRole(e.value)}
              placeholder="Pilih Role"
              className="w-full"
            />

            {/* DeletedAt */}
            <div className="flex align-items-center gap-2">
              <Dropdown
                value={deletedStatus}
                options={deletedOptions}
                onChange={(e) => setDeletedStatus(e.value)}
                placeholder="Status Data"
                className="w-full"
              />
              <label htmlFor="deleted">Tampilkan yang terhapus</label>
            </div>

            {/* APPLY */}
            <Button
              label="Terapkan"
              icon="pi pi-check"
              onClick={() => {
                applyFilter({
                  keyword,
                  role: filterRole,
                  deletedStatus,
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
          icon="pi pi-upload"
          model={exportItems}
          severity="help"
        />
      </div>
    );
  };

  const roleBodyTemplate = (rowData) => {
    const severity =
      rowData.role === "SUPERADMIN"
        ? "danger"
        : rowData.role === "ADMIN"
          ? "warning"
          : "success";
    return <Tag value={rowData.role} severity={severity} />;
  };

  const statusBodyTemplate = (rowData) => {
    const isDeleted = rowData.deletedAt !== null;

    return (
      <Tag
        value={isDeleted ? "Terhapus" : "Aktif"}
        severity={isDeleted ? "danger" : "success"}
      />
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          disabled={
            rowData.deletedAt && users.filter((user) => user.deletedAt !== null)
          }
          onClick={() => editUser(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          disabled={
            rowData.deletedAt && users.filter((user) => user.deletedAt !== null)
          }
          onClick={() => confirmDeleteUser(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Kelola User</h4>

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

  const userDialogFooter = (
    <React.Fragment>
      <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Simpan" icon="pi pi-check" onClick={saveUser} />
    </React.Fragment>
  );

  const deleteUserDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteUserDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={handleDeleteUser}
      />
    </React.Fragment>
  );

  const deleteUsersDialogFooter = (
    <React.Fragment>
      <Button
        label="Tidak"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteUsersDialog}
      />
      <Button
        label="Ya"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedUsers}
      />
    </React.Fragment>
  );

  const createdAtBodyTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  const deletedAtBodyTemplate = (rowData) => {
    const data =
      rowData.deletedAt == null
        ? "-"
        : new Date(rowData.deletedAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
    return data;
  };

  //   if (isPending) return <div>Loading...</div>;
  //   if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="grid crud-demo">
      <div className="grid mb-3">
        <div className="col-12 md:col-3">
          <div
            className="stat-card"
            onClick={() => {
              applyFilter({
                deletedStatus: "all",
              });
              filterRef.current.hide();
            }}
          >
            <div>
              <small>Total User</small>

              <div className="flex align-items-center gap-2">
                <h3>{totalAnim}</h3>

                <i
                  className={`pi ${trendUp ? "pi-arrow-up text-green-500" : "pi-arrow-down text-red-500"}`}
                />
              </div>
            </div>

            <i className="pi pi-users text-3xl opacity-70" />
          </div>
        </div>

        <div className="col-12 md:col-3">
          <div
            className="stat-card"
            onClick={() => {
              applyFilter({
                deletedStatus: "active",
              });
              filterRef.current.hide();
            }}
          >
            <div>
              <small>Aktif User</small>

              <div className="flex align-items-center gap-2">
                <h3 className="text-green-500">{activeAnim}</h3>

                <i
                  className={`pi ${trendUp ? "pi-arrow-up text-green-500" : "pi-arrow-down text-red-500"}`}
                />
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
                deletedStatus: "deleted",
              });
              filterRef.current.hide();
            }}
          >
            <div>
              <small>Terhapus</small>

              <div className="flex align-items-center gap-2">
                <h3 className="text-red-500">{deletedAnim}</h3>

                <i
                  className={`pi ${trendUp ? "pi-arrow-up text-green-500" : "pi-arrow-down text-red-500"}`}
                />
              </div>
            </div>

            <i className="pi pi-trash text-3xl text-red-500" />
          </div>
        </div>

        <div className="col-12 md:col-3">
          <div className="stat-card">
            <div>
              <small>Dipilih</small>

              <div className="flex align-items-center gap-2">
                <h3>{selectedAnim}</h3>

                <i
                  className={`pi ${trendUp ? "pi-arrow-up text-green-500" : "pi-arrow-down text-red-500"}`}
                />
              </div>
            </div>

            <i className="pi pi-list text-3xl" />
          </div>
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
            value={dataUsers}
            // selectionMode="multiple"
            // onRowSelect={(e) => {
            //   const selected = e.data;
            //   setSelectedUsers([...selectedUsers, selected]);
            // }}
            selection={selectedUsers}
            onSelectionChange={(e) => {
              setSelectedUsers(e.value);
              console.log(selectedUsers);
            }}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} users"
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
              field="nama"
              header="Nama"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="email"
              header="Email"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="telepon"
              header="Telepon"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="role"
              header="Role"
              body={roleBodyTemplate}
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
              field="deletedAt"
              header="Dihapus Pada"
              body={deletedAtBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              header="Status"
              body={statusBodyTemplate}
              style={{ minWidth: "8rem" }}
            />
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>

          <Dialog
            visible={userDialog}
            style={{ width: "500px" }}
            header={user.id ? "Edit User" : "Tambah User Baru"}
            modal
            className="p-fluid"
            footer={userDialogFooter}
            onHide={hideDialog}
            draggable={false}
            closeOnEscape
          >
            {/* Form Sections */}
            <div
              className="dialog-content"
              style={{
                maxHeight: "70vh",
                overflowY: "none",
              }}
            >
              {/* Informasi Pribadi Section */}
              <div className="form-section">
                <h4
                  className="section-titlee"
                  style={{
                    margin: "0 0 1rem 0",
                    color: "#495057",
                    borderBottom: "1px solid #dee2e6",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <i
                    className="pi pi-user"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  Informasi Pribadi
                </h4>

                <div className="field">
                  <label htmlFor="nama" className="required-field">
                    Nama Lengkap
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>
                  <InputText
                    id="nama"
                    value={user.nama}
                    onChange={(e) => onInputChange(e, "nama")}
                    placeholder="Masukkan nama lengkap"
                    required
                    autoFocus={!user.id}
                    maxLength={100}
                    className={classNames({
                      "p-invalid": submitted && !user.nama,
                    })}
                  />
                  {submitted && !user.nama && (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Nama lengkap harus diisi
                    </small>
                  )}
                  <small
                    className="field-hint"
                    style={{
                      color: "#6c757d",
                      display: "block",
                      marginTop: "0.25rem",
                    }}
                  >
                    Maksimal 100 karakter
                  </small>
                </div>

                <div className="field">
                  <label htmlFor="email" className="required-field">
                    Email
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>
                  <span className="p-input-icon-left">
                    <i className="pi pi-envelope" />
                    <InputText
                      id="email"
                      value={user.email}
                      onChange={(e) => onInputChange(e, "email")}
                      placeholder="contoh@email.com"
                      required
                      type="email"
                      className={classNames({
                        "p-invalid": submitted && !user.email,
                      })}
                    />
                  </span>
                  {submitted && !user.email && (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Email harus diisi
                    </small>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="telepon">
                    Nomor Telepon
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
                  <InputMask
                    id="telepon"
                    mask="9999-9999-9999"
                    value={user.telepon}
                    placeholder="08xx-xxxx-xxxx"
                    onChange={(e) => onInputChange(e, "telepon")}
                    className="w-full"
                    unmask={false}
                  />
                  <small
                    className="field-hint"
                    style={{
                      color: "#6c757d",
                      display: "block",
                      marginTop: "0.25rem",
                    }}
                  >
                    Format: 08xx-xxxx-xxxx
                  </small>
                </div>
              </div>

              {/* Account Settings Section */}
              <div className="form-section" style={{ marginTop: "1.5rem" }}>
                <h4
                  className="section-titlee "
                  style={{
                    margin: "0 0 1rem 0",
                    color: "#495057",
                    borderBottom: "1px solid #dee2e6",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <i
                    className="pi pi-lock"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  Pengaturan Akun
                </h4>

                <div className="field">
                  <label htmlFor="role">
                    Role / Hak Akses
                    <span
                      className="asterisk"
                      style={{ color: "red", marginLeft: "0.25rem" }}
                    >
                      *
                    </span>
                  </label>
                  <Dropdown
                    id="role"
                    value={user.role}
                    options={roleOptions}
                    onChange={(e) => onInputChange(e, "role")}
                    placeholder="Pilih Role"
                    showClear={false}
                    className={classNames({
                      "p-invalid": submitted && !user.role,
                    })}
                    optionLabel="label"
                    optionValue="value"
                  />
                  {submitted && !user.role && (
                    <small className="p-error">
                      <i
                        className="pi pi-exclamation-circle"
                        style={{ marginRight: "0.25rem" }}
                      ></i>
                      Role harus dipilih
                    </small>
                  )}
                </div>

                {!user.id && (
                  <div className="field">
                    <label htmlFor="password" className="required-field">
                      Password
                      <span
                        className="asterisk"
                        style={{ color: "red", marginLeft: "0.25rem" }}
                      >
                        *
                      </span>
                    </label>
                    <Password
                      id="password"
                      value={user.password}
                      onChange={(e) => onInputChange(e, "password")}
                      toggleMask
                      feedback={true}
                      promptLabel="Masukkan password"
                      weakLabel="Lemah"
                      mediumLabel="Sedang"
                      strongLabel="Kuat"
                      required
                      className={classNames({
                        "p-invalid": submitted && !user.password,
                      })}
                      inputStyle={{ width: "100%" }}
                    />
                    {submitted && !user.password ? (
                      <small className="p-error">
                        <i
                          className="pi pi-exclamation-circle"
                          style={{ marginRight: "0.25rem" }}
                        ></i>
                        Password harus diisi
                      </small>
                    ) : (
                      <small
                        className="field-hint"
                        style={{
                          color: "#6c757d",
                          display: "block",
                          marginTop: "0.25rem",
                        }}
                      >
                        Minimal 8 karakter dengan kombinasi huruf dan angka
                      </small>
                    )}
                  </div>
                )}

                {user.id && (
                  <div
                    className="field info-message"
                    style={{
                      backgroundColor: "#e3f2fd",
                      padding: "0.75rem",
                      borderRadius: "4px",
                      marginTop: "0.5rem",
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
                      Password tidak dapat diubah melalui form ini. Gunakan
                      fitur "Reset Password" terpisah.
                    </small>
                  </div>
                )}
              </div>

              {/* Metadata Information (for existing users) */}
              {user && (
                <div className="form-section" style={{ marginTop: "1.5rem" }}>
                  <h4
                    className="section-titlee"
                    style={{
                      margin: "0 0 1rem 0",
                      color: "#495057",
                      borderBottom: "1px solid #dee2e6",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    <i
                      className="pi pi-calendar"
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    Informasi Sistem
                  </h4>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      height: "5rem",
                    }}
                  >
                    <div className="metadata-item">
                      <label style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                        Dibuat Pada
                      </label>
                      <div style={{ fontWeight: "500" }}>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleString("id-ID")
                          : "-"}
                      </div>
                    </div>
                    <div className="metadata-item">
                      <label style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                        Status Akun
                      </label>
                      <div>
                        {user.deletedAt ? (
                          <span style={{ color: "red" }}>
                            <i
                              className="pi pi-ban"
                              style={{ marginRight: "0.25rem" }}
                            ></i>
                            Non-aktif
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            <i
                              className="pi pi-check-circle"
                              style={{ marginRight: "0.25rem" }}
                            ></i>
                            Aktif
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Custom CSS for better styling */}
            <style jsx>{`
              .required-field:after {
                content: "*";
                color: red;
                margin-left: 0.25rem;
              }

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

              .p-input-icon-left {
                width: 100%;
              }

              .p-input-icon-left input {
                padding-left: 2rem;
              }
            `}</style>
          </Dialog>

          <Dialog
            visible={deleteUserDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteUserDialogFooter}
            onHide={hideDeleteUserDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {user && (
                <span>
                  Apakah Anda yakin ingin menghapus <b>{user.nama}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteUsersDialog}
            style={{ width: "450px" }}
            header="Konfirmasi"
            modal
            footer={deleteUsersDialogFooter}
            onHide={hideDeleteUsersDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {user && (
                <span>
                  Apakah Anda yakin ingin menghapus users yang dipilih?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UserCrudPage;
