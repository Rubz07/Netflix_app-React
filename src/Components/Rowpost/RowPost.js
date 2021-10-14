import React,{useEffect,useState} from "react";
import axios from  "../../axios";
import "./RowPost.css";
import {API_KEY, IMG_URL} from "../../Constants/Constants"
import YouTube from "react-youtube";
function RowPost(props) 
{
  const [posts,setPosts]=useState([])
  const [urlId,setUrlId]=useState('')

useEffect(() => {
 axios.get(props.url).then((responce)=>{
   //console.log(responce.data);
   setPosts(responce.data.results)
 }).catch(err=>{
   alert('nerwork Error')
 })
  }, [])

  const shadow = {
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    opacity: 0.4
}
//style={{backgroundImage: `url(${ IMG_URL + urlId.image })`,...shadow}}
  //Youtube video options
  const opts = {
    height: '390',
    width: '90%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const HandleMovieTrailer=(id,name,overview,rat,img)=>{
    
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((responce)=>{
      if(responce.data.results.length!==0){
        console.log(responce.data.results[0])
        setUrlId({result:responce.data.results[0],moviename:name,movieoverview:overview,rating:rat,image:img})
      }
      else{
        console.log("no trailers");
      }
    })
  }
  return(
      
    <div className="row">
        <h1>{props.title}</h1>
        <div className= "posters">
           {
             posts.map((obj)=>
               <img onClick={()=>HandleMovieTrailer(obj.id,obj.title,obj.overview,obj.vote_average,obj.backdrop_path)} className={props.isSmall ? "smallPoster" : "poster"} src={`${IMG_URL+obj.backdrop_path}`} alt="posts" /> 
          )}
           
        </div>
          <div className={urlId? "movieTrailerDetails" :" nomovieTrailerDetails"}  >
            <div className="youtubeTrailer">{ urlId && <YouTube opts={opts} videoId={urlId.result.key} />}</div>
        <div className="trailerContent">
        <h1 className="trailertitle">{urlId.moviename}</h1>
        <div className="Rating">
          <h3>Rating : <button className="ratingButton">{urlId.rating}</button> </h3>
        </div>
        <h1 className="trailerDiscription">
          {urlId.movieoverview}
        </h1>
        <div className="trailer_buttons">
          <button className="trailerbutton">Watch Movie</button>
        </div>
       </div>
        </div>
       
      
    </div>
  );
}

export default RowPost;
