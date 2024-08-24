import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
const {videoId}=useParams();

  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);

  const fetchVideoData = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      const data = await response.json();
      setVideoData(data.items[0]);

      const channelId = data.items[0].snippet.channelId;
      fetchChannelData(channelId);
      fetchCommentsData(videoId);
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  const fetchChannelData = async (channelId) => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelId}&key=${API_KEY}`
      );
      const data = await response.json();
      setChannelData(data.items[0]);
    } catch (error) {
      console.error('Error fetching channel data:', error);
    }
  };

  const fetchCommentsData = async (videoId) => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`
      );
      const data = await response.json();
      setCommentsData(data.items);
    } catch (error) {
      console.error('Error fetching comments data:', error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title={videoData?.snippet?.title || "Video"}
      ></iframe>
      <h3>{videoData?.snippet?.title || "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {videoData
            ? `${videoData.statistics?.viewCount || 0} views &bull; ${new Date(videoData.snippet?.publishedAt).toLocaleDateString()}`
            : "Views & Date"}
        </p>
        <div>
          <span>
            <img src={like} alt="like" />
            {videoData?.statistics?.likeCount || "0"}
          </span>
          <span>
            <img src={dislike} alt="dislike" />
            {videoData?.statistics?.dislikeCount || "0"}
          </span>
          <span>
            <img src={share} alt="share" />
            share
          </span>
          <span>
            <img src={save} alt="save" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url || user_profile} alt="Publisher" />
        <div>
          <p>{channelData?.snippet?.title || "Channel Name"}</p>
          <span>{channelData ? `${value_converter(channelData.statistics?.subscriberCount)} Subscribers` : "Subscribers"}</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{videoData?.snippet?.description.slice(0, 250) || "Description here"}</p>
        <hr />
        <h4>{commentsData.length > 0 ? `${commentsData.length} Comments` : "No Comments Yet"}</h4>
        {commentsData.map((comment, index) => (
          <div className="comment" key={index}>
            <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl || user_profile} alt="user profile" />
            <div>
              <h3>{comment.snippet.topLevelComment.snippet.authorDisplayName} <span>{new Date(comment.snippet.topLevelComment.snippet.publishedAt).toLocaleDateString()}</span></h3>
              <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
              <div className="comment-action">
                <img src={like} alt="like" />
                <span>{comment.snippet.topLevelComment.snippet.likeCount}</span>
                <img src={dislike} alt="dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
