import { type FormEvent, useState } from "react";
import { useAppDispatch } from "../../../../../store/hooks";
import {
  addCategory,
  fetchCategoryItems,
} from "../../../../../store/adminCategorySlice";

interface ModalProps {
  closeModal: () => void;
}

const Modal = ({ closeModal }: ModalProps) => {
  const dispatch = useAppDispatch();
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(addCategory(categoryName));
      await dispatch(fetchCategoryItems());
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#1f1b1a]/55 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-md rounded-[28px] border border-[#eedec6] bg-white p-6 shadow-[0_30px_70px_rgba(31,27,26,0.18)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#8b6b52]">
              Catalog
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[#29221d]">
              Add Category
            </h3>
          </div>

          <button
            type="button"
            onClick={closeModal}
            id="closeModalButton"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#eadcc8] bg-[#f7f3ed] text-[#4b4039] transition hover:bg-[#f2e7dc]"
            aria-label="Close dialog"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="categoryName" className="mb-2 block text-sm font-medium text-[#4d413b]">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full rounded-2xl border border-[#ebdcc8] bg-[#f8f4ee] px-4 py-3 text-sm text-[#29221d] outline-none transition placeholder:text-[#8a7565] focus:border-[#a65f3b] focus:ring-2 focus:ring-[#a65f3b]/10"
              placeholder="Electronics, Foods"
              required
            />
          </div>

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

export default Modal;
