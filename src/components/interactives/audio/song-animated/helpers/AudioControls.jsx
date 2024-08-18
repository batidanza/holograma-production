export const playAudio = (sound, setAudioPlaying) => {
    if (!sound.playing) {
      sound.play();
      setAudioPlaying(true);
    }
  };
  
  export const stopAudio = (sound, setAudioPlaying) => {
    sound.pause();
    sound.currentTime = 0;
    setAudioPlaying(false);
  };
  
  export const requestAudioPermission = (sound, setAudioPermission, setAudioPlaying) => {
    sound.play().then(() => {
      setAudioPermission(true);
      stopAudio(sound, setAudioPlaying);
    }).catch((error) => {
      console.error('Error playing audio:', error);
    });
  };