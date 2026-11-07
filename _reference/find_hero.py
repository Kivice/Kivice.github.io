with open('_reference/philip_bundle.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

idx = js.find('id:"home"')
if idx == -1:
    idx = js.find('hero-gradient')
print(js[idx-100:idx+800])

