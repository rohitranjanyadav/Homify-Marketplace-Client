import { type ICategory } from "../Categories";
import { useState } from "react";
import Modal from "./Modal";
import { useAppDispatch } from "../../../../../store/hooks";
import { handleCategoryItemDelete } from "../../../../../store/adminCategorySlice";

function CategoryTable({ categories }: { categories: ICategory[] }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const deleteCategory = (id: string) => {
    if (id) dispatch(handleCategoryItemDelete(id));
  };

  const filteredCategories = categories?.filter(
    (category) =>
      category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.includes(searchTerm),
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {isModalOpen && <Modal closeModal={closeModal} />}

      <div className="mb-6 flex flex-col gap-4 border-b border-[#efe1d0] pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8b6b52]">
            Catalog
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[#29221d]">
            Categories
          </h3>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
          <label className="relative block w-full sm:flex-1 lg:w-auto">
            <span className="sr-only">Search categories</span>
            <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-[#8a7565]">
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="h-11 w-full rounded-full border border-[#e9dcc7] bg-[#f8f4ee] pl-10 pr-4 text-sm text-[#29221d] outline-none transition placeholder:text-[#8a7565] focus:border-[#a65f3b] focus:ring-2 focus:ring-[#a65f3b]/10 sm:w-72"
              placeholder="Search categories"
            />
          </label>

          <button
            type="button"
            onClick={openModal}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#1f1b1a] px-5 text-sm font-medium text-white shadow-[0_16px_30px_rgba(31,27,26,0.18)] transition hover:bg-[#2f2724] sm:w-auto"
          >
            <span className="mr-2 text-lg leading-none">+</span>
            Category
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[#f0e3d4] bg-[#fffdfb]">
        <div className="overflow-x-auto">
          <table className="min-w-[560px] w-full">
            <thead>
              <tr className="bg-[#f7f3ed] text-left text-xs uppercase tracking-[0.2em] text-[#7a685d]">
                <th className="px-5 py-4 font-medium">Category Id</th>
                <th className="px-5 py-4 font-medium">Category Name</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories?.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-t border-[#f0e3d4] bg-white transition hover:bg-[#fbf6f1]"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-[#4d413b]">
                      {category.id}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-[#29221d]">
                      {category.categoryName}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5d5c2] bg-[#f7f3ed] text-[#5b4d42] transition hover:border-[#b38d6f] hover:text-[#29221d]"
                          aria-label="Edit category"
                          title="Edit category"
                        >
                          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                            <path
                              d="M11.3235 3.30005C11.7654 3.30005 12.1235 2.94188 12.1235 2.50005C12.1235 2.05822 11.7654 1.70005 11.3235 1.70005V3.30005ZM18.3 9.55887C18.3 9.11705 17.9418 8.75887 17.5 8.75887C17.0582 8.75887 16.7 9.11705 16.7 9.55887H18.3ZM3.47631 16.5237L4.042 15.9581H4.042L3.47631 16.5237ZM16.5237 16.5237L15.958 15.9581L15.958 15.9581L16.5237 16.5237ZM10.1037 8.71855L14.4606 4.30148L13.3215 3.17789L8.96459 7.59496L10.1037 8.71855ZM15.7367 4.31127L15.8013 4.37893L16.9587 3.27423L16.8941 3.20657L15.7367 4.31127ZM15.7803 5.56438L11.3589 9.89426L12.4784 11.0374L16.8998 6.70753L15.7803 5.56438ZM10.9404 10.1226C10.3417 10.2624 9.97854 10.3452 9.72166 10.3675C9.47476 10.3888 9.53559 10.3326 9.61962 10.4113L8.52556 11.5788C8.9387 11.966 9.45086 11.9969 9.85978 11.9615C10.2587 11.9269 10.7558 11.8088 11.3042 11.6807L10.9404 10.1226ZM8.31462 8.8C8.19986 9.33969 8.09269 9.83345 8.0681 10.2293C8.04264 10.6393 8.08994 11.1499 8.49542 11.5498L9.619 10.4107C9.70348 10.494 9.65043 10.5635 9.66503 10.3285C9.6805 10.0795 9.75378 9.72461 9.89003 9.23054L9.20135 8.84497L8.31462 8.8ZM11.0288 11.1022L10.3248 11.5032L10.2404 10.7382L10.6859 10.4966L11.0288 11.1022Z"
                              stroke="#7a685d"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteCategory(category.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f4d7d7] bg-[#fff5f5] text-[#d45555] transition hover:border-[#e8b0b0] hover:bg-[#fdecec]"
                          aria-label="Delete category"
                          title="Delete category"
                        >
                          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                            <path
                              d="M4.00031 5.49999V4.69999H3.20031V5.49999H4.00031ZM16.0003 5.49999H16.8003V4.69999H16.0003V5.49999ZM17.5003 5.49999L17.5003 6.29999C17.9421 6.29999 18.3003 5.94183 18.3003 5.5C18.3003 5.05817 17.9421 4.7 17.5003 4.69999L17.5003 5.49999ZM9.30029 9.24997C9.30029 8.80814 8.94212 8.44997 8.50029 8.44997C8.05847 8.44997 7.70029 8.80814 7.70029 9.24997H9.30029ZM7.70029 13.75C7.70029 14.1918 8.05847 14.55 8.50029 14.55C8.94212 14.55 9.30029 14.1918 9.30029 13.75H7.70029ZM12.3004 9.24997C12.3004 8.80814 11.9422 8.44997 11.5004 8.44997C11.0585 8.44997 10.7004 8.80814 10.7004 9.24997H12.3004ZM10.7004 13.75C10.7004 14.1918 11.0585 14.55 11.5004 14.55C11.9422 14.55 12.3004 14.1918 12.3004 13.75H10.7004ZM4.00031 6.29999H16.0003V4.69999H4.00031V6.29999ZM15.2003 5.49999V12.5H16.8003V5.49999H15.2003ZM11.0003 16.7H9.00031V18.3H11.0003V16.7ZM4.80031 12.5V5.49999H3.20031V12.5H4.80031ZM9.00031 16.7C7.79918 16.7 6.97882 16.6983 6.36373 16.6156C5.77165 16.536 5.49093 16.3948 5.29823 16.2021L4.16686 17.3334C4.70639 17.873 5.38104 18.0979 6.15053 18.2013C6.89702 18.3017 7.84442 18.3 9.00031 18.3V16.7ZM3.20031 12.5C3.20031 13.6559 3.19861 14.6033 3.29897 15.3498C3.40243 16.1193 3.62733 16.7939 4.16686 17.3334L5.29823 16.2021C5.10553 16.0094 4.96431 15.7286 4.88471 15.1366C4.80201 14.5215 4.80031 13.7011 4.80031 12.5H3.20031ZM15.2003 12.5C15.2003 13.7011 15.1986 14.5215 15.1159 15.1366C15.0363 15.7286 14.8951 16.0094 14.7024 16.2021L15.8338 17.3334C16.3733 16.7939 16.5982 16.1193 16.7016 15.3498C16.802 14.6033 16.8003 13.6559 16.8003 12.5H15.2003ZM11.0003 18.3C12.1562 18.3 13.1036 18.3017 13.8501 18.2013C14.6196 18.0979 15.2942 17.873 15.8338 17.3334L14.7024 16.2021C14.5097 16.3948 14.229 16.536 13.6369 16.6156C13.0218 16.6983 12.2014 16.7 11.0003 16.7V18.3ZM2.50031 4.69999C2.22572 4.7 2.04405 4.7 1.94475 4.7C1.89511 4.7 1.86604 4.7 1.85624 4.7C1.85471 4.7 1.85206 4.7 1.851 4.7C1.05253 5.50059 1.85233 6.3 1.85256 6.3C1.85273 6.3 1.85297 6.3 1.85327 6.3C1.85629 6.3 1.85925 6.3 1.86215 6.3H2.50031V4.69999Z"
                              stroke="#d45555"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-5 py-12 text-center text-sm text-[#7a685d]">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryTable;
