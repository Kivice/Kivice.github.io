with open('_reference/philip_bundle.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

idx = js.find("Philip Gachie")
if idx != -1:
    print(js[max(0, idx-1000): min(len(js), idx+2000)])
else:
    print("Not found")
