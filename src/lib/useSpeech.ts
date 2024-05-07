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
  //const [speechEngine, setSpeechEngine] = useState<SpeechEngine>();
  const [playbackState, setPlaybackState] = useState<PlayingState>("initialized");
  const engine = createSpeechEngine({
    onStateUpdate: setPlaybackState,
    onEnd(e) {
        
    },
    onBoundary(e) {
        
    },
  })
  
  const play = () => {
    engine.load(sentences[currentSentenceIdx])
  };
  const pause = () => {};

  // useEffect (() => {
  //   const {} = createSpeechEngine({
  //     onStateUpdate: setPlaybackState,
  //     onEnd(e) {
          
  //     },
  //     onBoundary(e) {
          
  //     },
  //   })
  // }, [])
  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
