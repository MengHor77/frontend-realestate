# HomeHaven Real Estate Platform

A production-style React real estate UI built with functional components, Context API state management, Tailwind CSS, React Hook Form, and Google Maps embed integration.

## Features

- Landing page with hero search, quick filters, featured properties, stats, CTAs, and footer
- Property listing page with grid/list toggle and advanced filtering sidebar
- Property detail page with image gallery + lightbox, map, amenities/specs, inquiry form, share actions, similar properties, and ratings
- Authentication pages (login/sign up)
- User dashboard (wishlist, inquiry history, settings, document upload)
- Agent dashboard (listing management, uploads, lead analytics, commission tracking)
- Search results page with dynamic map/list presentation, save search, and email alert toggle

## Tech stack

- React (functional components + hooks)
- Context API reducer for shared app state
- Tailwind CSS (mobile-first responsive styling)
- React Hook Form for forms
- React Router v6 for page routing (kept on v6 for CRA/Jest compatibility, with future flags enabled in `BrowserRouter` to ease v7 migration)

## Scripts

```bash
npm start
npm test -- --watchAll=false
npm run build
```
