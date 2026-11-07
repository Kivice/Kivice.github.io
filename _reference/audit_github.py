import json

with open('_reference/kivice_repos.json', 'r', encoding='utf-8') as f:
    repos = json.load(f)

forks = [r for r in repos if r.get('fork')]
sources = [r for r in repos if not r.get('fork')]

print(f"Total Repos: {len(repos)}")
print(f"Forked Repos: {len(forks)}")
print(f"Original / Source Repos: {len(sources)}")

print("\n--- Original / Source Repos ---")
for r in sources:
    desc = r.get('description') or 'NO DESCRIPTION'
    print(f"- {r['name']} ({r.get('language')}) : {desc[:70]}")

print("\n--- Forked Repos ---")
for r in forks:
    desc = r.get('description') or 'NO DESCRIPTION'
    print(f"- {r['name']} : {desc[:70]}")

