import PropType from 'prop-types';

import moment from 'moment';

import { Link } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

// import './EntryListItem.css';

const VideoListItem = ({ video }) => {
    return (
        <Link to={`/videos/${video.id}`} className='video-item'>
            <li>
                {/* <div className='miniature'>
                <img
                        src={`${VITE_API_URL}/${video.miniature}`}
                        alt={video.title}
                    />
                </div> */}
                <div className='video-info'>
                    <div>
                        <h3>{video.title}</h3>

                        <p>
                            <strong>Uploaded by:</strong> {video.username}
                        </p>
                    </div>
                    <div>
                        <time>
                            {moment(video.createdAt).format(
                                'DD/MM/YYYY [at] HH:mm'
                            )}
                        </time>
                    </div>
                </div>
            </li>
        </Link>
    );
};

VideoListItem.propTypes = {
    video: PropType.object.isRequired,
};

export default VideoListItem;
