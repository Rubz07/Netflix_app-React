import React,{useEffect,useState} from "react";
import axios from  "../../axios";
import "./RowPost.css";
import {IMG_URL} from "../../Constants/Constants"
function RowPost(props) 
{

  const [posts,setPosts]=useState([])

useEffect(() => {
 axios.get(props.url).then((responce)=>{
   console.log(responce.data);
   setPosts(responce.data.results)
 }).catch(err=>{
   //alert('nerwork Error')
 })
  }, [])

  return(
      
    <div className="row">
        <h1>{props.title}</h1>
        <div className= "posters">
           {
             posts.map((obj)=>{
               return(<img className={props.isSmall ? "smallPoster" : "poster"} src={`${IMG_URL+obj.backdrop_path}`} alt="posts" />)

             })
           }
        </div>
    </div>
  );
}

export default RowPost;
