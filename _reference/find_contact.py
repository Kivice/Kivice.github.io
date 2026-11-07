with open('_reference/philip_bundle.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

import re
emails = re.findall(r'[\w\.-]+@[\w\.-]+', js)
print("Emails found in bundle:", set(emails))

urls = re.findall(r'https?://[^\s"\'<>]+', js)
print("\nURLs found in bundle:")
for u in set(urls):
    if not any(k in u for k in ['w3.org', 'gpteng.co', 'github.com/shadcn']):
        print(" -", u)

