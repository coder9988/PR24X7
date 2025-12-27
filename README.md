# PR Agency Website

A modern, fully responsive PR agency website built with React, Node.js, and MongoDB. Inspired by modern agency design patterns with smooth animations, interactive components, and a clean, professional UI.

## 🚀 Tech Stack

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **React Helmet** - SEO optimization
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📋 Features

- ✅ Fully responsive design
- ✅ Interactive animations with Framer Motion
- ✅ Component-based architecture
- ✅ SEO-friendly with React Helmet
- ✅ Contact form with validation
- ✅ Modern UI/UX patterns
- ✅ Smooth transitions and hover effects
- ✅ Clean typography
- ✅ Production-ready

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prbackup
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   
   Or install separately:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/pr-agency
   PORT=5000
   ```
   
   For MongoDB Atlas:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pr-agency?retryWrites=true&w=majority
   PORT=5000
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```
   
   This will start both the frontend (port 3000) and backend (port 5000) servers concurrently.

   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

## 📁 Project Structure

```
prbackup/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/         # Page components
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend Express application
│   ├── models/            # Mongoose models
│   │   └── Contact.js
│   ├── routes/            # API routes
│   │   └── contact.js
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🎨 Components

- **Header** - Responsive navigation with mobile menu
- **Hero** - Eye-catching hero section with CTA
- **Services** - Grid of service offerings
- **About** - Company information and features
- **Portfolio** - Filterable project showcase
- **Testimonials** - Client testimonials carousel
- **Contact** - Contact form with validation
- **Footer** - Footer with links and contact info

## 🔌 API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)

### Health Check
- `GET /api/health` - Server health status

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to your hosting platform

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables in your hosting platform
2. Deploy the `server` folder
3. Ensure MongoDB Atlas connection string is set

### Database
- Use MongoDB Atlas for cloud-hosted database
- Update `MONGO_URI` in production environment

## 📝 Environment Variables

### Server (.env)
```
MONGO_URI=mongodb://localhost:27017/pr-agency
PORT=5000
```

## 🎯 Future Enhancements

- [ ] Admin dashboard for contact submissions
- [ ] Blog section
- [ ] Case study detail pages
- [ ] Newsletter subscription
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Analytics integration

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
cd client
npm run preview
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please contact: hello@pragency.com

