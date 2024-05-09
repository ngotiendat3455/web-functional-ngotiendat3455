/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */

import { useMemo } from "react";


export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const dataWord = useMemo(() => {
    const currentSentence = sentences[currentSentenceIdx];
    if (!currentSentence || !currentWordRange || !currentWordRange?.[1]) {
      const parts = String(currentSentence)?.split("");
      return {
        currentSentence,
        currentWord: '',
        parts: parts
      }
    }
    const currentWord = currentSentence.slice(currentWordRange[0], currentWordRange[1])

    let start = currentWordRange[0];
    let end = currentWordRange[1];
    const target = [] as string[];
    for (let i = 0; i < currentSentence.length; i++) {
      if (i === start && i <= end) {
        target.push(currentSentence.slice(start, end));
      } 
       if (i < start || i >= end) {
        target.push(currentSentence.charAt(i));
      }
      
    }

    return {
      currentSentence,
      currentWord,
      parts: target,
    }
  }, [sentences, currentSentenceIdx, currentWordRange]);
  return <div data-testid="currently-reading">
    <p data-testid="current-sentence">
      {
        dataWord.parts.map((part: string) => (part.toLowerCase() === dataWord.currentWord?.toLowerCase() ? (
          <span
            data-testid="current-word"
            style={{
              color: '#e17055',
            }}
          // eslint-disable-next-line react/no-array-index-key
          >
            {part}
          </span>
        ) : part))
      }
    </p>
    {sentences.join(" ")}
  </div>;
};
