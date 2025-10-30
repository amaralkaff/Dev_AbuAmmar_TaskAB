#!/bin/bash

echo "=== Micro-Scraper API Test Suite ==="
echo ""

echo "Test 1: Valid URL (example.com)"
curl -s "http://localhost:3000/api/scrape?url=https://example.com" | jq .
echo ""

echo "Test 2: Invalid URL (expect error: Invalid URL)"
curl -s "http://localhost:3000/api/scrape?url=not-a-url" | jq .
echo ""

echo "Test 3: Missing URL (expect error: Invalid URL)"
curl -s "http://localhost:3000/api/scrape" | jq .
echo ""

echo "Test 4: JavaScript Site (github.com)"
curl -s "http://localhost:3000/api/scrape?url=https://www.github.com" | jq .
echo ""

echo "=== All Tests Complete ==="
