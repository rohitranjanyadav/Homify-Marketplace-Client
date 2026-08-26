import Sidebar from "./components/Sidebar/Sidebar";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#f7f3ed] text-[#29221d]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-3 py-3 sm:px-4 sm:py-4 md:flex-row md:gap-6 lg:px-6">
        <aside className="flex w-full flex-col overflow-hidden rounded-[24px] border border-[#e6d7c6] bg-[#1f1b1a] text-[#f6f1ea] shadow-[0_24px_60px_rgba(41,34,29,0.12)] md:w-72 md:shrink-0 md:rounded-[28px]">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#a65f3b] text-sm font-semibold text-white shadow-md shadow-[#a65f3b]/30">
              H
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#d7c4ad]">
                Control
              </p>
              <h1 className="text-lg font-semibold text-white">Homify</h1>
            </div>
          </div>
          <Sidebar />
        </aside>

        <main className="flex-1">
          <header className="mb-4 flex items-center justify-between rounded-[20px] border border-[#e8dccb] bg-white/90 px-4 py-4 shadow-[0_14px_30px_rgba(41,34,29,0.06)] backdrop-blur-sm sm:mb-6 sm:rounded-[24px] sm:px-6">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8b6b52]">
                Dashboard
              </p>
              <h2 className="mt-1 text-xl font-semibold text-[#29221d]">
                Admin Panel
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadcc8] bg-[#f7f3ed] text-[#29221d] transition hover:border-[#cab19c] hover:bg-[#f2e8de]"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </header>

          <div className="min-w-0 rounded-[24px] border border-[#eadcc8] bg-white shadow-[0_30px_60px_rgba(41,34,29,0.08)] sm:rounded-[30px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
