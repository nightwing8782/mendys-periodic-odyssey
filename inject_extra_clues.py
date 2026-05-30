import re

# Comprehensive list of extra clues for all 118 elements:
# Each element gets 1 new Hard clue (to be placed at index 1) and 1 new Medium clue (at index 3)
extra_clues = {
    1: ["Produced in the first fraction of a second after the Big Bang, representing the genesis of all baryonic matter.",
        "It is the simplest possible atom, consisting of just a single proton and a single electron in its neutral state."],
    2: ["Although extremely common in stars, it is rare on Earth and is harvested as a byproduct of natural gas extraction.",
        "It is the first member of the noble gas group and does not freeze under normal pressures, even at absolute zero."],
    3: ["In medicine, its carbonate salt is a classic mood stabilizer used to treat bipolar disorder.",
        "This alkali metal is so light it floats on oil, and is the first element in the s-block of Period 2."],
    4: ["Ores of this metal are highly toxic to humans, causing a chronic, incurable scarring lung disease if dust is inhaled.",
        "An alkaline earth metal with atomic number 4, valued for its high thermal conductivity and structural stiffness."],
    5: ["Its hydride compounds are famous for forming unusual multi-center bonding rings that challenged standard Lewis rules.",
        "Used in eye drops, laundry detergents, and as control rods in nuclear reactors under the name borax."],
    6: ["The radioactive isotope 14 is widely used by archaeologists to date organic materials up to 50,000 years old.",
        "Forms a vital dioxide gas when combined with oxygen and is the main component of coal and charcoal."],
    7: ["Its compound with hydrogen is ammonia, synthesized industrially via the Haber-Bosch process to feed billions.",
        "Liquid form of this gas boils at -196 degrees Celsius and is used to flash-freeze food and remove warts."],
    8: ["A highly reactive allotrope of this element, consisting of three atoms, forms a high-altitude shield filtering UV rays.",
        "This gas makes up the water molecule alongside hydrogen and is the active agent in combustion and rusting."],
    9: ["It is so reactive that it can ignite water, producing oxygen gas and hydrofluoric acid.",
        "A pale yellow halogen gas that is the most reactive nonmetal on the periodic table."],
    10: ["It was discovered by freezing air until it liquefied, then evaporating it to capture the volatile fraction.",
        "A noble gas with atomic number 10, famous for its intense reddish-orange glowing signs."],
    11: ["It burns with an intense, characteristic bright yellow light in a flame test.",
        "A soft alkali metal that reacts violently with water and is stored under mineral oil."],
    12: ["Its oxide has an incredibly high melting point, making it a key refractory lining for steel furnaces.",
        "This alkaline earth metal is used in Epsom salts and causes a blinding white glare when ignited."],
    13: ["Historically, it was once more valuable than gold or silver, and the Washington Monument was capped with it in 1884.",
        "A lightweight, recyclable metal that does not rust because it forms a self-protecting oxide skin."],
    14: ["It forms the primary constituent of common sand, quartz, and quartz-crystal oscillators.",
        "A metalloid in Group 14, widely utilized as the semiconductor substrate in computer electronics."],
    15: ["It is a key component in the DNA sugar-phosphate backbone and ATP energy transport molecules in all cells.",
        "This nonmetal exists as a soft, waxy white solid that glows in the dark and ignites spontaneously in air."],
    16: ["Its acid is the world's most produced chemical, used as a barometer of a nation's industrial strength.",
        "A bright yellow nonmetal solid that burns with a blue flame and is used to vulcanize rubber."],
    17: ["Combined with sodium, it forms the saline electrolyte of animal blood and extracellular fluids.",
        "A choking, greenish-yellow halogen gas famous for its bleach-like disinfecting power."],
    18: ["Its radioactive isotope 40, formed from potassium decay, is a standard tool for dating ancient volcanic rocks.",
        "The most common noble gas in Earth's atmosphere, representing about 0.93% of air."],
    19: ["Its superoxide compound is used in space suits and submarines to absorb carbon dioxide and release oxygen.",
        "An alkali metal in Period 4, abundant in bananas and crucial for nerve signal transmission."],
    20: ["Its carbonate forms chalk, limestone, marble, and the shells of marine organisms like clams and corals.",
        "An alkaline earth metal with atomic number 20, essential for healthy bone density and dental strength."],
    21: ["This transition metal has only one stable isotope, 45, and is highly concentrated in rare Scandinavian minerals.",
        "A silvery transition metal in Group 3, Period 4, primarily used in high-intensity metal halide lamps."],
    22: ["The mineral rutile is a major source of this metal, which is refined into a brilliant white dioxide pigment.",
        "Highly valued for its resistance to corrosion by sea water, chlorine, and acids, and widely used in aircraft."],
    23: ["First discovered in Mexico in 1801 by Andres Manuel del Rio, who called it erythronium due to its red salts.",
        "A Group 5 transition metal used primarily as a steel additive to increase hardness and fatigue resistance."],
    24: ["It was discovered in 1797 by Louis Nicolas Vauquelin, who named it from the Greek word for 'color'.",
        "A shiny, hard transition metal with atomic number 24, used to plate steel parts and in emerald mineral lattices."],
    25: ["It is a key cofactor in the oxygen-evolving complex of photosystem II, which plants use to split water.",
        "A transition metal with atomic number 25, used to strengthen iron alloys and inside alkaline battery anodes."],
    26: ["This metal is the final element produced by stellar nucleosynthesis before a supernova collapse.",
        "A transition metal in Group 8 that forms rust in moist air and is the main component of Earth's core."],
    27: ["A radioactive isotope of this element, 60, is a common gamma emitter used in industrial radiography and radiation therapy.",
        "A transition metal in Group 9, Period 4, used to manufacture high-strength superalloys and lithium batteries."],
    28: ["It is a major component of metallic meteorites, which are alloyed with iron to form kamacite.",
        "A lustrous, silvery transition metal widely used to coin currency and inside rechargeable batteries."],
    29: ["Along with gold, it is one of only two non-silvery colored metals on the periodic table.",
        "A transition metal in Group 11, widely used for plumbing pipes, electrical wires, and cooking pots."],
    30: ["Its oxide is a common white pigment in sunscreens, valued for absorbing ultraviolet radiation.",
        "A transition metal with atomic number 30, alloyed with copper to produce brass and used to galvanize iron."],
    31: ["Discovered in 1875 by Paul-Emile Lecoq de Boisbaudran, who named it in honor of France (Gallia).",
        "A post-transition metal in Group 13, famous for its low melting point of 29.76 degrees Celsius."],
    32: ["Its existence was predicted in 1869 by Mendeleev, who called it 'ekasilicon' based on its periodic position.",
        "A lustrous, grey-white metalloid in Group 14, crucial for manufacturing infrared optics and fiber optics."],
    33: ["In groundwater, it is a major toxic contaminant causing blackfoot disease in affected regions.",
        "A metalloid with atomic number 33, historically used as a pesticide, wood preservative, and poison."],
    34: ["It is the active photoreceptive material in specialized copier drums used inside early office photocopiers.",
        "A reactive nonmetal in Group 16, essential in trace amounts for thyroid function and cell health."],
    35: ["Discovered in 1826 by Antoine Jerome Balard, who isolated it from salt marsh waters.",
        "A heavy, volatile, reddish-brown halogen liquid at room temperature that emits a sharp, choking vapor."],
    36: ["It was discovered in 1898 by William Ramsay and Morris Travers in the residue of liquid air distillation.",
        "A noble gas with atomic number 36, used in high-efficiency double-pane window insulation and flash lamps."],
    37: ["It was discovered in 1861 by Robert Bunsen and Gustav Kirchhoff using their newly invented spectroscope.",
        "A soft, highly reactive alkali metal in Group 1, Period 5, which ignites spontaneously in air."],
    38: ["A radioactive isotope of this element, 90, is a major product of nuclear fission and mimics calcium in bones.",
        "An alkaline earth metal with atomic number 38, famous for coloring fireworks and safety flares brilliant red."],
    39: ["Ores containing this element were first found in a feldspar quarry in Ytterby, Sweden.",
        "A transition metal in Group 3, Period 5, used as a dopant in microwave filters and red CRT phosphors."],
    40: ["It was discovered in 1789 by Martin Heinrich Klaproth in a mineral gemstone of the same name.",
        "A lustrous, greyish-white transition metal in Group 4, highly resistant to corrosion by acids and alkalis."],
    41: ["It was named after Niobe, the daughter of Tantalus, due to its extreme chemical similarity to tantalum.",
        "A Group 5 transition metal that becomes a superconductor at cryogenic temperatures, used in MRI magnets."],
    42: ["Its name is derived from the Greek word for 'lead', as its minerals were long confused with lead ores.",
        "A transition metal with atomic number 42, used in structural steel alloys and high-temperature lubricants."],
    43: ["It was discovered in 1937 by Emilio Segre and Carlo Perrier in a sample of molybdenum bombarded by deuterons.",
        "A transition metal with atomic number 43, the lightest element with no stable isotopes; all forms are radioactive."],
    44: ["It was discovered in 1844 by Karl Ernst Claus, who named it in honor of Russia (Ruthenia).",
        "A rare Group 8 transition metal, used to harden platinum and palladium alloys for electrical contact pads."],
    45: ["It was discovered in 1803 by William Hyde Wollaston, who isolated it from raw platinum ore.",
        "An extremely rare, corrosion-resistant transition metal in Group 9, used primarily in catalytic converters."],
    46: ["It was discovered in 1803 by William Hyde Wollaston, who named it after the recently discovered asteroid Pallas.",
        "A rare transition metal in Group 10, valued for its capacity to absorb massive volumes of hydrogen gas."],
    47: ["In photography, its halide salts are the key light-sensitive crystals used to capture film images.",
        "A transition metal in Group 11, famous for having the highest electrical and thermal conductivity of all metals."],
    48: ["It was discovered in 1817 by Friedrich Stromeyer as an impurity in zinc carbonate ores.",
        "A toxic transition metal with atomic number 48, historically paired with nickel in rechargeable battery cells."],
    49: ["It was discovered in 1863 by Ferdinand Reich and Hieronymous Theodor Richter, who identified its indigo spectral line.",
        "A soft post-transition metal in Group 13, alloyed with tin oxide to make transparent touchscreen coatings."],
    50: ["Its transformation from a shiny metal to a crumbly grey powder at low temperatures is called 'pest'.",
        "A post-transition metal in Group 14, alloyed with copper to make bronze and used to coat iron cans."],
    51: ["Its primary mineral ore is stibnite, which was used in ancient Egypt as a cosmetic eyeliner.",
        "A lustrous, silvery metalloid in Group 15, used to harden lead alloys in batteries and as a flame retardant."],
    52: ["It was discovered in 1782 by Franz-Joseph Müller von Reichenstein, who called it 'aurum paradoxum'.",
        "A rare, brittle, silver-white metalloid in Group 16, chemically related to selenium and sulfur."],
    53: ["Ores containing it are burned to release its gas, which is captured and purified as dark purple crystals.",
        "A halogen in Group 17, Period 5, essential for thyroid hormone production and used as a disinfectant."],
    54: ["It was discovered in 1898 by Ramsay and Travers, who named it from the Greek word for 'stranger'.",
        "A heavy noble gas in Group 18, used in high-intensity strobe lights, medical imaging, and space thrusters."],
    55: ["It was discovered in 1860 by Bunsen and Kirchhoff, named from the Latin word for 'sky blue' due to its spectral lines.",
        "A gold-tinted, extremely soft alkali metal in Group 1, whose atomic vibrations define the length of a second."],
    56: ["Its mineral barite is highly insoluble and is used as a heavy weighting agent in oil well drilling fluids.",
        "An alkaline earth metal with atomic number 56, whose sulfate is swallowed as an X-ray contrast agent."],
    57: ["It was discovered in 1839 by Carl Gustaf Mosander, who found it as an impurity in cerium nitrate.",
        "A silvery rare-earth lanthanide in Group 3, Period 6, used in studio carbon arc lighting and hybrid batteries."],
    58: ["It is the main component of mischmetal, an alloy that sparks easily when scratched, used in lighter flints.",
        "A rare-earth lanthanide with atomic number 58, named after the dwarf planet Ceres, used as a glass polish."],
    59: ["It was isolated in 1885 by Carl Auer von Welsbach, who separated it from didymium metal.",
        "A rare-earth lanthanide in Group 3, Period 6, whose salts give glass and ceramics a bright yellow-green color."],
    60: ["It was discovered in 1885 by Carl Auer von Welsbach, who separated it from the rare-earth mix didymium.",
        "A lanthanide metal that forms the strongest known permanent magnets when alloyed with iron and boron."],
    61: ["Its existence was predicted in 1902, but it was first chemically isolated in 1945 from fission product debris.",
        "The only lanthanide with no stable isotopes; all of its forms are radioactive, used in atomic batteries."],
    62: ["It was discovered in 1879 by Paul-Emile Lecoq de Boisbaudran, who isolated it from the mineral samarskite.",
        "A rare-earth lanthanide used in specialized magnets that retain their magnetism at extremely high temperatures."],
    63: ["It was discovered in 1896 by Eugene-Anatole Demarcay, who suspected samarium samples were contaminated.",
        "The most reactive lanthanide metal, named after a continent, used as glowing red phosphors in displays."],
    64: ["It was discovered in 1880 by Jean Charles Galissard de Marignac, who identified its oxide spectrally.",
        "A lanthanide metal with unusual magnetic properties, injected as a contrast agent for MRI body scans."],
    65: ["It was discovered in 1843 by Carl Gustaf Mosander, who detected it as an impurity in yttria ore.",
        "A rare-earth lanthanide named after Ytterby, Sweden, used as a green phosphor in fluorescent light tubes."],
    66: ["It was discovered in 1886 by Paul-Emile Lecoq de Boisbaudran, who isolated it from holmium oxide.",
        "A rare-earth lanthanide used as an alloy additive to strengthen permanent neodymium magnets under heat."],
    67: ["It was discovered in 1878 by Marc Delafontaine and Jacques-Louis Soret, who identified its spectral lines.",
        "A rare-earth lanthanide named after Stockholm, possessing the highest magnetic concentration capability."],
    68: ["It was discovered in 1843 by Carl Gustaf Mosander, who isolated it from yttria mineral samples.",
        "A rare-earth lanthanide named after Ytterby, used to dope silica fibers to amplify internet optical signals."],
    69: ["It was discovered in 1879 by Per Teodor Cleve, who isolated it from erbia rare-earth oxide.",
        "The second-rarest naturally occurring lanthanide, named after Thule, used in portable medical X-ray units."],
    70: ["It was discovered in 1878 by Jean Charles Galissard de Marignac, who isolated it from erbia samples.",
        "The final yttrium-derived rare-earth lanthanide named after Ytterby, Sweden, used in fiber laser cutters."],
    71: ["It was discovered in 1907 independently by Georges Urbain, Carl Auer von Welsbach, and Charles James.",
        "The heaviest and hardest lanthanide metal, named after the Roman name for Paris, used as a refining catalyst."],
    72: ["Its discovery in 1923 by Dirk Coster and George de Hevesy confirmed Mendeleev's predictions of element 72.",
        "A Group 4 transition metal, chemically identical to zirconium, used as a neutron absorber in control rods."],
    73: ["It was discovered in 1802 by Anders Gustaf Ekeberg, who named it after a Greek mythological figure.",
        "A Group 5 transition metal, highly resistant to acids, widely used to make micro-capacitors for cell phones."],
    74: ["Its mineral scheelite was studied in 1781 by Carl Wilhelm Scheele, who isolated acid from it.",
        "A transition metal in Group 6, possessing the highest melting point of all metals (3422 degrees Celsius)."],
    75: ["It was discovered in 1925 in Germany by Walter Noddack, Ida Tacke, and Otto Berg.",
        "A dense Group 7 transition metal, extremely rare in the crust, used in nickel superalloys for jet engines."],
    76: ["It was discovered in 1803 by Smithson Tennant, who isolated it from insoluble platinum residues.",
        "The densest element on the periodic table, Group 8, emitting a highly toxic, volatile tetroxide gas."],
    77: ["It was discovered in 1803 by Smithson Tennant, who named it after Iris, the goddess of the rainbow.",
        "The second-densest element, Group 9, famous for its concentration in the KT boundary dinosaur extinction layer."],
    78: ["It was discovered in 1735 by Antonio de Ulloa in South America, who noted its resistance to melting.",
        "A heavy, unreactive Group 10 transition metal, highly valued for jewelry, laboratory tools, and catalysts."],
    79: ["It is so chemically unreactive that it does not oxidize in air or dissolve in standard acids, but dissolves in aqua regia.",
        "A precious transition metal in Group 11, famous for its yellow luster and for being the most malleable element."],
    80: ["It forms alloys called amalgams with almost all other metals except iron, which is why it is stored in iron flasks.",
        "A transition metal in Group 12, Period 6, famous for being a heavy silvery liquid at room temperature."],
    89: ["It was discovered in 1899 by Friedrich Oskar Giesel, who isolated it from pitchblende uranium ores.",
         "The prototype element of the actinide series, named from the Greek word for ray, highly radioactive."],
    90: ["Its radioactive decay chain produces radon gas and ends at stable lead 208, representing a natural source.",
         "A weakly radioactive actinide metal in Group 3, Period 7, researched as a safer nuclear fuel alternative."],
    91: ["It was discovered in 1913 by Kasimir Fajans and Oswald Helmuth Göhring, who named it brevium due to its short life.",
         "A rare and highly toxic radioactive actinide metal with atomic number 91, found in uranium ores."],
    92: ["It was discovered in 1789 by Martin Heinrich Klaproth, who identified its oxide in pitchblende samples.",
         "A heavy actinide element in Group 3, Period 7, whose isotope 235 is the primary fuel for nuclear reactors."],
    93: ["It was synthesized in 1940 by Edwin McMillan and Philip Abelson by bombarding uranium with neutrons.",
         "The first transuranic actinide element, named after the planet Neptune, used in neutron detectors."],
    94: ["It was synthesized in 1940 by Glenn Seaborg, Arthur Wahl, Joseph Kennedy, and Edwin McMillan.",
         "A synthetic radioactive actinide named after Pluto, used in deep-space thermal batteries and weapons."],
    95: ["It was synthesized in 1944 by Glenn Seaborg, Ralph James, Leon Morgan, and Albert Ghiorso.",
         "A synthetic actinide element named after the Americas, widely used in household smoke detectors."],
    96: ["It was synthesized in 1944 by Seaborg, James, and Ghiorso by bombarding plutonium with alpha particles.",
         "A synthetic actinide named after the Curies, used as alpha particle emitters on Mars rover spectrometers."],
    97: ["It was synthesized in 1949 by Stanley Thompson, Albert Ghiorso, and Glenn Seaborg at Berkeley.",
         "A synthetic actinide element named after Berkeley, California, used as a target to synthesize heavier elements."],
    98: ["It was synthesized in 1950 by Thompson, Street, Ghiorso, and Seaborg by bombarding curium with alpha rays.",
         "A synthetic actinide named after California, acting as an extremely strong neutron emitter to start reactors."],
    99: ["It was discovered in the radioactive debris of the Ivy Mike thermonuclear test in 1952.",
         "A synthetic radioactive actinide named after Albert Einstein, created by neutron bombardment of uranium."],
    100: ["It was discovered in 1952 in the fallout debris of the Ivy Mike thermonuclear explosion.",
          "A synthetic actinide element named in honor of Enrico Fermi, the heaviest element formed by neutron capture."],
    101: ["It was synthesized in 1955 by Ghiorso, Harvey, Choppin, Thompson, and Seaborg at Berkeley.",
          "A synthetic actinide element named after Dmitri Mendeleev, created by bombarding einsteinium with alpha rays."],
    102: ["It was synthesized in 1958 by a team at Lawrence Berkeley Laboratory, named in honor of Alfred Nobel.",
          "A synthetic actinide element with atomic number 102, produced in accelerators by bombarding curium with carbon."],
    103: ["It was synthesized in 1961 by Ghiorso, Sikkeland, Larsh, and Latimer, named in honor of Ernest Lawrence.",
          "The final element of the actinide series, a synthetic radioactive metal with atomic number 103."],
    104: ["It was synthesized in 1964 at Dubna, Russia, and in 1969 at Berkeley, California.",
          "A synthetic superheavy Group 4 transition metal, named in honor of Ernest Rutherford, decays in seconds."],
    105: ["It was synthesized in 1968 at Dubna and 1970 at Berkeley, named in honor of Dubna, Russia.",
          "A synthetic Group 5 transition metal with atomic number 105, possessing no stable isotopes."],
    106: ["It was synthesized in 1974 at Berkeley and Dubna, named in honor of nuclear chemist Glenn Seaborg.",
          "A synthetic Group 6 transition metal with atomic number 106, the first element named for a living chemist."],
    107: ["It was synthesized in 1981 in Darmstadt, Germany, named in honor of Danish physicist Niels Bohr.",
          "A synthetic Group 7 transition metal, produced by bombarding bismuth with chromium projectiles."],
    108: ["It was synthesized in 1984 in Darmstadt, Germany, named after the German state of Hesse (Hassia).",
          "A synthetic Group 8 transition metal with atomic number 108, whose isotopes decay in fractions of a second."],
    109: ["It was synthesized in 1982 in Darmstadt, Germany, named in honor of physicist Lise Meitner.",
          "A synthetic Group 9 transition metal with atomic number 109, produced by bombarding bismuth with iron."],
    110: ["It was synthesized in 1994 in Darmstadt, Germany, named in honor of the city of Darmstadt.",
          "A synthetic Group 10 transition metal with atomic number 110, whose most stable isotope has a 10s half-life."],
    111: ["It was synthesized in 1994 in Darmstadt, Germany, named in honor of Wilhelm Roentgen, discoverer of X-rays.",
          "A synthetic Group 11 transition metal with atomic number 111, placing it in the gold column."],
    112: ["It was synthesized in 1996 in Darmstadt, Germany, named in honor of astronomer Nicolaus Copernicus.",
          "A synthetic Group 12 transition metal, predicted to be a volatile liquid behaving like a noble gas."],
    113: ["It was synthesized in 2003 at Dubna and 2004 at RIKEN, Japan, named in honor of Japan (Nihon).",
          "A synthetic Group 13 post-transition metal with atomic number 113, the first element named in Asia."],
    114: ["It was synthesized in 1998 at Dubna, Russia, named in honor of the Flerov Laboratory.",
          "A synthetic Group 14 post-transition metal, residing near the theoretical island of stability."],
    115: ["It was synthesized in 2003 at Dubna, Russia, named in honor of the Moscow region.",
          "A highly radioactive synthetic Group 15 element with atomic number 115, decaying in milliseconds."],
    116: ["It was synthesized in 2000 at Dubna, Russia, named in honor of the Lawrence Livermore Laboratory.",
          "A highly radioactive synthetic Group 16 element with atomic number 116, decaying in fractions of a second."],
    117: ["It was synthesized in 2010 at Dubna, Russia, named in honor of the state of Tennessee.",
          "A synthetic Group 17 halogen with atomic number 117, the second-heaviest element ever created."],
    118: ["It was synthesized in 2002 at Dubna, Russia, named in honor of nuclear physicist Yuri Oganessian.",
          "The heaviest element on the periodic table, completing Group 18 and the seventh row of the table."],
    81: ["Discovered in 1861 by William Crookes, who identified its bright green spectral line.",
         "A toxic, soft post-transition metal in Group 13, historically used as a rodenticide and ant killer."],
    82: ["Ores like galena are roasted to yield this heavy metal, which was widely used in ancient solder and paint.",
         "A soft, dense post-transition metal in Group 14, used for radiation shielding and acid-filled car batteries."],
    83: ["It was long confused with lead and tin until Claude Francois Geoffroy showed it was distinct in 1753.",
         "A brittle post-transition metal in Group 15, forming iridescent hopper crystals and used in Pepto-Bismol."],
    84: ["It was discovered in 1898 by Marie and Pierre Curie, who isolated it from uranium pitchblende.",
         "A highly radioactive, volatile metalloid in Group 16, used as a static eliminator and thermal source."],
    85: ["It was synthesized in 1940 by Dale Corson, Kenneth MacKenzie, and Emilio Segre at Berkeley.",
         "The rarest naturally occurring nonmetal, Group 17, with a half-life of only 8 hours."],
    86: ["It was discovered in 1899 by Ernest Rutherford and Robert Owens, who noted its radioactive gas emissions.",
         "A heavy, radioactive noble gas in Group 18, which seeps into basements from decaying rock uranium."],
    87: ["It was discovered in 1939 by Marguerite Perey at the Curie Institute in Paris.",
         "An extremely radioactive alkali metal in Group 1, with a maximum half-life of only 22 minutes."],
    88: ["It was discovered in 1898 by Marie and Pierre Curie, who isolated it as a chloride salt.",
         "An alkaline earth metal in Group 2, Period 7, which glows in the dark and was once used in watch dials."]
}

