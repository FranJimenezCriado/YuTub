import useVideos from '../../hooks/useVideos';

import VideoListItem from '../../components/VideoListItem/VideoListItem';
import FilterVideos from "../../components/FilterVideos/FilterVideos"

// import './HomePage.css';

const HomePage = ({videosFiltrados}) => {
    const {
        videos
    } = useVideos();

    return (
        <main>
            {videosFiltrados.length === 0 ? (
                <ul className='video-list'>
                    {videos.length === 0 ? (
                        <p>No videos uploaded yet!</p>
                    ) : (
                        <VideoListItem/>
                    )}
                </ul>
            ) : (
                <FilterVideos videosFiltrados={videosFiltrados}/>)}
        </main>
    );
};

export default HomePage;
