 const GetAudioDuration = async (videoId) => {
    const apiKey = import.meta.env.VITE_APP_YT_API
  
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("dur", data);
  
      if (data.items && data.items.length > 0) {
      
        const duration = data.items[0].contentDetails.duration;
        return duration;
      } else {
        throw new Error("Video details not found");
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
      throw error;
    }
  };
  export default GetAudioDuration;
  