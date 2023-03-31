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

const MovieMultiSliders = () => {
  const [data, setData] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [movies3, setMovies3] = useState([]);
  const [movies4, setMovies4] = useState([]);
  const [movies5, setMovies5] = useState([]);
  const [movies6, setMovies6] = useState([]);
  const [movies7, setMovies7] = useState([]);
  const [movies8, setMovies8] = useState([]);
  const [movies9, setMovies9] = useState([]);


  const lang = useSelector((state) => state.lang.lang);
  const APIKEY = "9cec6182b5f1ebc72d700240440c6366";

  useEffect(() => {
    getMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //GET MOVIES
  const getMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${lang}-US&page=1`
      );
      setData(res.data.results);
      getTopRated();

    } catch (error) {
      console.log(error);
    }
  };

  //Top Rated Movies
  const getTopRated = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=${lang}-US&page=1`
      );
      setTopRated(res.data.results);

      getMovies3();

    } catch (error) {
      console.log(error);
    }
  };

  //GET MOVIES
  const getMovies3 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${lang}-US&page=3`
      );
      setMovies3(res.data.results);

      getMovies4();

    } catch (error) {
      console.log(error);
    }
  };
  //GET MOVIES
  const getMovies4 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${lang}-US&page=4`
      );
      setMovies4(res.data.results);

      getMovies5();

    } catch (error) {
      console.log(error);
    }
  };
  //GET MOVIES
  const getMovies5 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${lang}-US&page=5`
      );
      setMovies5(res.data.results);

      getMovies6();

    } catch (error) {
      console.log(error);
    }
  };
  //GET MOVIES
  const getMovies6 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${lang}-US&page=6`
      );
      setMovies6(res.data.results);

      getMovies7();

    } catch (error) {
      console.log(error);
    }
  };
  //GET MOVIES
  const getMovies7 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${lang}-US&page=7`
      );
      setMovies7(res.data.results);

      getMovies8();

    } catch (error) {
      console.log(error);
    }
  };
  //GET MOVIES
  const getMovies8 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${lang}-US&page=8`
      );
      setMovies8(res.data.results);

      getMovies9();

    } catch (error) {
      console.log(error);
    }
  };
  //GET MOVIES
  const getMovies9 = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${lang}-US&page=9`
      );
      setMovies9(res.data.results);

    } catch (error) {
      console.log(error);
    }
  };
  //ADD FAV


  return (
    <div className="flex flex-col gap-10 py-5 select-none lg:-mt-48 mb-10 relative  ">

<Lists data={data} category={"Popular"}/>
      <Lists data={topRated} category={"Top Rated"}/>
      <Lists data={movies3} category={"Horror"}/>
      <Lists data={movies4} category={"Action"}/>
      <Lists data={movies5} category={"Science fiction"}/>
      <Lists data={movies6} category={"Love"}/>
      <Lists data={movies7} category={"Comedy"}/>
      <Lists data={movies8} category={"Income"}/>
      <Lists data={movies9} category={"Family"}/>
    </div>
  );
};

export default MovieMultiSliders;
