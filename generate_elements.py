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
      "Produced in the first fraction of a second after the Big Bang, representing the genesis of all baryonic matter.",
      "Has the lowest density of all gases and its atomic number is 1.",
      "It is the simplest possible atom, consisting of just a single proton and a single electron in its neutral state."
    ]
  },
  {
    "number": 2, "mass": "4.0026", "config": "1s2", "use": "Used in cryogenic cooling of MRI machines and inflating balloons.", "symbol": "He", "name": "Helium", "state": "gas", "category": "noble gas", "tier": 1,
    "clues": [
      "Named after the Greek god of the Sun, Helios, where it was first detected in a solar spectrum.",
      "Although extremely common in stars, it is rare on Earth and is harvested as a byproduct of natural gas extraction.",
      "A colorless, odorless, tasteless noble gas that is completely non-reactive under normal conditions.",
      "It is the first member of the noble gas group and does not freeze under normal pressures, even at absolute zero."
    ]
  },
  {
    "number": 3, "mass": "6.94", "config": "[He] 2s1", "use": "Commonly used in rechargeable lithium-ion batteries for electronics.", "symbol": "Li", "name": "Lithium", "state": "solid", "category": "alkali metal", "tier": 1,
    "clues": [
      "The lightest metal and the least dense solid element under standard conditions.",
      "In medicine, its carbonate salt is a classic mood stabilizer used to treat bipolar disorder.",
      "It reacts vigorously with water, and is the first element in the alkali metal group.",
      "This alkali metal is so light it floats on oil, and is the first element in the s-block of Period 2."
    ]
  },
  {
    "number": 6, "mass": "12.011", "config": "[He] 2s2 2p2", "use": "Formative basis of organic chemistry and diamond/graphite structures.", "symbol": "C", "name": "Carbon", "state": "solid", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "Known for its tetravalency, it forms the chemical basis for all known organic life on Earth.",
      "The radioactive isotope 14 is widely used by archaeologists to date organic materials up to 50,000 years old.",
      "It can exist as both one of the softest minerals (graphite) and one of the hardest materials (diamond).",
      "Forms a vital dioxide gas when combined with oxygen and is the main component of coal and charcoal."
    ]
  },
  {
    "number": 7, "mass": "14.007", "config": "[He] 2s2 2p3", "use": "Used in liquid cooling systems and manufacturing synthetic fertilizers.", "symbol": "N", "name": "Nitrogen", "state": "gas", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "First discovered by Scottish physician Daniel Rutherford in 1772, who called it 'noxious air'.",
      "Its compound with hydrogen is ammonia, synthesized industrially via the Haber-Bosch process to feed billions.",
      "This gas makes up approximately 78% of the Earth's atmosphere.",
      "Liquid form of this gas boils at -196 degrees Celsius and is used to flash-freeze food and remove warts."
    ]
  },
  {
    "number": 8, "mass": "15.999", "config": "[He] 2s2 2p4", "use": "Essential for cellular respiration and combustion processes.", "symbol": "O", "name": "Oxygen", "state": "gas", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "The third-most abundant element in the universe by mass, after hydrogen and helium, and highly reactive with metals.",
      "A highly reactive allotrope of this element, consisting of three atoms, forms a high-altitude shield filtering UV rays.",
      "Makes up about 21% of Earth's atmosphere and is crucial for cellular respiration in most living organisms.",
      "This gas makes up the water molecule alongside hydrogen and is the active agent in combustion and rusting."
    ]
  },
  {
    "number": 11, "mass": "22.990", "config": "[Ne] 3s1", "use": "Combined with chlorine to create table salt and used in street lamp bulbs.", "symbol": "Na", "name": "Sodium", "state": "solid", "category": "alkali metal", "tier": 1,
    "clues": [
      "A soft, silvery-white alkali metal that is so soft it can be easily cut with a butter knife at room temperature.",
      "It burns with an intense, characteristic bright yellow light in a flame test.",
      "Combined with chlorine, it forms standard table salt.",
      "A soft alkali metal that reacts violently with water and is stored under mineral oil."
    ]
  },
  {
    "number": 12, "mass": "24.305", "config": "[Ne] 3s2", "use": "Crucial central element in plant chlorophyll and lightweight alloys.", "symbol": "Mg", "name": "Magnesium", "state": "solid", "category": "alkaline earth metal", "tier": 1,
    "clues": [
      "A shiny grey alkaline earth metal that burns with an incredibly bright, blinding white light when ignited.",
      "Its oxide has an incredibly high melting point, making it a key refractory lining for steel furnaces.",
      "It is a key component in chlorophyll, the molecule that plants use to absorb sunlight for photosynthesis.",
      "This alkaline earth metal is used in Epsom salts and causes a blinding white glare when ignited."
    ]
  },
  {
    "number": 13, "mass": "26.982", "config": "[Ne] 3s2 3p1", "use": "Widely used in beverage cans, cooking foil, and aircraft construction.", "symbol": "Al", "name": "Aluminum", "state": "solid", "category": "post-transition metal", "tier": 1,
    "clues": [
      "The most abundant metal in the Earth's crust, though it is never found in its pure metallic form in nature.",
      "Historically, it was once more valuable than gold or silver, and the Washington Monument was capped with it in 1884.",
      "A silvery-white, lightweight post-transition metal that is highly resistant to corrosion.",
      "A lightweight, recyclable metal that does not rust because it forms a self-protecting oxide skin."
    ]
  },
  {
    "number": 14, "mass": "28.085", "config": "[Ne] 3s2 3p2", "use": "The foundational semiconductor substrate for modern computer microchips.", "symbol": "Si", "name": "Silicon", "state": "solid", "category": "metalloid", "tier": 1,
    "clues": [
      "A hard, crystalline metalloid with a blue-grey metallic luster, forming about 28% of the Earth's crust.",
      "It forms the primary constituent of common sand, quartz, and quartz-crystal oscillators.",
      "The main semiconductor material used to make computer microchips, transistors, and solar cells.",
      "A metalloid in Group 14, widely utilized as the semiconductor substrate in computer electronics."
    ]
  },
  {
    "number": 15, "mass": "30.974", "config": "[Ne] 3s2 3p3", "use": "Essential component in match head strike strips and safety flare mixes.", "symbol": "P", "name": "Phosphorus", "state": "solid", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "First isolated in 1669 from human urine by an alchemist searching for the Philosopher's Stone.",
      "It is a key component in the DNA sugar-phosphate backbone and ATP energy transport molecules in all cells.",
      "Exists in several colorful allotropes, the most common being white (highly toxic/flammable) and red.",
      "This nonmetal exists as a soft, waxy white solid that glows in the dark and ignites spontaneously in air."
    ]
  },
  {
    "number": 16, "mass": "32.06", "config": "[Ne] 3s2 3p4", "use": "Primary feedstock for sulfuric acid synthesis and vulcanizing rubber tires.", "symbol": "S", "name": "Sulfur", "state": "solid", "category": "reactive nonmetal", "tier": 1,
    "clues": [
      "Referred to in the Bible as 'brimstone', it is a bright yellow crystalline solid at room temperature.",
      "Its acid is the world's most produced chemical, used as a barometer of a nation's industrial strength.",
      "When burned or combined with hydrogen, it produces a notorious smell resembling rotten eggs.",
      "A bright yellow nonmetal solid that burns with a blue flame and is used to vulcanize rubber."
    ]
  },
  {
    "number": 17, "mass": "35.45", "config": "[Ne] 3s2 3p5", "use": "Extensively used to sanitize public swimming pools and municipal drinking water.", "symbol": "Cl", "name": "Chlorine", "state": "gas", "category": "halogen", "tier": 1,
    "clues": [
      "A greenish-yellow halogen gas that was used as a chemical weapon in World War I due to its choking toxicity.",
      "Combined with sodium, it forms the saline electrolyte of animal blood and extracellular fluids.",
      "A highly reactive element that is widely used to disinfect drinking water and swimming pools.",
      "A choking, greenish-yellow halogen gas famous for its bleach-like disinfecting power."
    ]
  },
  {
    "number": 19, "mass": "39.098", "config": "[Ar] 4s1", "use": "Crucial electrolyte for human muscle contraction, abundant in bananas.", "symbol": "K", "name": "Potassium", "state": "solid", "category": "alkali metal", "tier": 1,
    "clues": [
      "A silvery-white, extremely soft alkali metal named after potash, which is the English word for pot-ashes.",
      "Its superoxide compound is used in space suits and submarines to absorb carbon dioxide and release oxygen.",
      "An essential dietary nutrient abundant in bananas, potatoes, and leafy green vegetables.",
      "An alkali metal in Period 4, abundant in bananas and crucial for nerve signal transmission."
    ]
  },
  {
    "number": 20, "mass": "40.078", "config": "[Ar] 4s2", "use": "The primary structural component in plaster, cement, and vertebrate bones.", "symbol": "Ca", "name": "Calcium", "state": "solid", "category": "alkaline earth metal", "tier": 1,
    "clues": [
      "An alkaline earth metal with atomic number 20, highly reactive and tarnishes to a dark oxide layer in air.",
      "Its carbonate forms chalk, limestone, marble, and the shells of marine organisms like clams and corals.",
      "Crucial for human health, it builds strong bones and teeth, and is found in abundance in milk and cheese.",
      "An alkaline earth metal with atomic number 20, essential for healthy bone density and dental strength."
    ]
  },
  {
    "number": 26, "mass": "55.845", "config": "[Ar] 3d6 4s2", "use": "The primary metallic constituent of structural steel and human hemoglobin.", "symbol": "Fe", "name": "Iron", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "By mass, it is the most common element on Earth, forming much of Earth's outer and inner core.",
      "This metal is the final element produced by stellar nucleosynthesis before a supernova collapse.",
      "Used to make steel, and is the key oxygen-carrying component in human blood (hemoglobin).",
      "A transition metal in Group 8 that forms rust in moist air and is the main component of Earth's core."
    ]
  },
  {
    "number": 29, "mass": "63.546", "config": "[Ar] 3d10 4s1", "use": "The standard metal used for household electrical wiring due to high conductivity.", "symbol": "Cu", "name": "Copper", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "One of the few metals that can occur in nature in a directly usable metallic form, rather than needing extraction from ore.",
      "Along with gold, it is one of only two non-silvery colored metals on the periodic table.",
      "A reddish-gold transition metal famous for its exceptional electrical and thermal conductivity.",
      "A transition metal in Group 11, widely used for plumbing pipes, electrical wires, and cooking pots."
    ]
  },
  {
    "number": 30, "mass": "65.38", "config": "[Ar] 3d10 4s2", "use": "Coated onto steel in galvanization to act as a sacrificial anode against rust.", "symbol": "Zn", "name": "Zinc", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "A bluish-grey, lustrous transition metal that is commonly used to galvanize iron or steel to prevent rusting.",
      "Its oxide is a common white pigment in sunscreens, valued for absorbing ultraviolet radiation.",
      "It is combined with copper to create the alloy brass.",
      "A transition metal with atomic number 30, alloyed with copper to produce brass and used to galvanize iron."
    ]
  },
  {
    "number": 47, "mass": "107.87", "config": "[Kr] 4d10 5s1", "use": "Has the highest electrical and thermal conductivity of any element.", "symbol": "Ag", "name": "Silver", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "Has the highest electrical conductivity, thermal conductivity, and reflectivity of any known metal.",
      "In photography, its halide salts are the key light-sensitive crystals used to capture film images.",
      "Its chemical symbol is derived from the Latin word 'argentum', which translates to shiny or white.",
      "A transition metal in Group 11, famous for having the highest electrical and thermal conductivity of all metals."
    ]
  },
  {
    "number": 79, "mass": "196.97", "config": "[Xe] 4f14 5d10 6s1", "use": "An unreactive precious metal used for currency, jewelry, and electronics.", "symbol": "Au", "name": "Gold", "state": "solid", "category": "transition metal", "tier": 1,
    "clues": [
      "An incredibly ductile and malleable transition metal; a single gram can be beaten into a sheet of one square meter.",
      "It is so chemically unreactive that it does not oxidize in air or dissolve in standard acids, but dissolves in aqua regia.",
      "Its chemical symbol is derived from the Latin word 'aurum', meaning 'shining dawn'.",
      "A precious transition metal in Group 11, famous for its yellow luster and for being the most malleable element."
    ]
  },

  # --- TIER 2: ROUND 2 (20 Elements) ---
  {
    "number": 4, "mass": "9.0122", "config": "[He] 2s2", "use": "Used in aerospace alloys and mirrors for the James Webb Space Telescope.", "symbol": "Be", "name": "Beryllium", "state": "solid", "category": "alkaline earth metal", "tier": 2,
    "clues": [
      "A relatively rare metal in the universe, often formed when cosmic rays crash into heavier nuclei in interstellar space.",
      "Ores of this metal are highly toxic to humans, causing a chronic, incurable scarring lung disease if dust is inhaled.",
      "Its minerals can form beautiful gemstones such as emeralds and aquamarines.",
      "An alkaline earth metal with atomic number 4, valued for its high thermal conductivity and structural stiffness."
    ]
  },
  {
    "number": 5, "mass": "10.81", "config": "[He] 2s2 2p1", "use": "Used to make heat-resistant borosilicate glass and agricultural fertilizers.", "symbol": "B", "name": "Boron", "state": "solid", "category": "metalloid", "tier": 2,
    "clues": [
      "A low-abundance metalloid produced entirely by cosmic ray spallation and supernovae, not stellar nucleosynthesis.",
      "Its hydride compounds are famous for forming unusual multi-center bonding rings that challenged standard Lewis rules.",
      "Commonly used in borosilicate glass (Pyrex) to make it highly resistant to thermal shock.",
      "Used in eye drops, laundry detergents, and as control rods in nuclear reactors under the name borax."
    ]
  },
  {
    "number": 9, "mass": "18.998", "config": "[He] 2s2 2p5", "use": "Added to public drinking water systems and toothpaste to prevent dental cavities.", "symbol": "F", "name": "Fluorine", "state": "gas", "category": "halogen", "tier": 2,
    "clues": [
      "The most chemically reactive and electronegative of all elements; it reacts with almost all substances, even glass.",
      "It is so reactive that it can ignite water, producing oxygen gas and hydrofluoric acid.",
      "Commonly added to tap water and toothpaste in small amounts to help prevent tooth decay.",
      "A pale yellow halogen gas that is the most reactive nonmetal on the periodic table."
    ]
  },
  {
    "number": 10, "mass": "20.180", "config": "[He] 2s2 2p6", "use": "Emits a brilliant orange-red glow in high-voltage vacuum tube lighting signs.", "symbol": "Ne", "name": "Neon", "state": "gas", "category": "noble gas", "tier": 2,
    "clues": [
      "Discovered in 1898, its name comes from the Greek word for 'new'. It is a noble gas with atomic number 10.",
      "It was discovered by freezing air until it liquefied, then evaporating it to capture the volatile fraction.",
      "It glows with a bright reddish-orange light when used in high-voltage electrical discharge signs.",
      "A noble gas with atomic number 10, famous for its intense reddish-orange glowing signs."
    ]
  },
  {
    "number": 18, "mass": "39.948", "config": "[Ne] 3s2 3p6", "use": "Used as an inert shielding gas in double-pane thermal windows and welding.", "symbol": "Ar", "name": "Argon", "state": "gas", "category": "noble gas", "tier": 2,
    "clues": [
      "Its name is derived from the Greek word for 'lazy' or 'inactive', referring to its extreme chemical inertness.",
      "Its radioactive isotope 40, formed from potassium decay, is a standard tool for dating ancient volcanic rocks.",
      "It is the third-most abundant gas in Earth's atmosphere, far beating carbon dioxide.",
      "The most common noble gas in Earth's atmosphere, representing about 0.93% of air."
    ]
  },
  {
    "number": 22, "mass": "47.867", "config": "[Ar] 3d2 4s2", "use": "Used to make medical joint replacement implants due to its biocompatibility.", "symbol": "Ti", "name": "Titanium", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "Named after the Titans of Greek mythology due to its incredible strength-to-weight ratio.",
      "The mineral rutile is a major source of this metal, which is refined into a brilliant white dioxide pigment.",
      "Highly resistant to corrosion in sea water and chlorine, and widely used for joint replacement implants.",
      "Highly valued for its resistance to corrosion by sea water, chlorine, and acids, and widely used in aircraft."
    ]
  },
  {
    "number": 23, "mass": "50.942", "config": "[Ar] 3d3 4s2", "use": "Added to steel alloys for tools, axles, and military armor plating.", "symbol": "V", "name": "Vanadium", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "A hard, silvery-grey, ductile transition metal named after the Scandinavian goddess of beauty, Vanadis, due to its colorful chemical compounds.",
      "First discovered in Mexico in 1801 by Andres Manuel del Rio, who called it erythronium due to its red salts.",
      "Mainly used as an alloy additive to strengthen steel for armor plate, axles, and tools.",
      "A Group 5 transition metal used primarily as a steel additive to increase hardness and fatigue resistance."
    ]
  },
  {
    "number": 24, "mass": "51.996", "config": "[Ar] 3d5 4s1", "use": "Creates the protective corrosion-resistant passive layer in stainless steel.", "symbol": "Cr", "name": "Chromium", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "The main additive that makes steel 'stainless' by forming a passive oxide layer on the surface.",
      "It was discovered in 1797 by Louis Nicolas Vauquelin, who named it from the Greek word for 'color'.",
      "Its compounds were widely used as pigments (giving school buses their yellow color) and it is used to plate shiny auto parts.",
      "A shiny, hard transition metal with atomic number 24, used to plate steel parts and in emerald mineral lattices."
    ]
  },
  {
    "number": 25, "mass": "54.938", "config": "[Ar] 3d5 4s2", "use": "Used as a deoxidizer in industrial steel production and in dry cell batteries.", "symbol": "Mn", "name": "Manganese", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "A silvery-grey transition metal resembling iron, but much harder and very brittle.",
      "It is a key cofactor in the oxygen-evolving complex of photosystem II, which plants use to split water.",
      "Essential for steel production, where it acts as a deoxidizing agent and alloy strengthener.",
      "A transition metal with atomic number 25, used to strengthen iron alloys and inside alkaline battery anodes."
    ]
  },
  {
    "number": 27, "mass": "58.933", "config": "[Ar] 3d7 4s2", "use": "Formulates blue pigments in ceramics and is key in lithium-ion batteries.", "symbol": "Co", "name": "Cobalt", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "Its name comes from the German word for goblin ('Kobold'), as miners found its ores difficult and toxic to smelt.",
      "A radioactive isotope of this element, 60, is a common gamma emitter used in industrial radiography and radiation therapy.",
      "Famous for creating a rich, deep blue pigment used in ceramics and glass since ancient times.",
      "A transition metal in Group 9, Period 4, used to manufacture high-strength superalloys and lithium batteries."
    ]
  },
  {
    "number": 28, "mass": "58.693", "config": "[Ar] 3d8 4s2", "use": "Plated onto hardware to prevent rust and used in rechargeable battery chemistries.", "symbol": "Ni", "name": "Nickel", "state": "solid", "category": "transition metal", "tier": 2,
    "clues": [
      "A silvery-white transition metal with a golden tinge. Ores were historically confused with copper by miners, who blamed 'Old Nick' (the devil).",
      "It is a major component of metallic meteorites, which are alloyed with iron to form kamacite.",
      "Commonly alloyed with copper to make coins, and is a major component in rechargeable lithium-ion battery cathodes.",
      "A lustrous, silvery transition metal widely used to coin currency and inside rechargeable batteries."
    ]
  },
  {
    "number": 31, "mass": "69.723", "config": "[Ar] 3d10 4s2 4p1", "use": "Can melt in a human hand and is used in optoelectronic blue laser diodes.", "symbol": "Ga", "name": "Gallium", "state": "solid", "category": "post-transition metal", "tier": 2,
    "clues": [
      "Has an incredibly low melting point of 29.76 degrees Celsius, which is just below human body temperature.",
      "Discovered in 1875 by Paul-Emile Lecoq de Boisbaudran, who named it in honor of France (Gallia).",
      "It will literally melt in the palm of your hand, turning from a solid metal into a liquid mirror.",
      "A post-transition metal in Group 13, famous for its low melting point of 29.76 degrees Celsius."
    ]
  },
  {
    "number": 32, "mass": "72.630", "config": "[Ar] 3d10 4s2 4p2", "use": "Used in wide-angle camera lenses, fiber optics, and infrared night vision.", "symbol": "Ge", "name": "Germanium", "state": "solid", "category": "metalloid", "tier": 2,
    "clues": [
      "A lustrous, hard-brittle metalloid whose existence was predicted by Dmitri Mendeleev, who called it 'ekasilicon'.",
      "Its existence was predicted in 1869 by Mendeleev, who called it 'ekasilicon' based on its periodic position.",
      "Crucial in early electronics, it was the material used to create the very first working transistor in 1947.",
      "A lustrous, grey-white metalloid in Group 14, crucial for manufacturing infrared optics and fiber optics."
    ]
  },
  {
    "number": 33, "mass": "74.922", "config": "[Ar] 3d10 4s2 4p3", "use": "A historically notorious poison, now used as a dopant in semiconductors.", "symbol": "As", "name": "Arsenic", "state": "solid", "category": "metalloid", "tier": 2,
    "clues": [
      "Historically notorious as the 'King of Poisons' due to its potency and lack of color/odor when dissolved in food.",
      "In groundwater, it is a major toxic contaminant causing blackfoot disease in affected regions.",
      "A metalloid that occurs in many minerals, and was famously used in Victorian wallpaper pigments (Scheele's Green) which poisoned residents.",
      "A metalloid with atomic number 33, historically used as a pesticide, wood preservative, and poison."
    ]
  },
  {
    "number": 34, "mass": "78.971", "config": "[Ar] 3d10 4s2 4p4", "use": "Used in photocopier drums and solar cells due to its light-reactive conductivity.", "symbol": "Se", "name": "Selenium", "state": "solid", "category": "reactive nonmetal", "tier": 2,
    "clues": [
      "Its electrical conductivity increases when light shines on it (photoconductivity), making it vital for early light meters.",
      "It is the active photoreceptive material in specialized copier drums used inside early office photocopiers.",
      "Essential in trace amounts for human health, but toxic in larger doses; named after Selene, the Greek goddess of the Moon.",
      "A reactive nonmetal in Group 16, essential in trace amounts for thyroid function and cell health."
    ]
  },
  {
    "number": 35, "mass": "79.904", "config": "[Ar] 3d10 4s2 4p5", "use": "Used in halogenated flame retardants and water treatment chemicals.", "symbol": "Br", "name": "Bromine", "state": "liquid", "category": "halogen", "tier": 2,
    "clues": [
      "One of only two elements on the periodic table that are liquid at room temperature and standard pressure.",
      "Discovered in 1826 by Antoine Jerome Balard, who isolated it from salt marsh waters.",
      "A heavy, volatile, reddish-brown halogen liquid that evaporates easily into a suffocating, metallic-smelling gas.",
      "A heavy, volatile, reddish-brown halogen liquid at room temperature that emits a sharp, choking vapor."
    ]
  },
  {
    "number": 36, "mass": "83.798", "config": "[Ar] 3d10 4s2 4p6", "use": "Fills energy-efficient fluorescent bulbs and high-speed photography flashes.", "symbol": "Kr", "name": "Krypton", "state": "gas", "category": "noble gas", "tier": 2,
    "clues": [
      "A noble gas discovered in 1898, whose name comes from the Greek word for 'hidden' or 'secret'.",
      "It was discovered in 1898 by William Ramsay and Morris Travers in the residue of liquid air distillation.",
      "Used in high-speed photographic flashes, airport runway lights, and energy-efficient fluorescent bulbs.",
      "A noble gas with atomic number 36, used in high-efficiency double-pane window insulation and flash lamps."
    ]
  },
  {
    "number": 50, "mass": "118.71", "config": "[Kr] 4d10 5s2 5p2", "use": "Alloyed with copper to make bronze and used as plating to protect steel food cans.", "symbol": "Sn", "name": "Tin", "state": "solid", "category": "post-transition metal", "tier": 2,
    "clues": [
      "An ancient metal alloyed with copper since 3000 BC to create bronze, marking the start of a historical age.",
      "Its transformation from a shiny metal to a crumbly grey powder at low temperatures is called 'pest'.",
      "Highly resistant to corrosion, it was historically used to plate iron cans for food preservation (such metal containers were commonly named after it).",
      "A post-transition metal in Group 14, alloyed with copper to make bronze and used to coat iron cans."
    ]
  },
  {
    "number": 80, "mass": "200.59", "config": "[Xe] 4f14 5d10 6s2", "use": "The only metal that is liquid at room temperature, once used in thermometers.", "symbol": "Hg", "name": "Mercury", "state": "liquid", "category": "transition metal", "tier": 2,
    "clues": [
      "Often called 'quicksilver' because it is a liquid transition metal at room temperature.",
      "It forms alloys called amalgams with almost all other metals except iron, which is why it is stored in iron flasks.",
      "Its chemical symbol is derived from the Greek word 'hydrargyrum', meaning 'liquid silver'.",
      "A transition metal in Group 12, Period 6, famous for being a heavy silvery liquid at room temperature."
    ]
  },
  {
    "number": 82, "mass": "207.2", "config": "[Xe] 4f14 5d10 6s2 6p2", "use": "Acts as a heavy radiation shield in medical X-ray imaging rooms.", "symbol": "Pb", "name": "Lead", "state": "solid", "category": "post-transition metal", "tier": 2,
    "clues": [
      "A heavy, soft, malleable post-transition metal with a low melting point, highly resistant to corrosion.",
      "Ores like galena are roasted to yield this heavy metal, which was widely used in ancient solder and paint.",
      "Used since ancient Roman times for plumbing, which later gave rise to the term 'plumber'.",
      "A soft, dense post-transition metal in Group 14, used for radiation shielding and acid-filled car batteries."
    ]
  },

  # --- TIER 3: ROUND 3 (20 Elements) ---
  {
    "number": 37, "mass": "85.468", "config": "[Kr] 5s1", "use": "Utilized in vapor cell atomic clocks and purple firework formulas.", "symbol": "Rb", "name": "Rubidium", "state": "solid", "category": "alkali metal", "tier": 3,
    "clues": [
      "An extremely soft, silvery-white alkali metal that ignites spontaneously in air and reacts explosively with water.",
      "It was discovered in 1861 by Robert Bunsen and Gustav Kirchhoff using their newly invented spectroscope.",
      "Its compounds give a bright violet-red color to fireworks, and it is used in high-precision atomic clocks.",
      "A soft, highly reactive alkali metal in Group 1, Period 5, which ignites spontaneously in air."
    ]
  },
  {
    "number": 38, "mass": "87.62", "config": "[Kr] 5s2", "use": "Produces the intense crimson-red color in flares and fireworks.", "symbol": "Sr", "name": "Strontium", "state": "solid", "category": "alkaline earth metal", "tier": 3,
    "clues": [
      "A soft, silvery-yellow alkaline earth metal that is highly reactive and burns with a bright crimson red flame.",
      "A radioactive isotope of this element, 90, is a major product of nuclear fission and mimics calcium in bones.",
      "Its salts are widely used in pyrotechnics to create deep red fireworks and emergency road flares.",
      "An alkaline earth metal with atomic number 38, famous for coloring fireworks and safety flares brilliant red."
    ]
  },
  {
    "number": 39, "mass": "88.906", "config": "[Kr] 4d1 5s2", "use": "Used to make red phosphors in old CRT screens and high-temperature superconductors.", "symbol": "Y", "name": "Yttrium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A silvery-metallic transition metal chemically similar to the lanthanides, named after a Swedish village quarry.",
      "Ores containing this element were first found in a feldspar quarry in Ytterby, Sweden.",
      "Used as an additive to make red phosphors for old CRT television screens and in high-temperature superconductors.",
      "A transition metal in Group 3, Period 5, used as a dopant in microwave filters and red CRT phosphors."
    ]
  },
  {
    "number": 40, "mass": "91.224", "config": "[Kr] 4d2 5s2", "use": "Used as structural cladding for nuclear reactor rods due to low neutron absorption.", "symbol": "Zr", "name": "Zirconium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A lustrous, greyish-white, strong transition metal that is highly resistant to corrosion by acids and alkalis.",
      "It was discovered in 1789 by Martin Heinrich Klaproth in a mineral gemstone of the same name.",
      "Its oxide is synthesized to make fake diamonds (cubic zirconia) and it is used as cladding for nuclear fuel rods.",
      "A lustrous, greyish-white transition metal in Group 4, highly resistant to corrosion by acids and alkalis."
    ]
  },
  {
    "number": 41, "mass": "92.906", "config": "[Kr] 4d4 5s1", "use": "Alloyed in superalloys for jet engines and superconducting magnets in MRI units.", "symbol": "Nb", "name": "Niobium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "Originally named columbium, this transition metal is used as a superconductor and in jet engine superalloys.",
      "It was named after Niobe, the daughter of Tantalus, due to its extreme chemical similarity to tantalum.",
      "It becomes a superconductor at cryogenic temperatures, making it vital for MRI machine magnets.",
      "A Group 5 transition metal that becomes a superconductor at cryogenic temperatures, used in MRI magnets."
    ]
  },
  {
    "number": 42, "mass": "95.95", "config": "[Kr] 4d5 5s1", "use": "Provides high-temperature strength in structural steel alloys and lubricants.", "symbol": "Mo", "name": "Molybdenum", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A refractory transition metal with an extremely high melting point of 2623 degrees Celsius.",
      "Its name is derived from the Greek word for 'lead', as its minerals were long confused with lead ores.",
      "Often used in steel alloys to increase strength and heat resistance for engine parts and military armor.",
      "A transition metal with atomic number 42, used in structural steel alloys and high-temperature lubricants."
    ]
  },
  {
    "number": 44, "mass": "101.07", "config": "[Kr] 4d7 5s1", "use": "Hardens platinum alloys for high-wear electrical contact pads.", "symbol": "Ru", "name": "Ruthenium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A rare transition metal of the platinum group, named after the Latin word for Russia.",
      "It was discovered in 1844 by Karl Ernst Claus, who named it in honor of Russia (Ruthenia).",
      "Mainly used as a catalyst, and to harden platinum and palladium for electrical contacts.",
      "A rare Group 8 transition metal, used to harden platinum and palladium alloys for electrical contact pads."
    ]
  },
  {
    "number": 45, "mass": "102.91", "config": "[Kr] 4d8 5s1", "use": "An extremely rare metal used to catalyze and reduce toxic vehicle exhausts.", "symbol": "Rh", "name": "Rhodium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "An extremely rare, silvery-white, corrosion-resistant transition metal in the platinum group.",
      "It was discovered in 1803 by William Hyde Wollaston, who isolated it from raw platinum ore.",
      "One of the most expensive metals in the world, primarily used in automotive catalytic converters to reduce toxic exhaust.",
      "An extremely rare, corrosion-resistant transition metal in Group 9, used primarily in catalytic converters."
    ]
  },
  {
    "number": 46, "mass": "106.42", "config": "[Kr] 4d10", "use": "Absorbs up to 900 times its volume in hydrogen gas, vital for gas purifiers.", "symbol": "Pd", "name": "Palladium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A rare transition metal named after the asteroid Pallas (which was named after the Greek goddess of wisdom).",
      "It was discovered in 1803 by William Hyde Wollaston, who named it after the recently discovered asteroid Pallas.",
      "Capable of absorbing up to 900 times its own volume of hydrogen gas at room temperature, making it key for hydrogen storage.",
      "A rare transition metal in Group 10, valued for its capacity to absorb massive volumes of hydrogen gas."
    ]
  },
  {
    "number": 48, "mass": "112.41", "config": "[Kr] 4d10 5s2", "use": "Used in control rods of nuclear reactors and plastic stabilizers.", "symbol": "Cd", "name": "Cadmium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A soft, bluish-white transition metal chemically similar to zinc, known to be highly toxic to human kidneys and bones.",
      "It was discovered in 1817 by Friedrich Stromeyer as an impurity in zinc carbonate ores.",
      "Historically used in corrosion-resistant electroplating and in rechargeable batteries alongside nickel.",
      "A toxic transition metal with atomic number 48, historically paired with nickel in rechargeable battery cells."
    ]
  },
  {
    "number": 49, "mass": "114.82", "config": "[Kr] 4d10 5s2 5p1", "use": "Combined with tin oxide to make transparent touchscreen coatings for phones.", "symbol": "In", "name": "Indium", "state": "solid", "category": "post-transition metal", "tier": 3,
    "clues": [
      "An extremely soft post-transition metal that emits a high-pitched 'metal scream' when bent.",
      "It was discovered in 1863 by Ferdinand Reich and Hieronymous Theodor Richter, who identified its indigo spectral line.",
      "Combined with tin oxide to make ITO, a transparent conductive coating used in all modern smartphone touchscreens.",
      "A soft post-transition metal in Group 13, alloyed with tin oxide to make transparent touchscreen coatings."
    ]
  },
  {
    "number": 51, "mass": "121.76", "config": "[Kr] 4d10 5s2 5p3", "use": "Alloyed with lead to harden lead-acid batteries and used in flame retardants.", "symbol": "Sb", "name": "Antimony", "state": "solid", "category": "metalloid", "tier": 3,
    "clues": [
      "Its name comes from Greek words meaning 'a metal not found alone', and its historical Latin name stibium provides its modern chemical symbol.",
      "Its primary mineral ore is stibnite, which was used in ancient Egypt as a cosmetic eyeliner.",
      "A lustrous grey metalloid primarily used as a flame retardant in plastics and in lead-acid batteries.",
      "A lustrous, silvery metalloid in Group 15, used to harden lead alloys in batteries and as a flame retardant."
    ]
  },
  {
    "number": 52, "mass": "127.60", "config": "[Kr] 4d10 5s2 5p4", "use": "Used in solar panels, thermoelectric devices, and rewritable DVDs.", "symbol": "Te", "name": "Tellurium", "state": "solid", "category": "metalloid", "tier": 3,
    "clues": [
      "A rare, mildly toxic, silver-white metalloid chemically related to selenium and sulfur.",
      "It was discovered in 1782 by Franz-Joseph Müller von Reichenstein, who called it 'aurum paradoxum'.",
      "Exposure to its compounds causes a pungent garlic-like breath odor that can last for weeks.",
      "A rare, brittle, silver-white metalloid in Group 16, chemically related to selenium and sulfur."
    ]
  },
  {
    "number": 53, "mass": "126.90", "config": "[Kr] 4d10 5s2 5p5", "use": "Used as a disinfectant antiseptic and added to table salt to prevent goiters.", "symbol": "I", "name": "Iodine", "state": "solid", "category": "halogen", "tier": 3,
    "clues": [
      "A dark, lustrous nonmetal solid that undergoes sublimation, turning directly from a solid to a beautiful purple gas when heated.",
      "Ores containing it are burned to release its gas, which is captured and purified as dark purple crystals.",
      "Its name comes from the Greek word 'ioeides', which translates to 'violet-colored'.",
      "A halogen in Group 17, Period 5, essential for thyroid hormone production and used as a disinfectant."
    ]
  },
  {
    "number": 54, "mass": "131.29", "config": "[Kr] 4d10 5s2 5p6", "use": "Fills blue-tinted high-intensity discharge car headlights and ion thrusters.", "symbol": "Xe", "name": "Xenon", "state": "gas", "category": "noble gas", "tier": 3,
    "clues": [
      "A heavy, extremely rare noble gas found in Earth's atmosphere in trace amounts.",
      "It was discovered in 1898 by Ramsay and Travers, who named it from the Greek word for 'stranger'.",
      "Used in specialized high-intensity flash lamps, surgical lasers, and ion propulsion thrusters for spacecraft.",
      "A heavy noble gas in Group 18, used in high-intensity strobe lights, medical imaging, and space thrusters."
    ]
  },
  {
    "number": 55, "mass": "132.91", "config": "[Xe] 6s1", "use": "Its atomic vibration is the international standard definition for a single second.", "symbol": "Cs", "name": "Cesium", "state": "solid", "category": "alkali metal", "tier": 3,
    "clues": [
      "A gold-tinted, extremely soft alkali metal with a very low melting point of 28.4 degrees Celsius.",
      "It was discovered in 1860 by Bunsen and Kirchhoff, named from the Latin word for 'sky blue' due to its spectral lines.",
      "The vibration of its atoms defines the official length of a single second in atomic clocks.",
      "A gold-tinted, extremely soft alkali metal in Group 1, whose atomic vibrations define the length of a second."
    ]
  },
  {
    "number": 56, "mass": "137.33", "config": "[Xe] 6s2", "use": "Swallowed as a contrast agent to visualize the gastrointestinal tract under X-rays.", "symbol": "Ba", "name": "Barium", "state": "solid", "category": "alkaline earth metal", "tier": 3,
    "clues": [
      "A soft, silvery alkaline earth metal that oxidizes rapidly in air and must be stored under petroleum.",
      "Its mineral barite is highly insoluble and is used as a heavy weighting agent in oil well drilling fluids.",
      "Its sulfate compound is swallowed by patients as a contrast agent for X-ray imaging of the digestive tract.",
      "An alkaline earth metal with atomic number 56, whose sulfate is swallowed as an X-ray contrast agent."
    ]
  },
  {
    "number": 72, "mass": "178.49", "config": "[Xe] 4f14 5d2 6s2", "use": "Acts as a nuclear reactor neutron absorber in control rods.", "symbol": "Hf", "name": "Hafnium", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A lustrous, silvery-grey transition metal named after the Latin name for Copenhagen (Hafnia).",
      "Its discovery in 1923 by Dirk Coster and George de Hevesy confirmed Mendeleev's predictions of element 72.",
      "Has a high capacity to absorb neutrons, making it excellent for reactor control rods in nuclear submarines.",
      "A Group 4 transition metal, chemically identical to zirconium, used as a neutron absorber in control rods."
    ]
  },
  {
    "number": 73, "mass": "180.95", "config": "[Xe] 4f14 5d3 6s2", "use": "Made into highly compact electrical capacitors for modern smartphones.", "symbol": "Ta", "name": "Tantalum", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "A highly corrosion-resistant refractory metal named after the Greek mythological figure Tantalus due to its resistance to acids.",
      "It was discovered in 1802 by Anders Gustaf Ekeberg, who named it after a Greek mythological figure.",
      "Extensively used in micro-capacitors for compact mobile electronics like smartphones and pacemakers.",
      "A Group 5 transition metal, highly resistant to acids, widely used to make micro-capacitors for cell phones."
    ]
  },
  {
    "number": 74, "mass": "183.84", "config": "[Xe] 4f14 5d4 6s2", "use": "Has the highest melting point of all metals, once used in bulb filaments.", "symbol": "W", "name": "Tungsten", "state": "solid", "category": "transition metal", "tier": 3,
    "clues": [
      "Has the highest melting point of all discovered metals (3422 degrees Celsius) and is extremely dense.",
      "Its mineral scheelite was studied in 1781 by Carl Wilhelm Scheele, who isolated acid from it.",
      "Its chemical symbol is derived from wolframite, and it was famously used as filaments in incandescent light bulbs.",
      "A transition metal in Group 6, possessing the highest melting point of all metals (3422 degrees Celsius)."
    ]
  },

  # --- TIER 4: ROUND 4 (20 Elements) ---
  {
    "number": 75, "mass": "186.21", "config": "[Xe] 4f14 5d5 6s2", "use": "Alloyed in nickel superalloys for jet engine turbine blades.", "symbol": "Re", "name": "Rhenium", "state": "solid", "category": "transition metal", "tier": 4,
    "clues": [
      "A silvery-white, heavy transition metal of Group 7, named after the River Rhine.",
      "It was discovered in 1925 in Germany by Walter Noddack, Ida Tacke, and Otto Berg.",
      "One of the rarest elements in the Earth's crust, used in nickel-based superalloys for jet engine combustion chambers.",
      "A dense Group 7 transition metal, extremely rare in the crust, used in nickel superalloys for jet engines."
    ]
  },
  {
    "number": 76, "mass": "190.23", "config": "[Xe] 4f14 5d6 6s2", "use": "The densest naturally occurring element, used for high-wear pen tips.", "symbol": "Os", "name": "Osmium", "state": "solid", "category": "transition metal", "tier": 4,
    "clues": [
      "The densest naturally occurring element, twice as dense as lead and slightly denser than iridium.",
      "It was discovered in 1803 by Smithson Tennant, who isolated it from insoluble platinum residues.",
      "Its name comes from the Greek word for 'smell' due to the chlorine-like odor of its volatile and toxic tetroxide.",
      "The densest element on the periodic table, Group 8, emitting a highly toxic, volatile tetroxide gas."
    ]
  },
  {
    "number": 77, "mass": "192.22", "config": "[Xe] 4f14 5d7 6s2", "use": "An asteroid marker in Earth's crust, used for high-temperature spark plugs.", "symbol": "Ir", "name": "Iridium", "state": "solid", "category": "transition metal", "tier": 4,
    "clues": [
      "The second-densest element, famous for being highly concentrated in a clay layer marking the dinosaur-extinction asteroid impact.",
      "It was discovered in 1803 by Smithson Tennant, who named it after Iris, the goddess of the rainbow.",
      "The most corrosion-resistant metal known, named after Iris, the Greek goddess of the rainbow, due to the colorful nature of its salts.",
      "The second-densest element, Group 9, famous for its concentration in the KT boundary dinosaur extinction layer."
    ]
  },
  {
    "number": 78, "mass": "195.08", "config": "[Xe] 4f14 5d9 6s1", "use": "Used as an active catalyst in laboratory crucibles and auto exhaust systems.", "symbol": "Pt", "name": "Platinum", "state": "solid", "category": "transition metal", "tier": 4,
    "clues": [
      "A heavy, precious transition metal whose name comes from the Spanish term platina, meaning 'little silver'.",
      "It was discovered in 1735 by Antonio de Ulloa in South America, who noted its resistance to melting.",
      "Highly unreactive, it is widely used in high-end jewelry, laboratory crucibles, and catalytic converters.",
      "A heavy, unreactive Group 10 transition metal, highly valued for jewelry, laboratory tools, and catalysts."
    ]
  },
  {
    "number": 81, "mass": "204.38", "config": "[Xe] 4f14 5d10 6s2 6p1", "use": "Used in specialized high-index glass lenses and infrared optical sensors.", "symbol": "Tl", "name": "Thallium", "state": "solid", "category": "post-transition metal", "tier": 4,
    "clues": [
      "A soft, malleable post-transition metal that oxidizes rapidly in air, looking like lead.",
      "Discovered in 1861 by William Crookes, who identified its bright green spectral line.",
      "Historically popular as a weapon in murder mysteries because it is odorless, tasteless, and slowly mimics other diseases.",
      "A toxic, soft post-transition metal in Group 13, historically used as a rodenticide and ant killer."
    ]
  },
  {
    "number": 83, "mass": "208.98", "config": "[Xe] 4f14 5d10 6s2 6p3", "use": "The active non-toxic ingredient in pink antacid stomach relief medications.", "symbol": "Bi", "name": "Bismuth", "state": "solid", "category": "post-transition metal", "tier": 4,
    "clues": [
      "A brittle post-transition metal that forms spectacular, colorful iridescent oxide crystals in step-like hopper formations.",
      "It was long confused with lead and tin until Claude Francois Geoffroy showed it was distinct in 1753.",
      "Surprisingly non-toxic despite its heavy weight, it is the active ingredient in pink stomach remedies like Pepto-Bismol.",
      "A brittle post-transition metal in Group 15, forming iridescent hopper crystals and used in Pepto-Bismol."
    ]
  },
  {
    "number": 84, "mass": "209", "config": "[Xe] 4f14 5d10 6s2 6p4", "use": "A highly radioactive alpha particle emitter used in space probe heaters.", "symbol": "Po", "name": "Polonium", "state": "solid", "category": "post-transition metal", "tier": 4,
    "clues": [
      "A highly radioactive metal discovered by Marie and Pierre Curie in 1898, named in honor of Marie's homeland.",
      "It was discovered in 1898 by Marie and Pierre Curie, who isolated it from uranium pitchblende.",
      "An intense alpha emitter, it was famously used to poison former Soviet agent Alexander Litvinenko in London in 2006.",
      "A highly radioactive, volatile metalloid in Group 16, used as a static eliminator and thermal source."
    ]
  },
  {
    "number": 57, "mass": "138.91", "config": "[Xe] 5d1 6s2", "use": "Fills carbon arc studio lights and serves in nickel-metal hydride batteries.", "symbol": "La", "name": "Lanthanum", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The prototype element of the lanthanide series, whose name comes from the Greek word 'to lie hidden'.",
      "It was discovered in 1839 by Carl Gustaf Mosander, who found it as an impurity in cerium nitrate.",
      "Used in carbon arc lighting for studio lights and in hybrid car nickel-metal hydride batteries.",
      "A silvery rare-earth lanthanide in Group 3, Period 6, used in studio carbon arc lighting and hybrid batteries."
    ]
  },
  {
    "number": 58, "mass": "140.12", "config": "[Xe] 4f1 5d1 6s2", "use": "Used as a glass polishing compound and as the flint spark-maker in lighters.", "symbol": "Ce", "name": "Cerium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The most abundant of the rare-earth metals, named after the dwarf planet Ceres.",
      "It is the main component of mischmetal, an alloy that sparks easily when scratched, used in lighter flints.",
      "Alloyed with iron to make flint blocks that spark when scratched, used in pocket lighters.",
      "A rare-earth lanthanide with atomic number 58, named after the dwarf planet Ceres, used as a glass polish."
    ]
  },
  {
    "number": 59, "mass": "140.91", "config": "[Xe] 4f3 6s2", "use": "Doped in glass for welder goggles to filter out intense yellow flare light.", "symbol": "Pr", "name": "Praseodymium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A soft, silvery rare-earth metal whose name means 'green twin' due to the green coloration of its salts.",
      "It was isolated in 1885 by Carl Auer von Welsbach, who separated it from didymium metal.",
      "Alloyed with neodymium to create high-strength magnets and used in specialized didymium glass for welder goggles.",
      "A rare-earth lanthanide in Group 3, Period 6, whose salts give glass and ceramics a bright yellow-green color."
    ]
  },
  {
    "number": 60, "mass": "144.24", "config": "[Xe] 4f4 6s2", "use": "Alloyed to make the strongest permanent magnets for wind turbines and motors.", "symbol": "Nd", "name": "Neodymium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A rare-earth metal that forms the strongest known type of permanent magnets when alloyed with iron and boron.",
      "It was discovered in 1885 by Carl Auer von Welsbach, who separated it from the rare-earth mix didymium.",
      "Its magnets are critical in wind turbine generators, electric car motors, and audio speakers.",
      "A lanthanide metal that forms the strongest known permanent magnets when alloyed with iron and boron."
    ]
  },
  {
    "number": 61, "mass": "145", "config": "[Xe] 4f5 6s2", "use": "A synthetic radioactive isotope used in miniature nuclear batteries.", "symbol": "Pm", "name": "Promethium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The only lanthanide element that is radioactive with no stable isotopes; all of it decays quickly.",
      "Its existence was predicted in 1902, but it was first chemically isolated in 1945 from fission product debris.",
      "Named after Prometheus, who stole fire from the gods, it is used in atomic batteries and luminous paint.",
      "The only lanthanide with no stable isotopes; all of its forms are radioactive, used in atomic batteries."
    ]
  },
  {
    "number": 62, "mass": "150.36", "config": "[Xe] 4f6 6s2", "use": "Used in specialized magnets that remain magnetic at extremely high temperatures.", "symbol": "Sm", "name": "Samarium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A moderately hard rare-earth metal that is relatively stable in air, named after a Russian mine official.",
      "It was discovered in 1879 by Paul-Emile Lecoq de Boisbaudran, who isolated it from the mineral samarskite.",
      "Alloyed with cobalt to make magnets that retain their magnetic fields at incredibly high temperatures.",
      "A rare-earth lanthanide used in specialized magnets that retain their magnetism at extremely high temperatures."
    ]
  },
  {
    "number": 63, "mass": "151.96", "config": "[Xe] 4f7 6s2", "use": "Serves as the red phosphor in LED displays and inside anti-counterfeit banknote inks.", "symbol": "Eu", "name": "Europium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The most chemically reactive of all rare-earth metals, named after a continent.",
      "It was discovered in 1896 by Eugene-Anatole Demarcay, who suspected samarium samples were contaminated.",
      "Its compounds are used as red phosphors in television screens and as anti-counterfeiting glowing ink on Euro banknotes.",
      "The most reactive lanthanide metal, named after a continent, used as glowing red phosphors in displays."
    ]
  },
  {
    "number": 64, "mass": "157.25", "config": "[Xe] 4f7 5d1 6s2", "use": "Injected as a heavy metal contrast agent for MRI scans.", "symbol": "Gd", "name": "Gadolinium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A rare-earth metal with unusual magnetic properties, becoming ferromagnetic just below room temperature.",
      "It was discovered in 1880 by Jean Charles Galissard de Marignac, who identified its oxide spectrally.",
      "Its complexes are intravenously injected as a contrast medium for magnetic resonance imaging scans.",
      "A lanthanide metal with unusual magnetic properties, injected as a contrast agent for MRI body scans."
    ]
  },
  {
    "number": 65, "mass": "158.93", "config": "[Xe] 4f9 6s2", "use": "Serves as the green phosphor in fluorescent lighting and color displays.", "symbol": "Tb", "name": "Terbium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A silvery-white, malleable rare-earth metal named after the Swedish quarry Ytterby.",
      "It was discovered in 1843 by Carl Gustaf Mosander, who detected it as an impurity in yttria ore.",
      "Used in solid-state devices and as a green phosphor in trichromatic lighting tubes.",
      "A rare-earth lanthanide named after Ytterby, Sweden, used as a green phosphor in fluorescent light tubes."
    ]
  },
  {
    "number": 67, "mass": "164.93", "config": "[Xe] 4f11 6s2", "use": "Has the highest magnetic concentration capability, used in pole pieces.", "symbol": "Ho", "name": "Holmium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A rare-earth metal named after the Latin name for Stockholm (Holmia), discovered in 1878.",
      "It was discovered in 1878 by Marc Delafontaine and Jacques-Louis Soret, who identified its spectral lines.",
      "Has the highest magnetic moment of any element, making it useful in pole pieces for high-field magnets.",
      "A rare-earth lanthanide named after Stockholm, possessing the highest magnetic concentration capability."
    ]
  },
  {
    "number": 68, "mass": "167.26", "config": "[Xe] 4f12 6s2", "use": "Doped into optical fiber amplifiers to boost long-distance internet signals.", "symbol": "Er", "name": "Erbium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "A silvery rare-earth metal that is chemically stable in air, named after the village Ytterby.",
      "It was discovered in 1843 by Carl Gustaf Mosander, who isolated it from yttria mineral samples.",
      "Its ions are used to dope optical fibers to amplify signals in long-distance internet lines.",
      "A rare-earth lanthanide named after Ytterby, used to dope silica fibers to amplify internet optical signals."
    ]
  },
  {
    "number": 69, "mass": "168.93", "config": "[Xe] 4f13 6s2", "use": "Utilized as a radiation emitter source in portable dental X-ray machines.", "symbol": "Tm", "name": "Thulium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The second-least abundant of all naturally occurring rare-earth metals, named after Thule (a mythical northern land).",
      "It was discovered in 1879 by Per Teodor Cleve, who isolated it from erbia rare-earth oxide.",
      "Used as a radiation source in portable medical X-ray machines.",
      "The second-rarest naturally occurring lanthanide, named after Thule, used in portable medical X-ray units."
    ]
  },
  {
    "number": 70, "mass": "173.05", "config": "[Xe] 4f14 6s2", "use": "Utilized in fiber laser cutters and high-precision optical clocks.", "symbol": "Yb", "name": "Ytterbium", "state": "solid", "category": "lanthanide", "tier": 4,
    "clues": [
      "The last element discovered at the Ytterby quarry in Sweden, which yielded four element names.",
      "It was discovered in 1878 by Jean Charles Galissard de Marignac, who isolated it from erbia samples.",
      "Used as a dopant in fiber laser amplifiers and in high-precision atomic clocks.",
      "The final yttrium-derived rare-earth lanthanide named after Ytterby, Sweden, used in fiber laser cutters."
    ]
  },

  # --- TIER 5: ROUND 5 (20 Elements) ---
  {
    "number": 66, "mass": "162.50", "config": "[Xe] 4f10 6s2", "use": "Added to high-power magnets to prevent them from demagnetizing under load.", "symbol": "Dy", "name": "Dysprosium", "state": "solid", "category": "lanthanide", "tier": 5,
    "clues": [
      "A rare-earth metal whose name comes from the Greek word meaning 'hard to get'.",
      "It was discovered in 1886 by Paul-Emile Lecoq de Boisbaudran, who isolated it from holmium oxide.",
      "Added to neodymium-iron-boron magnets to increase their resistance to demagnetization under high temperatures.",
      "A rare-earth lanthanide used as an alloy additive to strengthen permanent neodymium magnets under heat."
    ]
  },
  {
    "number": 71, "mass": "174.97", "config": "[Xe] 4f14 5d1 6s2", "use": "Mainly used as a catalyst in petroleum cracking and in cancer therapies.", "symbol": "Lu", "name": "Lutetium", "state": "solid", "category": "lanthanide", "tier": 5,
    "clues": [
      "The heaviest and hardest of all the rare-earth metals, named after the Roman name for Paris.",
      "It was discovered in 1907 independently by Georges Urbain, Carl Auer von Welsbach, and Charles James.",
      "Has few commercial uses due to its rarity and high cost, but is used in petroleum refining catalysts.",
      "The heaviest and hardest lanthanide metal, named after the Roman name for Paris, used as a refining catalyst."
    ]
  },
  {
    "number": 85, "mass": "210", "config": "[Xe] 4f14 5d10 6s2 6p5", "use": "The rarest element in Earth's crust, researched for targeted alpha cancer therapy.", "symbol": "At", "name": "Astatine", "state": "solid", "category": "halogen", "tier": 5,
    "clues": [
      "The rarest naturally occurring element on Earth, with less than 30 grams existing in the crust at any moment.",
      "It was synthesized in 1940 by Dale Corson, Kenneth MacKenzie, and Emilio Segre at Berkeley.",
      "A highly radioactive halogen that decays rapidly; named after the Greek word for 'unstable'.",
      "The rarest naturally occurring nonmetal, Group 17, with a half-life of only 8 hours."
    ]
  },
  {
    "number": 86, "mass": "222", "config": "[Xe] 4f14 5d10 6s2 6p6", "use": "A naturally occurring radioactive gas that is a major indoor health hazard.", "symbol": "Rn", "name": "Radon", "state": "gas", "category": "noble gas", "tier": 5,
    "clues": [
      "A colorless, odorless radioactive noble gas that seeps out of the ground from the decay of natural uranium in soil.",
      "It was discovered in 1899 by Ernest Rutherford and Robert Owens, who noted its radioactive gas emissions.",
      "A major indoor air hazard, it is the second-leading cause of lung cancer globally after smoking.",
      "A heavy, radioactive noble gas in Group 18, which seeps into basements from decaying rock uranium."
    ]
  },
  {
    "number": 87, "mass": "223", "config": "[Rn] 7s1", "use": "An extremely short-lived radioactive alkali metal studied in scientific research.", "symbol": "Fr", "name": "Francium", "state": "solid", "category": "alkali metal", "tier": 5,
    "clues": [
      "The second-rarest naturally occurring element, whose isotopes have a maximum half-life of only 22 minutes.",
      "It was discovered in 1939 by Marguerite Perey at the Curie Institute in Paris.",
      "An extremely radioactive alkali metal that is synthesized in particle accelerators to study its atomic structure.",
      "An extremely radioactive alkali metal in Group 1, with a maximum half-life of only 22 minutes."
    ]
  },
  {
    "number": 88, "mass": "226", "config": "[Rn] 7s2", "use": "Historically painted on watch dials to make them glow in the dark.", "symbol": "Ra", "name": "Radium", "state": "solid", "category": "alkaline earth metal", "tier": 5,
    "clues": [
      "Discovered by Marie and Pierre Curie, this alkaline earth metal glows with a faint blue light in the dark.",
      "It was discovered in 1898 by Marie and Pierre Curie, who isolated it as a chloride salt.",
      "Historically used in self-luminous watch dials, exposing factory dial-painters to lethal radiation.",
      "An alkaline earth metal in Group 2, Period 7, which glows in the dark and was once used in watch dials."
    ]
  },
  {
    "number": 89, "mass": "227", "config": "[Rn] 6d1 7s2", "use": "Used as a powerful source of neutrons in industrial laboratories.", "symbol": "Ac", "name": "Actinium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "The prototype element of the actinide series, named after the Greek word for 'ray' due to its high radioactivity.",
      "It was discovered in 1899 by Friedrich Oskar Giesel, who isolated it from pitchblende uranium ores.",
      "About 150 times more radioactive than radium, making it useful as a neutron source.",
      "The prototype element of the actinide series, named from the Greek word for ray, highly radioactive."
    ]
  },
  {
    "number": 90, "mass": "232.04", "config": "[Rn] 6d2 7s2", "use": "Studied as a safer, more abundant alternative fuel for nuclear power reactors.", "symbol": "Th", "name": "Thorium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A naturally occurring, weakly radioactive metal named after Thor, the Norse god of thunder.",
      "Its radioactive decay chain produces radon gas and ends at stable lead 208, representing a natural source.",
      "Under consideration as a safer, more abundant alternative fuel to uranium in nuclear power reactors.",
      "A weakly radioactive actinide metal in Group 3, Period 7, researched as a safer nuclear fuel alternative."
    ]
  },
  {
    "number": 91, "mass": "231.04", "config": "[Rn] 5f2 6d1 7s2", "use": "One of the rarest radioactive actinides, currently has no commercial uses.", "symbol": "Pa", "name": "Protactinium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A dense, silvery-grey actinide metal that is highly radioactive and toxic, forming a precursor to actinium.",
      "It was discovered in 1913 by Kasimir Fajans and Oswald Helmuth Göhring, who named it brevium due to its short life.",
      "One of the rarest and most expensive naturally occurring elements, found in pitchblende.",
      "A rare and highly toxic radioactive actinide metal with atomic number 91, found in uranium ores."
    ]
  },
  {
    "number": 92, "mass": "238.03", "config": "[Rn] 5f3 6d1 7s2", "use": "Its isotopes serve as the core fuel for civilian nuclear power plants.", "symbol": "U", "name": "Uranium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A heavy actinide element named after the planet Uranus, discovered in 1789.",
      "It was discovered in 1789 by Martin Heinrich Klaproth, who identified its oxide in pitchblende samples.",
      "Its isotope 235 is the primary fuel used to power commercial nuclear reactors and atomic weapons.",
      "A heavy actinide element in Group 3, Period 7, whose isotope 235 is the primary fuel for nuclear reactors."
    ]
  },
  {
    "number": 93, "mass": "237", "config": "[Rn] 5f4 6d1 7s2", "use": "The first synthetic transuranic element, used in neutron detection gear.", "symbol": "Np", "name": "Neptunium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "The first synthetic transuranic element, named after the planet Neptune as it lies beyond uranium.",
      "It was synthesized in 1940 by Edwin McMillan and Philip Abelson by bombarding uranium with neutrons.",
      "Created by bombarding uranium with neutrons, it is a silvery metal that tarnishes in air.",
      "The first transuranic actinide element, named after the planet Neptune, used in neutron detectors."
    ]
  },
  {
    "number": 94, "mass": "244", "config": "[Rn] 5f6 7s2", "use": "Serves as nuclear fuel in reactor cores and deep-space thermal batteries.", "symbol": "Pu", "name": "Plutonium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic actinide metal named after the planet Pluto, first synthesized in 1940.",
      "It was synthesized in 1940 by Glenn Seaborg, Arthur Wahl, Joseph Kennedy, and Edwin McMillan.",
      "Famous as the fissile fuel used in the 'Fat Man' atomic bomb dropped on Nagasaki in World War II.",
      "A synthetic radioactive actinide named after Pluto, used in deep-space thermal batteries and weapons."
    ]
  },
  {
    "number": 95, "mass": "243", "config": "[Rn] 5f7 7s2", "use": "Fills the ionization chamber inside common household smoke detector units.", "symbol": "Am", "name": "Americium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic actinide element named after the Americas, first synthesized in 1944.",
      "It was synthesized in 1944 by Glenn Seaborg, Ralph James, Leon Morgan, and Albert Ghiorso.",
      "Its isotope 241 is widely used inside household ionization smoke detectors.",
      "A synthetic actinide element named after the Americas, widely used in household smoke detectors."
    ]
  },
  {
    "number": 96, "mass": "247", "config": "[Rn] 5f7 6d1 7s2", "use": "Used as an alpha emitter source for X-ray spectrometers on Mars rovers.", "symbol": "Cm", "name": "Curium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic radioactive metal named in honor of Marie and Pierre Curie.",
      "It was synthesized in 1944 by Seaborg, James, and Ghiorso by bombarding plutonium with alpha particles.",
      "Produced by bombarding plutonium with alpha particles, it glows purple in the dark due to its high radioactivity.",
      "A synthetic actinide named after the Curies, used as alpha particle emitters on Mars rover spectrometers."
    ]
  },
  {
    "number": 97, "mass": "247", "config": "[Rn] 5f9 7s2", "use": "A synthetic metal primarily used as a target to manufacture heavier elements.", "symbol": "Bk", "name": "Berkelium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic actinide element named after the city of Berkeley, California, where it was discovered in 1949.",
      "It was synthesized in 1949 by Stanley Thompson, Albert Ghiorso, and Glenn Seaborg at Berkeley.",
      "Mainly used as a target to synthesize heavier elements, such as tennessine.",
      "A synthetic actinide element named after Berkeley, California, used as a target to synthesize heavier elements."
    ]
  },
  {
    "number": 98, "mass": "251", "config": "[Rn] 5f10 7s2", "use": "A highly active neutron emitter used to boot up commercial nuclear reactors.", "symbol": "Cf", "name": "Californium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic actinide named in honor of the university and state where it was created in 1950.",
      "It was synthesized in 1950 by Thompson, Street, Ghiorso, and Seaborg by bombarding curium with alpha rays.",
      "An extremely strong neutron emitter, used to start up nuclear reactors and detect water in soils.",
      "A synthetic actinide named after California, acting as an extremely strong neutron emitter to start reactors."
    ]
  },
  {
    "number": 99, "mass": "252", "config": "[Rn] 5f11 7s2", "use": "Discovered in the radioactive fallout of the first thermonuclear test.", "symbol": "Es", "name": "Einsteinium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic element discovered in the debris of the first thermonuclear bomb explosion (Ivy Mike) in 1952.",
      "It was discovered in the radioactive debris of the Ivy Mike thermonuclear test in 1952.",
      "Named in honor of Albert Einstein, it is a highly radioactive metallic actinide.",
      "A synthetic radioactive actinide named after Albert Einstein, created by neutron bombardment of uranium."
    ]
  },
  {
    "number": 100, "mass": "257", "config": "[Rn] 5f12 7s2", "use": "The heaviest element that can be formed by bombarding lighter elements.", "symbol": "Fm", "name": "Fermium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "Discovered alongside einsteinium in the fallout of the first hydrogen bomb test in 1952.",
      "It was discovered in 1952 in the fallout debris of the Ivy Mike thermonuclear explosion.",
      "The heaviest element that can be formed by neutron bombardment of lighter elements.",
      "A synthetic actinide element named in honor of Enrico Fermi, the heaviest element formed by neutron capture."
    ]
  },
  {
    "number": 101, "mass": "258", "config": "[Rn] 5f13 7s2", "use": "Named after Mendeleev, created by bombarding einsteinium with alpha rays.", "symbol": "Md", "name": "Mendelevium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic radioactive element named in honor of Dmitri Mendeleev, the father of the periodic table.",
      "It was synthesized in 1955 by Ghiorso, Harvey, Choppin, Thompson, and Seaborg at Berkeley.",
      "First synthesized in 1955 by bombarding einsteinium with alpha particles.",
      "A synthetic actinide element named after Dmitri Mendeleev, created by bombarding einsteinium with alpha rays."
    ]
  },
  {
    "number": 102, "mass": "259", "config": "[Rn] 5f14 7s2", "use": "First synthesized in a cyclotron, named after Alfred Nobel.", "symbol": "No", "name": "Nobelium", "state": "solid", "category": "actinide", "tier": 5,
    "clues": [
      "A synthetic radioactive metal named in honor of Alfred Nobel, the inventor of dynamite.",
      "It was synthesized in 1958 by a team at Lawrence Berkeley Laboratory, named in honor of Alfred Nobel.",
      "It can only be produced in particle accelerators by bombarding lighter elements like curium with carbon ions.",
      "A synthetic actinide element with atomic number 102, produced in accelerators by bombarding curium with carbon."
    ]
  },

  # --- TIER 6: ROUND 6 (18 Elements) ---
  {
    "number": 103, "mass": "266", "config": "[Rn] 5f14 7s2 7p1", "use": "The final element of the actinide series, named after Ernest Lawrence.", "symbol": "Lr", "name": "Lawrencium", "state": "solid", "category": "actinide", "tier": 6,
    "clues": [
      "A synthetic element named in honor of Ernest Lawrence, inventor of the cyclotron particle accelerator.",
      "It was synthesized in 1961 by Ghiorso, Sikkeland, Larsh, and Latimer, named in honor of Ernest Lawrence.",
      "The final element of the actinide series, first synthesized in Berkeley, California in 1961.",
      "The final element of the actinide series, a synthetic radioactive metal with atomic number 103."
    ]
  },
  {
    "number": 104, "mass": "267", "config": "[Rn] 5f14 6d2 7s2", "use": "A synthetic transactinide element with a half-life of a few seconds.", "symbol": "Rf", "name": "Rutherfordium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic transition metal named in honor of Ernest Rutherford, the father of nuclear physics.",
      "It was synthesized in 1964 at Dubna, Russia, and in 1969 at Berkeley, California.",
      "The first transactinide element, with a half-life of only a few seconds or minutes.",
      "A synthetic superheavy Group 4 transition metal, named in honor of Ernest Rutherford, decays in seconds."
    ]
  },
  {
    "number": 105, "mass": "268", "config": "[Rn] 5f14 6d3 7s2", "use": "A synthetic metal created in laboratories, named after Dubna, Russia.", "symbol": "Db", "name": "Dubnium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "Named after Dubna, a Russian town where the Joint Institute for Nuclear Research is located.",
      "It was synthesized in 1968 at Dubna and 1970 at Berkeley, named in honor of Dubna, Russia.",
      "A highly radioactive synthetic metal that does not exist in nature.",
      "A synthetic Group 5 transition metal with atomic number 105, possessing no stable isotopes."
    ]
  },
  {
    "number": 106, "mass": "269", "config": "[Rn] 5f14 6d4 7s2", "use": "Named after Glenn Seaborg, the first element named for a living person.", "symbol": "Sg", "name": "Seaborgium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "The first chemical element named after a living person (Glenn T. Seaborg) at the time of naming.",
      "It was synthesized in 1974 at Berkeley and Dubna, named in honor of nuclear chemist Glenn Seaborg.",
      "First synthesized in 1974, it is a highly unstable synthetic metal.",
      "A synthetic Group 6 transition metal with atomic number 106, the first element named for a living chemist."
    ]
  },
  {
    "number": 107, "mass": "270", "config": "[Rn] 5f14 6d5 7s2", "use": "Named after Niels Bohr, created by bombarding bismuth with chromium.", "symbol": "Bh", "name": "Bohrium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic transition metal named in honor of Danish physicist Niels Bohr.",
      "It was synthesized in 1981 in Darmstadt, Germany, named in honor of Danish physicist Niels Bohr.",
      "Synthesized by bombarding bismuth with chromium ions, its most stable isotope has a half-life of 61 seconds.",
      "A synthetic Group 7 transition metal, produced by bombarding bismuth with chromium projectiles."
    ]
  },
  {
    "number": 108, "mass": "277", "config": "[Rn] 5f14 6d6 7s2", "use": "Named after the German state of Hesse, has extremely brief half-lives.", "symbol": "Hs", "name": "Hassium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic element named after the German state of Hesse, where it was first created in Darmstadt.",
      "It was synthesized in 1984 in Darmstadt, Germany, named after the German state of Hesse (Hassia).",
      "Its tetroxide compound is predicted to be volatile, similar to osmium.",
      "A synthetic Group 8 transition metal with atomic number 108, whose isotopes decay in fractions of a second."
    ]
  },
  {
    "number": 109, "mass": "278", "config": "[Rn] 5f14 6d7 7s2", "use": "Named after physicist Lise Meitner, co-discoverer of nuclear fission.", "symbol": "Mt", "name": "Meitnerium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic element named in honor of Austrian physicist Lise Meitner, co-discoverer of nuclear fission.",
      "It was synthesized in 1982 in Darmstadt, Germany, named in honor of physicist Lise Meitner.",
      "Extremely unstable, first synthesized in Germany in 1982.",
      "A synthetic Group 9 transition metal with atomic number 109, produced by bombarding bismuth with iron."
    ]
  },
  {
    "number": 110, "mass": "281", "config": "[Rn] 5f14 6d8 7s2", "use": "First synthesized in Darmstadt, Germany; decays within seconds.", "symbol": "Ds", "name": "Darmstadtium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic superheavy metal named after the German city where it was first synthesized in 1994.",
      "It was synthesized in 1994 in Darmstadt, Germany, named in honor of the city of Darmstadt.",
      "Its most stable isotope has a half-life of only about 10 seconds.",
      "A synthetic Group 10 transition metal with atomic number 110, whose most stable isotope has a 10s half-life."
    ]
  },
  {
    "number": 111, "mass": "282", "config": "[Rn] 5f14 6d9 7s2", "use": "Named after Roentgen, discoverer of X-rays; belongs to the copper group.", "symbol": "Rg", "name": "Roentgenium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic element named in honor of Wilhelm Conrad Roentgen, discoverer of X-rays.",
      "It was synthesized in 1994 in Darmstadt, Germany, named in honor of Wilhelm Roentgen, discoverer of X-rays.",
      "Belongs to group 11, placing it in the same column as copper, silver, and gold.",
      "A synthetic Group 11 transition metal with atomic number 111, placing it in the gold column."
    ]
  },
  {
    "number": 112, "mass": "285", "config": "[Rn] 5f14 6d10 7s2", "use": "Named after astronomer Copernicus; behaves like a volatile noble gas.", "symbol": "Cn", "name": "Copernicium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A synthetic transition metal named in honor of astronomer Nicolaus Copernicus.",
      "It was synthesized in 1996 in Darmstadt, Germany, named in honor of astronomer Nicolaus Copernicus.",
      "Predicted to be a volatile liquid at room temperature due to relativistic effects, behaving like a noble gas.",
      "A synthetic Group 12 transition metal, predicted to be a volatile liquid behaving like a noble gas."
    ]
  },
  {
    "number": 113, "mass": "286", "config": "[Rn] 5f14 6d10 7s2 7p1", "use": "The first element discovered in Asia, named after the Japanese word Nihon.", "symbol": "Nh", "name": "Nihonium", "state": "solid", "category": "post-transition metal", "tier": 6,
    "clues": [
      "The first element discovered and named by scientists in Asia, derived from the Japanese name for Japan.",
      "It was synthesized in 2003 at Dubna and 2004 at RIKEN, Japan, named in honor of Japan (Nihon).",
      "First synthesized in 2004 by bombarding bismuth with zinc.",
      "A synthetic Group 13 post-transition metal with atomic number 113, the first element named in Asia."
    ]
  },
  {
    "number": 114, "mass": "289", "config": "[Rn] 5f14 6d10 7s2 7p2", "use": "Named after Flerov Laboratory; resides near the theoretical island of stability.", "symbol": "Fl", "name": "Flerovium", "state": "solid", "category": "post-transition metal", "tier": 6,
    "clues": [
      "A synthetic superheavy metal named after the Flerov Laboratory of Nuclear Reactions in Russia.",
      "It was synthesized in 1998 at Dubna, Russia, named in honor of the Flerov Laboratory.",
      "Predicted to have closed nuclear shells, placing it near the theoretical 'island of stability'.",
      "A synthetic Group 14 post-transition metal, residing near the theoretical island of stability."
    ]
  },
  {
    "number": 115, "mass": "290", "config": "[Rn] 5f14 6d10 7s2 7p3", "use": "A highly unstable synthetic element, named in honor of Moscow, Russia.", "symbol": "Mc", "name": "Moscovium", "state": "solid", "category": "post-transition metal", "tier": 6,
    "clues": [
      "A synthetic element named in honor of the Moscow Oblast region in Russia where it was created.",
      "It was synthesized in 2003 at Dubna, Russia, named in honor of the Moscow region.",
      "Extremely radioactive, decaying by alpha emission within fractions of a second.",
      "A highly radioactive synthetic Group 15 element with atomic number 115, decaying in milliseconds."
    ]
  },
  {
    "number": 116, "mass": "293", "config": "[Rn] 5f14 6d10 7s2 7p4", "use": "Named after Lawrence Livermore Laboratory, decays in milliseconds.", "symbol": "Lv", "name": "Livermorium", "state": "solid", "category": "post-transition metal", "tier": 6,
    "clues": [
      "Named in honor of the Lawrence Livermore National Laboratory in California, which helped discover it.",
      "It was synthesized in 2000 at Dubna, Russia, named in honor of the Lawrence Livermore Laboratory.",
      "A highly radioactive synthetic element with only a few atoms ever produced.",
      "A highly radioactive synthetic Group 16 element with atomic number 116, decaying in fractions of a second."
    ]
  },
  {
    "number": 117, "mass": "294", "config": "[Rn] 5f14 6d10 7s2 7p5", "use": "Resides in the halogen column, named in honor of the state of Tennessee.", "symbol": "Ts", "name": "Tennessine", "state": "solid", "category": "halogen", "tier": 6,
    "clues": [
      "The second-heaviest element ever created, named after the US state of Tennessee due to its nuclear research contributions.",
      "It was synthesized in 2010 at Dubna, Russia, named in honor of the state of Tennessee.",
      "Classified as a halogen, though relativistic effects may make it behave more like a post-transition metal.",
      "A synthetic Group 17 halogen with atomic number 117, the second-heaviest element ever created."
    ]
  },
  {
    "number": 118, "mass": "294", "config": "[Rn] 5f14 6d10 7s2 7p6", "use": "The heaviest element discovered, completing the 7th row of the table.", "symbol": "Og", "name": "Oganesson", "state": "solid", "category": "noble gas", "tier": 6,
    "clues": [
      "The heaviest element on the periodic table, named in honor of Russian nuclear physicist Yuri Oganessian.",
      "It was synthesized in 2002 at Dubna, Russia, named in honor of nuclear physicist Yuri Oganessian.",
      "The only element named after a living person today, it completes the 7th period of the table.",
      "The heaviest element on the periodic table, completing Group 18 and the seventh row of the table."
    ]
  },
  {
    "number": 21, "mass": "44.956", "config": "[Ar] 3d1 4s2", "use": "Alloyed with aluminum to construct high-performance bicycle frames and aerospace parts.", "symbol": "Sc", "name": "Scandium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "A silvery-white metallic transition metal historically classified as a rare-earth element, named after Scandinavia.",
      "This transition metal has only one stable isotope, 45, and is highly concentrated in rare Scandinavian minerals.",
      "Mainly used in high-strength aluminum alloys for aerospace parts and high-end bicycle frames.",
      "A silvery transition metal in Group 3, Period 4, primarily used in high-intensity metal halide lamps."
    ]
  },
  {
    "number": 43, "mass": "97.91", "config": "[Kr] 4d5 5s2", "use": "A radioactive isotope used as a medical diagnostic tracer in body imaging.", "symbol": "Tc", "name": "Technetium", "state": "solid", "category": "transition metal", "tier": 6,
    "clues": [
      "The lightest chemical element that has no stable isotopes; all of its forms are radioactive.",
      "It was discovered in 1937 by Emilio Segre and Carlo Perrier in a sample of molybdenum bombarded by deuterons.",
      "First element to be artificially synthesized in a laboratory in 1937, named after the Greek word for 'artificial'.",
      "A transition metal with atomic number 43, the lightest element with no stable isotopes; all forms are radioactive."
    ]
  }
]

# Write JS file
js_content = """export const elements = """ + json.dumps(elements_data, indent=2) + ";\n"

# Replace double backslashes that might happen in formatting, though dumps with ascii should be clean
with open('src/data/elements.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("SUCCESS: 118 elements written to elements.js")
