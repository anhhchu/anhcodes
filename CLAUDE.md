# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Hugo static site generator using the customized Portio theme. The site showcases a software engineer's portfolio, blog posts about data engineering and big data technologies, and professional experience. Content is hosted on Firebase.

## Key Commands

### Development
- `npm start` - Start Hugo development server at localhost:1313 with live reload
- `hugo server` - Alternative command to start Hugo server

### Building
- `npm run build:prod` - Build the site for production using the Portio theme
- `hugo -t portio` - Direct Hugo build command with theme specification

### Deployment
- `sh deploy.sh "<commit_message>"` - Build site, commit changes, and push to master branch
- `npm run algolia` - Update Algolia search index (if enabled)

### Firebase Hosting
- `firebase init hosting` - Initialize Firebase hosting (one-time setup)
- `firebase deploy` - Deploy to Firebase (requires prior setup)

## Architecture & Structure

### Content Organization
- `content/blog/` - Markdown blog posts about data engineering, Spark, Delta Lake, etc.
- `content/portfolio/` - Portfolio project descriptions
- `content/contact/` - Contact page content
- `data/` - YAML configuration files for different page sections:
  - `hero.yml` - Homepage hero section
  - `resumeSection.yml` - Experience and education data
  - `skillSection.yml` - Technical skills
  - `portfolioSection.yml` - Portfolio projects
  - `testimonialSection.yml` - Testimonials
  - `aboutSection.yml` - About section content

### Configuration
- `config.toml` - Main Hugo configuration with theme settings, menu structure, and site parameters
- `config_template.toml` - Template for creating personalized config.toml
- `package.json` - Node.js dependencies (mainly atomic-algolia for search)

### Theme Structure
- `themes/portio/` - Git submodule containing the customized Portio Hugo theme
- Theme is customized version from: https://github.com/anhhchu/portio-hugo

### Static Assets
- `static/` - Images, CSS, JS, and other static files
- `public/` - Generated site output (created by Hugo build)

## Content Management

### Blog Posts
- Written in Markdown with YAML front matter
- Located in `content/blog/`
- Front matter includes: title, date, featureImage, postImage, categories, tags, author, toc
- Focus on data engineering topics: Spark, Delta Lake, Azure Synapse, etc.

### Data Configuration
- Site sections are data-driven through YAML files in `data/` directory
- Update `data/resumeSection.yml` for work experience
- Modify `data/skillSection.yml` for technical skills
- Edit `data/hero.yml` for homepage messaging

### Portfolio Management
- Portfolio items in `content/portfolio/` as Markdown files
- Configuration in `data/portfolioSection.yml`

## Development Workflow

1. Make content changes in `content/` or `data/` directories
2. Test locally with `npm start`
3. Build for production with `npm run build:prod`
4. Deploy using `sh deploy.sh "commit message"` which:
   - Builds the site
   - Stages all changes
   - Commits with provided message
   - Pushes to master branch

## Important Notes

- Site uses Hugo with Portio theme via Git submodule
- Firebase CLI version 10.9.2 required for deployment compatibility
- Hugo build outputs to `public/` directory
- No linting or testing commands configured
- Site is optimized for showcasing data engineering expertise and blog content