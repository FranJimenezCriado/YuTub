import useVideos from '../../hooks/useVideos';

import VideoListItem from '../../components/VideoListItem/VideoListItem';
import Loading from '../../components/Loading/Loading';
import SearchForm from '../../forms/SearchForm/SearchForm';

// import './HomePage.css';

const HomePage = () => {
    const {
        videos,
        setSearchParams,
        loading,
    } = useVideos();

    return (
        <main>
            <SearchForm setSearchParams={setSearchParams} loading={loading} />

            <ul className='video-list'>
                {videos.length < 1 && loading ? (
                    <Loading />
                ) : videos.length === 0 ? (
                    <li>¡No se ha encontrado ningún resultado!</li>
                ) : (
                    videos.map((video) => {
                        return <VideoListItem key={video.id} video={video} />;
                    })
                )}
            </ul>
        </main>
    );
};

export default HomePage;
