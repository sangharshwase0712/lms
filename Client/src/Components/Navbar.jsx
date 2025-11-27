// import React from "react";
// import { GraduationCap } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// function Navbar() {
//   const { user } = useSelector(store=>store.auth);
//   // const user = false;
//   return (
//     <div className="bg-gray-900 z-50 w-full py-3 fixed top-0">
//       <div className="max-w-7xl mx-auto flex justify-between ">
//         {/* logo section */}
//       <Link to='/'>  <div className="flex gap-1 ">
//           <GraduationCap className="text-gray-300 w-10 h-10" />
//           <h1 className="text-gray-300 text-3xl font-bold">Learnova</h1>
//         </div></Link>
//         {/* menu section */}
//         <nav>
//           <ul className="flex gap-7 text-xl items-center font-semibold text-white">
//            <Link to='/'> <li className="cursor-pointer">Home</li></Link>
//             <Link to='/courses'><li className="cursor-pointer">Courses</li></Link>

//             {!user ? (
//               <div className="flex gap-3">
//                 <Link to='/login'><button className="rounded-md bg-indigo-500 hover:bg-indigo-600 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Login</button></Link>
//                <Link to='/signup'> <button className="rounded-md bg-gray-700 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign Up</button></Link>
//                 {/* <button type="submit" className="rounded-md bg-indigo-500 hover:bg-indigo-600 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
//    */}
//               </div>
//             ) : (
//               <div className="flex items-center gap-7">
//                 <Avatar>  
//                   <AvatarImage src="https://github.com/shadcn.png" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//                 <button className="rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2">Logout</button>
//               </div>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import React from "react";
import { GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const handleLogout = async() => {
try{
  const res = await axios.get('http://localhost:8080/api/users/logout', {withCredentials:true})
  if(res.data.success){
    navigate('/');
    dispatch(setUser(null));
    toast.success(res.data.message);
  }
}catch(err){
  console.log("Error during logout:", err);
  toast.error(err.response?.data?.message || "Logout failed");
}
  };

  return (
    <div className="bg-gray-900 z-50 w-full py-3 fixed top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* logo section */}
        <Link to="/">
          <div className="flex gap-1 items-center">
            <GraduationCap className="text-gray-300 w-10 h-10" />
            <h1 className="text-gray-300 text-3xl font-bold">Learnova</h1>
          </div>
        </Link>

        {/* menu section */}
        <nav>
          <ul className="flex gap-7 text-xl items-center font-semibold text-white">
            <Link to="/">
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link to="/courses">
              <li className="cursor-pointer">Courses</li>
            </Link>

            {!user ? (
              <div className="flex gap-3">
                <Link to="/login">
                  <button className="rounded-md bg-indigo-500 hover:bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-md bg-gray-700 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white">
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-7">
                {
                  user.role === 'instructor' && <Link to='/admin/dashboard'><li className="cursor-pointer">Admin</li></Link>
                }
               <Link to="/profile">
                <Avatar>
                  {/* <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback> */}
                  <AvatarImage src={user.photoUrl} /> <AvatarFallback>CN</AvatarFallback>
                </Avatar>
               </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
