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
   console.log(responce.data);
   setPosts(responce.data.results)
 }).catch(err=>{
   alert('nerwork Error')
 })
  }, [])

  //Youtube video options
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const HandleMovieTrailer=(id)=>{
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((responce)=>{
      if(responce.data.results.length!==0){
        setUrlId(responce.data.results[0].key)
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
               <img onClick={()=>HandleMovieTrailer(obj.id)} className={props.isSmall ? "smallPoster" : "poster"} src={`${IMG_URL+obj.backdrop_path}`} alt="posts" /> 
          )}
           
        </div>
       { urlId && <YouTube opts={opts} videoId={urlId} />} 
    </div>
  );
}

export default RowPost;
