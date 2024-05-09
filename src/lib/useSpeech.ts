import { useEffect, useState } from 'react';

import { PlayingState, SpeechEngine, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/

const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("initialized");
  const [speechEngine, setSpeechEngine] = useState<SpeechEngine>();
  
  const play = () => {
    speechEngine?.play();
  };
  const pause = () => { 
    speechEngine?.pause();
  };

  useEffect(() => {
    const loadSpeedEngine = () => {
      if (sentences[currentSentenceIdx]) {
        const engine = createSpeechEngine({
          onBoundary(e) {
            const {charIndex, charLength} = e;
            console.log('onBoundary event', e);
            setCurrentWordRange([charIndex, charIndex + charLength])
          },
          onEnd(e) {
            console.log('onEnd event', e);
            setCurrentSentenceIdx((index) => {
              const nextIndex = index + 1;
              if (nextIndex >= sentences.length) return 0;
              return nextIndex;
            })
            setCurrentWordRange([0, 0])
          },
          onStateUpdate: setPlaybackState,
        })
        engine.load(sentences[currentSentenceIdx])
        setSpeechEngine(engine);
        setPlaybackState('paused');
      }
    }
    loadSpeedEngine();
  }, [sentences, currentSentenceIdx]);
  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    speechEngine,
    setCurrentSentenceIdx,
  };
};

export { useSpeech };
