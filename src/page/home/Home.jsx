import React, { useEffect } from "react";
import "./Home.css";
import { useGetPlaylistItemsQuery } from "../../reduxtool/services/songsApi";
import SongsList from "../../components/songsList/SongsList";
import { useDispatch, useSelector } from "react-redux";
import {
  addMyPlaylistSongs,
  addSongs,
  removePlaylist,
  removePlaylistSongs,
} from "../../reduxtool/slice/songsSlice";
import HeroBanner from "./heroBanner/HeroBanner";
import AddPlaylist from "../../components/addPlaylist/AddPlaylist";
import { MdDeleteForever } from "react-icons/md";

const Home = ({ miniPlayerActive }) => {

  const playlistId = {
    newRelesedId: "PLO7-VO1D0_6N2ePPlPE9NKCgUBA15aOk2",
    trendingSongsId: "PLI_7Mg2Z_-4IWcD4drvDLYWp-eIZQUMUN",
    MetalHitsId: "PLDIoUOhQQPlXzhp-83rECoLaV6BwFtNC4",
  };
  // local playlist
  const myLocalPlaylist = useSelector(
    (state) => state.songsSlice.myPlaylistData
  );

  const dispatch = useDispatch();
  const songsData = useSelector((state) => state.songsSlice.songsData);
  const myPlaylistSongs = useSelector(
    (state) => state.songsSlice.myPlaylistSongs
  );

  const newSongs = useGetPlaylistItemsQuery(playlistId.newRelesedId, {
    skip: !miniPlayerActive,
  });
  const trendingSongs = useGetPlaylistItemsQuery(playlistId.trendingSongsId, {
    skip: !miniPlayerActive,
  });
  const MetalHitsSongs = useGetPlaylistItemsQuery(
    playlistId.MetalHitsId,
    { skip: !miniPlayerActive }
  );

  const locaPlaylist0 = useGetPlaylistItemsQuery(
    myLocalPlaylist[0]?.playlistId,
    { skip: !myLocalPlaylist[0]?.playlistId || !miniPlayerActive }
  );
  const locaPlaylist1 = useGetPlaylistItemsQuery(
    myLocalPlaylist[1]?.playlistId,
    { skip: !myLocalPlaylist[1]?.playlistId || !miniPlayerActive }
  );

  useEffect(() => {
    if (trendingSongs.data && newSongs.data && MetalHitsSongs.data) {
      dispatch(
        addSongs([
          {
            data: trendingSongs.data,
            metaData: {
              title: "Trending Songs",
              playlist: playlistId.trendingSongsId,
              isLoading: trendingSongs.isLoading,
            },
          },

          {
            data: newSongs.data,
            metaData: {
              title: "New Released",
              playlist: playlistId.newRelesedId,
              isLoading: newSongs.isLoading,
            },
          },
          {
            data: MetalHitsSongs.data,
            metaData: {
              title: "Metal Hits",
              playlist: playlistId.MetalHitsId,
              isLoading: MetalHitsSongs.isLoading,
            },
          },
        ])
      );
    }

    // eslint-disable-next-line
  }, [trendingSongs.data, newSongs.data, MetalHitsSongs.data]);

  // add local playlist songs

  useEffect(() => {
    if (locaPlaylist0?.data) {
      dispatch(
        addMyPlaylistSongs([
          {
            data: locaPlaylist0?.data,
            metaData: {
              title: myLocalPlaylist[0]?.title,
              playlist: myLocalPlaylist[0]?.playlistId,
              isLoading: locaPlaylist0.isLoading,
            },
          },
        ])
      );
    }

    if (locaPlaylist1?.data) {
      dispatch(
        addMyPlaylistSongs([
          {
            data: locaPlaylist0?.data,
            metaData: {
              title: myLocalPlaylist[0]?.title,
              playlist: myLocalPlaylist[0]?.playlistId,
              isLoading: locaPlaylist0.isLoading,
            },
          },
          {
            data: locaPlaylist1?.data,
            metaData: {
              title: myLocalPlaylist[1]?.title,
              playlist: myLocalPlaylist[1]?.playlistId,
              isLoading: locaPlaylist1.isLoading,
            },
          },
        ])
      );
    }

    // eslint-disable-next-line
  }, [myLocalPlaylist, locaPlaylist0?.data, locaPlaylist1?.data]);

  return (
    <div className="home-section">
      <HeroBanner
        songsData={songsData[0]?.data?.items}
        isLoading={songsData[0]?.metaData?.isLoading}
      />

      {!songsData.length ? (
        <>
          <SongsList isLoading={newSongs.isLoading} />
          <SongsList isLoading={newSongs.isLoading} />
          <SongsList isLoading={newSongs.isLoading} />
        </>
      ) : (
        songsData.map((songs) => (
          <SongsList
            key={songs.metaData?.title}
            title={songs.metaData?.title}
            songsData={songs.data?.items}
            // isLoading={songs.metaData?.isLoading}
            playlistId={songs.metaData?.playlist}
          />
        ))
      )}
      {myPlaylistSongs?.map((songs, index) => (
        <div key={songs.metaData?.title}>
          <div className="local-playlist-container container ">
            <p>Your imported Youtube playlist {index + 1} </p>
            <button
              type="button"
              title="delete playlist"
              className="playlist-delete-btn"
              onClick={() => {
                dispatch(removePlaylistSongs(songs.metaData?.playlistId));
                dispatch(removePlaylist(songs.metaData?.playlistId));
              }}
            >
              <MdDeleteForever style={{ width: "100%", height: "100%" }} />
            </button>
          </div>

          <SongsList
            title={songs.metaData?.title}
            songsData={songs.data?.items}
            isLoading={songs.metaData?.isLoading}
            playlistId={songs.metaData?.playlist}
          />
        </div>
      ))}
      <AddPlaylist />
    </div>
  );
};

export default Home;
