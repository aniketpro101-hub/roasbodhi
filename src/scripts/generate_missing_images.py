import os
import json
import re
from PIL import Image, ImageDraw, ImageFont

def draw_beautiful_placeholder(filepath, width, height, title, subtitle, bg_style='saffron'):
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)

    # Gradients config
    gradients = {
        'saffron': ((30, 27, 75), (255, 107, 43)),     # Indigo to Saffron
        'purple': ((24, 20, 50), (147, 51, 234)),     # Dark Purple to Bright Purple
        'emerald': ((15, 45, 30), (16, 185, 129)),     # Dark Emerald to Green
        'blue': ((15, 30, 75), (59, 130, 246)),        # Deep Blue to Bright Blue
        'gold': ((30, 27, 75), (245, 166, 35)),       # Indigo to Gold
    }

    c1, c2 = gradients.get(bg_style, gradients['saffron'])

    # Draw gradient background
    for y in range(height):
        t = y / float(height)
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Draw ambient tech grid pattern
    grid_size = 20
    for x in range(0, width, grid_size):
        draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 10), width=1)
    for y in range(0, height, grid_size):
        draw.line([(0, y), (width, y)], fill=(255, 255, 255, 10), width=1)

    # Draw Title
    try:
        font_title = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 20)
        font_sub = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 13)
    except Exception:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Wrap title if long
    words = title.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        # Approximate width check
        line_str = " ".join(current_line)
        if len(line_str) > 36:
            current_line.pop()
            lines.append(" ".join(current_line))
            current_line = [word]
    if current_line:
        lines.append(" ".join(current_line))

    # Draw title lines
    start_y = 120
    for i, line in enumerate(lines[:3]):
        # Center align text
        try:
            w = draw.textlength(line, font=font_title)
        except AttributeError:
            w = len(line) * 11
        draw.text(((width - w) // 2, start_y + i * 28), line, fill=(255, 255, 255), font=font_title)

    # Draw Subtitle
    try:
        w_sub = draw.textlength(subtitle, font=font_sub)
    except AttributeError:
        w_sub = len(subtitle) * 7
    draw.text(((width - w_sub) // 2, height - 60), subtitle, fill=(255, 215, 0), font=font_sub)

    # Save file
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    img.save(filepath, "JPEG", quality=90)
    print(f"Generated placeholder image: {filepath}")

def generate_all():
    # 1. Generate Case Study images
    with open("src/data/case-studies.json", "r", encoding="utf-8") as f:
        cases = json.load(f)

    styles = ['blue', 'gold', 'emerald', 'purple', 'saffron', 'blue']
    for idx, case in enumerate(cases):
        # We need to generate main image and gallery images if listed
        img_path = case.get("featured_image", "").strip("/")
        if img_path:
            full_path = os.path.join("public", img_path)
            draw_beautiful_placeholder(
                full_path, 600, 400, 
                case["title"], 
                f"{case['client_type']} | {case['city']}", 
                styles[idx % len(styles)]
            )
        
        # Gallery images
        for g_idx, g_path in enumerate(case.get("gallery", [])):
            g_path = g_path.strip("/")
            if g_path:
                full_g_path = os.path.join("public", g_path)
                draw_beautiful_placeholder(
                    full_g_path, 600, 400,
                    f"Gallery Image {g_idx + 1}",
                    case["title"],
                    styles[idx % len(styles)]
                )

    # 2. Generate Blog Post images
    blog_dir = "src/content/blog"
    blog_styles = {
        'Meta Ads': 'saffron',
        'Google Ads': 'purple',
        'Web Design': 'blue',
        'GMB SEO': 'emerald',
        'Analytics': 'gold',
        'General': 'saffron'
    }

    for f in os.listdir(blog_dir):
        if f.endswith(".md"):
            path = os.path.join(blog_dir, f)
            content = open(path, encoding='utf-8').read()
            
            # Extract frontmatter fields
            title_match = re.search(r'^title:\s*\"?(.*?)\"?$', content, re.MULTILINE)
            category_match = re.search(r'^category:\s*\"?(.*?)\"?$', content, re.MULTILINE)
            image_match = re.search(r'^image:\s*\"?(.*?)\"?$', content, re.MULTILINE)

            if title_match and image_match:
                title = title_match.group(1).strip()
                img_path = image_match.group(1).strip().strip('"').strip("'").strip("/")
                category = category_match.group(1).strip() if category_match else "General"
                
                style = blog_styles.get(category, 'saffron')
                full_path = os.path.join("public", img_path)
                draw_beautiful_placeholder(
                    full_path, 800, 450,
                    title,
                    f"RoasBodhi Blog | Category: {category}",
                    style
                )

if __name__ == "__main__":
    generate_all()
