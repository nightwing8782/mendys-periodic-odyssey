import React, { useEffect } from 'react';
import { useRive } from '@rive-app/react-canvas';

export default function MendyRive({ state = 'idle' }) {
  const { rive, RiveComponent } = useRive({
    src: '/mendy.riv',
    stateMachines: 'MendyStateMachine',
    autoplay: true,
  });

  useEffect(() => {
    if (!rive) return;

    // Fetch inputs directly from state machine instance to bypass ESLint hook immutability checks
    const inputs = rive.stateMachineInputs('MendyStateMachine');
    if (!inputs) return;

    const isThinkingInput = inputs.find((i) => i.name === 'isThinking');
    const isCorrectInput = inputs.find((i) => i.name === 'isCorrect');
    const isIncorrectInput = inputs.find((i) => i.name === 'isIncorrect');

    // Reset values to avoid collision
    if (isThinkingInput) isThinkingInput.value = false;
    if (isCorrectInput) isCorrectInput.value = false;
    if (isIncorrectInput) isIncorrectInput.value = false;

    // Trigger state inputs in the Rive state machine
    if (state === 'thinking') {
      if (isThinkingInput) isThinkingInput.value = true;
    } else if (state === 'correct') {
      if (isCorrectInput) isCorrectInput.value = true;
    } else if (state === 'incorrect') {
      if (isIncorrectInput) isIncorrectInput.value = true;
    }
  }, [state, rive]);

  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center">
      <RiveComponent className="w-full h-full object-contain" />
    </div>
  );
}
