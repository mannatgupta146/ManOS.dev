let audioContext = null

const SOUND_PATTERNS = {
  open: [
    { frequency: 523.25, duration: 0.05, gain: 0.035 },
    { frequency: 659.25, duration: 0.07, gain: 0.03 },
  ],
  minimize: [
    { frequency: 440, duration: 0.05, gain: 0.03 },
    { frequency: 349.23, duration: 0.07, gain: 0.025 },
  ],
  close: [
    { frequency: 392, duration: 0.05, gain: 0.028 },
    { frequency: 261.63, duration: 0.09, gain: 0.022 },
  ],
  notify: [
    { frequency: 783.99, duration: 0.04, gain: 0.028 },
    { frequency: 987.77, duration: 0.06, gain: 0.024 },
    { frequency: 783.99, duration: 0.05, gain: 0.02 },
  ],
}

const isSoundEnabled = () => {
  const settings = JSON.parse(localStorage.getItem("ui-settings") || "{}")
  return settings.sound !== false
}

const getAudioContext = () => {
  if (typeof window === "undefined") {
    return null
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) {
    return null
  }

  if (!audioContext) {
    audioContext = new AudioContextClass()
  }

  return audioContext
}

const playTone = (context, startTime, { frequency, duration, gain }) => {
  const oscillator = context.createOscillator()
  const gainNode = context.createGain()

  oscillator.type = "sine"
  oscillator.frequency.setValueAtTime(frequency, startTime)

  gainNode.gain.setValueAtTime(0.0001, startTime)
  gainNode.gain.exponentialRampToValueAtTime(gain, startTime + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

  oscillator.connect(gainNode)
  gainNode.connect(context.destination)

  oscillator.start(startTime)
  oscillator.stop(startTime + duration)
}

export const playSound = async (name) => {
  if (!isSoundEnabled()) {
    return
  }

  const pattern = SOUND_PATTERNS[name]
  if (!pattern) {
    return
  }

  const context = getAudioContext()
  if (!context) {
    return
  }

  if (context.state === "suspended") {
    try {
      await context.resume()
    } catch {
      return
    }
  }

  let cursor = context.currentTime
  pattern.forEach((tone) => {
    playTone(context, cursor, tone)
    cursor += tone.duration * 0.72
  })
}
