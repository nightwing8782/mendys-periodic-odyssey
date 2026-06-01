import { useState, useCallback, useMemo } from 'react';
import { elements } from '../data/elements';
import { generateQuestions } from '../utils/questionGenerator';

export default function useTriviaEngine() {
  const [gameState, setGameState] = useState('intro'); // 'intro' | 'MODE_SELECTION' | 'PLAYING' | 'ROUND_CLEAR' | 'victory'
  const [collectedElements, setCollectedElements] = useState([]); // Array of symbols
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [currentRoundType, setCurrentRoundType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastPlayedType, setLastPlayedType] = useState(null);
  const [roundCollected, setRoundCollected] = useState([]); // Symbols collected in current round
  const [choices, setChoices] = useState([]);

  // Generate 2 random choices excluding lastPlayedType
  const generateChoices = useCallback((lastType) => {
    const modes = ['MULTIPLE_CHOICE', 'WEIGHT_COMPARISON', 'NUCLEAR_SYNTHESIS', 'GRID_TAP'];
    const available = modes.filter(m => m !== lastType);
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setRound(1);
    setCollectedElements([]);
    setLastPlayedType(null);
    setRoundCollected([]);
    const initialChoices = generateChoices(null);
    setChoices(initialChoices);
    setGameState('MODE_SELECTION');
  }, [generateChoices]);

  const selectMode = useCallback((mode) => {
    setCurrentRoundType(mode);
    const collectedSet = new Set(collectedElements);
    const generated = generateQuestions(mode, elements, collectedSet);
    setQuestions(generated);
    setCurrentIndex(0);
    setRoundCollected([]);
    setGameState('PLAYING');
  }, [collectedElements]);

  const submitAnswer = useCallback((isCorrect, symbol, points) => {
    if (isCorrect && symbol) {
      setScore(prev => prev + points);
      setCollectedElements(prev => {
        if (prev.includes(symbol)) return prev;
        return [...prev, symbol];
      });
      setRoundCollected(prev => {
        if (prev.includes(symbol)) return prev;
        return [...prev, symbol];
      });
    }
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Round completed!
      const finalCollectedSet = new Set(collectedElements);
      // Wait, since collectedElements state update is batched, we should calculate the total count
      // taking into account if any new elements were collected in this round.
      // But actually, checking the size of finalCollectedSet (which has the updated collected elements) is easiest.
      // Let's compute the unique count:
      const uniqueCount = finalCollectedSet.size;

      if (uniqueCount >= 118) {
        setGameState('victory');
      } else {
        setLastPlayedType(currentRoundType);
        setRound(prev => prev + 1);
        setGameState('ROUND_CLEAR');
      }
    }
  }, [currentIndex, questions.length, collectedElements, currentRoundType]);

  const advanceRound = useCallback(() => {
    const nextChoices = generateChoices(currentRoundType);
    setChoices(nextChoices);
    setGameState('MODE_SELECTION');
  }, [generateChoices, currentRoundType]);

  const resetGame = useCallback(() => {
    setGameState('intro');
    setCollectedElements([]);
    setScore(0);
    setRound(1);
    setCurrentRoundType(null);
    setQuestions([]);
    setCurrentIndex(0);
    setLastPlayedType(null);
    setRoundCollected([]);
    setChoices([]);
  }, []);

  const collectedSet = useMemo(() => new Set(collectedElements), [collectedElements]);

  return {
    gameState,
    collectedElements,
    collectedSet,
    score,
    round,
    currentRoundType,
    questions,
    currentIndex,
    lastPlayedType,
    roundCollected,
    choices,
    startGame,
    selectMode,
    submitAnswer,
    nextQuestion,
    advanceRound,
    resetGame
  };
}
