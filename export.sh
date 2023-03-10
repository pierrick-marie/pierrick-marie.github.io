#!/bin/bash

hugo --cleanDestinationDir

echo 'User-agent: *
Allow: /

Sitemap: https://pierrick-marie.github.io/sitemap.xml' > ./public/robots.txt

echo '<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://pierrick-marie.github.io</loc>
    <changefreq>monthly</changefreq>
  </url>
</urlset>' > ./public/sitemap.xml
