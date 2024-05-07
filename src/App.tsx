import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWord, currentSentence, pause, play, playbackState, currentSentenceIdx } = useSpeech(sentences);


  useEffect(() => {
    fetchContent().then((response) => {
      try {
        const res = parseContentIntoSentences(response);
        setSentences(res);
      } catch (error) {
        // handle exception
      }
    });
  }, [])
  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading sentences={sentences} currentSentenceIdx={currentSentenceIdx} />
      </div>
      <div>
        <Controls state={playbackState} play={play} pause={pause} />
      </div>
    </div>
  );
}

export default App;
