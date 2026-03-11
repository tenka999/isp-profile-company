// FaqReorderPage.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Badge } from "primereact/badge";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Skeleton } from "primereact/skeleton";
import { ProgressSpinner } from "primereact/progressspinner";
import { useFaqApi } from "@/presentation/logics/app/useFaqApi";
import { useNavigate } from "react-router";

// Sortable Item Component
const SortableFaqItem = ({
  faq,
  index,
  onToggleStatus,
  onEdit,
  isDragging,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: faq.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
    zIndex: isSortableDragging ? 999 : "auto",
    position: "relative",
    marginBottom: "0.75rem",
  };

  // Kategori options for badge
  const kategoriOptions = {
    UMUM: { label: "Umum", color: "#2196F3", icon: "pi pi-globe" },
    PEMBAYARAN: {
      label: "Pembayaran",
      color: "#4caf50",
      icon: "pi pi-credit-card",
    },
    TEKNIS: { label: "Teknis", color: "#ff9800", icon: "pi pi-cog" },
    LAINNYA: { label: "Lainnya", color: "#9c27b0", icon: "pi pi-ellipsis-h" },
  };

  const getCategoryBadge = () => {
    const cat = kategoriOptions[faq.kategori] || {
      label: faq.kategori,
      color: "#6c757d",
    };
    return (
      <Tag
        value={cat.label}
        style={{
          background: cat.color,
          color: "white",
          fontWeight: "500",
        }}
        className="px-2 py-1"
      />
    );
  };

  const getStatusBadge = () => {
    return faq.isActive ? (
      <Badge value="Aktif" severity="success" className="px-2 py-0"></Badge>
    ) : (
      <Badge value="Non-Aktif" severity="danger" className="px-2 py-0"></Badge>
    );
  };

  const helpfulPercent =
    faq.helpful + faq.notHelpful > 0
      ? Math.round((faq.helpful / (faq.helpful + faq.notHelpful)) * 100)
      : 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames("sortable-faq-item", {
        dragging: isSortableDragging || isDragging,
      })}
      {...attributes}
    >
      <Card
        className="faq-card"
        style={{
          borderRadius: "12px",
          border: `1px solid ${isSortableDragging ? "#6366f1" : "#3d4858"}`,
          boxShadow: isSortableDragging
            ? "0 8px 20px rgba(99, 102, 241, 0.2)"
            : "0 2px 8px rgba(0,0,0,0.02)",
          transition: "all 0.2s ease",
          cursor: isSortableDragging ? "grabbing" : "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "0.5rem",
          }}
        >
          {/* Drag Handle */}
          <div
            {...listeners}
            className="drag-handle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              backgroundColor: isSortableDragging ? "#e3f2fd" : "#4ade80",
              borderRadius: "8px",
              color: isSortableDragging ? "#1976D2" : "#000",
              cursor: "grab",
              transition: "all 0.2s ease",
            }}
          >
            <i className="pi pi-bars" style={{ fontSize: "1.2rem" }}></i>
          </div>

          {/* Order Number */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: isSortableDragging ? "#6366f1" : "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isSortableDragging ? "white" : "#1976D2",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "all 0.2s ease",
            }}
          >
            {index + 1}
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  //   color: isSortableDragging ? "#6366f1" : "#fff",
                  fontWeight: isSortableDragging ? 600 : 500,
                }}
              >
                {faq.pertanyaan}
              </h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {getCategoryBadge()}
                {getStatusBadge()}
              </div>
            </div>

            <p
              style={{
                margin: "0 0 0.5rem 0",
                // color: "#4b5563",
                fontSize: "0.9rem",
                lineHeight: "1.5",
              }}
            >
              {faq.jawaban.length > 150
                ? `${faq.jawaban.substring(0, 150)}...`
                : faq.jawaban}
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                fontSize: "0.8rem",
                color: "#6c757d",
              }}
            >
              <span>
                <i className="pi pi-eye" style={{ marginRight: "0.25rem" }}></i>
                {faq.views} dilihat
              </span>
              <span>
                <i
                  className="pi pi-thumbs-up"
                  style={{ marginRight: "0.25rem", color: "#4caf50" }}
                ></i>
                {faq.helpful}
              </span>

              {/* {helpfulPercent > 0 && (
                <span>
                  <i
                    className="pi pi-chart-line"
                    style={{ marginRight: "0.25rem", color: "#ff9800" }}
                  ></i>
                  {helpfulPercent}% membantu
                </span>
              )} */}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {/* <Button
              icon={faq.isActive ? "pi pi-ban" : "pi pi-check-circle"}
              rounded
              text
              severity={faq.isActive ? "danger" : "success"}
              onClick={() => onToggleStatus(faq.id, faq.isActive)}
              tooltip={faq.isActive ? "Nonaktifkan" : "Aktifkan"}
              tooltipOptions={{ position: "top" }}
            /> */}
            <Button
              icon="pi pi-pencil"
              rounded
              text
              severity="info"
              onClick={() => onEdit(faq.id)}
              tooltip="Edit FAQ"
              tooltipOptions={{ position: "top" }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

// Main Component
const ReorderPage = () => {
  const queryClient = useQueryClient();
  const toast = useRef(null);

  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  // API Hooks
  const { useAllFaq, updateActive, updateFaq, updateFaqOrders } = useFaqApi();

  // Fetch FAQs with React Query
  const { data, isLoading, error, refetch } = useAllFaq();

  // Mutations
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }) =>
      updateActive.mutateAsync({ id, isActive: !isActive }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["faqs"]);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: `FAQ ${!variables.isActive ? "diaktifkan" : "dinonaktifkan"}`,
        life: 2000,
      });
    },
    onError: (error) => {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal mengubah status FAQ",
        life: 3000,
      });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (reorderedFaqs) => {
      // Create array of updates
      const updates = reorderedFaqs.map((faq, index) => ({
        id: faq.id,
        urutan: index + 1,
      }));

      // Update each FAQ's urutan
      await Promise.all(
        updates.map((update) =>
          updateFaqOrders.mutateAsync({
            id: update.id,
            payload: { urutan: update.urutan },
          }),
        ),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["faqs"]);
      setIsSaving(false);
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Urutan FAQ berhasil disimpan",
        life: 3000,
      });
    },
    onError: (error) => {
      setIsSaving(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal menyimpan urutan FAQ",
        life: 3000,
      });
    },
  });

  // Sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Update local state when data is fetched
  useEffect(() => {
    if (data) {
      const sortedData = [...data].sort((a, b) => a.urutan - b.urutan);
      setFaqs(sortedData);
      setFilteredFaqs(sortedData);
    }
  }, [data]);

  // Apply filters
  useEffect(() => {
    if (!faqs.length) return;

    let filtered = [...faqs];

    if (searchTerm) {
      filtered = filtered.filter(
        (faq) =>
          faq.pertanyaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.jawaban.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((faq) => faq.kategori === selectedCategory);
    }

    if (selectedStatus !== "ALL") {
      filtered = filtered.filter((faq) =>
        selectedStatus === "ACTIVE" ? faq.isActive : !faq.isActive,
      );
    }

    setFilteredFaqs(filtered);
  }, [faqs, searchTerm, selectedCategory, selectedStatus]);

  // Handle drag start
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    setFaqs((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newOrder = arrayMove(items, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          urutan: index + 1,
        }),
      );

      return newOrder;
    });
  };

  // Handle drag cancel
  const handleDragCancel = () => {
    setActiveId(null);
  };

  // Save new order
  const handleSaveOrder = () => {
    console.log(faqs);
    setIsSaving(true);
    reorderMutation.mutate(faqs);
  };

  // Reset to original order
  const handleResetOrder = () => {
    if (data) {
      const sortedData = [...data].sort((a, b) => a.urutan - b.urutan);
      setFaqs(sortedData);
      setFilteredFaqs(sortedData);
      toast.current.show({
        severity: "info",
        summary: "Reset",
        detail: "Urutan dikembalikan ke pengaturan awal",
        life: 2000,
      });
    }
  };

  // Confirm reset
  const confirmReset = () => {
    confirmDialog({
      message: "Apakah Anda yakin ingin mereset urutan ke default?",
      header: "Konfirmasi Reset",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: handleResetOrder,
      reject: () => {},
    });
  };

  // Toggle status
  const handleToggleStatus = (id, currentStatus) => {
    toggleStatusMutation.mutate({ id, isActive: currentStatus });
  };

  // Edit FAQ
  const handleEdit = () => {
    navigate(`/app/faq`);
  };

  // Category options
  const kategoriOptions = [
    { label: "Semua Kategori", value: "ALL" },
    { label: "Umum", value: "UMUM", icon: "pi pi-globe", color: "#2196F3" },
    {
      label: "Pembayaran",
      value: "PEMBAYARAN",
      icon: "pi pi-credit-card",
      color: "#4caf50",
    },
    { label: "Teknis", value: "TEKNIS", icon: "pi pi-cog", color: "#ff9800" },
    {
      label: "Lainnya",
      value: "LAINNYA",
      icon: "pi pi-ellipsis-h",
      color: "#9c27b0",
    },
  ];

  // Status options
  const statusOptions = [
    { label: "Semua Status", value: "ALL" },
    {
      label: "Aktif",
      value: "ACTIVE",
      icon: "pi pi-check-circle",
      color: "#4caf50",
    },
    {
      label: "Non-Aktif",
      value: "INACTIVE",
      icon: "pi pi-ban",
      color: "#f44336",
    },
  ];

  // Get active item for overlay
  const activeItem = activeId ? faqs.find((faq) => faq.id === activeId) : null;

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <i
          className="pi pi-exclamation-triangle"
          style={{ fontSize: "4rem", color: "#f44336", marginBottom: "1rem" }}
        ></i>
        <h3>Gagal Memuat Data</h3>
        <p style={{ color: "#6c757d" }}>
          Terjadi kesalahan saat memuat data FAQ.
        </p>
        <Button
          label="Muat Ulang"
          icon="pi pi-refresh"
          onClick={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="faq-reorder-page" style={{ padding: "1.5rem" }}>
      <Toast ref={toast} />
      <ConfirmDialog />

      {/* Header */}
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>
            <i
              className="pi pi-sort-alt"
              style={{ marginRight: "0.75rem", color: "#6366f1" }}
            ></i>
            Atur Urutan FAQ
          </h1>
          <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280" }}>
            Drag and drop untuk mengatur urutan tampilan FAQ. Urutan dengan
            nilai lebih kecil akan tampil lebih atas.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button
            label="Reset"
            icon="pi pi-refresh"
            severity="secondary"
            outlined
            style={{ paddingRight: "3rem" }}
            onClick={confirmReset}
            disabled={isLoading || isSaving}
          />
          <Button
            label="Simpan Urutan"
            icon="pi pi-check"
            severity="success"
            onClick={handleSaveOrder}
            loading={isSaving}
            disabled={isLoading || isSaving}
          />
        </div>
      </div>

      {/* Filters */}
      <Card
        className="mb-4"
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* Search */}
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-search"></i>
            </span>
            <InputText
              placeholder="Cari pertanyaan atau jawaban..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-tag"></i>
            </span>
            <Dropdown
              value={selectedCategory}
              options={kategoriOptions}
              onChange={(e) => setSelectedCategory(e.value)}
              placeholder="Filter Kategori"
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-power-off"></i>
            </span>
            <Dropdown
              value={selectedStatus}
              options={statusOptions}
              onChange={(e) => setSelectedStatus(e.value)}
              placeholder="Filter Status"
              className="w-full"
            />
          </div>

          {/* Results count */}
          <div style={{ textAlign: "right", color: "#6c757d" }}>
            <i className="pi pi-file" style={{ marginRight: "0.25rem" }}></i>
            {filteredFaqs.length} FAQ ditampilkan
          </div>
        </div>
      </Card>

      {/* Drag Drop Area */}
      <Card
        className="reorder-container"
        style={{
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          overflow: "hidden",
          minHeight: "400px",
        }}
      >
        {isLoading ? (
          // Loading skeleton
          <div style={{ padding: "1.5rem" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ marginBottom: "1rem" }}>
                <Skeleton height="100px" borderRadius="12px"></Skeleton>
              </div>
            ))}
          </div>
        ) : filteredFaqs.length === 0 ? (
          // Empty state
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              color: "#6c757d",
            }}
          >
            <i
              className="pi pi-question-circle"
              style={{ fontSize: "4rem", opacity: 0.3, marginBottom: "1rem" }}
            ></i>
            <h3 style={{ margin: "0 0 0.5rem 0" }}>Tidak Ada FAQ</h3>
            <p style={{ margin: 0 }}>
              Tidak ada FAQ yang sesuai dengan filter yang dipilih.
            </p>
            <Button
              label="Reset Filter"
              icon="pi pi-filter-slash"
              className="mt-3"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
                setSelectedStatus("ALL");
              }}
            />
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={filteredFaqs.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div style={{ padding: "1rem" }}>
                {filteredFaqs.map((faq, index) => (
                  <SortableFaqItem
                    key={faq.id}
                    faq={faq}
                    index={index}
                    onToggleStatus={handleToggleStatus}
                    onEdit={handleEdit}
                    isDragging={activeId === faq.id}
                  />
                ))}
              </div>
            </SortableContext>

            {/* Drag Overlay */}
            <DragOverlay>
              {activeItem && (
                <div
                  style={{
                    opacity: 0.8,
                    transform: "scale(1.02)",
                    boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
                    borderRadius: "12px",
                  }}
                >
                  <Card
                    className="faq-card"
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #6366f1",
                      boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#6366f1",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      >
                        <i
                          className="pi pi-bars"
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                      </div>
                      <div>
                        <h3
                          style={{ margin: "0 0 0.25rem 0", color: "#1f2937" }}
                        >
                          {activeItem.pertanyaan}
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            color: "#6c757d",
                            fontSize: "0.9rem",
                          }}
                        >
                          Sedang dipindahkan...
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </Card>

      {/* Info Footer */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          //   backgroundColor: "#f8f9fa",
          border: "1px solid #2a384b",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.9rem",
          color: "#6c757d",
        }}
      >
        <i
          className="pi pi-info-circle"
          style={{ fontSize: "1.2rem", color: "#2196F3" }}
        ></i>
        <div>
          <strong>Tips:</strong> Urutan dengan angka lebih kecil akan tampil
          lebih atas. Drag and drop item untuk mengubah urutan. Klik icon{" "}
          <i className="pi pi-bars" style={{ margin: "0 0.25rem" }}></i> untuk
          memindahkan.
          {isSaving && (
            <span style={{ marginLeft: "1rem", color: "#ff9800" }}>
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="4"
              />
              Menyimpan perubahan...
            </span>
          )}
        </div>
      </div>

      <style jsx>{`
        .sortable-faq-item {
          transition: all 0.2s ease;
        }

        .sortable-faq-item.dragging {
          z-index: 999;
        }

        .sortable-faq-item:hover .drag-handle {
          background-color: #8bfcb5 !important;
          color: #1c1c1c !important;
        }

        .faq-card {
          transition: all 0.2s ease;
        }

        .sortable-faq-item:hover .faq-card {
          border-color: #6366f1;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }

        .drag-handle:hover {
          background-color: #e3f2fd !important;
          color: #1976d2 !important;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .faq-card > div {
            flex-wrap: wrap;
          }

          .drag-handle {
            width: 32px !important;
            height: 32px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReorderPage;
