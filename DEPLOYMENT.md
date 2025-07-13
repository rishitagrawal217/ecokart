# EcoKart Deployment Guide - Vercel

This guide will walk you through deploying your EcoKart MERN stack application on Vercel.

## Prerequisites

1. **GitHub Account**: You need a GitHub account to host your code
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas**: For cloud database (free tier available)

## Step 1: Prepare Your Code for GitHub

### 1.1 Initialize Git Repository
```bash
# In your project root directory
git init
git add .
git commit -m "Initial commit: EcoKart MERN stack app"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it `ecokart`
4. Make it public or private (your choice)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/ecokart.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up MongoDB Atlas

### 2.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier)
4. Set up database access (username/password)
5. Set up network access (allow all IPs: 0.0.0.0/0)

### 2.2 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `ecokart`

## Step 3: Deploy Backend to Vercel

### 3.1 Connect Vercel to GitHub
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `ecokart` repository

### 3.2 Configure Backend Deployment
1. **Framework Preset**: Node.js
2. **Root Directory**: `server`
3. **Build Command**: Leave empty (not needed for Node.js)
4. **Output Directory**: Leave empty
5. **Install Command**: `npm install`

### 3.3 Set Environment Variables
Add these environment variables in Vercel:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A random secret string (e.g., `your-super-secret-jwt-key-2024`)
- `PORT`: `5001`

### 3.4 Deploy Backend
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the deployment URL (e.g., `https://ecokart-backend.vercel.app`)

## Step 4: Deploy Frontend to Vercel

### 4.1 Create New Vercel Project for Frontend
1. Go back to Vercel Dashboard
2. Click "New Project"
3. Import the same GitHub repository again
4. This time, configure for frontend

### 4.2 Configure Frontend Deployment
1. **Framework Preset**: Create React App
2. **Root Directory**: `/` (root of repository)
3. **Build Command**: `npm run build`
4. **Output Directory**: `build`
5. **Install Command**: `npm install`

### 4.3 Set Environment Variables
Add this environment variable:
- `REACT_APP_API_URL`: Your backend deployment URL (e.g., `https://ecokart-backend.vercel.app`)

### 4.4 Deploy Frontend
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the frontend URL (e.g., `https://ecokart.vercel.app`)

## Step 5: Test Your Deployment

### 5.1 Test Backend API
Visit your backend URL + `/test` to see if it's working:
```
https://ecokart-backend.vercel.app/test
```

### 5.2 Test Frontend
Visit your frontend URL to test the complete application:
```
https://ecokart.vercel.app
```

## Step 6: Set Up Custom Domain (Optional)

### 6.1 Add Custom Domain
1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check if all dependencies are in `package.json`
   - Ensure Node.js version is compatible

2. **API Connection Issues**
   - Verify `REACT_APP_API_URL` is correct
   - Check if backend is deployed successfully
   - Ensure MongoDB connection string is correct

3. **Environment Variables**
   - Make sure all environment variables are set in Vercel
   - Check for typos in variable names

4. **CORS Issues**
   - Backend should handle CORS properly
   - Check if frontend URL is allowed in backend CORS settings

### Debugging

1. **Check Vercel Logs**
   - Go to your project in Vercel Dashboard
   - Click "Functions" to see serverless function logs
   - Check "Deployments" for build logs

2. **Test Locally**
   - Test with production environment variables locally
   - Use `npm run build` to test build process

## Final Notes

- Your app will automatically redeploy when you push changes to GitHub
- You can set up preview deployments for pull requests
- Monitor your app's performance in Vercel Analytics
- Set up monitoring and alerts for production issues

## Support

If you encounter issues:
1. Check Vercel documentation
2. Review MongoDB Atlas documentation
3. Check the project's README.md
4. Contact: codeconquerors123@gmail.com 