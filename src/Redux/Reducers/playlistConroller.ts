// libs
import React, { Component } from 'react';

// audio
import TrackPlayer, { PlayableItem } from '../../components/TrackPlayer';

// below we define the types for the playlist controller

// this item has an id to identify it
// and the data on the track player we specified
export type PlaylistItem = {
  id: string;
  data: PlayableItem;
};

// defines the state passed to the unstated container
// array of playlist items for the playlist
// and the currently playing item
export type PlaylistState = {
  playlist: PlaylistItem[];
  playingItem: PlaylistItem | null;
};

// initialise the state
export const initialState: PlaylistState = {
  playlist: [],
  playingItem: null,
};

class PlaylistController extends Component<PlaylistState> {
  state: PlaylistState = initialState;

  // constructor() {
  //   super(this.props);
  //   const trackChangeListener = TrackPlayer.addTrackChangeListener(
  //     this.onTrackChange,
  //   );
  //   this.removeTrackChangeListener = trackChangeListener.remove;
  // }

  // we need to remove the listeners on unmount
  removeTrackChangeListener: () => void;

  // we can remove any listeners we set up here
  removeListeners() {
    this.removeTrackChangeListener();
  }
  // listener trigger to update the current playing item
  private onTrackChange = async () => {
    await this.updateCurrentPlayingItem();
  };
  // here we do some error checking to ensure that we're updating as we expect
  private updateCurrentPlayingItem = async () => {
    const playingItemId = await TrackPlayer.getInstance().getCurrentTrackId();
    // no playing item and therefore listener is being trigged on a abnormal situation (e.g. logging out)
    if (playingItemId === null) {
      return;
    }

    const playingItem = this.state.playlist.find(
      (item) => item.id === playingItemId,
    );

    if (!playingItem) {
      throw new Error(
        'Changed track to an item that has not been added to the playlist',
      );
    }

    this.setState({ playingItem });

    return playingItem;
  };
  togglePlay = async () => {
    const trackPlayer = TrackPlayer.getInstance();
    const isPlaying = await trackPlayer.isPlaying();

    if (isPlaying) {
      trackPlayer.togglePlay();
    } else {
      await trackPlayer.togglePlay();
    }
  };

  pause = () => TrackPlayer.getInstance().pause();

  next = () => TrackPlayer.getInstance().next();

  previous = () => TrackPlayer.getInstance().previous();

  addToPlaylist = async (...items: PlaylistItem[]) => {
    await this.setState(({ playlist }) => ({
      playlist: [...playlist, ...items],
    }));
    return Promise.all(
      items.map((item) => TrackPlayer.getInstance().appendToQueue(item.data)),
    );
  };

  addBeforePlaylist = (...items: PlaylistItem[]) => {
    this.setState(({ playlist }) => ({
      playlist: [...items, ...playlist],
    }));
    return Promise.all(
      items.map((item) => TrackPlayer.getInstance().prependToQueue(item.data)),
    );
  };

  // clearPlaylist = () => {
  //   this.setState(initialState);
  //   return TrackPlayer.getInstance().clear();
  // };

  // this creates a playlist with the items
  // we access this directly to add items to the playlist
  createPlaylistFrom = async ({
    items,
    startingAtId,
  }: {
    items: PlaylistItem[];
    startingAtId?: string;
    startingAtPosition?: number;
  }) => {
    const before: PlaylistItem[] = [];
    const after: PlaylistItem[] = [];

    // Split the items at the starting at item
    // so we can queue the tracks
    items.forEach((item) => {
      if (item.id === startingAtId || after.length > 0) {
        after.push(item);
      } else {
        before.push(item);
      }
    });

    await this.addToPlaylist(...after);
    await this.addBeforePlaylist(...before);
  };
}

const playlistController = new PlaylistController();
export default playlistController;
