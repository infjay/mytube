import React from 'react'
import { useState , useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Box, formHelperTextClasses } from "@mui/material"
import { Videos , ChannelCard } from "./"
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const { id } = useParams();
  
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])
 
  useEffect(()=> {
    fetchFromAPI(`channels?part="snippet&id=${id}`)
      .then((data)=> setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}part="snippet&order=date`)
      .then((data)=> setVideos(data?.items))
  },[id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{background:'linear-gradient(90deg,rgba(14,15,0,1) 0%, rgba(255,30,10,1)33%, rgba(0,255,231,1) 71%)',
        zIndex:10,
        height:'300px'  
      }} 
     />
          <ChannelCard channelDetail={channelDetail} marginTop="-120px"  />
      </Box>
        <Box display="flex" p="2">
          <Box sx={{ mr: { sm:"100px" } }} >
            <Videos videos={videos} />
          </Box>
        </Box>
    </Box>
  )
}

export default ChannelDetail