import os
import xml.etree.ElementTree as ET
from datetime import datetime

dist_dir = 'dist'
site_url = 'https://roasbodhi.in'

if not os.path.exists(dist_dir):
    print("Build directory not found!")
    exit(1)

# Collect all index.html paths
urls = []
for root, dirs, files in os.walk(dist_dir):
    for file in files:
        if file == 'index.html':
            rel_path = os.path.relpath(root, dist_dir)
            if rel_path == '.':
                url = site_url + '/'
            else:
                url_path = rel_path.replace('\\', '/')
                url = f"{site_url}/{url_path}/"
            urls.append(url)

# Classify URLs into different groups
sitemap_pages = []
sitemap_blog = []
sitemap_services = []
sitemap_results = []
sitemap_locations = []

static_paths = [site_url + '/', site_url + '/about/', site_url + '/contact/', site_url + '/pricing/', site_url + '/bodhi-utsav/', site_url + '/privacy/', site_url + '/terms/', site_url + '/refunds/', site_url + '/disclaimer/', site_url + '/cookie-policy/', site_url + '/msa/', site_url + '/legal/', site_url + '/results/', site_url + '/testimonials/']

for url in urls:
    if url in static_paths:
        sitemap_pages.append(url)
    elif '/blog/' in url:
        sitemap_blog.append(url)
    elif '/services/' in url:
        sitemap_services.append(url)
    elif '/results/' in url:
        sitemap_results.append(url)
    else:
        # Locations / programmatic SEO routes
        sitemap_locations.append(url)

def write_sitemap_file(filename, url_list, change_freq, priority_val):
    urlset = ET.Element('urlset', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for url in sorted(url_list):
        url_el = ET.SubElement(urlset, 'url')
        loc = ET.SubElement(url_el, 'loc')
        loc.text = url
        lastmod = ET.SubElement(url_el, 'lastmod')
        lastmod.text = datetime.now().strftime('%Y-%m-%d')
        changefreq = ET.SubElement(url_el, 'changefreq')
        changefreq.text = change_freq
        priority = ET.SubElement(url_el, 'priority')
        
        # Adjust priorities based on tiers inside location lists if possible
        current_pri = priority_val
        if url == site_url + '/':
            current_pri = '1.0'
        elif '/about/' in url or '/contact/' in url:
            current_pri = '0.5'
            
        priority.text = current_pri

    tree = ET.ElementTree(urlset)
    try:
        ET.indent(tree, space="  ", level=0)
    except AttributeError:
        pass
    
    file_path = os.path.join(dist_dir, filename)
    tree.write(file_path, encoding='utf-8', xml_declaration=True)
    print(f"Generated {filename} with {len(url_list)} URLs")

# 1. Write sub-sitemaps
write_sitemap_file('sitemap-pages.xml', sitemap_pages, 'daily', '0.8')
write_sitemap_file('sitemap-blog.xml', sitemap_blog, 'weekly', '0.7')
write_sitemap_file('sitemap-services.xml', sitemap_services, 'weekly', '0.9')
write_sitemap_file('sitemap-results.xml', sitemap_results, 'weekly', '0.8')
write_sitemap_file('sitemap-locations.xml', sitemap_locations, 'monthly', '0.7')

# 2. Write master sitemap-index.xml
sitemap_index = ET.Element('sitemapindex', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

sitemaps = ['sitemap-pages.xml', 'sitemap-blog.xml', 'sitemap-services.xml', 'sitemap-results.xml', 'sitemap-locations.xml']
for sm in sitemaps:
    sitemap_el = ET.SubElement(sitemap_index, 'sitemap')
    loc = ET.SubElement(sitemap_el, 'loc')
    loc.text = f"{site_url}/{sm}"
    lastmod = ET.SubElement(sitemap_el, 'lastmod')
    lastmod.text = datetime.now().strftime('%Y-%m-%d')

tree_index = ET.ElementTree(sitemap_index)
try:
    ET.indent(tree_index, space="  ", level=0)
except AttributeError:
    pass

sitemap_index_path = os.path.join(dist_dir, 'sitemap-index.xml')
tree_index.write(sitemap_index_path, encoding='utf-8', xml_declaration=True)

# Also keep general sitemap.xml pointing to sitemap-index.xml for backward-compatibility fallback
with open(os.path.join(dist_dir, 'sitemap.xml'), 'w') as f:
    f.write(f'<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>{site_url}/sitemap-index.xml</loc>\n  </sitemap>\n</sitemapindex>')

print("Sitemap indexing system updated successfully!")
