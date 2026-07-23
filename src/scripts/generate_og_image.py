import os
import sys
from PIL import Image, ImageDraw, ImageFont

# Set output to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

def get_font(font_name, size):
    # Standard Windows fonts path
    win_font_paths = [
        f"C:\\Windows\\Fonts\\{font_name}.ttf",
        f"C:\\Windows\\Fonts\\segoeui.ttf",
        f"C:\\Windows\\Fonts\\arial.ttf"
    ]
    for path in win_font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()

def draw_og_image():
    # 1. Create base 1200x630 image
    width = 1200
    height = 630
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)

    # 2. Draw background gradient from Indigo (#1E1B4B) to Saffron (#FF6B2B)
    c1 = (30, 27, 75)      # Indigo
    c2 = (255, 107, 43)    # Saffron
    for x in range(width):
        t = x / float(width)
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        draw.line([(x, 0), (x, height)], fill=(r, g, b))

    # 3. Load Fonts
    font_title = get_font("segoeuib", 72)
    font_subtitle = get_font("segoeui", 32)
    font_pill = get_font("segoeuib", 20)
    font_medium = get_font("segoeuib", 28)
    font_url = get_font("segoeuib", 38)
    font_bottom_light = get_font("segoeui", 18)
    font_bottom_bold = get_font("segoeuib", 22)

    # 4. Draw Bodhi Leaf Logo on the Left
    # Leaf path coordinates scaled to fit box of 70x70 at (100, 160)
    # The SVG path is: M20 2C20 2 34 16 34 26C34 32.6274 27.732 38 20 38C12.268 38 6 32.6274 6 26C6 16 20 2 20 2Z
    # We can approximate this shape using an ellipse/circle and a pointed top triangle
    draw.ellipse([95, 165, 165, 235], fill=(255, 255, 255), outline=None)
    # Draw pointed tip
    draw.polygon([(130, 125), (105, 175), (155, 175)], fill=(255, 255, 255))
    # Draw logo interior graphics (stem/vein) in saffron color
    draw.line([(130, 140), (130, 220)], fill=(255, 107, 43), width=4)
    draw.line([(130, 200), (150, 180)], fill=(255, 107, 43), width=3)
    draw.line([(130, 180), (155, 155)], fill=(255, 107, 43), width=3)
    draw.line([(130, 200), (110, 180)], fill=(255, 107, 43), width=3)
    draw.line([(130, 180), (105, 155)], fill=(255, 107, 43), width=3)

    # 5. Draw "RoasBodhi" wordmark
    # We draw "Roas" in white and "Bodhi" in Saffron (#FF6B2B) next to each other
    draw.text((195, 140), "Roas", fill=(255, 255, 255), font=font_title)
    # Compute size of "Roas" to position "Bodhi" correctly
    try:
        roas_width = draw.textlength("Roas", font=font_title)
    except AttributeError:
        roas_width = 150 # fallback approximation
    draw.text((195 + roas_width, 140), "Bodhi", fill=(255, 215, 0), font=font_title) # Gold

    # 6. Draw Left Tagline
    draw.text((100, 260), "Awakening Your Ad Returns", fill=(255, 255, 255), font=font_subtitle)
    draw.text((100, 310), "India's Performance Marketing Agency", fill=(220, 220, 255), font=get_font("segoeui", 22))

    # 7. Draw Right Side: Key Services Pills
    services = ["Meta Ads", "Google Ads", "Web Design", "GMB Map SEO"]
    # Pill grid coordinates: 2 columns, 2 rows
    pill_coords = [
        (720, 150), (910, 150),
        (720, 210), (910, 210)
    ]
    for i, s in enumerate(services):
        cx, cy = pill_coords[i]
        # Draw rounded rectangle pill
        draw.rounded_rectangle([cx, cy, cx + 165, cy + 45], radius=22, fill=None, outline=(255, 255, 255), width=2)
        # Draw centered text inside pill
        try:
            w = draw.textlength(s, font=font_pill)
        except AttributeError:
            w = len(s) * 11
        tx = cx + (165 - w) / 2
        ty = cy + (45 - 24) / 2
        draw.text((tx, ty - 2), s, fill=(255, 255, 255), font=font_pill)

    # 8. Draw Right Sub-text & URL
    draw.text((720, 280), "📍 Pan India Coverage • 180+ Cities", fill=(255, 255, 255), font=font_medium)
    draw.text((720, 335), "roasbodhi.in", fill=(255, 215, 0), font=font_url)

    # 9. Draw Bottom Bar Separator and Content
    draw.line([(100, 480), (1100, 480)], fill=(255, 255, 255, 40), width=1)
    
    # Left bottom text
    draw.text((100, 505), "Namaste Sales Enterprises", fill=(200, 200, 200), font=font_bottom_light)
    # Right bottom text
    draw.text((100, 535), "Performance Marketing  •  Meta Ads  •  Google Ads  •  Web Design", fill=(255, 255, 255), font=font_bottom_bold)

    # 10. Save Image
    os.makedirs("public/images", exist_ok=True)
    img.save("public/images/roasbodhi-og.jpg", "JPEG", quality=95)
    print("OG Image generated successfully at public/images/roasbodhi-og.jpg")

if __name__ == "__main__":
    draw_og_image()
