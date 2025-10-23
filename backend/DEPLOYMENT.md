# EcoLoop Backend - Vercel Deployment Guide

## Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
From the backend directory:
```bash
cd backend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (first time) or **Y** (if redeploying)
- What's your project's name? **ecoloop-backend**
- In which directory is your code located? **./**
- Want to override the settings? **N**

### 4. Set Environment Variables in Vercel

Go to your Vercel dashboard → Your Project → Settings → Environment Variables

Add these variables:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret key
- `ADMIN_EMAIL` - Admin email
- `ADMIN_PASSWORD` - Admin password
- `FRONTEND_URL` - Your frontend URL (e.g., https://your-frontend.vercel.app)
- `NODE_ENV` - Set to `production`

### 5. Redeploy with Environment Variables
```bash
vercel --prod
```

## Important Notes

1. **MongoDB Atlas**: Make sure your MongoDB cluster allows connections from anywhere (0.0.0.0/0) or add Vercel's IP addresses to the whitelist.

2. **CORS Configuration**: The backend is configured to accept requests from your frontend URL. Make sure to set the `FRONTEND_URL` environment variable correctly.

3. **API Endpoints**: Your API will be available at:
   - `https://your-project-name.vercel.app/api/auth/login`
   - `https://your-project-name.vercel.app/api/pickups`
   - etc.

4. **Cold Starts**: Serverless functions may have cold starts. The first request after inactivity might be slower.

## Troubleshooting

### "Route not found" Error
- Make sure `vercel.json` is in the backend directory
- Verify that `api/index.js` exists
- Check that all routes start with `/api/`

### CORS Errors
- Add your frontend URL to the environment variable `FRONTEND_URL`
- Redeploy after adding environment variables

### MongoDB Connection Issues
- Verify `MONGODB_URI` is set correctly in Vercel
- Check MongoDB Atlas network access settings
- Ensure your MongoDB user has proper permissions

## Local Development

To run locally:
```bash
npm install
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Support

If you encounter issues, check:
1. Vercel deployment logs
2. MongoDB Atlas logs
3. Browser console for CORS/API errors
