import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar'
import { Link } from 'react-router-dom';

import useVideos from "../../hooks/useVideos.js"

const { VITE_API_URL } = import.meta.env;

import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';


import './VideoListItem.css';

function VideoListItem() {

  const { videos, loading } = useVideos();

  const dateDifferenceInDays = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / 86_400_000;

  const { authUser } = useContext(AuthContext);

  return (
    <Grid container>
      {(loading ? Array.from(new Array(5)) : videos).map((video, index) => (
        <Box key={index} sx={{ width: 320, marginRight: 1, my: 5 }}>
          {video ? (
              <Link to={`/videos/${video.id}`} className='video-item'>
                <img
                  style={{ width: 320, height: 180, border: '2px solid white', borderRadius: '10px' }}
                  alt={video.title}
                  src={`${VITE_API_URL}/${video.miniature}`}
                />
              </Link>
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}

          {video ? (
            <Link to={`/videos/${video.id}`} className='video-item'>
              {/* <Box sx={{ position: "absolute", marginTop: 2 }}>
                <Avatar
                  src={
                    authUser.avatar?
                      `${VITE_API_URL}/${authUser.avatar}`
                      :
                      '/default-avatar.jpg'
                    }
                  alt={`${authUser.username}'s avatar`}
                />
              </Box> */}
              <Box sx={{ pr: 2, marginLeft: 7}}>
                <Typography gutterBottom variant="body1" color="ButtonText">
                  {video.title}
                </Typography>
                <Typography display="block" variant="subtitle1" color="GrayText">
                  {video.username}
                </Typography>
                <Typography variant="subtitle1" color="GrayText">
                  {`${video.category} • ${Math.floor(dateDifferenceInDays(new Date(video.createdAt), new Date(Date.now())))} days ago`}
                </Typography>
              </Box>
            </Link>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

export default function YuTub() {

  return (
    <Box>
      <VideoListItem loading/>
    </Box>
  );
}
