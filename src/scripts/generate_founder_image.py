import os
from PIL import Image, ImageDraw, ImageFont

def generate_founder():
    width = 400
    height = 500
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)

    # Gradient background: deep indigo to saffron
    c1 = (30, 27, 75)      # Indigo
    c2 = (255, 107, 43)    # Saffron
    for y in range(height):
        t = y / float(height)
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Draw a stylized silhouette of a head & shoulders in white/grey
    # Head circle
    draw.ellipse([140, 120, 260, 240], fill=(255, 255, 255), outline=None)
    # Shoulders/body
    draw.ellipse([80, 250, 320, 480], fill=(255, 255, 255), outline=None)

    # Draw collar/tie details or simple lines
    draw.line([(200, 250), (200, 300)], fill=(30, 27, 75), width=4)
    draw.polygon([(200, 300), (180, 350), (220, 350)], fill=(255, 107, 43)) # saffron tie/accent

    # Draw text: Aniket Singh (Founder)
    try:
        font = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 24)
        font_sub = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 16)
    except Exception:
        font = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    draw.text((120, 410), "Aniket Singh", fill=(255, 255, 255), font=font)
    draw.text((150, 445), "Founder Story", fill=(255, 215, 0), font=font_sub)

    # Save to public/images/team/
    os.makedirs("public/images/team", exist_ok=True)
    img.save("public/images/team/founder-aniket.jpg", "JPEG", quality=95)
    print("Founder placeholder generated successfully at public/images/team/founder-aniket.jpg")

if __name__ == "__main__":
    generate_founder()
