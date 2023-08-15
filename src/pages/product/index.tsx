import type { NextPage } from "next";
import ProductCard from "~/components/ProductCard";
import { api } from "~/utils/api";

const Index: NextPage = ({}) => {
  const { data } = api.product.getAll.useQuery();
  console.log(data);

  return (
    <div className="container mx-auto grid h-screen grid-cols-12">
      <div className="col-span-3 h-screen"></div>
      <div className="col-span-9 flex flex-1 flex-wrap">
        {data?.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};

export default Index;
