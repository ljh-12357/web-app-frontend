# Portfolio Website - Frontend

A modern portfolio website built with React featuring Apple Design aesthetics.

## Live Demo

- **Live Frontend URL**: https://frontend-liu-jiahuis-projects.vercel.app
- **Live Backend API URL**: https://backend-liu-jiahuis-projects.vercel.app
- **Source Code**: https://github.com/ljh-12357/web-app-frontend

## Features

- Clean, minimal Apple Design aesthetic
- Glassmorphism UI effects
- Responsive design for all devices
- User authentication (Login/Register)
- Protected admin dashboard
- Project portfolio management
- Blog with comments system
- Contact form

## Tech Stack

- React 19
- React Router v7
- Axios for API calls
- Context API for state management
- CSS with Apple Design styling

## Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home/About page | Public |
| `/projects` | Projects gallery | Public |
| `/blog` | Blog posts list | Public |
| `/blog/:id` | Blog post detail with comments | Public |
| `/contact` | Contact form | Public |
| `/login` | Login page | Public |
| `/register` | Register page | Public |
| `/admin` | Admin dashboard | Protected |

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ljh-12357/web-app-frontend.git
   cd web-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

### Connecting to the Backend API

**For Local Development:**

1. First, clone and run the backend API:
   ```bash
   git clone https://github.com/ljh-12357/web-app-backend.git
   cd web-app-backend
   npm install
   npm run dev
   ```

2. Update your frontend `.env` file:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```

**For Production (using deployed API):**
```
VITE_API_URL=https://backend-liu-jiahuis-projects.vercel.app/api
```

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
├── .env.example
└── package.json
```

## Test Account

- **Email**: admin@example.com
- **Password**: admin123456

## Admin Features

Once logged in, the admin dashboard allows you to:

- **Manage Projects**: Create, edit, and delete portfolio projects
- **Manage Blog Posts**: Create, edit, and delete blog posts
- All changes are immediately reflected on the public pages

## Deployment

The frontend is deployed on Vercel. To deploy your own:

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variable:
   - `VITE_API_URL` = Your deployed backend URL (e.g., `https://backend-liu-jiahuis-projects.vercel.app/api`)

## Related Repository

- **Backend API**: https://github.com/ljh-12357/web-app-backend

## License

MIT
