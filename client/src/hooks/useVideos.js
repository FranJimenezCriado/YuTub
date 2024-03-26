import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import toast from 'react-hot-toast';

import { selectAllVideosService } from '../services/videoService';

const useEntries = () => {
  const [videos, setVideos] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const { videos } = await selectAllVideosService(searchParams);

        setVideos(videos);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchParams]);

  return {
    videos,
    setSearchParams,
    loading,
  };
};

export default useEntries;
