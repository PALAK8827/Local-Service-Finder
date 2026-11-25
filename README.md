# Local Service Finder

A full-stack web application that helps users search and connect with local service providers (such as electricians, plumbers, AC repair technicians, tutors, mechanics, and beauticians) in their city or area, complete with search, category browsing, and an interactive same-page Google Maps view.

## Features
- **Service & Location Search:** Search by service type and city/area, or use quick-search / popular tags.
- **Same-Page Google Maps View:** Toggle an embedded Google Map directly on the page for the selected service and location without leaving the app.
- **Category & Service Browsing:** Explore services across categories along with Home, Services, About, and Contact sections.
- **Backend API & Database:** RESTful backend powered by Node.js, Express, and MongoDB for handling data, bookings, and reviews.

## Tech Stack
- **Frontend:** React (Vite), JavaScript, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Project Structure
- `backend/` — Express server, routes, controllers, and models
- `frontend/` — React + Vite application (`src/components`, `src/pages`, `src/services`)
- `package.json` — Root scripts to run/manage the project

## Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/PALAK8827/Local-Service-Finder.git
   cd Local-Service-Finder
   '''
   Install dependencies and configure `.env` files as needed.
   Run the project from the root folder:
   '''bash
   npm run dev
   '''
