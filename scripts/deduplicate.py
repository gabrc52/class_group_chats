"""
one-time-use script to return the duplicate rooms (based on data warehouse master number)
"""

import requests
from pprint import pprint

ENDPOINT = 'http://localhost:5173/classes/api/subjectWarehouse'

with open('list.txt', 'r') as f:
    aliases = f.read().split('\n')[:-1]

subjects = [
    alias.split('_')[1]
    for alias in aliases
]

# dictionary to store list of subjects with same name
d = {}

def get_master_number(subject):
    j = requests.get(f'{ENDPOINT}/{subject}').json()
    return j['masterNumber']

for subject in subjects:
    master_number = get_master_number(subject)
    d.setdefault(master_number, [])
    d[master_number].append(subject)

# we only want other numbers
for subject in d.keys():
    if subject in d[subject]:
        d[subject].remove(subject)

dd = {k: v for k,v in d.items() if v}

# we only want the ones with duplicates
pprint(dd)

q = ''.join(f'&class={value[0]}' for value in dd.values())

print(f'http://localhost:5173/classes/hydrantCallback?hydrant=true{q}')