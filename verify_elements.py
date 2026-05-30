import sys
from generate_elements import elements_data

print(f"Total elements: {len(elements_data)}")

numbers = [e['number'] for e in elements_data]
unique_numbers = set(numbers)
print(f"Unique atomic numbers: {len(unique_numbers)}")

missing = [i for i in range(1, 119) if i not in unique_numbers]
if missing:
    print(f"Missing atomic numbers: {missing}")
else:
    print("All atomic numbers 1-118 are present!")

# Group by tier
tiers = {}
for e in elements_data:
    t = e['tier']
    tiers[t] = tiers.get(t, []) + [e['name']]

for t, names in sorted(tiers.items()):
    print(f"Tier {t}: {len(names)} elements")
