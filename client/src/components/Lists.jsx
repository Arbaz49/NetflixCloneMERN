import axios from 'axios'
import React, { useState } from 'react'
import { AiFillCaretDown, AiOutlineCheck } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useNavigate } from 'react-router-dom'
import  { Navigation } from 'swiper'
import Skeleton from './skeleton/Skeleton';
import { Swiper, SwiperSlide } from "swiper/react";

import {useSelector } from 'react-redux'





const Lists = ({data,category}) => {
console.log(data)
    const lang = useSelector((state) => state.lang.lang);
const user = useSelector((state) => state.user.user);
const navigate = useNavigate();
    let favAPI="https://netflixclone-by-arbaz49.onrender.com/user/favAdd/";
  const [loading, setLoading] = useState(false);
  const addMyList = async (movie) => {
    console.log(user._id)
    try {
      const res = await axios.post(`${favAPI}${user?._id}`, {
        userId: user?._id,
        movie: movie,
      });
      console.log(res.data)
    
      navigate("/favorites");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 relative z-[29]" style={{marginLeft:"0px"}}>
        <div className="w-[85%] mx-auto text-lg font-semibold text-white">
          {lang === "en" ? category : "Populer"}
        </div>

        {loading ? (
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 h-[120px] overflow-hidden w-[85%] mx-auto ">
            {[1, 2, 3, 4, 5, 6].map((sk, i) => (
              <Skeleton key={i} type="movieCard" />
            ))}
          </div>
        ) : (
          <Swiper
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              500: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className="select-none w-[85%] mx-auto  multiMovieSwiper !overflow-visible h-fit  "
          >
            <AiOutlineCheck/>
            {data?.map((movie, i) =>
              movie?.backdrop_path !== null ? (
                <SwiperSlide key={i}>
                  <div className="swiper-card  z-20 relative  hover:delay-1000 my-auto w-full group hover:scale-[1.5] hover:z-30  duration-300 hover:absolute">
                    <Link to={`/details/${movie.id}`}>
                      <LazyLoadImage
                        className="h-[120px]  delay-1000  w-full object-center object-cover  duration-300  bg-contain bg-center bg-black bg-no-repeat"
                        src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie?.backdrop_path}`}
                        alt=""
                        style={{ backgroundImage: "url('/images/logo_N.png')" }}
                      />
                    </Link>
                    <div className="h-0 overflow-hidden group-hover:overflow-visible !opacity-0 group-hover:!opacity-100 group-hover:delay-1000 duration-500 -mt-2  group-hover:h-fit  flex flex-col bg-black text-white relative z-30 ">
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
                            className="border hover:border-gray-400  border-white rounded-full p-2 relative  group/tool"
                            >
                            <div className="absolute w-[130px] rounded-sm hidden group-hover/tool:block  -translate-x-1/2 -top-7 left-1/2 bg-white text-black ">
                              <div className="relative text-center rounded-lg text-xs font-semibold">
                              Add Favorites
                              <AiFillCaretDown className="text-white absolute -bottom-[8px] left-1/2 -translate-x-1/2" />
                               
                              </div>
                            </div>
                              <AiOutlineCheck 
                              
                                onClick={() => addMyList(movie)}
                              />
                          
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
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        )}
      </div>
  )
}

export default Lists
