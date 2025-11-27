# Pixel Portfolio - Frontend

A pixel art styled full-stack portfolio website built with React.

## Live Demo

- **Frontend**: [Your deployed frontend URL]
- **Backend API**: [Your deployed backend URL]

## Features

- Pixel art retro gaming aesthetic
- Responsive design
- User authentication (Login/Register)
- Protected admin dashboard
- Project portfolio management
- Blog with comments
- Contact form

## Tech Stack

- React 19
- React Router v7
- Axios for API calls
- Context API for state management
- CSS with pixel art styling

## Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home/About page | Public |
| `/projects` | Projects gallery | Public |
| `/blog` | Blog posts list | Public |
| `/blog/:id` | Blog post detail | Public |
| `/contact` | Contact form | Public |
| `/login` | Login page | Public |
| `/register` | Register page | Public |
| `/admin` | Admin dashboard | Protected |

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your backend API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── BlogCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Admin.jsx
│   ├── context/        # React Context
│   │   └── AuthContext.jsx
│   ├── services/       # API services
│   │   └── api.js
│   ├── styles/         # Global styles
│   │   └── pixel.css
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .env.example
└── package.json
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variable:
   - `VITE_API_URL` = Your deployed backend URL

### Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Set environment variable:
   - `VITE_API_URL` = Your deployed backend URL

## Admin Features

Once logged in, the admin dashboard allows you to:

- **Manage Projects**: Create, edit, and delete portfolio projects
- **Manage Blog Posts**: Create, edit, and delete blog posts
- All changes are immediately reflected on the public pages

## Connecting to Backend

Make sure your backend API is running and the `VITE_API_URL` environment variable points to the correct URL.

For local development:
```
VITE_API_URL=http://localhost:5000/api
```

For production (example):
```
VITE_API_URL=https://your-api.onrender.com/api
```

## License

MIT
