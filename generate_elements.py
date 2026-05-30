import json
import os

# Define the 118 elements with their metadata and 2 clues (Clue 1 and Clue 2)
# Tier 1: Round 1 (Most Common & Crucial) - 20 elements
# Tier 2: Round 2 (Common Industrial / Bio) - 20 elements
# Tier 3: Round 3 (Precious / Semiconductor / Heavy Common) - 20 elements
# Tier 4: Round 4 (Refractory / Lanthanides) - 20 elements
# Tier 5: Round 5 (Actinides / Heavy Radioactive) - 20 elements
# Tier 6: Round 6 (Superheavy Synthetic) - 18 elements

elements_data = [
  # --- TIER 1: ROUND 1 (20 Elements) ---
  {
    "number": 1, "mass": "1.008", "config": "1s1", "use": "Main fuel for stars and used in industrial hydrogenating of oils.", "symbol": "H", "name": "Hydrogen", "state": "gas", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "The most abundant chemical substance in the Universe, making up about 75% of all normal matter.",
      "Has the lowest density of all gases and its atomic number is 1."
    ]
  },
  {
    "number": 2, "mass": "4.0026", "config": "1s2", "use": "Used in cryogenic cooling of MRI machines and inflating balloons.", "symbol": "He", "name": "Helium", "state": "gas", "category": "noble gas", "tier": 1,
    "clues": [
      "Named after the Greek god of the Sun, Helios, where it was first detected in a solar spectrum.",
      "A colorless, odorless, tasteless noble gas that is completely non-reactive under normal conditions."
    ]
  },
  {
    "number": 3, "mass": "6.94", "config": "[He] 2s1", "use": "Commonly used in rechargeable lithium-ion batteries for electronics.", "symbol": "Li", "name": "Lithium", "state": "solid", "category": "alkali metal", "tier": 1,
    "clues": [
      "The lightest metal and the least dense solid element under standard conditions.",
      "It reacts vigorously with water, and is the first element in the alkali metal group."
    ]
  },
  {
    "number": 6, "mass": "12.011", "config": "[He] 2s2 2p2", "use": "Formative basis of organic chemistry and diamond/graphite structures.", "symbol": "C", "name": "Carbon", "state": "solid", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "Known for its tetravalency, it forms the chemical basis for all known organic life on Earth.",
      "It can exist as both one of the softest minerals (graphite) and one of the hardest materials (diamond)."
    ]
  },
  {
    "number": 7, "mass": "14.007", "config": "[He] 2s2 2p3", "use": "Used in liquid cooling systems and manufacturing synthetic fertilizers.", "symbol": "N", "name": "Nitrogen", "state": "gas", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "First discovered by Scottish physician Daniel Rutherford in 1772, who called it 'noxious air'.",
      "This gas makes up approximately 78% of the Earth's atmosphere."
    ]
  },
  {
    "number": 8, "mass": "15.999", "config": "[He] 2s2 2p4", "use": "Essential for cellular respiration and combustion processes.", "symbol": "O", "name": "Oxygen", "state": "gas", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "The third-most abundant element in the universe by mass, after hydrogen and helium, and highly reactive with metals.",
      "Makes up about 21% of Earth's atmosphere and is crucial for cellular respiration in most living organisms."
    ]
  },
  {
    "number": 11, "mass": "22.990", "config": "[Ne] 3s1", "use": "Combined with chlorine to create table salt and used in street lamp bulbs.", "symbol": "Na", "name": "Sodium", "state": "solid", "category": "alkali metal", "tier": 1,
    "clues": [
      "A soft, silvery-white alkali metal that is so soft it can be easily cut with a butter knife at room temperature.",
      "Combined with chlorine, it forms standard table salt."
    ]
  },
  {
    "number": 12, "mass": "24.305", "config": "[Ne] 3s2", "use": "Crucial central element in plant chlorophyll and lightweight alloys.", "symbol": "Mg", "name": "Magnesium", "state": "solid", "category": "alkaline earth metal", "tier": 1,
    "clues": [
      "A shiny grey alkaline earth metal that burns with an incredibly bright, blinding white light when ignited.",
      "It is a key component in chlorophyll, the molecule that plants use to absorb sunlight for photosynthesis."
    ]
  },
  {
    "number": 13, "mass": "26.982", "config": "[Ne] 3s2 3p1", "use": "Widely used in beverage cans, cooking foil, and aircraft construction.", "symbol": "Al", "name": "Aluminum", "state": "solid", "category": "post-transition metal", "tier": 1,
    "clues": [
      "The most abundant metal in the Earth's crust, though it is never found in its pure metallic form in nature.",
      "A silvery-white, lightweight post-transition metal that is highly resistant to corrosion."
    ]
  },
  {
    "number": 14, "mass": "28.085", "config": "[Ne] 3s2 3p2", "use": "The foundational semiconductor substrate for modern computer microchips.", "symbol": "Si", "name": "Silicon", "state": "solid", "category": "metalloid", "tier": 1,
    "clues": [
      "A hard, crystalline metalloid with a blue-grey metallic luster, forming about 28% of the Earth's crust.",
      "The main semiconductor material used to make computer microchips, transistors, and solar cells."
    ]
  },
  {
    "number": 15, "mass": "30.974", "config": "[Ne] 3s2 3p3", "use": "Essential component in match head strike strips and safety flare mixes.", "symbol": "P", "name": "Phosphorus", "state": "solid", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "First isolated in 1669 from human urine by an alchemist searching for the Philosopher's Stone.",
      "Exists in several colorful allotropes, the most common being white (highly toxic/flammable) and red."
    ]
  },
  {
    "number": 16, "mass": "32.06", "config": "[Ne] 3s2 3p4", "use": "Primary feedstock for sulfuric acid synthesis and vulcanizing rubber tires.", "symbol": "S", "name": "Sulfur", "state": "solid", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "Referred to in the Bible as 'brimstone', it is a bright yellow crystalline solid at room temperature.",
      "When burned or combined with hydrogen, it produces a notorious smell resembling rotten eggs."
    ]
  },
  {
    "number": 17, "mass": "35.45", "config": "[Ne] 3s2 3p5", "use": "Extensively used to sanitize public swimming pools and municipal drinking water.", "symbol": "Cl", "name": "Chlorine", "state": "gas", "category": "halogen", "tier": 1,
    "clues": [
      "A greenish-yellow halogen gas that was used as a chemical weapon in World War I due to its choking toxicity.",
      "A highly reactive element that is widely used to disinfect drinking water and swimming pools."
    ]
  },
  {
    "number": 19, "mass": "39.098", "config": "[Ar] 4s1", "use": "Crucial electrolyte for human muscle contraction, abundant in bananas.", "symbol": "K", "name": "Potassium", "state": "solid", "category": "alkali metal", "tier": 1,
    "clues": [
      "A silvery-white, extremely soft alkali metal named after potash, which is the English word for pot-ashes.",
      "An essential dietary nutrient abundant in bananas, potatoes, and leafy green vegetables."
    ]
  },
  {
    "number": 20, "mass": "40.078", "config": "[Ar] 4s2", "use": "The primary structural component in plaster, cement, and vertebrate bones.", "symbol": "Ca", "name": "Calcium", "state": "solid", "category": "alkaline earth metal", "tier": 1,
    "clues": [
      "An alkaline earth metal with atomic number 20, highly reactive and tarnishes to a dark oxide layer in air.",
      "Crucial for human health, it builds strong bones and teeth, and is found in abundance in milk and cheese."
    ]
  },
  {
    "number": 26, "mass": "55.845", "config": "[Ar] 3d6 4s2", "use": "The primary metallic constituent of structural steel and human hemoglobin.", "symbol": "Fe", "name": "Iron", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "By mass, it is the most common element on Earth, forming much of Earth's outer and inner core.",
      "Used to make steel, and is the key oxygen-carrying component in human blood (hemoglobin)."
    ]
  },
  {
    "number": 29, "mass": "63.546", "config": "[Ar] 3d10 4s1", "use": "The standard metal used for household electrical wiring due to high conductivity.", "symbol": "Cu", "name": "Copper", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "One of the few metals that can occur in nature in a directly usable metallic form, rather than needing extraction from ore.",
      "A reddish-gold transition metal famous for its exceptional electrical and thermal conductivity."
    ]
  },
  {
    "number": 30, "mass": "65.38", "config": "[Ar] 3d10 4s2", "use": "Coated onto steel in galvanization to act as a sacrificial anode against rust.", "symbol": "Zn", "name": "Zinc", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "A bluish-grey, lustrous transition metal that is commonly used to galvanize iron or steel to prevent rusting.",
      "It is combined with copper to create the alloy brass."
    ]
  },
  {
    "number": 47, "mass": "107.87", "config": "[Kr] 4d10 5s1", "use": "Has the highest electrical and thermal conductivity of any element.", "symbol": "Ag", "name": "Silver", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "Has the highest electrical conductivity, thermal conductivity, and reflectivity of any known metal.",
      "Its chemical symbol is derived from the Latin word 'argentum', which translates to shiny or white."
    ]
  },
  {
    "number": 79, "mass": "196.97", "config": "[Xe] 4f14 5d10 6s1", "use": "An unreactive precious metal used for currency, jewelry, and electronics.", "symbol": "Au", "name": "Gold", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "An incredibly ductile and malleable transition metal; a single gram can be beaten into a sheet of one square meter.",
      "Its chemical symbol is derived from the Latin word 'aurum', meaning 'shining dawn'."
    ]
  },

  # --- TIER 2: ROUND 2 (20 Elements) ---
  {
    "number": 4, "mass": "9.0122", "config": "[He] 2s2", "use": "Used in aerospace alloys and mirrors for the James Webb Space Telescope.", "symbol": "Be", "name": "Beryllium", "state": "solid", "category": "alkaline earth metal", "tier": 2,
    "clues": [
      "A relatively rare metal in the universe, often formed when cosmic rays crash into heavier nuclei in interstellar space.",
      "Its minerals can form beautiful gemstones such as emeralds and aquamarines."
    ]
  },
  {
    "number": 5, "mass": "10.81", "config": "[He] 2s2 2p1", "use": "Used to make heat-resistant borosilicate glass and agricultural fertilizers.", "symbol": "B", "name": "Boron", "state": "solid", "category": "metalloid", "tier": 2,
    "clues": [
      "A low-abundance metalloid produced entirely by cosmic ray spallation and supernovae, not stellar nucleosynthesis.",
      "Commonly used in borosilicate glass (Pyrex) to make it highly resistant to thermal shock."
    ]
  },
  {
    "number": 9, "mass": "18.998", "config": "[He] 2s2 2p5", "use": "Added to public drinking water systems and toothpaste to prevent dental cavities.", "symbol": "F", "name": "Fluorine", "state": "gas", "category": "halogen", "tier": 2,
    "clues": [
      "The most chemically reactive and electronegative of all elements; it reacts with almost all substances, even glass.",
      "Commonly added to tap water and toothpaste in small amounts to help prevent tooth decay."
    ]
  },
  {
    "number": 10, "mass": "20.180", "config": "[He] 2s2 2p6", "use": "Emits a brilliant orange-red glow in high-voltage vacuum tube lighting signs.", "symbol": "Ne", "name": "Neon", "state": "gas", "category": "noble gas", "tier": 2,
    "clues": [
      "Discovered in 1898, its name comes from the Greek word for 'new'. It is a noble gas with atomic number 10.",
      "It glows with a bright reddish-orange light when used in high-voltage electrical discharge signs."
    ]
  },
  {
    "number": 18, "mass": "39.948", "config": "[Ne] 3s2 3p6", "use": "Used as an inert shielding gas in double-pane thermal windows and welding.", "symbol": "Ar", "name": "Argon", "state": "gas", "category": "noble gas", "tier": 2,
    "clues": [
      "Its name is derived from the Greek word for 'lazy' or 'inactive', referring to its extreme chemical inertness.",
      "It is the third-most abundant gas in Earth's atmosphere, far beating carbon dioxide."
    ]
  },
  {
    "number": 22, "mass": "47.867", "config": "[Ar] 3d2 4s2", "use": "Used to make medical joint replacement implants due to its biocompatibility.", "symbol": "Ti", "name": "Titanium", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "Named after the Titans of Greek mythology due to its incredible strength-to-weight ratio.",
      "Highly resistant to corrosion in sea water and chlorine, and widely used for joint replacement implants."
    ]
  },
  {
    "number": 23, "mass": "50.942", "config": "[Ar] 3d3 4s2", "use": "Added to steel alloys for tools, axles, and military armor plating.", "symbol": "V", "name": "Vanadium", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "A hard, silvery-grey, ductile transition metal named after the Scandinavian goddess of beauty, Vanadis, due to its colorful chemical compounds.",
      "Mainly used as an alloy additive to strengthen steel for armor plate, axles, and tools."
    ]
  },
  {
    "number": 24, "mass": "51.996", "config": "[Ar] 3d5 4s1", "use": "Creates the protective corrosion-resistant passive layer in stainless steel.", "symbol": "Cr", "name": "Chromium", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "The main additive that makes steel 'stainless' by forming a passive oxide layer on the surface.",
      "Its compounds were widely used as pigments (giving school buses their yellow color) and it is used to plate shiny auto parts."
    ]
  },
  {
    "number": 25, "mass": "54.938", "config": "[Ar] 3d5 4s2", "use": "Used as a deoxidizer in industrial steel production and in dry cell batteries.", "symbol": "Mn", "name": "Manganese", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "A silvery-grey transition metal resembling iron, but much harder and very brittle.",
      "Essential for steel production, where it acts as a deoxidizing agent and alloy strengthener."
    ]
  },
  {
    "number": 27, "mass": "58.933", "config": "[Ar] 3d7 4s2", "use": "Formulates blue pigments in ceramics and is key in lithium-ion batteries.", "symbol": "Co", "name": "Cobalt", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "Its name comes from the German word for goblin ('Kobold'), as miners found its ores difficult and toxic to smelt.",
      "Famous for creating a rich, deep blue pigment used in ceramics and glass since ancient times."
    ]
  },
  {
    "number": 28, "mass": "58.693", "config": "[Ar] 3d8 4s2", "use": "Plated onto hardware to prevent rust and used in rechargeable battery chemistries.", "symbol": "Ni", "name": "Nickel", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "A silvery-white transition metal with a golden tinge. Ores were historically confused with copper by miners, who blamed 'Old Nick' (the devil).",
      "Commonly alloyed with copper to make coins, and is a major component in rechargeable lithium-ion battery cathodes."
    ]
  },
  {
    "number": 31, "mass": "69.723", "config": "[Ar] 3d10 4s2 4p1", "use": "Can melt in a human hand and is used in optoelectronic blue laser diodes.", "symbol": "Ga", "name": "Gallium", "state": "solid", "category": "post-transition metal", "tier": 2,
    "clues": [
      "Has an incredibly low melting point of 29.76 degrees Celsius, which is just below human body temperature.",
      "It will literally melt in the palm of your hand, turning from a solid metal into a liquid mirror."
    ]
  },
  {
    "number": 32, "mass": "72.630", "config": "[Ar] 3d10 4s2 4p2", "use": "Used in wide-angle camera lenses, fiber optics, and infrared night vision.", "symbol": "Ge", "name": "Germanium", "state": "solid", "category": "metalloid", "tier": 2,
    "clues": [
      "A lustrous, hard-brittle metalloid whose existence was predicted by Dmitri Mendeleev, who called it 'ekasilicon'.",
      "Crucial in early electronics, it was the material used to create the very first working transistor in 1947."
    ]
  },
  {
    "number": 33, "mass": "74.922", "config": "[Ar] 3d10 4s2 4p3", "use": "A historically notorious poison, now used as a dopant in semiconductors.", "symbol": "As", "name": "Arsenic", "state": "solid", "category": "metalloid", "tier": 2,
    "clues": [
      "Historically notorious as the 'King of Poisons' due to its potency and lack of color/odor when dissolved in food.",
      "A metalloid that occurs in many minerals, and was famously used in Victorian wallpaper pigments (Scheele's Green) which poisoned residents."
    ]
  },
  {
    "number": 34, "mass": "78.971", "config": "[Ar] 3d10 4s2 4p4", "use": "Used in photocopier drums and solar cells due to its light-reactive conductivity.", "symbol": "Se", "name": "Selenium", "state": "solid", "category": "reactive nonmetal", "tier": 2,
    "clues": [
      "Its electrical conductivity increases when light shines on it (photoconductivity), making it vital for early light meters.",
      "Essential in trace amounts for human health, but toxic in larger doses; named after Selene, the Greek goddess of the Moon."
    ]
  },
  {
    "number": 35, "mass": "79.904", "config": "[Ar] 3d10 4s2 4p5", "use": "Used in halogenated flame retardants and water treatment chemicals.", "symbol": "Br", "name": "Bromine", "state": "liquid", "category": "halogen", "tier": 2,
    "clues": [
      "One of only two elements on the periodic table that are liquid at room temperature and standard pressure.",
      "A heavy, volatile, reddish-brown halogen liquid that evaporates easily into a suffocating, metallic-smelling gas."
    ]
  },
  {
    "number": 36, "mass": "83.798", "config": "[Ar] 3d10 4s2 4p6", "use": "Fills energy-efficient fluorescent bulbs and high-speed photography flashes.", "symbol": "Kr", "name": "Krypton", "state": "gas", "category": "noble gas", "tier": 2,
    "clues": [
      "A noble gas discovered in 1898, whose name comes from the Greek word for 'hidden' or 'secret'.",
      "Used in high-speed photographic flashes, airport runway lights, and energy-efficient fluorescent bulbs."
    ]
  },
  {
    "number": 50, "mass": "118.71", "config": "[Kr] 4d10 5s2 5p2", "use": "Alloyed with copper to make bronze and used as plating to protect steel food cans.", "symbol": "Sn", "name": "Tin", "state": "solid", "category": "post-transition metal", "tier": 2,
    "clues": [
      "An ancient metal alloyed with copper since 3000 BC to create bronze, marking the start of a historical age.",
      "Highly resistant to corrosion, it was historically used to plate iron cans for food preservation (such metal containers were commonly named after it)."
    ]
  },
  {
    "number": 80, "mass": "200.59", "config": "[Xe] 4f14 5d10 6s2", "use": "The only metal that is liquid at room temperature, once used in thermometers.", "symbol": "Hg", "name": "Mercury", "state": "liquid", "category": "transition metal", "tier": 2,
    "clues": [
      "Often called 'quicksilver' because it is a liquid transition metal at room temperature.",
      "Its chemical symbol is derived from the Greek word 'hydrargyrum', meaning 'liquid silver'."
    ]
  },
  {
    "number": 82, "mass": "207.2", "config": "[Xe] 4f14 5d10 6s2 6p2", "use": "Acts as a heavy radiation shield in medical X-ray imaging rooms.", "symbol": "Pb", "name": "Lead", "state": "solid", "category": "post-transition metal", "tier": 2,
    "clues": [
      "A heavy, soft, malleable post-transition metal with a low melting point, highly resistant to corrosion.",
      "Used since ancient Roman times for plumbing, which later gave rise to the term 'plumber'."
    ]
  },

  # --- TIER 3: ROUND 3 (20 Elements) ---
  {
    "number": 37, "mass": "85.468", "config": "[Kr] 5s1", "use": "Utilized in vapor cell atomic clocks and purple firework formulas.", "symbol": "Rb", "name": "Rubidium", "state": "solid", "category": "alkali metal", "tier": 3,
    "clues": [
      "An extremely soft, silvery-white alkali metal that ignites spontaneously in air and reacts explosively with water.",
      "Its compounds give a bright violet-red color to fireworks, and it is used in high-precision atomic clocks."
    ]
  },
  {
    "number": 38, "mass": "87.62", "config": "[Kr] 5s2", "use": "Produces the intense crimson-red color in flares and fireworks.", "symbol": "Sr", "name": "Strontium", "state": "solid", "category": "alkaline earth metal", "tier": 3,
    "clues": [
      "A soft, silvery-yellow alkaline earth metal that is highly reactive and burns with a bright crimson red flame.",
      "Its salts are widely used in pyrotechnics to create deep red fireworks and emergency road flares."
    ]
  },
  {
    "number": 39, "mass": "88.906", "config": "[Kr] 4d1 5s2", "use": "Used to make red phosphors in old CRT screens and high-temperature superconductors.", "symbol": "Y", "name": "Yttrium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A silvery-metallic transition metal chemically similar to the lanthanides, named after a Swedish village quarry.",
      "Used as an additive to make red phosphors for old CRT television screens and in high-temperature superconductors."
    ]
  },
  {
    "number": 40, "mass": "91.224", "config": "[Kr] 4d2 5s2", "use": "Used as structural cladding for nuclear reactor rods due to low neutron absorption.", "symbol": "Zr", "name": "Zirconium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A lustrous, greyish-white, strong transition metal that is highly resistant to corrosion by acids and alkalis.",
      "Its oxide is synthesized to make fake diamonds (cubic zirconia) and it is used as cladding for nuclear fuel rods."
    ]
  },
  {
    "number": 41, "mass": "92.906", "config": "[Kr] 4d4 5s1", "use": "Alloyed in superalloys for jet engines and superconducting magnets in MRI units.", "symbol": "Nb", "name": "Niobium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "Originally named columbium, this transition metal is used as a superconductor and in jet engine superalloys.",
      "It becomes a superconductor at cryogenic temperatures, making it vital for MRI machine magnets."
    ]
  },
  {
    "number": 42, "mass": "95.95", "config": "[Kr] 4d5 5s1", "use": "Provides high-temperature strength in structural steel alloys and lubricants.", "symbol": "Mo", "name": "Molybdenum", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A refractory transition metal with an extremely high melting point of 2623 degrees Celsius.",
      "Often used in steel alloys to increase strength and heat resistance for engine parts and military armor."
    ]
  },
  {
    "number": 44, "mass": "101.07", "config": "[Kr] 4d7 5s1", "use": "Hardens platinum alloys for high-wear electrical contact pads.", "symbol": "Ru", "name": "Ruthenium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A rare transition metal of the platinum group, named after the Latin word for Russia.",
      "Mainly used as a catalyst, and to harden platinum and palladium for electrical contacts."
    ]
  },
  {
    "number": 45, "mass": "102.91", "config": "[Kr] 4d8 5s1", "use": "An extremely rare metal used to catalyze and reduce toxic vehicle exhausts.", "symbol": "Rh", "name": "Rhodium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "An extremely rare, silvery-white, corrosion-resistant transition metal in the platinum group.",
      "One of the most expensive metals in the world, primarily used in automotive catalytic converters to reduce toxic exhaust."
    ]
  },
  {
    "number": 46, "mass": "106.42", "config": "[Kr] 4d10", "use": "Absorbs up to 900 times its volume in hydrogen gas, vital for gas purifiers.", "symbol": "Pd", "name": "Palladium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A rare transition metal named after the asteroid Pallas (which was named after the Greek goddess of wisdom).",
      "Capable of absorbing up to 900 times its own volume of hydrogen gas at room temperature, making it key for hydrogen storage."
    ]
  },
  {
    "number": 48, "mass": "112.41", "config": "[Kr] 4d10 5s2", "use": "Used in control rods of nuclear reactors and plastic stabilizers.", "symbol": "Cd", "name": "Cadmium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A soft, bluish-white transition metal chemically similar to zinc, known to be highly toxic to human kidneys and bones.",
      "Historically used in corrosion-resistant electroplating and in rechargeable batteries alongside nickel."
    ]
  },
  {
    "number": 49, "mass": "114.82", "config": "[Kr] 4d10 5s2 5p1", "use": "Combined with tin oxide to make transparent touchscreen coatings for phones.", "symbol": "In", "name": "Indium", "state": "solid", "category": "post-transition metal", "tier": 3,
    "clues": [
      "An extremely soft post-transition metal that emits a high-pitched 'metal scream' when bent.",
      "Combined with tin oxide to make ITO, a transparent conductive coating used in all modern smartphone touchscreens."
    ]
  },
  {
    "number": 51, "mass": "121.76", "config": "[Kr] 4d10 5s2 5p3", "use": "Alloyed with lead to harden lead-acid batteries and used in flame retardants.", "symbol": "Sb", "name": "Antimony", "state": "solid", "category": "metalloid", "tier": 3,
    "clues": [
      "Its name comes from Greek words meaning 'a metal not found alone', and its historical Latin name stibium provides its modern chemical symbol.",
      "A lustrous grey metalloid primarily used as a flame retardant in plastics and in lead-acid batteries."
    ]
  },
  {
    "number": 52, "mass": "127.60", "config": "[Kr] 4d10 5s2 5p4", "use": "Used in solar panels, thermoelectric devices, and rewritable DVDs.", "symbol": "Te", "name": "Tellurium", "state": "solid", "category": "metalloid", "tier": 3,
    "clues": [
      "A rare, mildly toxic, silver-white metalloid chemically related to selenium and sulfur.",
      "Exposure to its compounds causes a pungent garlic-like breath odor that can last for weeks."
    ]
  },
  {
    "number": 53, "mass": "126.90", "config": "[Kr] 4d10 5s2 5p5", "use": "Used as a disinfectant antiseptic and added to table salt to prevent goiters.", "symbol": "I", "name": "Iodine", "state": "solid", "category": "halogen", "tier": 3,
    "clues": [
      "A dark, lustrous nonmetal solid that undergoes sublimation, turning directly from a solid to a beautiful purple gas when heated.",
      "Its name comes from the Greek word 'ioeides', which translates to 'violet-colored'."
    ]
  },
  {
    "number": 54, "mass": "131.29", "config": "[Kr] 4d10 5s2 5p6", "use": "Fills blue-tinted high-intensity discharge car headlights and ion thrusters.", "symbol": "Xe", "name": "Xenon", "state": "gas", "category": "noble gas", "tier": 3,
    "clues": [
      "A heavy, extremely rare noble gas found in Earth's atmosphere in trace amounts.",
      "Used in specialized high-intensity flash lamps, surgical lasers, and ion propulsion thrusters for spacecraft."
    ]
  },
  {
    "number": 55, "mass": "132.91", "config": "[Xe] 6s1", "use": "Its atomic vibration is the international standard definition for a single second.", "symbol": "Cs", "name": "Cesium", "state": "solid", "category": "alkali metal", "tier": 3,
    "clues": [
      "A gold-tinted, extremely soft alkali metal with a very low melting point of 28.4 degrees Celsius.",
      "The vibration of its atoms defines the official length of a single second in atomic clocks."
    ]
  },
  {
    "number": 56, "mass": "137.33", "config": "[Xe] 6s2", "use": "Swallowed as a contrast agent to visualize the gastrointestinal tract under X-rays.", "symbol": "Ba", "name": "Barium", "state": "solid", "category": "alkaline earth metal", "tier": 3,
    "clues": [
      "A soft, silvery alkaline earth metal that oxidizes rapidly in air and must be stored under petroleum.",
      "Its sulfate compound is swallowed by patients as a contrast agent for X-ray imaging of the digestive tract."
    ]
  },
  {
    "number": 72, "mass": "178.49", "config": "[Xe] 4f14 5d2 6s2", "use": "Acts as a nuclear reactor neutron absorber in control rods.", "symbol": "Hf", "name": "Hafnium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A lustrous, silvery-grey transition metal named after the Latin name for Copenhagen (Hafnia).",
      "Has a high capacity to absorb neutrons, making it excellent for reactor control rods in nuclear submarines."
    ]
  },
  {
    "number": 73, "mass": "180.95", "config": "[Xe] 4f14 5d3 6s2", "use": "Made into highly compact electrical capacitors for modern smartphones.", "symbol": "Ta", "name": "Tantalum", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A highly corrosion-resistant refractory metal named after the Greek mythological figure Tantalus due to its resistance to acids.",
      "Extensively used in micro-capacitors for compact mobile electronics like smartphones and pacemakers."
    ]
  },
  {
    "number": 74, "mass": "183.84", "config": "[Xe] 4f14 5d4 6s2", "use": "Has the highest melting point of all metals, once used in bulb filaments.", "symbol": "W", "name": "Tungsten", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "Has the highest melting point of all discovered metals (3422 degrees Celsius) and is extremely dense.",
      "Its chemical symbol is derived from wolframite, and it was famously used as filaments in incandescent light bulbs."
    ]
  },

  # --- TIER 4: ROUND 4 (20 Elements) ---
  {
    "number": 75, "mass": "186.21", "config": "[Xe] 4f14 5d5 6s2", "use": "Alloyed in nickel superalloys for jet engine turbine blades.", "symbol": "Re", "name": "Rhenium", "state": "solid", "category": "transition metal", "tier": 4,
    "clues": [
      "A silvery-white, heavy transition metal of Group 7, named after the River Rhine.",
      "One of the rarest elements in the Earth's crust, used in nickel-based superalloys for jet engine combustion chambers."
    ]
  },
  {
    "number": 76, "mass": "190.23", "config": "[Xe] 4f14 5d6 6s2", "use": "The densest naturally occurring element, used for high-wear pen tips.", "symbol": "Os", "name": "Osmium", "state": "solid", "category": "transition metal", "tier": 4,
    "clues": [
      "The densest naturally occurring element, twice as dense as lead and slightly denser than iridium.",
      "Its name comes from the Greek word for 'smell' due to the chlorine-like odor of its volatile and toxic tetroxide."
    ]
  },
  {
    "number": 77, "mass": "192.22", "config": "[Xe] 4f14 5d7 6s2", "use": "An asteroid marker in Earth's crust, used for high-temperature spark plugs.", "symbol": "Ir", "name": "Iridium", "state": "solid", "category": "transition metal", "tier": 4,
    "clues": [
      "The second-densest element, famous for being highly concentrated in a clay layer marking the dinosaur-extinction asteroid impact.",
      "The most corrosion-resistant metal known, named after Iris, the Greek goddess of the rainbow, due to the colorful nature of its salts."
    ]
  },
  {
    "number": 78, "mass": "195.08", "config": "[Xe] 4f14 5d9 6s1", "use": "Used as an active catalyst in laboratory crucibles and auto exhaust systems.", "symbol": "Pt", "name": "Platinum", "state": "solid", "category": "transition metal", "tier": 4,
    "clues": [
      "A heavy, precious transition metal whose name comes from the Spanish term platina, meaning 'little silver'.",
      "Highly unreactive, it is widely used in high-end jewelry, laboratory crucibles, and catalytic converters."
    ]
  },
  {
    "number": 81, "mass": "204.38", "config": "[Xe] 4f14 5d10 6s2 6p1", "use": "Used in specialized high-index glass lenses and infrared optical sensors.", "symbol": "Tl", "name": "Thallium", "state": "solid", "category": "post-transition metal", "tier": 4,
    "clues": [
      "A soft, malleable post-transition metal that oxidizes rapidly in air, looking like lead.",
      "Historically popular as a weapon in murder mysteries because it is odorless, tasteless, and slowly mimics other diseases."
    ]
  },
  {
    "number": 83, "mass": "208.98", "config": "[Xe] 4f14 5d10 6s2 6p3", "use": "The active non-toxic ingredient in pink antacid stomach relief medications.", "symbol": "Bi", "name": "Bismuth", "state": "solid", "category": "post-transition metal", "tier": 4,
    "clues": [
      "A brittle post-transition metal that forms spectacular, colorful iridescent oxide crystals in step-like hopper formations.",
      "Surprisingly non-toxic despite its heavy weight, it is the active ingredient in pink stomach remedies like Pepto-Bismol."
    ]
  },
  {
    "number": 84, "mass": "209", "config": "[Xe] 4f14 5d10 6s2 6p4", "use": "A highly radioactive alpha particle emitter used in space probe heaters.", "symbol": "Po", "name": "Polonium", "state": "solid", "category": "post-transition metal", "tier": 4,
    "clues": [
      "A highly radioactive metal discovered by Marie and Pierre Curie in 1898, named in honor of Marie's homeland.",
      "An intense alpha emitter, it was famously used to poison former Soviet agent Alexander Litvinenko in London in 2006."
    ]
  },
  {
    "number": 57, "mass": "138.91", "config": "[Xe] 5d1 6s2", "use": "Fills carbon arc studio lights and serves in nickel-metal hydride batteries.", "symbol": "La", "name": "Lanthanum", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The prototype element of the lanthanide series, whose name comes from the Greek word 'to lie hidden'.",
      "Used in carbon arc lighting for studio lights and in hybrid car nickel-metal hydride batteries."
    ]
  },
  {
    "number": 58, "mass": "140.12", "config": "[Xe] 4f1 5d1 6s2", "use": "Used as a glass polishing compound and as the flint spark-maker in lighters.", "symbol": "Ce", "name": "Cerium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The most abundant of the rare-earth metals, named after the dwarf planet Ceres.",
      "Alloyed with iron to make flint blocks that spark when scratched, used in pocket lighters."
    ]
  },
  {
    "number": 59, "mass": "140.91", "config": "[Xe] 4f3 6s2", "use": "Doped in glass for welder goggles to filter out intense yellow flare light.", "symbol": "Pr", "name": "Praseodymium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A soft, silvery rare-earth metal whose name means 'green twin' due to the green coloration of its salts.",
      "Alloyed with neodymium to create high-strength magnets and used in specialized didymium glass for welder goggles."
    ]
  },
  {
    "number": 60, "mass": "144.24", "config": "[Xe] 4f4 6s2", "use": "Alloyed to make the strongest permanent magnets for wind turbines and motors.", "symbol": "Nd", "name": "Neodymium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A rare-earth metal that forms the strongest known type of permanent magnets when alloyed with iron and boron.",
      "Its magnets are critical in wind turbine generators, electric car motors, and audio speakers."
    ]
  },
  {
    "number": 61, "mass": "145", "config": "[Xe] 4f5 6s2", "use": "A synthetic radioactive isotope used in miniature nuclear batteries.", "symbol": "Pm", "name": "Promethium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The only lanthanide element that is radioactive with no stable isotopes; all of it decays quickly.",
      "Named after Prometheus, who stole fire from the gods, it is used in atomic batteries and luminous paint."
    ]
  },
  {
    "number": 62, "mass": "150.36", "config": "[Xe] 4f6 6s2", "use": "Used in specialized magnets that remain magnetic at extremely high temperatures.", "symbol": "Sm", "name": "Samarium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A moderately hard rare-earth metal that is relatively stable in air, named after a Russian mine official.",
      "Alloyed with cobalt to make magnets that retain their magnetic fields at incredibly high temperatures."
    ]
  },
  {
    "number": 63, "mass": "151.96", "config": "[Xe] 4f7 6s2", "use": "Serves as the red phosphor in LED displays and inside anti-counterfeit banknote inks.", "symbol": "Eu", "name": "Europium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The most chemically reactive of all rare-earth metals, named after a continent.",
      "Its compounds are used as red phosphors in television screens and as anti-counterfeiting glowing ink on Euro banknotes."
    ]
  },
  {
    "number": 64, "mass": "157.25", "config": "[Xe] 4f7 5d1 6s2", "use": "Injected as a heavy metal contrast agent for MRI scans.", "symbol": "Gd", "name": "Gadolinium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A rare-earth metal with unusual magnetic properties, becoming ferromagnetic just below room temperature.",
      "Its complexes are intravenously injected as a contrast medium for magnetic resonance imaging scans."
    ]
  },
  {
    "number": 65, "mass": "158.93", "config": "[Xe] 4f9 6s2", "use": "Serves as the green phosphor in fluorescent lighting and color displays.", "symbol": "Tb", "name": "Terbium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A silvery-white, malleable rare-earth metal named after the Swedish quarry Ytterby.",
      "Used in solid-state devices and as a green phosphor in trichromatic lighting tubes."
    ]
  },
  {
    "number": 67, "mass": "164.93", "config": "[Xe] 4f11 6s2", "use": "Has the highest magnetic concentration capability, used in pole pieces.", "symbol": "Ho", "name": "Holmium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A rare-earth metal named after the Latin name for Stockholm (Holmia), discovered in 1878.",
      "Has the highest magnetic moment of any element, making it useful in pole pieces for high-field magnets."
    ]
  },
  {
    "number": 68, "mass": "167.26", "config": "[Xe] 4f12 6s2", "use": "Doped into optical fiber amplifiers to boost long-distance internet signals.", "symbol": "Er", "name": "Erbium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A silvery rare-earth metal that is chemically stable in air, named after the village Ytterby.",
      "Its ions are used to dope optical fibers to amplify signals in long-distance internet lines."
    ]
  },
  {
    "number": 69, "mass": "168.93", "config": "[Xe] 4f13 6s2", "use": "Utilized as a radiation emitter source in portable dental X-ray machines.", "symbol": "Tm", "name": "Thulium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The second-least abundant of all naturally occurring rare-earth metals, named after Thule (a mythical northern land).",
      "Used as a radiation source in portable medical X-ray machines."
    ]
  },
  {
    "number": 70, "mass": "173.05", "config": "[Xe] 4f14 6s2", "use": "Utilized in fiber laser cutters and high-precision optical clocks.", "symbol": "Yb", "name": "Ytterbium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The last element discovered at the Ytterby quarry in Sweden, which yielded four element names.",
      "Used as a dopant in fiber laser amplifiers and in high-precision atomic clocks."
    ]
  },

  # --- TIER 5: ROUND 5 (20 Elements) ---
  {
    "number": 66, "mass": "162.50", "config": "[Xe] 4f10 6s2", "use": "Added to high-power magnets to prevent them from demagnetizing under load.", "symbol": "Dy", "name": "Dysprosium", "state": "solid", "category": "lanthanide", "tier": 5,
    "clues": [
      "A rare-earth metal whose name comes from the Greek word meaning 'hard to get'.",
      "Added to neodymium-iron-boron magnets to increase their resistance to demagnetization under high temperatures."
    ]
  },
  {
    "number": 71, "mass": "174.97", "config": "[Xe] 4f14 5d1 6s2", "use": "Mainly used as a catalyst in petroleum cracking and in cancer therapies.", "symbol": "Lu", "name": "Lutetium", "state": "solid", "category": "lanthanide", "tier": 5,
    "clues": [
      "The heaviest and hardest of all the rare-earth metals, named after the Roman name for Paris.",
      "Has few commercial uses due to its rarity and high cost, but is used in petroleum refining catalysts."
    ]
  },
  {
    "number": 85, "mass": "210", "config": "[Xe] 4f14 5d10 6s2 6p5", "use": "The rarest element in Earth's crust, researched for targeted alpha cancer therapy.", "symbol": "At", "name": "Astatine", "state": "solid", "category": "halogen", "tier": 5,
    "clues": [
      "The rarest naturally occurring element on Earth, with less than 30 grams existing in the crust at any moment.",
      "A highly radioactive halogen that decays rapidly; named after the Greek word for 'unstable'."
    ]
  },
  {
    "number": 86, "mass": "222", "config": "[Xe] 4f14 5d10 6s2 6p6", "use": "A naturally occurring radioactive gas that is a major indoor health hazard.", "symbol": "Rn", "name": "Radon", "state": "gas", "category": "noble gas", "tier": 5,
    "clues": [
      "A colorless, odorless radioactive noble gas that seeps out of the ground from the decay of natural uranium in soil.",
      "A major indoor air hazard, it is the second-leading cause of lung cancer globally after smoking."
    ]
  },
  {
    "number": 87, "mass": "223", "config": "[Rn] 7s1", "use": "An extremely short-lived radioactive alkali metal studied in scientific research.", "symbol": "Fr", "name": "Francium", "state": "solid", "category": "alkali metal", "tier": 5,
    "clues": [
      "The second-rarest naturally occurring element, whose isotopes have a maximum half-life of only 22 minutes.",
      "An extremely radioactive alkali metal that is synthesized in particle accelerators to study its atomic structure."
    ]
  },
  {
    "number": 88, "mass": "226", "config": "[Rn] 7s2", "use": "Historically painted on watch dials to make them glow in the dark.", "symbol": "Ra", "name": "Radium", "state": "solid", "category": "alkaline earth metal", "tier": 5,
    "clues": [
      "Discovered by Marie and Pierre Curie, this alkaline earth metal glows with a faint blue light in the dark.",
      "Historically used in self-luminous watch dials, exposing factory dial-painters to lethal radiation."
    ]
  },
  {
    "number": 89, "mass": "227", "config": "[Rn] 6d1 7s2", "use": "Used as a powerful source of neutrons in industrial laboratories.", "symbol": "Ac", "name": "Actinium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "The prototype element of the actinide series, named after the Greek word for 'ray' due to its high radioactivity.",
      "About 150 times more radioactive than radium, making it useful as a neutron source."
    ]
  },
  {
    "number": 90, "mass": "232.04", "config": "[Rn] 6d2 7s2", "use": "Studied as a safer, more abundant alternative fuel for nuclear power reactors.", "symbol": "Th", "name": "Thorium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A naturally occurring, weakly radioactive metal named after Thor, the Norse god of thunder.",
      "Under consideration as a safer, more abundant alternative fuel to uranium in nuclear power reactors."
    ]
  },
  {
    "number": 91, "mass": "231.04", "config": "[Rn] 5f2 6d1 7s2", "use": "One of the rarest radioactive actinides, currently has no commercial uses.", "symbol": "Pa", "name": "Protactinium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A dense, silvery-grey actinide metal that is highly radioactive and toxic, forming a precursor to actinium.",
      "One of the rarest and most expensive naturally occurring elements, found in pitchblende."
    ]
  },
  {
    "number": 92, "mass": "238.03", "config": "[Rn] 5f3 6d1 7s2", "use": "Its isotopes serve as the core fuel for civilian nuclear power plants.", "symbol": "U", "name": "Uranium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A heavy actinide element named after the planet Uranus, discovered in 1789.",
      "Its isotope 235 is the primary fuel used to power commercial nuclear reactors and atomic weapons."
    ]
  },
  {
    "number": 93, "mass": "237", "config": "[Rn] 5f4 6d1 7s2", "use": "The first synthetic transuranic element, used in neutron detection gear.", "symbol": "Np", "name": "Neptunium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "The first synthetic transuranic element, named after the planet Neptune as it lies beyond uranium.",
      "Created by bombarding uranium with neutrons, it is a silvery metal that tarnishes in air."
    ]
  },
  {
    "number": 94, "mass": "244", "config": "[Rn] 5f6 7s2", "use": "Serves as nuclear fuel in reactor cores and deep-space thermal batteries.", "symbol": "Pu", "name": "Plutonium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic actinide metal named after the planet Pluto, first synthesized in 1940.",
      "Famous as the fissile fuel used in the 'Fat Man' atomic bomb dropped on Nagasaki in World War II."
    ]
  },
  {
    "number": 95, "mass": "243", "config": "[Rn] 5f7 7s2", "use": "Fills the ionization chamber inside common household smoke detector units.", "symbol": "Am", "name": "Americium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic actinide element named after the Americas, first synthesized in 1944.",
      "Its isotope 241 is widely used inside household ionization smoke detectors."
    ]
  },
  {
    "number": 96, "mass": "247", "config": "[Rn] 5f7 6d1 7s2", "use": "Used as an alpha emitter source for X-ray spectrometers on Mars rovers.", "symbol": "Cm", "name": "Curium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic radioactive metal named in honor of Marie and Pierre Curie.",
      "Produced by bombarding plutonium with alpha particles, it glows purple in the dark due to its high radioactivity."
    ]
  },
  {
    "number": 97, "mass": "247", "config": "[Rn] 5f9 7s2", "use": "A synthetic metal primarily used as a target to manufacture heavier elements.", "symbol": "Bk", "name": "Berkelium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic actinide element named after the city of Berkeley, California, where it was discovered in 1949.",
      "Mainly used as a target to synthesize heavier elements, such as tennessine."
    ]
  },
  {
    "number": 98, "mass": "251", "config": "[Rn] 5f10 7s2", "use": "A highly active neutron emitter used to boot up commercial nuclear reactors.", "symbol": "Cf", "name": "Californium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic actinide named in honor of the university and state where it was created in 1950.",
      "An extremely strong neutron emitter, used to start up nuclear reactors and detect water in soils."
    ]
  },
  {
    "number": 99, "mass": "252", "config": "[Rn] 5f11 7s2", "use": "Discovered in the radioactive fallout of the first thermonuclear test.", "symbol": "Es", "name": "Einsteinium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic element discovered in the debris of the first thermonuclear bomb explosion (Ivy Mike) in 1952.",
      "Named in honor of Albert Einstein, it is a highly radioactive metallic actinide."
    ]
  },
  {
    "number": 100, "mass": "257", "config": "[Rn] 5f12 7s2", "use": "The heaviest element that can be formed by bombarding lighter elements.", "symbol": "Fm", "name": "Fermium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "Discovered alongside einsteinium in the fallout of the first hydrogen bomb test in 1952.",
      "The heaviest element that can be formed by neutron bombardment of lighter elements."
    ]
  },
  {
    "number": 101, "mass": "258", "config": "[Rn] 5f13 7s2", "use": "Named after Mendeleev, created by bombarding einsteinium with alpha rays.", "symbol": "Md", "name": "Mendelevium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic radioactive element named in honor of Dmitri Mendeleev, the father of the periodic table.",
      "First synthesized in 1955 by bombarding einsteinium with alpha particles."
    ]
  },
  {
    "number": 102, "mass": "259", "config": "[Rn] 5f14 7s2", "use": "First synthesized in a cyclotron, named after Alfred Nobel.", "symbol": "No", "name": "Nobelium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic radioactive metal named in honor of Alfred Nobel, the inventor of dynamite.",
      "It can only be produced in particle accelerators by bombarding lighter elements like curium with carbon ions."
    ]
  },

  # --- TIER 6: ROUND 6 (18 Elements) ---
  {
    "number": 103, "mass": "266", "config": "[Rn] 5f14 7s2 7p1", "use": "The final element of the actinide series, named after Ernest Lawrence.", "symbol": "Lr", "name": "Lawrencium", "state": "solid", "category": "actinide", "tier": 6,
    "clues": [
      "A synthetic element named in honor of Ernest Lawrence, inventor of the cyclotron particle accelerator.",
      "The final element of the actinide series, first synthesized in Berkeley, California in 1961."
    ]
  },
  {
    "number": 104, "mass": "267", "config": "[Rn] 5f14 6d2 7s2", "use": "A synthetic transactinide element with a half-life of a few seconds.", "symbol": "Rf", "name": "Rutherfordium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic transition metal named in honor of Ernest Rutherford, the father of nuclear physics.",
      "The first transactinide element, with a half-life of only a few seconds or minutes."
    ]
  },
  {
    "number": 105, "mass": "268", "config": "[Rn] 5f14 6d3 7s2", "use": "A synthetic metal created in laboratories, named after Dubna, Russia.", "symbol": "Db", "name": "Dubnium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "Named after Dubna, a Russian town where the Joint Institute for Nuclear Research is located.",
      "A highly radioactive synthetic metal that does not exist in nature."
    ]
  },
  {
    "number": 106, "mass": "269", "config": "[Rn] 5f14 6d4 7s2", "use": "Named after Glenn Seaborg, the first element named for a living person.", "symbol": "Sg", "name": "Seaborgium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "The first chemical element named after a living person (Glenn T. Seaborg) at the time of naming.",
      "First synthesized in 1974, it is a highly unstable synthetic metal."
    ]
  },
  {
    "number": 107, "mass": "270", "config": "[Rn] 5f14 6d5 7s2", "use": "Named after Niels Bohr, created by bombarding bismuth with chromium.", "symbol": "Bh", "name": "Bohrium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic transition metal named in honor of Danish physicist Niels Bohr.",
      "Synthesized by bombarding bismuth with chromium ions, its most stable isotope has a half-life of 61 seconds."
    ]
  },
  {
    "number": 108, "mass": "277", "config": "[Rn] 5f14 6d6 7s2", "use": "Named after the German state of Hesse, has extremely brief half-lives.", "symbol": "Hs", "name": "Hassium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic element named after the German state of Hesse, where it was first created in Darmstadt.",
      "Its tetroxide compound is predicted to be volatile, similar to osmium."
    ]
  },
  {
    "number": 109, "mass": "278", "config": "[Rn] 5f14 6d7 7s2", "use": "Named after physicist Lise Meitner, co-discoverer of nuclear fission.", "symbol": "Mt", "name": "Meitnerium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic element named in honor of Austrian physicist Lise Meitner, co-discoverer of nuclear fission.",
      "Extremely unstable, first synthesized in Germany in 1982."
    ]
  },
  {
    "number": 110, "mass": "281", "config": "[Rn] 5f14 6d8 7s2", "use": "First synthesized in Darmstadt, Germany; decays within seconds.", "symbol": "Ds", "name": "Darmstadtium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic superheavy metal named after the German city where it was first synthesized in 1994.",
      "Its most stable isotope has a half-life of only about 10 seconds."
    ]
  },
  {
    "number": 111, "mass": "282", "config": "[Rn] 5f14 6d9 7s2", "use": "Named after Roentgen, discoverer of X-rays; belongs to the copper group.", "symbol": "Rg", "name": "Roentgenium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic element named in honor of Wilhelm Conrad Roentgen, discoverer of X-rays.",
      "Belongs to group 11, placing it in the same column as copper, silver, and gold."
    ]
  },
  {
    "number": 112, "mass": "285", "config": "[Rn] 5f14 6d10 7s2", "use": "Named after astronomer Copernicus; behaves like a volatile noble gas.", "symbol": "Cn", "name": "Copernicium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic transition metal named in honor of astronomer Nicolaus Copernicus.",
      "Predicted to be a volatile liquid at room temperature due to relativistic effects, behaving like a noble gas."
    ]
  },
  {
    "number": 113, "mass": "286", "config": "[Rn] 5f14 6d10 7s2 7p1", "use": "The first element discovered in Asia, named after the Japanese word Nihon.", "symbol": "Nh", "name": "Nihonium", "state": "solid", "category": "post-transition metal", "tier": 6,
    "clues": [
      "The first element discovered and named by scientists in Asia, derived from the Japanese name for Japan.",
      "First synthesized in 2004 by bombarding bismuth with zinc."
    ]
  },
  {
    "number": 114, "mass": "289", "config": "[Rn] 5f14 6d10 7s2 7p2", "use": "Named after Flerov Laboratory; resides near the theoretical island of stability.", "symbol": "Fl", "name": "Flerovium", "state": "solid", "category": "post-transition metal", "tier": 6,
    "clues": [
      "A synthetic superheavy metal named after the Flerov Laboratory of Nuclear Reactions in Russia.",
      "Predicted to have closed nuclear shells, placing it near the theoretical 'island of stability'."
    ]
  },
  {
    "number": 115, "mass": "290", "config": "[Rn] 5f14 6d10 7s2 7p3", "use": "A highly unstable synthetic element, named in honor of Moscow, Russia.", "symbol": "Mc", "name": "Moscovium", "state": "solid", "category": "post-transition metal", "tier": 6,
    "clues": [
      "A synthetic element named in honor of the Moscow Oblast region in Russia where it was created.",
      "Extremely radioactive, decaying by alpha emission within fractions of a second."
    ]
  },
  {
    "number": 116, "mass": "293", "config": "[Rn] 5f14 6d10 7s2 7p4", "use": "Named after Lawrence Livermore Laboratory, decays in milliseconds.", "symbol": "Lv", "name": "Livermorium", "state": "solid", "category": "post-transition metal", "tier": 6,
    "clues": [
      "Named in honor of the Lawrence Livermore National Laboratory in California, which helped discover it.",
      "A highly radioactive synthetic element with only a few atoms ever produced."
    ]
  },
  {
    "number": 117, "mass": "294", "config": "[Rn] 5f14 6d10 7s2 7p5", "use": "Resides in the halogen column, named in honor of the state of Tennessee.", "symbol": "Ts", "name": "Tennessine", "state": "solid", "category": "halogen", "tier": 6,
    "clues": [
      "The second-heaviest element ever created, named after the US state of Tennessee due to its nuclear research contributions.",
      "Classified as a halogen, though relativistic effects may make it behave more like a post-transition metal."
    ]
  },
  {
    "number": 118, "mass": "294", "config": "[Rn] 5f14 6d10 7s2 7p6", "use": "The heaviest element discovered, completing the 7th row of the table.", "symbol": "Og", "name": "Oganesson", "state": "solid", "category": "noble gas", "tier": 6,
    "clues": [
      "The heaviest element on the periodic table, named in honor of Russian nuclear physicist Yuri Oganessian.",
      "The only element named after a living person today, it completes the 7th period of the table."
    ]
  },
  {
    "number": 21, "mass": "44.956", "config": "[Ar] 3d1 4s2", "use": "Alloyed with aluminum to construct high-performance bicycle frames and aerospace parts.", "symbol": "Sc", "name": "Scandium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A silvery-white metallic transition metal historically classified as a rare-earth element, named after Scandinavia.",
      "Mainly used in high-strength aluminum alloys for aerospace parts and high-end bicycle frames."
    ]
  },
  {
    "number": 43, "mass": "97.91", "config": "[Kr] 4d5 5s2", "use": "A radioactive isotope used as a medical diagnostic tracer in body imaging.", "symbol": "Tc", "name": "Technetium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "The lightest chemical element that has no stable isotopes; all of its forms are radioactive.",
      "First element to be artificially synthesized in a laboratory in 1937, named after the Greek word for 'artificial'."
    ]
  }
]

# Write JS file
js_content = """export const elements = """ + json.dumps(elements_data, indent=2) + ";\n"

# Replace double backslashes that might happen in formatting, though dumps with ascii should be clean
with open('src/data/elements.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("SUCCESS: 118 elements written to elements.js")
