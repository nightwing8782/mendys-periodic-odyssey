// Dynamic Question Generator for Element Collection Gauntlet

function getPeriodAndGroup(num) {
  // Lanthanides
  if (num >= 57 && num <= 70) return { period: 6, group: num - 57 + 4, type: 'Lanthanide' };
  // Actinides
  if (num >= 89 && num <= 102) return { period: 7, group: num - 89 + 4, type: 'Actinide' };

  // Hardcode coordinates of standard elements
  const standardGrid = {
    1: { r: 1, c: 1 }, 2: { r: 1, c: 18 },
    3: { r: 2, c: 1 }, 4: { r: 2, c: 2 }, 5: { r: 2, c: 13 }, 6: { r: 2, c: 14 }, 7: { r: 2, c: 15 }, 8: { r: 2, c: 16 }, 9: { r: 2, c: 17 }, 10: { r: 2, c: 18 },
    11: { r: 3, c: 1 }, 12: { r: 3, c: 2 }, 13: { r: 3, c: 13 }, 14: { r: 3, c: 14 }, 15: { r: 3, c: 15 }, 16: { r: 3, c: 16 }, 17: { r: 3, c: 17 }, 18: { r: 3, c: 18 },
    19: { r: 4, c: 1 }, 20: { r: 4, c: 2 }, 21: { r: 4, c: 3 }, 22: { r: 4, c: 4 }, 23: { r: 4, c: 5 }, 24: { r: 4, c: 6 }, 25: { r: 4, c: 7 }, 26: { r: 4, c: 8 }, 27: { r: 4, c: 9 }, 28: { r: 4, c: 10 }, 29: { r: 4, c: 11 }, 30: { r: 4, c: 12 }, 31: { r: 4, c: 13 }, 32: { r: 4, c: 14 }, 33: { r: 4, c: 15 }, 34: { r: 4, c: 16 }, 35: { r: 4, c: 17 }, 36: { r: 4, c: 18 },
    37: { r: 5, c: 1 }, 38: { r: 5, c: 2 }, 39: { r: 5, c: 3 }, 40: { r: 5, c: 4 }, 41: { r: 5, c: 5 }, 42: { r: 5, c: 6 }, 43: { r: 5, c: 7 }, 44: { r: 5, c: 8 }, 45: { r: 5, c: 9 }, 46: { r: 5, c: 10 }, 47: { r: 5, c: 11 }, 48: { r: 5, c: 12 }, 49: { r: 5, c: 13 }, 50: { r: 5, c: 14 }, 51: { r: 5, c: 15 }, 52: { r: 5, c: 16 }, 53: { r: 5, c: 17 }, 54: { r: 5, c: 18 },
    55: { r: 6, c: 1 }, 56: { r: 6, c: 2 }, 71: { r: 6, c: 3 }, 72: { r: 6, c: 4 }, 73: { r: 6, c: 5 }, 74: { r: 6, c: 6 }, 75: { r: 6, c: 7 }, 76: { r: 6, c: 8 }, 77: { r: 6, c: 9 }, 78: { r: 6, c: 10 }, 79: { r: 6, c: 11 }, 80: { r: 6, c: 12 }, 81: { r: 6, c: 13 }, 82: { r: 6, c: 14 }, 83: { r: 6, c: 15 }, 84: { r: 6, c: 16 }, 85: { r: 6, c: 17 }, 86: { r: 6, c: 18 },
    87: { r: 7, c: 1 }, 88: { r: 7, c: 2 }, 103: { r: 7, c: 3 }, 104: { r: 7, c: 4 }, 105: { r: 7, c: 5 }, 106: { r: 7, c: 6 }, 107: { r: 7, c: 7 }, 108: { r: 7, c: 8 }, 109: { r: 7, c: 9 }, 110: { r: 7, c: 10 }, 111: { r: 7, c: 11 }, 112: { r: 7, c: 12 }, 113: { r: 7, c: 13 }, 114: { r: 7, c: 14 }, 115: { r: 7, c: 15 }, 116: { r: 7, c: 16 }, 117: { r: 7, c: 17 }, 118: { r: 7, c: 18 }
  };

  const coords = standardGrid[num];
  if (coords) return { period: coords.r, group: coords.c, type: 'Normal' };
  return { period: 1, group: 1, type: 'Normal' };
}

// Shuffles an array helper
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

// Check if a clue contains substrings that give away the element's name
function isClueGivingAwayAnswer(elementName, clue) {
  const cleanStr = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normClue = cleanStr(clue);
  const normName = cleanStr(elementName);

  if (normClue.includes(normName)) return true;

  // Check dynamic prefix overlap (e.g. Curie/Curium, Einstein/Einsteinium)
  const checkLen = Math.max(4, normName.length - 3);
  const prefix = normName.slice(0, checkLen);
  if (normClue.includes(prefix)) {
    return true;
  }

  return false;
}

