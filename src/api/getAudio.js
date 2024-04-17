const baseUrl = "https://www.googleapis.com/youtube/v3";

export const getAudioUrls = async ({ id }) => {
  const apiKey = import.meta.env.VITE_APP_YT_API 

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  const url = new URL(`${baseUrl}/videos`);
  url.searchParams.append("part", "snippet");
  url.searchParams.append("id", id);
  url.searchParams.append("key", apiKey); // Add API key to URL params

  try {
    const res = await fetch(url.toString(), requestOptions);


    // const data = await res.json();
    console.log("res", res);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
