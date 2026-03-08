let audioContext = null
let outputChain = null

const note = (midi) => 440 * 2 ** ((midi - 69) / 12)

const buildPattern = (tones, options = {}) => {
  const {
    duration = 0.075,
    gain = 0.022,
    type = "sine",
    overlap = 0.76,
    attack = 0.018,
    release = 0.045,
    shimmerGain = 0.16,
  } = options

  return tones.map((tone) => {
    if (typeof tone === "number") {
      return {
        frequency: note(tone),
        duration,
        gain,
        type,
        attack,
        release,
        shimmerGain,
      }
    }

    return {
      frequency: note(tone.midi),
      duration: tone.duration ?? duration,
      gain: tone.gain ?? gain,
      type: tone.type ?? type,
      attack: tone.attack ?? attack,
      release: tone.release ?? release,
      shimmerGain: tone.shimmerGain ?? shimmerGain,
      overlap: tone.overlap ?? overlap,
    }
  })
}

const SOUND_PATTERNS = {
  open: buildPattern([76, 81, 88], {
    duration: 0.064,
    gain: 0.034,
    type: "triangle",
    overlap: 0.64,
    shimmerGain: 0.22,
  }),
  minimize: buildPattern([79, 74], {
    duration: 0.048,
    gain: 0.028,
    type: "sine",
    overlap: 0.72,
    attack: 0.012,
    release: 0.03,
    shimmerGain: 0.18,
  }),
  close: buildPattern([60, 53], {
    duration: 0.082,
    gain: 0.03,
    type: "triangle",
    overlap: 0.84,
    attack: 0.016,
    release: 0.05,
    shimmerGain: 0.1,
  }),
  menu: buildPattern([
    { midi: 67, duration: 0.038, gain: 0.009, type: "sine" },
    { midi: 72, duration: 0.045, gain: 0.008, type: "triangle" },
  ]),
  "dock-open": buildPattern([60, 67, 74], {
    duration: 0.05,
    gain: 0.03,
    type: "triangle",
    overlap: 0.6,
    shimmerGain: 0.2,
  }),
  "dock-close": buildPattern([72, 64], {
    duration: 0.05,
    gain: 0.026,
    type: "sine",
    overlap: 0.78,
    shimmerGain: 0.14,
  }),
  refresh: buildPattern([72, 76, 79, 76], {
    duration: 0.048,
    gain: 0.014,
    type: "sine",
    overlap: 0.62,
  }),
  wallpaper: buildPattern([74, 78, 81, 86], {
    duration: 0.09,
    gain: 0.016,
    type: "sine",
    overlap: 0.8,
  }),
  spotlight: buildPattern([71, 78, 83], {
    duration: 0.06,
    gain: 0.015,
    type: "sine",
  }),
  "spotlight-shortcut": buildPattern([83, 90, 95], {
    duration: 0.042,
    gain: 0.014,
    type: "triangle",
    overlap: 0.6,
  }),
  lock: buildPattern([52, 47], {
    duration: 0.1,
    gain: 0.016,
    type: "triangle",
    overlap: 0.9,
  }),
  unlock: buildPattern([59, 64, 68], {
    duration: 0.072,
    gain: 0.016,
    type: "sine",
  }),
  "show-desktop": buildPattern([72, 67, 60], {
    duration: 0.07,
    gain: 0.014,
    type: "sine",
  }),
  "close-all": buildPattern([69, 65, 62, 57], {
    duration: 0.062,
    gain: 0.014,
    type: "sine",
    overlap: 0.74,
  }),
  "dock-toggle": buildPattern([
    { midi: 65, duration: 0.04, gain: 0.008, type: "triangle" },
    { midi: 72, duration: 0.042, gain: 0.007, type: "sine" },
  ]),
  "focus-on": buildPattern([64, 71, 76], {
    duration: 0.06,
    gain: 0.013,
    type: "sine",
  }),
  "focus-off": buildPattern([76, 71, 64], {
    duration: 0.06,
    gain: 0.012,
    type: "sine",
  }),
  empty: buildPattern([
    { midi: 55, duration: 0.042, gain: 0.007, type: "triangle" },
    { midi: 50, duration: 0.058, gain: 0.008, type: "sine" },
  ]),
  "app-terminal": buildPattern([48, 55, 60], {
    duration: 0.05,
    gain: 0.013,
    type: "triangle",
  }),
  "app-calendar": buildPattern([72, 76, 79], {
    duration: 0.06,
    gain: 0.015,
    type: "sine",
  }),
  "app-mail": buildPattern([67, 74, 79], {
    duration: 0.055,
    gain: 0.014,
    type: "sine",
  }),
  "app-github": buildPattern([55, 62, 67], {
    duration: 0.056,
    gain: 0.013,
    type: "triangle",
  }),
  "app-resume": buildPattern([60, 64, 67, 72], {
    duration: 0.05,
    gain: 0.012,
    type: "sine",
    overlap: 0.62,
  }),
  "app-notes": buildPattern([76, 79, 83], {
    duration: 0.052,
    gain: 0.015,
    type: "sine",
  }),
  "app-code": buildPattern([64, 71, 76, 83], {
    duration: 0.042,
    gain: 0.012,
    type: "triangle",
    overlap: 0.58,
  }),
  "app-spotify": buildPattern([67, 70, 74, 79], {
    duration: 0.048,
    gain: 0.013,
    type: "sine",
    overlap: 0.66,
  }),
  "app-camera": buildPattern([
    { midi: 74, duration: 0.028, gain: 0.008, type: "triangle" },
    { midi: 62, duration: 0.06, gain: 0.01, type: "sine", overlap: 0.48 },
  ]),
  "app-gallery": buildPattern([72, 79, 84], {
    duration: 0.06,
    gain: 0.014,
    type: "sine",
  }),
  "app-settings": buildPattern([60, 67, 72, 67], {
    duration: 0.042,
    gain: 0.01,
    type: "triangle",
    overlap: 0.62,
  }),
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

const getOutputNode = (context) => {
  if (!outputChain) {
    const lowpass = context.createBiquadFilter()
    lowpass.type = "lowpass"
    lowpass.frequency.value = 2400
    lowpass.Q.value = 0.2

    const compressor = context.createDynamicsCompressor()
    compressor.threshold.value = -24
    compressor.knee.value = 18
    compressor.ratio.value = 3
    compressor.attack.value = 0.003
    compressor.release.value = 0.18

    const masterGain = context.createGain()
    masterGain.gain.value = 1.18

    lowpass.connect(compressor)
    compressor.connect(masterGain)
    masterGain.connect(context.destination)

    outputChain = { lowpass, compressor, masterGain }
  }

  return outputChain.lowpass
}

const playTone = (
  context,
  startTime,
  {
    frequency,
    duration,
    gain,
    type = "sine",
    attack = 0.018,
    release = 0.045,
    shimmerGain = 0.16,
  },
) => {
  const oscillator = context.createOscillator()
  const shimmerOscillator = context.createOscillator()
  const gainNode = context.createGain()
  const shimmerGainNode = context.createGain()
  const outputNode = getOutputNode(context)

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, startTime)

  shimmerOscillator.type = "sine"
  shimmerOscillator.frequency.setValueAtTime(frequency * 2, startTime)

  gainNode.gain.setValueAtTime(0.0001, startTime)
  gainNode.gain.exponentialRampToValueAtTime(gain, startTime + attack)
  gainNode.gain.exponentialRampToValueAtTime(
    gain * 0.72,
    startTime + duration * 0.45,
  )
  gainNode.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + duration + release,
  )

  shimmerGainNode.gain.setValueAtTime(shimmerGain * 1.15, startTime)

  oscillator.connect(gainNode)
  shimmerOscillator.connect(shimmerGainNode)
  shimmerGainNode.connect(gainNode)
  gainNode.connect(outputNode)

  oscillator.start(startTime)
  shimmerOscillator.start(startTime)
  oscillator.stop(startTime + duration + release)
  shimmerOscillator.stop(startTime + duration + release)
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
    cursor += tone.duration * (tone.overlap ?? 0.72)
  })
}
