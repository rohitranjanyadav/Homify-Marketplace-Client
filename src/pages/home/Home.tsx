import { Link } from "react-router-dom";
import Navbar from "../../globals/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f3ed]">
      <Navbar />
      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a65f3b]">Thoughtful spaces, everyday ease</p>
            <h1 className="font-serif text-5xl leading-[0.98] text-[#29221d] sm:text-6xl lg:text-7xl">Make room for<br /><em className="font-normal text-[#a65f3b]">beautiful living.</em></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-[#6f5a4a]">Furniture and home essentials chosen to make the moments at home feel more comfortable, personal, and yours.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="rounded-full bg-[#a65f3b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#a65f3b]/20 transition hover:-translate-y-0.5 hover:bg-[#864a2c]">Shop the collection</Link>
              <Link to="/products" className="rounded-full border border-[#d7c5b5] px-6 py-3 text-sm font-semibold text-[#5f4939] transition hover:bg-[#fffdf9]">Explore rooms</Link>
            </div>
            <div className="mt-12 flex gap-8 border-t border-[#dfd1c4] pt-6 text-sm text-[#715d4e]"><span><strong className="block font-serif text-2xl text-[#29221d]">Curated</strong> for your home</span><span><strong className="block font-serif text-2xl text-[#29221d]">Made</strong> to live with</span></div>
          </div>
          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] bg-[#d5bca5] shadow-xl shadow-[#65442d]/15 sm:min-h-[470px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#f8eee4_0,transparent_32%),linear-gradient(135deg,#b98761_0%,#d8b99f_48%,#8a6147_100%)]" />
            <div className="absolute bottom-0 left-[8%] h-[42%] w-[83%] rounded-t-[7rem] bg-[#eee1d2] shadow-2xl" />
            <div className="absolute bottom-[17%] left-[24%] h-[30%] w-[52%] rounded-t-[5rem] bg-[#7c5738] shadow-[0_22px_24px_rgba(59,36,22,.26)]" />
            <div className="absolute bottom-[17%] left-[16%] h-[18%] w-[17%] rounded-t-2xl bg-[#9d704e]" />
            <div className="absolute bottom-[17%] right-[15%] h-[18%] w-[17%] rounded-t-2xl bg-[#9d704e]" />
            <div className="absolute right-[12%] top-[12%] h-28 w-28 rounded-full border-[13px] border-[#f7eadb] opacity-85" />
            <p className="absolute bottom-6 right-7 rounded-full bg-[#fffdf9]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#745038]">Your home, considered</p>
          </div>
        </section>
        <section className="border-y border-[#e5d9ce] bg-[#fffdf9] py-9"><div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-5 text-center sm:grid-cols-3 sm:px-8"><p className="text-sm font-medium text-[#6f5a4a]">Quality pieces for everyday life</p><p className="text-sm font-medium text-[#6f5a4a]">Furniture, décor & essentials</p><p className="text-sm font-medium text-[#6f5a4a]">A calmer way to shop for home</p></div></section>
      </main>
    </div>
  );
};

export default Home;
