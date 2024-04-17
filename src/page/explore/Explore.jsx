import { useEffect, useState } from "react";
import { useGetPlaylistQuery } from "../../reduxtool/services/songsApi";
import "./Explore.css";
import ExploreList from "../../components/exploreList/ExploreList";
import { useGetMyplaylistInfoQuery } from "../../reduxtool/services/myApi";

const Explore = ({ miniPlayerActive }) => {

  const [localPlaylists, setLocalPlaylists] = useState([]);
  const [discoverNewMusic, setDiscoverNewMusic] = useState([]);

  const playlists = [
    { title: "Released", id: "PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" },
    {
      title: "New Music 1",
      id: "PL3-sRm8xAzY9gpXTMGVHJWy_FMD67NBed",
    },
    {
      title: "New Music 2",
      id: "PLP32wGpgzmIlDFQuxl1qeH33hJJSq8wfe",
    },
    {
      title: "New Music 3",
      id: "PL4uUU2x5ZgR2TbZ0UACoymiEf3HYeX18B",
    },
    {
      title: "New Music 4",
      id: "PLCg-XykIyZVEicFD6cdapw3-w3B_-9dfm",
    },
    {
      title: "New Music 5",
      id: "PL4QNnZJr8sRNwtUsvnU7QH5WJ_iamWwTE",
    },
    {
      title: "New Music 6",
      id: "PLcHqC9YNzSaB621igMmxfeMUvroQqYr3L",
    },
  ];

  const newReleased = useGetPlaylistQuery(playlists[0].id, {
    skip: !miniPlayerActive,
  });
  const newMusic1 = useGetPlaylistQuery(playlists[1].id, {
    skip: !miniPlayerActive,
  });
  const newmsuic2 = useGetPlaylistQuery(playlists[2].id, {
    skip: !miniPlayerActive,
  });
  const newMusic3 = useGetPlaylistQuery(playlists[3].id, {
    skip: !miniPlayerActive,
  });
  const newMusic4 = useGetPlaylistQuery(playlists[4].id, {
    skip: !miniPlayerActive,
  });
  const newMusic5 = useGetPlaylistQuery(playlists[5].id, {
    skip: !miniPlayerActive,
  });
  const newMusic6 = useGetPlaylistQuery(playlists[6].id, {
    skip: !miniPlayerActive,
  });

  useEffect(() => {
    if (
      newReleased.data &&
      newMusic1.data &&
      newmsuic2.data &&
      newMusic3.data &&
      newMusic4.data &&
      newMusic5.data &&
      newMusic6.data
    ) {
      setDiscoverNewMusic([
        newReleased.data?.items[0],
        newMusic1.data?.items[0],
        newmsuic2.data?.items[0],
        newMusic3.data?.items[0],
        newMusic4.data?.items[0],
        newMusic5.data?.items[0],
        newMusic6.data?.items[0],
      ]);
    }
    // eslint-disable-next-line
  }, [
    newReleased.data,
    newMusic1.data,
    newmsuic2.data,
    newMusic3.data,
    newMusic4.data,
    newMusic5.data,
    newMusic6.data,
  ]);

  // get my local playlist info

  const { data, isLoading } = useGetMyplaylistInfoQuery();

  useEffect(() => {
    if (data) {
      setLocalPlaylists(data.localPlaylistsInfo);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <section className="explore-section">
      <div className="explore-container container">
        {localPlaylists?.map((localPlaylist, index) => (
          <ExploreList
            key={index}
            title={localPlaylist.playlistTitle}
            exploreData={localPlaylist.data}
            isLoading={isLoading}
            dataType="localFetch"
          />
        ))}

        <ExploreList
          title={"Discover New Music"}
          exploreData={discoverNewMusic}
          isLoading={newMusic1.isLoading}
          dataType="youtubeFetch"
        />
      </div>
    </section>
  );
};

export default Explore;
