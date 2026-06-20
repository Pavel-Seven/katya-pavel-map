import re

with open("desktop.html", "r", encoding="utf-8") as f:
    content = f.read()

# Fix literal \n
content = content.replace(r'const edgesData = [\n', 'const edgesData = [\n')

# Replace text: "..." with text: `...`
# We use a non-greedy match that looks ahead for ', type:'
def replacer(match):
    inner = match.group(1)
    # Also escape any existing backticks inside the text just in case, though unlikely
    inner = inner.replace('`', r'\`')
    return f"text: `{inner}`, type:"

content = re.sub(r'text:\s*"(.*?)",\s*type:', replacer, content)

with open("desktop.html", "w", encoding="utf-8") as f:
    f.write(content)

