import type { NextPage } from "next";
import ProductCard from "~/components/ProductCard";
import { api } from "~/utils/api";

const Index: NextPage = ({}) => {
  const { data } = api.product.getAll.useQuery();
  console.log(data);

  return (
    <div className="container mx-auto grid sm:grid-cols-12">
      <div className="col-span-3 hidden h-screen sm:block"></div>
      <div className="flex flex-wrap items-end gap-4 sm:col-span-9">
        {data?.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};

export default Index;
