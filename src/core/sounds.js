export function SoundManager() {
  const sounds = {};
  const files = {};

  const playSound = (name) => sounds[name].play();

  const playEffect = (name) => {
    const effect = new Audio(`./resources/sounds/${files[name]}`);
    effect.play();
  };

  const addSound = (fileName, name) => {
    files[name] = fileName;
    sounds[name] = new Audio(`./resources/sounds/${fileName}`);
  }

  const getSound = (name) => sounds[name];

  const addSounds = (sounds) => sounds.forEach(([fileName, name]) => addSound(fileName, name));

  const stopSound = (name) => {
    sounds[name].pause();
    sounds[name].currentTime = 0;
  }

  const stopAllSounds = () => {
    Object.keys(sounds).forEach(key => {
      stopSound(key);
    })
  }

  return {
    playSound,
    playEffect,
    addSound,
    addSounds,
    stopSound,
    stopAllSounds,
    getSound,
  };
}
