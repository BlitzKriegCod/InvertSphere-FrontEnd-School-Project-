# Deploying InventSphere to Vercel

This guide provides step-by-step instructions for deploying your InventSphere Next.js application to Vercel.

## Why Vercel?

Vercel is the preferred platform for Next.js applications because:
- It's built by the same team behind Next.js
- Zero configuration deployments
- Automatic preview deployments for pull requests
- Built-in analytics and performance monitoring
- Global CDN with edge caching
- Serverless functions support

## Prerequisites

Before deploying to Vercel, make sure you have:

- A [Vercel account](https://vercel.com/signup) (you can sign up with GitHub, GitLab, or Bitbucket)
- Your code pushed to a Git repository
- All dependencies properly listed in your package.json file

## Deployment Methods

### Method 1: Deploying from the Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in with your account

2. Click on **"Add New..."** → **"Project"**

3. Import your Git repository by connecting your GitHub, GitLab, or Bitbucket account

4. Select your InventSphere repository from the list

5. Configure your project:
   - **Framework Preset**: Select Next.js (should be auto-detected)
   - **Root Directory**: Keep as `.` if your project is in the root of the repository
   - **Build Command**: Use default `npm run build`
   - **Output Directory**: Use default `.next`

6. Add any environment variables required by your application:
   - Click on "Environment Variables" to expand the section
   - Add each variable with its key and value

7. Click **"Deploy"**

Vercel will build and deploy your application. Once complete, you'll receive a URL where your application is live.

### Method 2: Using the Vercel CLI

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your project directory:
   ```bash
   cd /path/to/inventsphere
   ```

3. Log in to Vercel:
   ```bash
   vercel login
   ```

4. Deploy your project:
   ```bash
   vercel
   ```

5. Follow the interactive prompts to configure your deployment

## Environment Variables

If your application requires environment variables (like API keys or service endpoints), you can configure them in several ways:

1. **Through the Vercel Dashboard**:
   - Go to your project in the Vercel dashboard
   - Navigate to "Settings" → "Environment Variables"
   - Add your variables with their corresponding values

2. **Using the Vercel CLI**:
   ```bash
   vercel env add MY_API_KEY production
   ```

3. **In your repository** (not recommended for secrets):
   Create a `.env.production` file in your project root with your variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```

   Note: Only variables prefixed with `NEXT_PUBLIC_` will be available on the client side.

## Configuring Custom Domains

To use your own domain for your Vercel deployment:

1. Go to your project in the Vercel dashboard

2. Navigate to "Settings" → "Domains"

3. Add your domain name and click "Add"

4. Follow the instructions to configure your DNS settings:
   - For apex domains: Add A records pointing to Vercel's IP addresses
   - For subdomains: Add a CNAME record pointing to your Vercel deployment URL

## Continuous Deployment

Vercel automatically sets up continuous deployment from your Git repository:

- Every push to your main branch will trigger a production deployment
- Every pull request will create a preview deployment for testing before merging

## Vercel-specific Features

After deploying to Vercel, you can take advantage of these features:

1. **Analytics**: View real-time analytics for your application under the "Analytics" tab

2. **Speed Insights**: Monitor Core Web Vitals and performance metrics

3. **Logs**: Access logs for your serverless functions and deployments

4. **Preview Deployments**: Get a unique URL for each pull request to preview changes

## Troubleshooting

If you encounter issues during deployment:

1. **Build Errors**:
   - Check the build logs in the Vercel dashboard
   - Make sure all dependencies are correctly listed in package.json
   - Ensure your Next.js version is compatible with Vercel

2. **Runtime Errors**:
   - Check browser console for client-side errors
   - Check Vercel logs for server-side errors
   - Make sure all environment variables are correctly set

3. **Performance Issues**:
   - Use Vercel Analytics to identify performance bottlenecks
   - Check for unnecessary client-side JavaScript
   - Optimize images and other assets

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
