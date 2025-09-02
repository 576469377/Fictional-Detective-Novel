#!/bin/bash

# Content Validation Script for The Crimson Cipher
# Validates links, checks file structure, and ensures content quality

echo "🔍 Starting content validation for The Crimson Cipher..."
echo "=================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
ERRORS=0
WARNINGS=0
CHECKS=0

# Function to log messages
log_error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    ((ERRORS++))
}

log_warning() {
    echo -e "${YELLOW}⚠️  WARNING: $1${NC}"
    ((WARNINGS++))
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if required directories exist
echo -e "\n${BLUE}1. Checking Project Structure...${NC}"
((CHECKS++))

required_dirs=("en" "zh" "docs" "assets" "assets/css" "assets/js")
for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        log_success "Directory $dir exists"
    else
        log_error "Required directory $dir is missing"
    fi
done

# Check if required files exist
echo -e "\n${BLUE}2. Checking Required Files...${NC}"
((CHECKS++))

required_files=(
    "README.md"
    "LICENSE" 
    "CONTRIBUTING.md"
    "index.html"
    "project.json"
    "manifest.json"
    "sw.js"
    "en/index.md"
    "zh/index.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        log_success "File $file exists"
    else
        log_error "Required file $file is missing"
    fi
done

# Check chapter files
echo -e "\n${BLUE}3. Checking Chapter Files...${NC}"
((CHECKS++))

for i in {01..12}; do
    en_chapter="en/chapters/chapter${i}.md"
    zh_chapter="zh/chapters/chapter${i}.md"
    
    if [ -f "$en_chapter" ]; then
        log_success "English Chapter $i exists"
        
        # Check if chapter has minimum content
        word_count=$(wc -w < "$en_chapter")
        if [ "$word_count" -lt 500 ]; then
            log_warning "Chapter $i (EN) has only $word_count words (minimum recommended: 500)"
        fi
    else
        log_error "English Chapter $i is missing"
    fi
    
    if [ -f "$zh_chapter" ]; then
        log_success "Chinese Chapter $i exists"
    else
        log_error "Chinese Chapter $i is missing"
    fi
done

# Check documentation files
echo -e "\n${BLUE}4. Checking Documentation Files...${NC}"
((CHECKS++))

doc_files=(
    "docs/character-profiles-en.md"
    "docs/character-profiles-zh.md"
    "docs/cryptography-guide-en.md"
    "docs/cryptography-guide-zh.md"
    "docs/cryptography-interactive.md"
    "docs/timeline-en.md"
    "docs/timeline-zh.md"
    "docs/timeline-interactive.md"
    "docs/readers-guide-en.md"
    "docs/readers-guide-zh.md"
    "docs/content-search.md"
    "docs/project-documentation.md"
    "docs/roadmap.md"
    "docs/enhancement-summary.md"
)

for file in "${doc_files[@]}"; do
    if [ -f "$file" ]; then
        log_success "Documentation file $file exists"
    else
        log_warning "Documentation file $file is missing"
    fi
done

# Check asset files
echo -e "\n${BLUE}5. Checking Asset Files...${NC}"
((CHECKS++))

css_files=(
    "assets/css/styles.css"
    "assets/css/cryptography-demo.css"
    "assets/css/timeline-interactive.css"
    "assets/css/content-search.css"
)

js_files=(
    "assets/js/interactive.js"
    "assets/js/cryptography-demo.js"
    "assets/js/timeline-interactive.js"
    "assets/js/content-search.js"
    "assets/js/analytics.js"
)

for file in "${css_files[@]}"; do
    if [ -f "$file" ]; then
        log_success "CSS file $file exists"
    else
        log_warning "CSS file $file is missing"
    fi
done

for file in "${js_files[@]}"; do
    if [ -f "$file" ]; then
        log_success "JavaScript file $file exists"
    else
        log_warning "JavaScript file $file is missing"
    fi
done

# Check for broken internal links
echo -e "\n${BLUE}6. Checking Internal Links...${NC}"
((CHECKS++))

# Function to check links in a file
check_links_in_file() {
    local file="$1"
    local base_dir="$(dirname "$file")"
    
    # Extract markdown links [text](path)
    grep -oE '\[([^\]]*)\]\(([^)]+)\)' "$file" | while read -r link; do
        # Extract the path from the link
        path=$(echo "$link" | sed 's/.*](\([^)]*\)).*/\1/')
        
        # Skip external links (http/https)
        if [[ "$path" =~ ^https?:// ]]; then
            continue
        fi
        
        # Skip anchor links
        if [[ "$path" =~ ^# ]]; then
            continue
        fi
        
        # Construct full path
        if [[ "$path" =~ ^/ ]]; then
            # Absolute path from project root
            full_path="${path#/}"
        else
            # Relative path
            full_path="$base_dir/$path"
        fi
        
        # Normalize the path (remove ./ and ../)
        full_path=$(realpath -m "$full_path" 2>/dev/null || echo "$full_path")
        
        # Check if file exists
        if [ ! -f "$full_path" ]; then
            log_warning "Broken link in $file: $path -> $full_path"
        fi
    done
}

# Check links in key files
key_files=(
    "README.md"
    "en/index.md"
    "zh/index.md"
    "docs/project-documentation.md"
)

for file in "${key_files[@]}"; do
    if [ -f "$file" ]; then
        check_links_in_file "$file"
    fi
done

# Check chapter cross-references
echo -e "\n${BLUE}7. Checking Chapter Cross-References...${NC}"
((CHECKS++))

for i in {01..12}; do
    chapter_file="en/chapters/chapter${i}.md"
    if [ -f "$chapter_file" ]; then
        # Check for navigation links
        if ! grep -q "Previous Chapter\|Next Chapter\|Back to Index" "$chapter_file"; then
            log_warning "Chapter $i missing navigation links"
        fi
    fi
done

# Check content quality
echo -e "\n${BLUE}8. Checking Content Quality...${NC}"
((CHECKS++))

# Check for common issues
find . -name "*.md" -type f | while read -r file; do
    # Skip hidden files and node_modules
    if [[ "$file" =~ /\. ]] || [[ "$file" =~ node_modules ]]; then
        continue
    fi
    
    # Check for TODO markers
    if grep -q "TODO\|FIXME\|XXX" "$file"; then
        log_warning "File $file contains TODO/FIXME markers"
    fi
    
    # Check for placeholder text
    if grep -qi "lorem ipsum\|placeholder\|sample text" "$file"; then
        log_warning "File $file contains placeholder content"
    fi
    
    # Check for empty headings
    if grep -q "^#.*:$\|^#.*\.\.\.$" "$file"; then
        log_warning "File $file has empty or incomplete headings"
    fi
done

# Check project metadata
echo -e "\n${BLUE}9. Checking Project Metadata...${NC}"
((CHECKS++))

if [ -f "project.json" ]; then
    # Basic JSON validation
    if python3 -m json.tool project.json > /dev/null 2>&1; then
        log_success "project.json is valid JSON"
    else
        log_error "project.json is not valid JSON"
    fi
else
    log_error "project.json is missing"
fi

if [ -f "manifest.json" ]; then
    # Basic JSON validation for PWA manifest
    if python3 -m json.tool manifest.json > /dev/null 2>&1; then
        log_success "manifest.json is valid JSON"
    else
        log_error "manifest.json is not valid JSON"
    fi
else
    log_error "manifest.json is missing"
fi

# Check for consistent naming
echo -e "\n${BLUE}10. Checking File Naming Consistency...${NC}"
((CHECKS++))

# Check chapter naming pattern
for lang in "en" "zh"; do
    if [ -d "$lang/chapters" ]; then
        for file in "$lang/chapters"/*.md; do
            if [ -f "$file" ]; then
                basename=$(basename "$file")
                if [[ ! "$basename" =~ ^chapter[0-9]{2}\.md$ ]]; then
                    log_warning "Inconsistent naming in $file (should be chapter##.md)"
                fi
            fi
        done
    fi
done

# Check for language consistency in documentation
for file in docs/*-en.md; do
    if [ -f "$file" ]; then
        zh_equivalent="${file/-en.md/-zh.md}"
        if [ ! -f "$zh_equivalent" ]; then
            log_warning "Missing Chinese version for $file"
        fi
    fi
done

# Generate summary report
echo -e "\n${BLUE}📊 Validation Summary${NC}"
echo "====================================="
echo -e "Total checks performed: $CHECKS"
echo -e "Errors found: ${RED}$ERRORS${NC}"
echo -e "Warnings found: ${YELLOW}$WARNINGS${NC}"

if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All validations passed! Project structure is excellent.${NC}"
    exit 0
elif [ "$ERRORS" -eq 0 ]; then
    echo -e "\n${YELLOW}⚠️  Validation completed with warnings. Consider addressing them for optimal quality.${NC}"
    exit 0
else
    echo -e "\n${RED}❌ Validation failed with errors. Please fix the issues above.${NC}"
    exit 1
fi