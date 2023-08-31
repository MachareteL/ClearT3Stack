import { XMarkIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const Manageproduct: NextPage = () => {
  const { data: products } = api.product.getAll.useQuery({});
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [id, setId] = useState("");
  const { data } = api.product.getById.useQuery({ id });
  useEffect(() => {
    if (data) {
      setCurrentProduct(data);
    }
  }, [data]);

  function handleDeleteProduct() {
    console.log(currentProduct?.id);
  }
  if (!products) {
    return <>Não há produtos cadastrados</>;
  }

  return (
    <div className="container mx-auto p-4">
      <select
        name="product"
        id="product"
        className="w-full rounded-md border border-gray-400 px-4 py-2 outline-none"
        onChange={(e) => setId(e.target.value)}
      >
        {products.map((product) => (
          <option value={product.id}>{product.name}</option>
        ))}
      </select>
      <div className="relative my-8 flex flex-col items-center rounded-md border py-8">
        <button
          className="absolute right-0 top-2 cursor-pointer"
          onClick={handleDeleteProduct}
        >
          <XMarkIcon className="h-10 w-10" />
        </button>
        <Image
          src={currentProduct?.imageUrl || "https://via.placeholder.com/150"}
          width={200}
          height={200}
          alt=""
        />
        <div className="border px-8 py-4 text-center">
          Nome do Produto:
          <h1>{currentProduct?.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Manageproduct;
