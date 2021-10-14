import React,{useEffect,useState} from "react";
import {API_KEY,IMG_URL} from "../../Constants/Constants"
import axios from "../../axios";
import random from 'random'
import "./Banner.css";
function Banner() {
const [movie, setMovie] = useState()


 useEffect(() => {
axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((responce)=>{
  //console.log(responce.data.results);
 let rand=( random.int((0), (responce.data.results.length)))
 console.log(responce.data.results[rand])
  setMovie(responce.data.results[rand]);
})
 }, [])

  return (
   
    <div style={{backgroundImage: `url(${movie? IMG_URL +movie.backdrop_path : "" })`}}
     className="banner">
      <div className="content">
        <h1 className="titile">{movie ? movie.title: ""}</h1>
        
        <div className="banner_buttons">
          <button className="button">play</button>
          <button className="button">my list</button>
        </div>
        <h1 className="discription">
          {movie ? movie.overview:""}
        </h1>
      </div>
     <div className="fade_bottom"></div>
     
    </div>
  );
}

export default Banner;
