# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm run install-all
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- No configuration needed - the default connection string will work

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `server/.env` with your connection string

### Step 3: Create Environment File
Create `server/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/pr-agency
PORT=5000
```

### Step 4: Start Development Servers
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📝 What's Included

✅ Modern React frontend with Tailwind CSS
✅ Express.js backend with MongoDB
✅ Contact form with validation
✅ Smooth animations with Framer Motion
✅ Fully responsive design
✅ SEO optimization
✅ Production-ready code

## 🎨 Customization

### Colors
Edit `client/tailwind.config.js` to change the color scheme:
- Primary colors: `primary-*`
- Accent colors: `accent-*`

### Content
- Update text content in component files
- Replace placeholder images with your own
- Modify services, portfolio items, and testimonials

### API
- Contact form submissions are saved to MongoDB
- Access via `/api/contact` endpoint

## 🐛 Troubleshooting

**Port already in use?**
- Change ports in `client/vite.config.js` and `server/index.js`

**MongoDB connection error?**
- Check your MongoDB is running (local) or connection string (Atlas)
- Verify `.env` file exists in `server/` directory

**Dependencies not installing?**
- Try deleting `node_modules` and `package-lock.json`
- Run `npm install` again

## 📚 Next Steps

1. Customize the content for your agency
2. Add your own images and branding
3. Set up MongoDB Atlas for production
4. Deploy to your preferred hosting platform

Happy coding! 🎉

