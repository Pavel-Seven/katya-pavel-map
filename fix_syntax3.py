with open("desktop.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace literal \n in sidebar logic
content = content.replace(r'\n        if (node.id === \'passport-compare\') {', '\n        if (node.id === \'passport-compare\') {')

with open("desktop.html", "w", encoding="utf-8") as f:
    f.write(content)

