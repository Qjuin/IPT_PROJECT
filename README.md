# Qjuin Salvador Developer Portfolio

## Student Name

**Qjuin Dominic Salvador**

## Website Category

**Personal developer portfolio website**

## Project Description

This project is a responsive portfolio website for Qjuin Dominic Salvador, an Information Technology student specializing in mobile and web application development. It presents academic background, technical skills, certifications, development projects, and technical notes in a single interactive website.

The site is built as a client-side single-page application. It uses hash-based routing to switch between the home, about, notes, authentication, and dashboard views without requiring a page reload.

## Main Features

- Responsive dark-themed portfolio interface for desktop and mobile screens
- Home page with:
  - Developer introduction and technical skills
  - Downloadable CV link
  - Project showcase cards
  - Contact form
- Interactive project detail modals for:
  - JustiFi
  - DocuVault
  - NU Shop Mobile App
  - PawCart
- About page with education, activities, certifications, and seminars
- Live GitHub public repository count fetched from the GitHub API
- Tech notes section with article listing and individual article pages
- Local storage support for notes data
- Sign-in and sign-up form interfaces with validation
- Admin dashboard with navigation, statistics, notes management, search, filtering, and sorting
- Accessibility support through semantic elements, labels, button controls, and dialog attributes
- Mobile-friendly layouts using responsive CSS media queries

## Technologies Used

- **HTML5** - Page structure and semantic markup
- **CSS3** - Responsive layout, theming, gradients, animations, and component styling
- **Vanilla JavaScript (ES6+)** - Application logic, routing, DOM manipulation, form handling, and UI rendering
- **JavaScript Classes** - Encapsulation and reusable project card components
- **Fetch API** - Retrieving GitHub profile statistics
- **Web Storage API** - Persisting notes in `localStorage`
- **GitHub REST API** - Loading public repository information
- **Google Drive** - Hosting the downloadable CV link
- **External API endpoint** - Configured user API base URL at `http://localhost:3000/users`
- **Local image assets** - Portfolio, profile, login, and project illustrations stored in the `assets/` folder