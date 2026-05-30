import re

# Precise metadata dictionary for all 118 elements
metadata = {
    1: {"mass": "1.008", "config": "1s1", "use": "Main fuel for stars and used in industrial hydrogenating of oils."},
    2: {"mass": "4.0026", "config": "1s2", "use": "Used in cryogenic cooling of MRI machines and inflating balloons."},
    3: {"mass": "6.94", "config": "[He] 2s1", "use": "Commonly used in rechargeable lithium-ion batteries for electronics."},
    4: {"mass": "9.0122", "config": "[He] 2s2", "use": "Used in aerospace alloys and mirrors for the James Webb Space Telescope."},
    5: {"mass": "10.81", "config": "[He] 2s2 2p1", "use": "Used to make heat-resistant borosilicate glass and agricultural fertilizers."},
    6: {"mass": "12.011", "config": "[He] 2s2 2p2", "use": "Formative basis of organic chemistry and diamond/graphite structures."},
    7: {"mass": "14.007", "config": "[He] 2s2 2p3", "use": "Used in liquid cooling systems and manufacturing synthetic fertilizers."},
    8: {"mass": "15.999", "config": "[He] 2s2 2p4", "use": "Essential for cellular respiration and combustion processes."},
    9: {"mass": "18.998", "config": "[He] 2s2 2p5", "use": "Added to public drinking water systems and toothpaste to prevent dental cavities."},
    10: {"mass": "20.180", "config": "[He] 2s2 2p6", "use": "Emits a brilliant orange-red glow in high-voltage vacuum tube lighting signs."},
    11: {"mass": "22.990", "config": "[Ne] 3s1", "use": "Combined with chlorine to create table salt and used in street lamp bulbs."},
    12: {"mass": "24.305", "config": "[Ne] 3s2", "use": "Crucial central element in plant chlorophyll and lightweight alloys."},
    13: {"mass": "26.982", "config": "[Ne] 3s2 3p1", "use": "Widely used in beverage cans, cooking foil, and aircraft construction."},
    14: {"mass": "28.085", "config": "[Ne] 3s2 3p2", "use": "The foundational semiconductor substrate for modern computer microchips."},
    15: {"mass": "30.974", "config": "[Ne] 3s2 3p3", "use": "Essential component in match head strike strips and safety flare mixes."},
    16: {"mass": "32.06", "config": "[Ne] 3s2 3p4", "use": "Primary feedstock for sulfuric acid synthesis and vulcanizing rubber tires."},
    17: {"mass": "35.45", "config": "[Ne] 3s2 3p5", "use": "Extensively used to sanitize public swimming pools and municipal drinking water."},
    18: {"mass": "39.948", "config": "[Ne] 3s2 3p6", "use": "Used as an inert shielding gas in double-pane thermal windows and welding."},
    19: {"mass": "39.098", "config": "[Ar] 4s1", "use": "Crucial electrolyte for human muscle contraction, abundant in bananas."},
    20: {"mass": "40.078", "config": "[Ar] 4s2", "use": "The primary structural component in plaster, cement, and vertebrate bones."},
    21: {"mass": "44.956", "config": "[Ar] 3d1 4s2", "use": "Alloyed with aluminum to construct high-performance bicycle frames and aerospace parts."},
    22: {"mass": "47.867", "config": "[Ar] 3d2 4s2", "use": "Used to make medical joint replacement implants due to its biocompatibility."},
    23: {"mass": "50.942", "config": "[Ar] 3d3 4s2", "use": "Added to steel alloys for tools, axles, and military armor plating."},
    24: {"mass": "51.996", "config": "[Ar] 3d5 4s1", "use": "Creates the protective corrosion-resistant passive layer in stainless steel."},
    25: {"mass": "54.938", "config": "[Ar] 3d5 4s2", "use": "Used as a deoxidizer in industrial steel production and in dry cell batteries."},
    26: {"mass": "55.845", "config": "[Ar] 3d6 4s2", "use": "The primary metallic constituent of structural steel and human hemoglobin."},
    27: {"mass": "58.933", "config": "[Ar] 3d7 4s2", "use": "Formulates blue pigments in ceramics and is key in lithium-ion batteries."},
    28: {"mass": "58.693", "config": "[Ar] 3d8 4s2", "use": "Plated onto hardware to prevent rust and used in rechargeable battery chemistries."},
    29: {"mass": "63.546", "config": "[Ar] 3d10 4s1", "use": "The standard metal used for household electrical wiring due to high conductivity."},
    30: {"mass": "65.38", "config": "[Ar] 3d10 4s2", "use": "Coated onto steel in galvanization to act as a sacrificial anode against rust."},
    31: {"mass": "69.723", "config": "[Ar] 3d10 4s2 4p1", "use": "Can melt in a human hand and is used in optoelectronic blue laser diodes."},
    32: {"mass": "72.630", "config": "[Ar] 3d10 4s2 4p2", "use": "Used in wide-angle camera lenses, fiber optics, and infrared night vision."},
    33: {"mass": "74.922", "config": "[Ar] 3d10 4s2 4p3", "use": "A historically notorious poison, now used as a dopant in semiconductors."},
    34: {"mass": "78.971", "config": "[Ar] 3d10 4s2 4p4", "use": "Used in photocopier drums and solar cells due to its light-reactive conductivity."},
    35: {"mass": "79.904", "config": "[Ar] 3d10 4s2 4p5", "use": "Used in halogenated flame retardants and water treatment chemicals."},
    36: {"mass": "83.798", "config": "[Ar] 3d10 4s2 4p6", "use": "Fills energy-efficient fluorescent bulbs and high-speed photography flashes."},
    37: {"mass": "85.468", "config": "[Kr] 5s1", "use": "Utilized in vapor cell atomic clocks and purple firework formulas."},
    38: {"mass": "87.62", "config": "[Kr] 5s2", "use": "Produces the intense crimson-red color in flares and fireworks."},
    39: {"mass": "88.906", "config": "[Kr] 4d1 5s2", "use": "Used to make red phosphors in old CRT screens and high-temperature superconductors."},
    40: {"mass": "91.224", "config": "[Kr] 4d2 5s2", "use": "Used as structural cladding for nuclear reactor rods due to low neutron absorption."},
    41: {"mass": "92.906", "config": "[Kr] 4d4 5s1", "use": "Alloyed in superalloys for jet engines and superconducting magnets in MRI units."},
    42: {"mass": "95.95", "config": "[Kr] 4d5 5s1", "use": "Provides high-temperature strength in structural steel alloys and lubricants."},
    43: {"mass": "97.91", "config": "[Kr] 4d5 5s2", "use": "A radioactive isotope used as a medical diagnostic tracer in body imaging."},
    44: {"mass": "101.07", "config": "[Kr] 4d7 5s1", "use": "Hardens platinum alloys for high-wear electrical contact pads."},
    45: {"mass": "102.91", "config": "[Kr] 4d8 5s1", "use": "An extremely rare metal used to catalyze and reduce toxic vehicle exhausts."},
    46: {"mass": "106.42", "config": "[Kr] 4d10", "use": "Absorbs up to 900 times its volume in hydrogen gas, vital for gas purifiers."},
    47: {"mass": "107.87", "config": "[Kr] 4d10 5s1", "use": "Has the highest electrical and thermal conductivity of any element."},
    48: {"mass": "112.41", "config": "[Kr] 4d10 5s2", "use": "Used in control rods of nuclear reactors and plastic stabilizers."},
    49: {"mass": "114.82", "config": "[Kr] 4d10 5s2 5p1", "use": "Combined with tin oxide to make transparent touchscreen coatings for phones."},
    50: {"mass": "118.71", "config": "[Kr] 4d10 5s2 5p2", "use": "Alloyed with copper to make bronze and used as plating to protect steel food cans."},
    51: {"mass": "121.76", "config": "[Kr] 4d10 5s2 5p3", "use": "Alloyed with lead to harden lead-acid batteries and used in flame retardants."},
    52: {"mass": "127.60", "config": "[Kr] 4d10 5s2 5p4", "use": "Used in solar panels, thermoelectric devices, and rewritable DVDs."},
    53: {"mass": "126.90", "config": "[Kr] 4d10 5s2 5p5", "use": "Used as a disinfectant antiseptic and added to table salt to prevent goiters."},
    54: {"mass": "131.29", "config": "[Kr] 4d10 5s2 5p6", "use": "Fills blue-tinted high-intensity discharge car headlights and ion thrusters."},
    55: {"mass": "132.91", "config": "[Xe] 6s1", "use": "Its atomic vibration is the international standard definition for a single second."},
    56: {"mass": "137.33", "config": "[Xe] 6s2", "use": "Swallowed as a contrast agent to visualize the gastrointestinal tract under X-rays."},
    57: {"mass": "138.91", "config": "[Xe] 5d1 6s2", "use": "Fills carbon arc studio lights and serves in nickel-metal hydride batteries."},
    58: {"mass": "140.12", "config": "[Xe] 4f1 5d1 6s2", "use": "Used as a glass polishing compound and as the flint spark-maker in lighters."},
    59: {"mass": "140.91", "config": "[Xe] 4f3 6s2", "use": "Doped in glass for welder goggles to filter out intense yellow flare light."},
    60: {"mass": "144.24", "config": "[Xe] 4f4 6s2", "use": "Alloyed to make the strongest permanent magnets for wind turbines and motors."},
    61: {"mass": "145", "config": "[Xe] 4f5 6s2", "use": "A synthetic radioactive isotope used in miniature nuclear batteries."},
    62: {"mass": "150.36", "config": "[Xe] 4f6 6s2", "use": "Used in specialized magnets that remain magnetic at extremely high temperatures."},
    63: {"mass": "151.96", "config": "[Xe] 4f7 6s2", "use": "Serves as the red phosphor in LED displays and inside anti-counterfeit banknote inks."},
    64: {"mass": "157.25", "config": "[Xe] 4f7 5d1 6s2", "use": "Injected as a heavy metal contrast agent for MRI scans."},
    65: {"mass": "158.93", "config": "[Xe] 4f9 6s2", "use": "Serves as the green phosphor in fluorescent lighting and color displays."},
    66: {"mass": "162.50", "config": "[Xe] 4f10 6s2", "use": "Added to high-power magnets to prevent them from demagnetizing under load."},
    67: {"mass": "164.93", "config": "[Xe] 4f11 6s2", "use": "Has the highest magnetic concentration capability, used in pole pieces."},
    68: {"mass": "167.26", "config": "[Xe] 4f12 6s2", "use": "Doped into optical fiber amplifiers to boost long-distance internet signals."},
    69: {"mass": "168.93", "config": "[Xe] 4f13 6s2", "use": "Utilized as a radiation emitter source in portable dental X-ray machines."},
    70: {"mass": "173.05", "config": "[Xe] 4f14 6s2", "use": "Utilized in fiber laser cutters and high-precision optical clocks."},
    71: {"mass": "174.97", "config": "[Xe] 4f14 5d1 6s2", "use": "Mainly used as a catalyst in petroleum cracking and in cancer therapies."},
    72: {"mass": "178.49", "config": "[Xe] 4f14 5d2 6s2", "use": "Acts as a nuclear reactor neutron absorber in control rods."},
    73: {"mass": "180.95", "config": "[Xe] 4f14 5d3 6s2", "use": "Made into highly compact electrical capacitors for modern smartphones."},
    74: {"mass": "183.84", "config": "[Xe] 4f14 5d4 6s2", "use": "Has the highest melting point of all metals, once used in bulb filaments."},
    75: {"mass": "186.21", "config": "[Xe] 4f14 5d5 6s2", "use": "Alloyed in nickel superalloys for jet engine turbine blades."},
    76: {"mass": "190.23", "config": "[Xe] 4f14 5d6 6s2", "use": "The densest naturally occurring element, used for high-wear pen tips."},
    77: {"mass": "192.22", "config": "[Xe] 4f14 5d7 6s2", "use": "An asteroid marker in Earth's crust, used for high-temperature spark plugs."},
    78: {"mass": "195.08", "config": "[Xe] 4f14 5d9 6s1", "use": "Used as an active catalyst in laboratory crucibles and auto exhaust systems."},
    79: {"mass": "196.97", "config": "[Xe] 4f14 5d10 6s1", "use": "An unreactive precious metal used for currency, jewelry, and electronics."},
    80: {"mass": "200.59", "config": "[Xe] 4f14 5d10 6s2", "use": "The only metal that is liquid at room temperature, once used in thermometers."},
    81: {"mass": "204.38", "config": "[Xe] 4f14 5d10 6s2 6p1", "use": "Used in specialized high-index glass lenses and infrared optical sensors."},
    82: {"mass": "207.2", "config": "[Xe] 4f14 5d10 6s2 6p2", "use": "Acts as a heavy radiation shield in medical X-ray imaging rooms."},
    83: {"mass": "208.98", "config": "[Xe] 4f14 5d10 6s2 6p3", "use": "The active non-toxic ingredient in pink antacid stomach relief medications."},
    84: {"mass": "209", "config": "[Xe] 4f14 5d10 6s2 6p4", "use": "A highly radioactive alpha particle emitter used in space probe heaters."},
    85: {"mass": "210", "config": "[Xe] 4f14 5d10 6s2 6p5", "use": "The rarest element in Earth's crust, researched for targeted alpha cancer therapy."},
    86: {"mass": "222", "config": "[Xe] 4f14 5d10 6s2 6p6", "use": "A naturally occurring radioactive gas that is a major indoor health hazard."},
    87: {"mass": "223", "config": "[Rn] 7s1", "use": "An extremely short-lived radioactive alkali metal studied in scientific research."},
    88: {"mass": "226", "config": "[Rn] 7s2", "use": "Historically painted on watch dials to make them glow in the dark."},
    89: {"mass": "227", "config": "[Rn] 6d1 7s2", "use": "Used as a powerful source of neutrons in industrial laboratories."},
    90: {"mass": "232.04", "config": "[Rn] 6d2 7s2", "use": "Studied as a safer, more abundant alternative fuel for nuclear power reactors."},
    91: {"mass": "231.04", "config": "[Rn] 5f2 6d1 7s2", "use": "One of the rarest radioactive actinides, currently has no commercial uses."},
    92: {"mass": "238.03", "config": "[Rn] 5f3 6d1 7s2", "use": "Its isotopes serve as the core fuel for civilian nuclear power plants."},
    93: {"mass": "237", "config": "[Rn] 5f4 6d1 7s2", "use": "The first synthetic transuranic element, used in neutron detection gear."},
    94: {"mass": "244", "config": "[Rn] 5f6 7s2", "use": "Serves as nuclear fuel in reactor cores and deep-space thermal batteries."},
    95: {"mass": "243", "config": "[Rn] 5f7 7s2", "use": "Fills the ionization chamber inside common household smoke detector units."},
    96: {"mass": "247", "config": "[Rn] 5f7 6d1 7s2", "use": "Used as an alpha emitter source for X-ray spectrometers on Mars rovers."},
    97: {"mass": "247", "config": "[Rn] 5f9 7s2", "use": "A synthetic metal primarily used as a target to manufacture heavier elements."},
    98: {"mass": "251", "config": "[Rn] 5f10 7s2", "use": "A highly active neutron emitter used to boot up commercial nuclear reactors."},
    99: {"mass": "252", "config": "[Rn] 5f11 7s2", "use": "Discovered in the radioactive fallout of the first thermonuclear test."},
    100: {"mass": "257", "config": "[Rn] 5f12 7s2", "use": "The heaviest element that can be formed by bombarding lighter elements."},
    101: {"mass": "258", "config": "[Rn] 5f13 7s2", "use": "Named after Mendeleev, created by bombarding einsteinium with alpha rays."},
    102: {"mass": "259", "config": "[Rn] 5f14 7s2", "use": "First synthesized in a cyclotron, named after Alfred Nobel."},
    103: {"mass": "266", "config": "[Rn] 5f14 7s2 7p1", "use": "The final element of the actinide series, named after Ernest Lawrence."},
    104: {"mass": "267", "config": "[Rn] 5f14 6d2 7s2", "use": "A synthetic transactinide element with a half-life of a few seconds."},
    105: {"mass": "268", "config": "[Rn] 5f14 6d3 7s2", "use": "A synthetic metal created in laboratories, named after Dubna, Russia."},
    106: {"mass": "269", "config": "[Rn] 5f14 6d4 7s2", "use": "Named after Glenn Seaborg, the first element named for a living person."},
    107: {"mass": "270", "config": "[Rn] 5f14 6d5 7s2", "use": "Named after Niels Bohr, created by bombarding bismuth with chromium."},
    108: {"mass": "277", "config": "[Rn] 5f14 6d6 7s2", "use": "Named after the German state of Hesse, has extremely brief half-lives."},
    109: {"mass": "278", "config": "[Rn] 5f14 6d7 7s2", "use": "Named after physicist Lise Meitner, co-discoverer of nuclear fission."},
    110: {"mass": "281", "config": "[Rn] 5f14 6d8 7s2", "use": "First synthesized in Darmstadt, Germany; decays within seconds."},
    111: {"mass": "282", "config": "[Rn] 5f14 6d9 7s2", "use": "Named after Roentgen, discoverer of X-rays; belongs to the copper group."},
    112: {"mass": "285", "config": "[Rn] 5f14 6d10 7s2", "use": "Named after astronomer Copernicus; behaves like a volatile noble gas."},
    113: {"mass": "286", "config": "[Rn] 5f14 6d10 7s2 7p1", "use": "The first element discovered in Asia, named after the Japanese word Nihon."},
    114: {"mass": "289", "config": "[Rn] 5f14 6d10 7s2 7p2", "use": "Named after Flerov Laboratory; resides near the theoretical island of stability."},
    115: {"mass": "290", "config": "[Rn] 5f14 6d10 7s2 7p3", "use": "A highly unstable synthetic element, named in honor of Moscow, Russia."},
    116: {"mass": "293", "config": "[Rn] 5f14 6d10 7s2 7p4", "use": "Named after Lawrence Livermore Laboratory, decays in milliseconds."},
    117: {"mass": "294", "config": "[Rn] 5f14 6d10 7s2 7p5", "use": "Resides in the halogen column, named in honor of the state of Tennessee."},
    118: {"mass": "294", "config": "[Rn] 5f14 6d10 7s2 7p6", "use": "The heaviest element discovered, completing the 7th row of the table."}
}

