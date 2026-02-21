export const playSound = (name) => {
  const settings = JSON.parse(localStorage.getItem("ui-settings") || "{}");

  if (!settings.sound) return;

  const audio = new Audio(`/sounds/${name}.mp3`);
  audio.volume = 0.4;
  audio.play().catch(()=>{});
};