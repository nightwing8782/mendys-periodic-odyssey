import re
from generate_elements import elements_data

leaks = []
# Common English words that are also element symbols (case-insensitive)
COMMON_WORDS = {'as', 'in', 'at', 'be', 'he', 'no', 'am', 're', 'i', 'o', 'c', 'h', 'p', 's', 'w', 'y', 'u', 'v', 'f', 'la', 'co', 'go', 'do', 'so', 'by', 'my', 'or', 'an', 'if', 'it', 'me', 'us', 'we'}

for e in elements_data:
    name = e['name'].lower()
    symbol = e['symbol'].lower()
    
    for i, clue in enumerate(e['clues']):
        clue_lower = clue.lower()
        
        # Check for name leak
        if name in clue_lower:
            leaks.append((e['number'], e['name'], f"Clue {i+1}", f"Contains name: '{name}' in '{clue}'"))
            
        # Check for symbol leak with word boundaries
        pattern = r'\b' + re.escape(symbol) + r'\b'
        match = re.search(pattern, clue_lower)
        if match:
            # If symbol is a common English word, double check if it might be an actual leak
            if symbol in COMMON_WORDS:
                # We still report it for manual review but flag it
                leaks.append((e['number'], e['name'], f"Clue {i+1}", f"[POSSIBLE SF/WP] Contains symbol: '{symbol}' in '{clue}'"))
            else:
                leaks.append((e['number'], e['name'], f"Clue {i+1}", f"Contains symbol: '{symbol}' in '{clue}'"))

print(f"FOUND {len(leaks)} LEAKS/POSSIBLES:")
for num, name, clue_name, msg in leaks:
    print(f"Element {num} ({name}) {clue_name}: {msg}")
