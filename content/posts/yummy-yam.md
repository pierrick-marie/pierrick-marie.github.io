---
title: "(En) Yummy Yam"
draft: false
summary: "A new theme for Hugo Server. Yummy Yam is half a theme and half a framework. It's a theme that generate main menu and titles and article pages. It's a framework to easily develop a single web page with useful librairies and Hugo server features." 
date: 2023-03-28
thumbnail: /img/yummy-yam.jpg
FeatureImage: /img/yummy-yam.jpg
---

**Yummy Yam, a new theme for Hugo Server**

# Demonstration

You can find a full demonstration of Yummy Yam at this address: https://pierrick-marie.github.io

# Features

Yummy Yam is half a theme and half a framework.

**- A theme** that generate main menu, titles and article pages.

**- A framework** to easily develop a web page with useful librairies and Hugo server features. 

Yummy Yam provides:

1. a single main page with many sections highly customizable with HTML, Scss and Javascript
2. JQuery, Bootstrap and Fontawesome librairies
3. dynamic pages for blog posts

# Installation

## 1. Create a new Hugo site

```sh
cd my_new_web_site
hugo new site ./
```

## 2. Import last version of Yummy Yam

```sh 
# From "my_new_web_site"
cd themes
git clone https://github.com/pierrick-marie/yummy-yam.git
```

## 3. Setup your web site with the example from Yummy Yam

```sh
# From "my_new_web_site/theme"
cp yummy-yam/example/* ../
```

This command initializes a default configuration for your web site, adds default images for Yummy Yam and creates default content.

# Run Yummy Yam

To create your web site use the following command:

```sh
# From "my_new_web_site"
hugo server
```

Your web site is now available at this address: http://localhost:1313

# Export your site

To export your site a static web site use the following command:

```sh
# From "my_new_web_site"
hugo --cleanDestinationDir
```

The resulting web site is into *public* folder. 

# How to use Yummy Yam

All documentation about how to use Yummy Yam is also available in *yummy-yam/example/content/\**. This documentation is then displayed as default content of your web page after the first installation of Yummy Yam.

## 1. Configure your web site

The file *config.toml* contains many important informations for Yummy Yam.

```toml
baseURL = 'https://my-web-site.io/'
languageCode = 'fr-FR'
title = 'Web site title'
theme = 'yummy-yam'
disableKinds = ["taxonomy", "term", "RSS"]
enableRobotsTXT = true
contentDir = 'content'

[params]
	author = "Author"
	description = "Web site description"
	keywords = "key, words"
	customJS = "custom-js.js"
	language = "french"

[menu]
	[[menu.main]]
		name = '<title>'
		url = '<file>'
		weight = 1

[sitemap]
	changefreq = 'monthly'
	filename = 'sitemap.xml'
```

* *baseURL*: the URL used to generate links when you export your web site
* *languageCode*: defines language in head section
* *title*: web site title

* *[params] author*: author of the web site
* *[params] description*: used in head section
* *[params] keywords*: used in head section
* *[params] customJS*: the name of your custom Javascript file in static/js folder
* *[params] language*: chose french or english language in footer

* *[menu.main]*: setup all entry in main menu. Name is the title displayed in header. url is id of the section it refers. Weight is the ordre in menu. 

## 2. Setup sections 

In Yummy Yam a section is a file stored in *content* folder.
All sections are sorted following their weight.
The first section is placed in first position because its weight is 1.
All sections with weight 0 are not included.

If a section has a title in heading, it is automatically included as a title in the HTML body.

## 3. Customize images, Javascript and CSS

You don't have to modify the theme to modify your web site!

### Images

You can change all default images used by Yummy Yam in folder *your-site/static/img/theme*.

### Javascript

You can add your own script in *your-site/static/js/custom-js.js*.
You can configure this file in *[params] customJS* in your *config.toml* file.

### Scss

You can add your own Scss properties in *your-site/static/sass/*.
Yummy Yam automatically import all content from *your-site/static/sass/all.scss*.
A good practice is placing your Scss in different files and import them from *all.scss*.
You can already find an example to customise the last section.

Yummy Yam already includes JQuery version 3.6.3, Bootstrap version 5.2.3 and Fontawesome version 6.2.1.
Do not hesitate to use and use them again.

### Default CSS classes

Do not hesitate to have a look in defaults Scss properties in: *your-site/themes/yummy-yam/assets/sass*.
The most important classes are placed in *common.scss*:

* a
* content
* section
* star
* title
* subtitle
* paragraph
* link

The default CSS have been design to be responsive for all screens in any orientation.

## 4. Setup language

You can switch the language of Yummy Yam from french to english in config.toml with *[params] language = "french / english"*.
It changes the time format and texts in footer.
