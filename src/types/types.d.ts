type Product = {
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  volume: number;
  onSale: boolean;
  discount?: number | null;
};

type Filter = {
  id: string;
  name: string;
  options: Option[];
};

type Option = {
  value: string;
  label: string;
  checked: boolean;
};

type FilterParam = {
  filter: {
    value: string;
    checked: boolean;
    key: string;
  };
};
