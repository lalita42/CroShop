import { Nav } from "../Component/Nav";
import { Sidebar } from "../Component/Sidebar";

export const Home = () => {
  return (
    <div className="w-[99vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] relative ">
      <Nav />
      <Sidebar />
      <h1 className="text-center mt-[20%] text-[30px]">
        Welcome to Admin Panel
      </h1>
    </div>
  );
};
