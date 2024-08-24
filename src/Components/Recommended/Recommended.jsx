import React, { useEffect, useState } from 'react';
import './recommended.css';
import { API_KEY } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=20&key=${API_KEY}`
      );
      const data = await response.json();
      setApiData(data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="recommended">
      {apiData.map((video) => (
        <Link to={`/video/${video.snippet.categoryId}/${video.id}`} key={video.id} className="side-video-list">
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          <div className='vid-info'>
            <h4>{video.snippet.title}</h4>
            <p>{video.snippet.channelTitle}</p>
            <p>{video.statistics.viewCount} Views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
