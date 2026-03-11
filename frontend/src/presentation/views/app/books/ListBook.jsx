import React, { useState, useEffect } from "react";
import { ProductService } from "@/demo/service/ProductService";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from 'primereact/dialog';
import { useBookApi } from "@/presentation/logics/app/books";
import { useSecureLS } from "@/hooks/useSecureLS";
import { Card } from "primereact/card";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ListBook() {
  console.log(backendUrl,'url')
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const { existBooks } = useBookApi(user);
  const { data, isPending, isError, error, refetch } = existBooks();
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState("");
  const [visible, setVisible] = useState(false);
  const sortOptions = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];

   const handleClick = async () => {
    console.log(products,'products');
    console.log(ProductService.getProducts().then((data) => console.log(data.slice(0, 10))));
   };

  return (
    <>
    <Button label="klik" onClick={handleClick}></Button>
      <div className="card">
       <DataView data={data}/>
      </div>
      <Dialog
        visible={visible}
        modal
        style={{ width: "50rem" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </>
  );
}



function DataView() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getItem } = useSecureLS();
  const user = getItem("user");
  const { existBooks } = useBookApi(user);
  const { data, isPending, isError, error, refetch } = existBooks();
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="grid grid-nogutter mt-8 gap-3 border-top-1 pt-3 justify-content-between">
      {data.map((product) => (
       <div className="card book">
        <img src={`${backendUrl}/${product.cover}`} width={150} alt={product.title} />
        <p>{product.title}</p>
       </div>
      ))}
    </div>
  );
}