export function generateQuestions(type, elements, collectedSet) {
  const uncollected = elements.filter(e => !collectedSet.has(e.symbol));
  const collected = elements.filter(e => collectedSet.has(e.symbol));

  const shuffledUncollected = shuffle(uncollected);
  const shuffledCollected = shuffle(collected);

  // Combine targets so we prioritize uncollected first, then fallback to collected
  const priorityPool = [...shuffledUncollected, ...shuffledCollected];

  const questions = [];

  if (type === 'MULTIPLE_CHOICE') {
    // Generate 10 questions
    const targets = priorityPool.slice(0, 10);
    targets.forEach(target => {
      // Pick a random clue that does not give away the answer
      const safeClues = target.clues.filter(c => !isClueGivingAwayAnswer(target.name, c));
      const clue = safeClues.length > 0 
        ? safeClues[Math.floor(Math.random() * safeClues.length)] 
        : target.clues[Math.floor(Math.random() * target.clues.length)];
      
      // Get 3 random incorrect options
      const incorrects = shuffle(elements.filter(e => e.symbol !== target.symbol))
        .slice(0, 3)
        .map(e => e.name);

      const options = shuffle([target.name, ...incorrects]);

      questions.push({
        type: 'MULTIPLE_CHOICE',
        element: target,
        clue: clue,
        options: options,
        answer: target.name,
        symbol: target.symbol
      });
    });
  } 
  
  else if (type === 'WEIGHT_COMPARISON') {
    // Generate 5 questions
    const targets = priorityPool.slice(0, 5);
    targets.forEach(target => {
      // Pick another element with a distinct mass (at least 1.5 units difference)
      const others = elements.filter(e => e.symbol !== target.symbol && Math.abs(parseFloat(e.mass) - parseFloat(target.mass)) > 1.5);
      const opponent = shuffle(others)[0] || elements.filter(e => e.symbol !== target.symbol)[0];

      // Randomly assign Card A and B
      const isTargetA = Math.random() < 0.5;
      const elA = isTargetA ? target : opponent;
      const elB = isTargetA ? opponent : target;

      const massA = parseFloat(elA.mass);
      const massB = parseFloat(elB.mass);
      const heavierSymbol = massA > massB ? elA.symbol : elB.symbol;
      const heavierElement = massA > massB ? elA : elB;

      questions.push({
        type: 'WEIGHT_COMPARISON',
        elementA: elA,
        elementB: elB,
        answer: heavierSymbol,
        element: heavierElement,
        symbol: heavierSymbol
      });
    });
  } 
  
  else if (type === 'NUCLEAR_SYNTHESIS') {
    // Generate 5 questions (A + B = C)
    // Filter pool to elements with atomic number Z >= 3, to make splitting meaningful
    const mathPool = priorityPool.filter(e => e.number >= 3);
    const targets = mathPool.slice(0, 5);

    targets.forEach(target => {
      const z = target.number;
      // Split z into x and y
      const x = Math.floor(Math.random() * (z - 2)) + 1;
      const y = z - x;

      const elA = elements.find(e => e.number === x);
      const elB = elements.find(e => e.number === y);

      // Get 3 incorrect choices
      const incorrects = shuffle(elements.filter(e => e.number !== z))
        .slice(0, 3)
        .map(e => e.name);

      const options = shuffle([target.name, ...incorrects]);

      questions.push({
        type: 'NUCLEAR_SYNTHESIS',
        elementA: elA,
        elementB: elB,
        elementC: target,
        options: options,
        answer: target.name,
        element: target,
        symbol: target.symbol
      });
    });
  } 
  
  else if (type === 'GRID_TAP') {
    // Generate 1 question
    const target = priorityPool[0];
    const { period, group, type: elType } = getPeriodAndGroup(target.number);

    const clues = [
      `Mendy scans a ${target.category} with atomic number ${target.number}. Tap its grid square!`,
      `Mendy requires a ${target.category} in Period ${period}, Group ${group}. Find and tap its square!`,
      `Mendy needs to synthesize a Period ${period} element with symbol "${target.symbol}". Tap its grid position!`
    ];
    if (elType === 'Lanthanide') {
      clues.push(`Locate the rare-earth ${target.category} in the Lanthanide series with symbol "${target.symbol}". Tap its grid position!`);
    } else if (elType === 'Actinide') {
      clues.push(`Locate the radioactive ${target.category} in the Actinide series with symbol "${target.symbol}". Tap its grid position!`);
    }
    const clue = clues[Math.floor(Math.random() * clues.length)];

    questions.push({
      type: 'GRID_TAP',
      element: target,
      clue: clue,
      answer: target.symbol,
      symbol: target.symbol
    });
  }
  
  else if (type === 'CLASSIC_TRIVIA') {
    // Generate 5 questions
    const targets = priorityPool.slice(0, 5);
    targets.forEach(target => {
      questions.push({
        type: 'CLASSIC_TRIVIA',
        element: target,
        answer: target.name,
        symbol: target.symbol
      });
    });
  }

  return questions;
}