# 1. Read generate_elements.py
with open("generate_elements.py", "r", encoding="utf-8") as f:
    code = f.read()

# Restore generate_elements.py to its state with 2 clues first (to avoid parsing issues if clues were already updated)
# We can find current clues and check if they are already in the 4-clue list or 2-clue list.
# Actually, let's just do the string replace cleanly.
# If we have 2 clues: clues: [ "...", "..." ]
# Let's extract the list content and re-inject.
pattern = r'elements_data\s*=\s*\[(.*?)\]\n\n# Write JS file'
match = re.search(pattern, code, re.DOTALL)
if not match:
    print("ERROR: Could not find elements_data list in generate_elements.py")
    exit(1)

list_content = match.group(1)

dict_pattern = r'(\{\s*"number":\s*(\d+),\s*.*?\n\s*\})'
dicts = re.findall(dict_pattern, list_content, re.DOTALL)

updated_list_content = list_content

for full_dict, num_str in dicts:
    num = int(num_str)
    
    # We will search for clues: [ "...", "..." ] (which is the current shape of clues in the code)
    # If clues are already updated to a list of 4 items, let's check:
    clues_match = re.search(r'"clues":\s*\[\s*"(.*?)"\s*,\s*"(.*?)"\s*\]', full_dict, re.DOTALL)
    if not clues_match:
        # Check if already has 4 clues to prevent duplicate injection
        has_four = re.search(r'"clues":\s*\[\s*".*?"\s*,\s*".*?"\s*,\s*".*?"\s*,\s*".*?"\s*\]', full_dict, re.DOTALL)
        if has_four:
            print(f"Skipping element {num}: already has 4 clues.")
            continue
        print(f"WARNING: Clues not found in expected format for element {num}")
        continue
        
    c1, c2 = clues_match.group(1), clues_match.group(2)
    
    if num in extra_clues:
        new_c1_alt, new_c2_alt = extra_clues[num][0], extra_clues[num][1]
        new_clues_str = f'"clues": [\n      "{c1}",\n      "{new_c1_alt}",\n      "{c2}",\n      "{new_c2_alt}"\n    ]'
        old_clues_str = clues_match.group(0)
        new_full_dict = full_dict.replace(old_clues_str, new_clues_str)
        updated_list_content = updated_list_content.replace(full_dict, new_full_dict)
    else:
        print(f"WARNING: Element {num} is missing from extra_clues!")

new_code = code.replace(list_content, updated_list_content)

with open("generate_elements.py", "w", encoding="utf-8") as f:
    f.write(new_code)

print("SUCCESS: Expanded generate_elements.py clues pool to 4 items per element.")
