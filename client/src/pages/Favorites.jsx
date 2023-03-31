import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import {useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { GoTrashcan } from "react-icons/go";
const Favorites = () => {
  const lang = useSelector((state) => state.lang.lang);
const [fav,setfav]=useState([]);
  const user = useSelector((state) => state.user.user);
const[deleted,setdeleted]=useState(false);
  const favAPI = "https://netflixclone-by-arbaz49.onrender.com/user/favorites/";
  useEffect(()=>{
const getFavorites=async()=>{
  try{
    const {data}=await axios.get(`https://netflixclone-by-arbaz49.onrender.com/user/favorites/${user._id}`);
    setfav(data.favorites);
    console.log(data.favorites)


  }catch(e){
    console.log(e)

  }
}
getFavorites();
  },[deleted])

  //ADD FAV

  const removeMyList = async (id) => {
    // {data:{ }}
    try {
      const res = await axios.delete(`${favAPI}${user._id}`,{data:{movieId:id}});
     console.log(res.data)
     setdeleted(!deleted)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full overflow-x-hidden">
      <div className="pt-[80px] w-[85%] mx-auto text-white flex flex-col gap-2 min-h-screen pb-56 ">
        <div className="text-4xl">
          {lang === "en" ? "Favorites" : "Favoriler"}
        </div>
        {fav?.length === 0 ? (
          <div className="text-white text-lg">
            {lang === "en"
              ? "Unfortunately, there are no TV shows or movies recorded."
              : "Ne yazık ki, kaydedilen hiçbir Dizi veya film yok."}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2  ">
            {fav?.map((movie, i) =>
              movie.name ? (
                <div className="" key={i}>
                  <div className="z-20  relative hover:delay-1000 my-auto w-full group hover:scale-[1.2] hover:z-30  duration-300 ">
                    <Link to={`/details/tv/${movie.id}`}>
                      <img
                        className="h-[120px]  delay-1000  w-full object-center object-cover  duration-300"
                        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
                        alt=""
                      />
                    </Link>
                  
                  </div>
                </div>
              ) : (
                <div key={i}>
                  <div className="z-20 relative hover:delay-1000 my-auto w-full group hover:scale-[1.2] hover:z-30  duration-300 ">
                    <Link to={`/details/${movie.id}`}>
                      <img
                        className="h-[120px]  delay-1000  w-full object-center object-cover  duration-300"
                        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
                        alt=""
                      />
                    </Link>
                    <div className="h-0 overflow-hidden group-hover:overflow-visible !opacity-0 group-hover:!opacity-100 group-hover:delay-1000 duration-500  group-hover:h-fit  flex flex-col bg-black text-white absolute z-30 ">
                      <div className="p-2">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/movieWatch/${movie.id}`}
                            className="border bg-white border-white rounded-full p-2 cursor-pointer"
                          >
                            {" "}
                            <BsFillPlayFill className="text-black " />
                          </Link>
                          <div
                            onClick={() => removeMyList(movie)}
                            className="border hover:border-gray-400  border-white rounded-full p-2 relative  group/tool"
                          >
                            <div className="absolute w-[130px] rounded-sm hidden group-hover/tool:block  -translate-x-1/2 -top-7 left-1/2 bg-white text-black ">
                              <div className="relative text-center rounded-lg text-xs font-semibold">
                              Remove
                                <AiFillCaretDown className="text-white absolute -bottom-[8px] left-1/2 -translate-x-1/2" />
                              </div>
                            </div>
                            <GoTrashcan/>
                          </div>

                          <div className="flex items-center gap-1 ml-auto">
                            <span className="flex">
                              <span
                                className=" bg-emerald-400 !min-w-[35px] !min-h-[35px]
                          rounded-full
                          text-white
                          font-semibold
                          p-1 flex items-center justify-center"
                              >
                                {movie.vote_average.toFixed(1)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 text-xs p-2">
                        <div>
                          <span className="text-emerald-400  font-semibold ">
                            {lang === "en" ? "Name:" : "İsim:"}
                          </span>{" "}
                          {movie.title}
                        </div>
                        <p className="line-clamp-3">
                          {" "}
                          <span className="text-emerald-400  font-semibold ">
                            {lang === "en" ? "Description:" : "Açıklama:"}
                          </span>{" "}
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Favorites;
