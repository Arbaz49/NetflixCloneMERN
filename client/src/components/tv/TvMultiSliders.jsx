import axios from "axios";

// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { useEffect, useState } from "react";

//import icons
import {useSelector } from "react-redux";

//Layz Load Images
import "react-lazy-load-image-component/src/effects/blur.css";
import Lists from "../Lists";

const TvMultiSliders = () => {
  const [data, setData] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [tv3, setTv3] = useState([]);
  const [tv4, setTv4] = useState([]);
  const [tv5, setTv5] = useState([]);
  const [tv6, setTv6] = useState([]);
  const [tv7, setTv7] = useState([]);
  const [tv8, setTv8] = useState([]);
  const [tv9, setTv9] = useState([]);


  const lang = useSelector((state) => state.lang.lang);
  const APIKEY = "9cec6182b5f1ebc72d700240440c6366";

  useEffect(() => {
    getTv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //GET TV
  const getTv = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=${lang}-US&page=1`
      );
      setData(res.data.results);
      getTopRated();
    } catch (error) {
      console.log(error);
    }
  };

  //Top Rated tv
  const getTopRated = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=${lang}-US&page=1`
      );
      setTopRated(res.data.results);
      getTv3();
    } catch (error) {
      console.log(error);
    }
  };

  //GET TV
  const getTv3 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=${lang}-US&page=2`
      );
      setTv3(res.data.results);
      getTv4();
    } catch (error) {
      console.log(error);
    }
  };
  //GET TV
  const getTv4 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=${lang}-US&page=3`
      );
      setTv4(res.data.results);
      getTv5();
    } catch (error) {
      console.log(error);
    }
  };
  //GET TV
  const getTv5 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=${lang}-US&page=4`
      );
      setTv5(res.data.results);
      getTv6();
    } catch (error) {
      console.log(error);
    }
  };
  //GET TV
  const getTv6 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=${lang}-US&page=5`
      );
      setTv6(res.data.results);
      getTv7();
    } catch (error) {
      console.log(error);
    }
  };
  //GET TV
  const getTv7 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=${lang}-US&page=6`
      );
      setTv7(res.data.results);
      getTv8();
    } catch (error) {
      console.log(error);
    }
  };
  //GET TV
  const getTv8 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=${lang}-US&page=/`
      );
      setTv8(res.data.results);
      getTv9();
    } catch (error) {
      console.log(error);
    }
  };
  //GET TV
  const getTv9 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=${lang}-US&page=8`
      );
      setTv9(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  //ADD FAV
 
  return (
    <div className="flex flex-col gap-10 py-5 select-none lg:-mt-48 mb-10 relative  ">
      <Lists data={data} category={"popular"}/>
      <Lists data={topRated} category={"Top Rated"}/>
      <Lists data={tv3} category={"Horror"}/>
      <Lists data={tv4} category={"Action"}/>
      <Lists data={tv5} category={"Science fiction"}/>
      <Lists data={tv6} category={"Love"}/>
      <Lists data={tv7} category={"Comedy"}/>
      <Lists data={tv8} category={"Income"}/>
      <Lists data={tv9} category={"Family"}/>
    </div>
  );
};

export default TvMultiSliders;
