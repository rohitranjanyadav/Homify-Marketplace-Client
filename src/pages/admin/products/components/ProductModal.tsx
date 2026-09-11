import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchCategoryItems } from "../../../../store/adminCategorySlice";
import {
  addProduct,
  type IProductFormValues,
} from "../../../../store/adminProductSlice";

interface ProductModalProps {
  closeModal: () => void;
  onProductAdded: () => void;
}

const ProductModal = ({ closeModal, onProductAdded }: ProductModalProps) => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<IProductFormValues>({
    productName: "",
    productDescription: "",
    categoryId: "",
    productImage: null,
    productPrice: 0,
    productTotalStock: 0,
  });
  const { items } = useAppSelector((store) => store.categories);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCategoryItems());
  }, [dispatch]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const input = e.target;
    const nextValue =
      input instanceof HTMLInputElement && input.type === "file"
        ? input.files?.[0] ?? null
        : name === "productPrice" || name === "productTotalStock"
          ? Number(value)
        : value;

    setErrorMessage("");
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: nextValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formValues.productName.trim() ||
      !formValues.productDescription.trim() ||
      formValues.productPrice <= 0 ||
      formValues.productTotalStock <= 0 ||
      !formValues.categoryId ||
      !formValues.productImage
    ) {
      setErrorMessage(
        "Complete the product name, description, price, stock, image, and category before adding.",
      );
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await dispatch(addProduct(formValues));
      onProductAdded();
      closeModal();
    } catch (error) {
      console.log(error);
      setErrorMessage("The product could not be added. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-[#1f1b1a]/55 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-md rounded-[28px] border border-[#eedec6] bg-white p-6 shadow-[0_30px_70px_rgba(31,27,26,0.18)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#8b6b52]">
              Catalog
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[#29221d]">
              Add Product
            </h3>
          </div>

          <button
            type="button"
            onClick={closeModal}
            id="closeModalButton"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#eadcc8] bg-[#f7f3ed] text-[#4b4039] transition hover:bg-[#f2e7dc]"
            aria-label="Close dialog"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="productName"
              className="mb-2 block text-sm font-medium text-[#4d413b]"
            >
              Product Name
            </label>
            <input
              id="productName"
              name="productName"
              type="text"
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#ebdcc8] bg-[#f8f4ee] px-4 py-3 text-sm text-[#29221d] outline-none transition placeholder:text-[#8a7565] focus:border-[#a65f3b] focus:ring-2 focus:ring-[#a65f3b]/10"
              placeholder="Electronics, Foods"
              required
            />
          </div>

          <div className="flex justify-between">
            <div>
              <label
                htmlFor="productPrice"
                className="mb-2 block text-sm font-medium text-[#4d413b]"
              >
                Product Price
              </label>
              <input
                id="productPrice"
                name="productPrice"
                type="number"
                min="0.01"
                step="0.01"
                value={formValues.productPrice || ""}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#ebdcc8] bg-[#f8f4ee] px-4 py-3 text-sm text-[#29221d] outline-none transition placeholder:text-[#8a7565] focus:border-[#a65f3b] focus:ring-2 focus:ring-[#a65f3b]/10"
                placeholder="Product price"
                required
              />
            </div>

            <div>
              <label
                htmlFor="productTotalStock"
                className="mb-2 block text-sm font-medium text-[#4d413b]"
              >
                Product Stock
              </label>
              <input
                id="productTotalStock"
                name="productTotalStock"
                type="number"
                min="1"
                step="1"
                value={formValues.productTotalStock || ""}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#ebdcc8] bg-[#f8f4ee] px-4 py-3 text-sm text-[#29221d] outline-none transition placeholder:text-[#8a7565] focus:border-[#a65f3b] focus:ring-2 focus:ring-[#a65f3b]/10"
                placeholder="Available stock"
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <label
                htmlFor="productImage"
                className="mb-2 block text-sm font-medium text-[#4d413b]"
              >
                Product Image
              </label>
              <input
                id="productImage"
                name="productImage"
                type="file"
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#ebdcc8] bg-[#f8f4ee] px-4 py-3 text-sm text-[#29221d] outline-none transition placeholder:text-[#8a7565] focus:border-[#a65f3b] focus:ring-2 focus:ring-[#a65f3b]/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-medium text-[#4d413b]"
              >
                Category
              </label>
              <select
                onChange={handleChange}
                name="categoryId"
                id="categoryId"
                value={formValues.categoryId}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {items.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="productDescription"
              className="mb-2 block text-sm font-medium text-[#4d413b]"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#ebdcc8] bg-[#f8f4ee] px-4 py-3 text-sm text-[#29221d] outline-none transition placeholder:text-[#8a7565] focus:border-[#a65f3b] focus:ring-2 focus:ring-[#a65f3b]/10"
              placeholder="Describe the product"
              required
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl border border-[#f2caca] bg-[#fff5f5] px-4 py-3 text-sm text-[#b34444]"
            >
              {errorMessage}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              id="cancelButton"
              className="rounded-full border border-[#eadcc8] bg-white px-4 py-2.5 text-sm font-medium text-[#4d413b] transition hover:bg-[#f8f4ee]"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="submitUrlButton"
              className="inline-flex items-center justify-center rounded-full bg-[#1f1b1a] px-5 py-2.5 text-sm font-medium text-white shadow-[0_14px_26px_rgba(31,27,26,0.2)] transition hover:bg-[#2e2725] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
              <svg
                className="ml-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
