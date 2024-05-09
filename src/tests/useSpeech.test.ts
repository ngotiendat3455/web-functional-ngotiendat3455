import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import {
  act,
  renderHook,
} from '@testing-library/react';

import { useSpeech } from '../lib/useSpeech';
import { mockComponent } from 'react-dom/test-utils';

describe("useSpeech Test Suite", () => {
  beforeEach(() => {
    window.speechSynthesis = {
      getVoices: () => [
        { name: 'Voice 1', lang: 'en-US' },
        { name: 'Voice 2', lang: 'en-GB' }
      ]
    } as any;
  });
  it("should return current sentence idx and current word range as well as playback state", () => {
    const sentences = ["This is a sentence.", "This is another sentence."];
    const { result } = renderHook(() => useSpeech(sentences));
    expect(result.current.currentSentenceIdx).toBe(0);
    expect(result.current.currentWordRange).toEqual([0, 0]);
    expect(result.current.playbackState).toBe("paused");
  });
});
