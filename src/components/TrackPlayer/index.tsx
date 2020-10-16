import RNTrackPlayer, { Track } from 'react-native-track-player';

export type PlayableItem = {
  audioUrl: string;
  title: string;
  id: string;
  artwork: string;
};

class TrackPlayer {
  private static instance: TrackPlayer;

  static getInstance() {
    if (!TrackPlayer.instance) {
      TrackPlayer.instance = new TrackPlayer();
      TrackPlayer.instance.init();
      return TrackPlayer.instance;
    }

    return TrackPlayer.instance;
  }

  private init() {
    RNTrackPlayer.setupPlayer({
      iosCategoryMode: 'spokenAudio',
    });

    const capabilities = [
      RNTrackPlayer.CAPABILITY_PLAY,
      RNTrackPlayer.CAPABILITY_PAUSE,
      RNTrackPlayer.CAPABILITY_SEEK_TO,
    ];

    const options = {
      stopWithApp: true,
      capabilities,
      compactCapabilities: capabilities,
    };

    RNTrackPlayer.updateOptions(options);
  }

  private createTrack = (item: PlayableItem): Track => {
    const { audioUrl, title, id, artwork } = item;
    const track = {
      id,
      url: audioUrl,
      title,
      artist: 'Finimize',
      artwork,
      pitchAlgorithm: RNTrackPlayer.PITCH_ALGORITHM_VOICE,
    };

    return track;
  };

  static addTrackChangeListener = (callback: () => void) =>
    RNTrackPlayer.addEventListener('playback-track-changed', callback);

  pause = () => RNTrackPlayer.pause();

  isPlaying = async () => {
    const currentState = await RNTrackPlayer.getState();
    return currentState === RNTrackPlayer.STATE_PLAYING;
  };

  togglePlay = async () => {
    const isPlaying = await this.isPlaying();

    if (isPlaying) {
      return RNTrackPlayer.pause();
    } else {
      return RNTrackPlayer.play();
    }
  };

  next = () => RNTrackPlayer.skipToNext();
  previous = () => RNTrackPlayer.skipToPrevious();

  prependToQueue = async (playables: PlayableItem[] | PlayableItem) => {
    const audioFiles = Array.isArray(playables)
      ? playables.map((item) => this.createTrack(item))
      : this.createTrack(playables);

    const currentTrackId = await this.getCurrentTrackId();
    RNTrackPlayer.add(audioFiles, currentTrackId);
  };

  // add after the current playing item
  appendToQueue = (playables: PlayableItem[] | PlayableItem) => {
    const audioFiles = Array.isArray(playables)
      ? playables.map((item) => this.createTrack(item))
      : this.createTrack(playables);
    RNTrackPlayer.add(audioFiles);
  };
  getCurrentTrackId = async () => {
    return await RNTrackPlayer.getCurrentTrack();
  };
}

export default TrackPlayer;
