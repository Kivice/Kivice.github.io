import json

with open('_reference/repos.json', 'r', encoding='utf-8') as f:
    repos = json.load(f)

print(f"Total repos: {len(repos)}")
for i, r in enumerate(repos):
    print(f"{i+1}. {r.get('name')} | Lang: {r.get('language')} | Updated: {r.get('updated_at')}")