with open("generate_elements.py", "r", encoding="utf-8") as f:
    code = f.read()

# We need to parse elements_data list and add fields to dicts
# Let's find elements_data = [ ... ]
pattern = r'elements_data\s*=\s*\[(.*?)\]\n\n# Write JS file'
match = re.search(pattern, code, re.DOTALL)
if not match:
    print("ERROR: Could not find elements_data list in generate_elements.py")
    exit(1)

list_content = match.group(1)

# We can parse elements line by line or dictionary by dictionary
# Each dict has format: { "number": X, "symbol": "...", "name": "...", "state": "...", "category": "...", "tier": X, "clues": [...] }
# Let's match each dict block:
dict_pattern = r'(\{\s*"number":\s*(\d+),\s*.*?\n\s*\})'
dicts = re.findall(dict_pattern, list_content, re.DOTALL)

updated_list_content = list_content
for full_dict, num_str in dicts:
    num = int(num_str)
    if num in metadata:
        meta = metadata[num]
        # Format the injection fields:
        # "mass": "...", "config": "...", "use": "...",
        injection = f'"number": {num}, "mass": "{meta["mass"]}", "config": "{meta["config"]}", "use": "{meta["use"]}",'
        # Replace '"number": X,' with the injection in full_dict
        target = f'"number": {num},'
        new_full_dict = full_dict.replace(target, injection)
        updated_list_content = updated_list_content.replace(full_dict, new_full_dict)

# Replace back in the main code
new_code = code.replace(list_content, updated_list_content)

with open("generate_elements.py", "w", encoding="utf-8") as f:
    f.write(new_code)

print("SUCCESS: Injected mass, config, and use into generate_elements.py")
