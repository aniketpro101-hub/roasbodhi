import os
import re
import sys

# Reconfigure encoding for Windows shell execution compatibility
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Define target paths
PAGES_DIR = 'src/pages'

# Mismatched/Old prices we want to ensure do NOT exist in the codebase pages
FORBIDDEN_PATTERNS = [
    r'₹14,999',
    r'₹24,999',
    r'₹49,999'
]

# We also scan for any occurrences of "₹[0-9]" in pages to log warnings, except in legal/layouts/thank-you
WARN_PAGES_EXCLUDE = [
    'privacy.astro',
    'terms.astro',
    'refunds.astro',
    'thank-you.astro'
]

errors_found = False

# 1. Check for old incorrect hardcoded prices in all .astro files
for root, dirs, files in os.walk(PAGES_DIR):
    for file in files:
        if file.endswith('.astro'):
            file_path = os.path.join(root, file)
            # Read content
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check forbidden patterns
            for pattern in FORBIDDEN_PATTERNS:
                matches = re.findall(pattern, content)
                if matches:
                    print(f"ERROR: Found outdated hardcoded price pattern '{pattern}' in {file_path}!", file=sys.stderr)
                    errors_found = True

            # Warn on any hardcoded price in non-excluded pages
            if file not in WARN_PAGES_EXCLUDE:
                # Find all ₹ followed by numbers
                hardcoded_prices = re.findall(r'₹[0-9,]+', content)
                for price in hardcoded_prices:
                    if re.match(r'^₹[0-9,]+$', price):
                        print(f"WARNING: Hardcoded price '{price}' found in {file_path}. Consider using src/data/pricing.json instead.")

if errors_found:
    print("Pricing validation failed!", file=sys.stderr)
    sys.exit(1)
else:
    print("Pricing validation passed successfully.")
    sys.exit(0)
