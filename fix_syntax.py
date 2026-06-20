import re

with open("desktop.html", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(r'const edgesData = [\n', 'const edgesData = [\n')

def replacer(match):
    inner = match.group(1)
    return f"text: `{inner}`"

content = re.sub(r'text:\s*"([^"]*)"', replacer, content)

with open("desktop.html", "w", encoding="utf-8") as f:
    f.write(content)

