import { useNavigate } from "react-router-dom";


export const NotFound = () => {
      const navigate = useNavigate();
  return (
    <div className='w-[100vw] h-[99vh] bg-gradient-to-l from-[#141414] to-[#0c2025] md:text-[70px] text-[30px] flex items-center text-[white] flex-col gap-20 pt-55'>
        404 Page Not Found
        <button className=' bg-[white] px-[20px] py-[10px] rounded-xl text-[18px] text-black cursor-pointer' onClick={()=>navigate("/login")}>Login</button>
    </div>
  )
}
