with open('_reference/philip_bundle.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

import re
# Let's see what text exists in the whole file
sections = ["hero", "about", "projects", "skills", "contact", "footer"]
for s in sections:
    idx = js.find(f'id:"{s}"')
    if idx != -1:
        print(f"=== SECTION: {s} ===")
        print(js[idx:idx+800])

