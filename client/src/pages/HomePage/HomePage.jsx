import useVideos from '../../hooks/useVideos';

import VideoListItem from '../../components/VideoListItem/VideoListItem';

// import './HomePage.css';

const HomePage = () => {
    const {
        videos
    } = useVideos();

    return (
        <main>

            <ul className='video-list'>
                {videos.length === 0 ? (
                    <p>No videos uploaded yet!</p>
                ) : (
                    <VideoListItem/>
                )}
            </ul>
        </main>
    );
};

export default HomePage;
