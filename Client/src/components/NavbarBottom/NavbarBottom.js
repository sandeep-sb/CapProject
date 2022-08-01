import React from "react";
import "./NavbarBottom.css";
import { useState } from "react";
import { Modal} from "@mantine/core";
import CreatePlayListModal from "../CreatePlayListModal/CreatePlayListModal";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from "../../hooks/useAuthContext"
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

export default function NavbarBottom() {
  const {user} = useAuthContext()
  
  let navigate = useNavigate();

  const [opened, setOpened] = useState(false);
  //playlist state
  const [playlist, setPlaylist] = useState([]);
  React.useEffect(() => {
    // get playlists
fetch('https://muzixplaylist.herokuapp.com/api/getPlaylist', {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json'
  }
}).then(res => res.json())
  .then(data => {console.log(data)
    setPlaylist(data);});
    
  }, []);
  //end of playlist state

function deletePlaylist(id) {
  fetch(`https://muzixplaylist.herokuapp.com/api/deletePlaylist/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
   
  }).then(res => res.json())
    .then(data => {console.log(data)
      // filter data
      const newData = playlist.filter(item => item._id !== id);
      setPlaylist(newData);
    
    });
}

const handleClick = ()=>{
  if(!user){
    window.alert("Please Log in");
  }
  else{
    setOpened(true);
  }
}


return (
  <div className="NavbarBottom">
    <Modal
      className="CreatePlaylistDiv"
      opened={opened}
      onClose={() => setOpened(false)}
      title=  "Create PlayList"
    >
      <CreatePlayListModal/>
    </Modal>
    <div className=" NavIcon createPlaylist">
      <h4 onClick={handleClick}>
        <i className="navTop-icon fa-solid fa-square-plus"></i>Create Playlist
      </h4>
    </div>
    
    <div className=" NavIcon " style={{display: "inline-flex"}}>
      <h4 onClick={()=> navigate('/liked')}>
      <i className="navTop-icon fa-hart fa-solid fa-heart"></i>
      Liked Songs
      </h4>
      
      
    </div>
    
    <div className="LastLine"></div>

    {user && playlist.map((playlist) => (
      <div className="Playlists">
      <div style={{display: "flex"}} className="playlist-list">
        <h4 onClick={() => navigate(`/playlist/${playlist._id}`)}>{playlist.playlistName}</h4>
        
        <i class="fa-solid fa-minus" id="delete" onClick={deletePlaylist.bind(this,playlist._id)}  style={{marginTop: "5px", position: "relative", right: "-10%"}}></i>
        </div>
      <Outlet/>
    </div>
    ))}
  </div>
  );
}
