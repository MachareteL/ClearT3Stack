import { Storage } from "~/utils/firebaseConfig";
import { type ChangeEvent, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { api } from "~/utils/api";

export default function CriarProduto() {
  const [carregamento, setCarregamento] = useState(0);
  const [touched, setTouched] = useState(false);
  const [product, setProduct] = useState<Product>({
    name: "",
    category: "",
    price: 0,
    description: "",
    imageUrl: "",
    volume: 5,
    onSale: false,
  });

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      alert("Produto cadastrado com sucesso!");
    },
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    createProduct.mutate({ product });
  }
  function resetImageInput() {
    if (touched) {
      setProduct({ ...product, imageUrl: "" });
      setTouched(!touched);
      return;
    }
    setTouched(true);
  }

  function handleProductInfoInput(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const label = event.currentTarget.name;
    const content = event.target.value;
    if (!label || !content) {
      return;
    }
    const newProduct: Product = { ...product, [label]: content };
    setProduct(newProduct);
  }

  function handleImageInput(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log(e);

    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    const storageREF = ref(Storage, `imageProduct/${file.name.split(".")[0]}`);
    const uploadTask = uploadBytesResumable(storageREF, file);
    setTouched(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCarregamento(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((imageUrl) => {
            setProduct({ ...product, imageUrl });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    );
  }

  return (
    <div className="container m-auto px-12">
      <div>
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="mt-5 px-4 text-base font-semibold leading-6 text-gray-900 sm:px-0">
              Registrar um novo produto
            </h3>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={void handleSubmit}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  {/* Name and Category fields*/}
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-3 ">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product name
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full flex-1 rounded-md border-0 px-4 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                          placeholder="Detergente Clear"
                          onChange={(e) => handleProductInfoInput(e)}
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product category
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm">
                        <select
                          defaultValue={""}
                          required
                          name="category"
                          onChange={(e) => {
                            handleProductInfoInput(e);
                          }}
                          id="category"
                          className="block w-full flex-1 rounded-md border-0 px-4 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                        >
                          <option value="" disabled>
                            Select a category
                          </option>
                          <option value="desinfetante">Desinfetante</option>
                          <option value="sabao">Sabão</option>
                          <option value="detergente">Detergente</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:py-1.5 sm:text-sm sm:leading-6"
                        placeholder="Descrição do Produto a ser registrada no banco de dados"
                        defaultValue={""}
                        onChange={(e) => {
                          handleProductInfoInput(e);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Product Image
                    </label>

                    {!product.imageUrl && (
                      <progress
                        value={carregamento}
                        max={100}
                        className={`${
                          touched
                            ? "h-2 w-full rounded-full bg-blue-500"
                            : "hidden"
                        }`}
                      />
                    )}
                    {touched ? (
                      <button
                        className="flex justify-center md:justify-start"
                        onClick={(e) => resetImageInput()}
                      >
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="mx-auto mt-5 max-h-96 p-1 outline-dashed outline-1"
                        />{" "}
                      </button>
                    ) : (
                      <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-primary-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-blue focus-within:ring-offset-2 hover:text-primary-blue"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={(e) => {
                                  handleImageInput(e);
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          className="block w-full flex-1 rounded-md border-0 px-4 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                          onChange={(e) => {
                            handleProductInfoInput(e);
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="volume"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Volume
                        </label>
                        <select
                          onChange={(e) => handleProductInfoInput(e)}
                          name="volume"
                          id="volume"
                          className="block w-full flex-1 rounded-md border-0 px-4 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-blue sm:text-sm sm:leading-6"
                        >
                          <option value="5">5 Litros</option>
                          <option value="2">2 Litros</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-primary-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
