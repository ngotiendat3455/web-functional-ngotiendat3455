import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { pause, play, playbackState, currentSentenceIdx, currentWordRange, setCurrentSentenceIdx } = useSpeech(sentences);

  const handleFetchData = () => {
    fetchContent().then((response) => {
      try {
        const res = parseContentIntoSentences(response);
        setSentences(res);
        setCurrentSentenceIdx(0);
        // speechEngine.load(res[currentSentenceIdx]);
      } catch (error) {
        // handle exception
      }
    });
  }
  useEffect(() => {
    handleFetchData();
  }, [])
  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading currentWordRange={currentWordRange} sentences={sentences} currentSentenceIdx={currentSentenceIdx} />
      </div>
      <div>
        <Controls state={playbackState} play={play} pause={pause} loadNewContent={handleFetchData}/>
      </div>
    </div>
  );
}

export default App;
