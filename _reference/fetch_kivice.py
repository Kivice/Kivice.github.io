import urllib.request, json

headers = {'User-Agent': 'Mozilla/5.0'}

# 1. Fetch user profile
try:
    req = urllib.request.Request('https://api.github.com/users/Kivice', headers=headers)
    with urllib.request.urlopen(req) as r:
        user = json.loads(r.read().decode('utf-8'))
        print('=== USER INFO: Kivice ===')
        for k in ['login', 'name', 'company', 'blog', 'location', 'email', 'bio', 'public_repos', 'avatar_url', 'html_url']:
            print(f'{k}: {user.get(k)}')
        with open('_reference/kivice_user.json', 'w', encoding='utf-8') as f:
            json.dump(user, f, indent=2)
except Exception as e:
    print('User fetch error:', e)

# 2. Fetch repos
try:
    req = urllib.request.Request('https://api.github.com/users/Kivice/repos?per_page=100&sort=updated', headers=headers)
    with urllib.request.urlopen(req) as r:
        repos = json.loads(r.read().decode('utf-8'))
        print(f'\n=== REPOSITORIES ({len(repos)}) ===')
        for r in repos:
            print(f"* {r.get('name')} | Lang: {r.get('language')} | Desc: {r.get('description')} | Homepage: {r.get('homepage')}")
            print(f"  URL: {r.get('html_url')}")
        with open('_reference/kivice_repos.json', 'w', encoding='utf-8') as f:
            json.dump(repos, f, indent=2)
except Exception as e:
    print('Repo fetch error:', e)

