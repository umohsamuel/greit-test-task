# Real Estate Property Listings

## Description

This project is a real estate property listing application built with React and TypeScript. It fetches property data from an external API and displays the properties in a paginated card grid format. Users can navigate through pages to explore different property listings, view key property details, and see images using an interactive image slider.

## Features

- Fetches property listings from an external API
- Displays listings in a grid format
- Implements pagination for easy navigation
- Skeleton loading states for better user experience
- Error handling for API requests
- Interactive image slider with automatic and manual controls
- Displays key property details including location, price, number of rooms, bathrooms, and size

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- npm or yarn

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/umohsamuel/greit-test-task.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

## Deployment

You can access the deployed version of this project at:

[Insert Deployment Link Here]

## Tech Stack

- React.js
- TypeScript
- Tailwind CSS
- Fetch API

## Project Structure

```
/src
 ├── components
 │   ├── card
 │   │   ├── base.card.tsx
 │   │   ├── grid.card.tsx
 │   ├── pagination.tsx
 │   ├── loaders.tsx
 │   ├── sliders.tsx
 ├── api
 │   ├── fetchCardData.ts
 ├── hooks
 ├── utils
 ├── types.ts
 ├── App.tsx
 ├── main.tsx
```

## API Usage

This application fetches data from:

```
https://crm.server.pro-part.es/api/v1/secondary-projects/integration/projects
```

with required authentication keys.

## Live Demo

[View the live site here](https://umohsamuel-greit-test.vercel.app/)

## Author

**Umoh Samuel**

## License

This project is licensed under the MIT License.
