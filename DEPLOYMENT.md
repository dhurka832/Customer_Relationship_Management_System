# CRM Project Deployment Guide

This guide covers deploying your Django CRM project to Railway, with alternatives for other platforms.

---

## 🚀 Quick Deployment Steps (Railway)

### Prerequisites
- GitHub account with your project pushed
- Railway account (free tier available at railway.app)

### Step 1: Push Your Code to GitHub

```bash
git add -A
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account and select your CRM repository
5. Railway will auto-detect it's a Django project

### Step 3: Add PostgreSQL Database

1. In your Railway project dashboard, click "Add"
2. Select "PostgreSQL"
3. Railway will automatically set the `DATABASE_URL` environment variable

### Step 4: Configure Environment Variables

In your Railway project dashboard, go to **Variables** and add:

```
DEBUG=False
SECRET_KEY=<generate-a-new-secure-key>
ALLOWED_HOSTS=yourdomain.railway.app,localhost
CSRF_TRUSTED_ORIGINS=https://yourdomain.railway.app
```

**To generate a secure SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 5: Run Database Migrations

1. In Railway, go to **Deployments**
2. Click on your deployment
3. Go to **Logs** to verify it's running
4. Railway automatically runs `release: python manage.py migrate` from your Procfile

### Step 6: Create Superuser (Optional but Recommended)

Connect to your Railway PostgreSQL and run:
```bash
python manage.py createsuperuser
```

Or use Railway's shell:
1. Go to **Deployments** → Your deployment
2. Click **Shell**
3. Run: `python manage.py createsuperuser`

### Step 7: Deploy

Railway automatically deploys when you push to GitHub. Your app will be live at:
```
https://yourdomain.railway.app
```

---

## 📋 Manual Deployment Checklist

- [ ] Requirements.txt has all dependencies (including gunicorn, whitenoise)
- [ ] Procfile created with web and release commands
- [ ] runtime.txt specifies Python 3.10
- [ ] settings.py updated to use environment variables
- [ ] DEBUG=False in production environment
- [ ] SECRET_KEY changed and kept secure
- [ ] ALLOWED_HOSTS configured correctly
- [ ] CSRF_TRUSTED_ORIGINS configured for your domain
- [ ] PostgreSQL database provisioned
- [ ] Database migrations run
- [ ] Superuser created
- [ ] Static files collected and served

---

## 🔐 Security Checklist

### Before Deploying

1. **Update SECRET_KEY**: Generate a new secure key
   ```python
   from django.core.management.utils import get_random_secret_key
   print(get_random_secret_key())
   ```

2. **Set DEBUG=False**: Never deploy with DEBUG=True

3. **Update Database Credentials**: Never hardcode in settings.py

4. **Configure ALLOWED_HOSTS**: Only include your actual domain

5. **Remove Sensitive Data**: Delete any `.env` files before pushing

6. **Update CSRF_TRUSTED_ORIGINS**: Match your production domain

---

## 📚 Alternative Deployment Platforms

### Render.com (Similar to Railway)

1. Connect GitHub repo
2. Create new Web Service
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy

**Environment Variables for Render:**
```
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=yourdomain.onrender.com
DATABASE_URL=provided-by-render
```

### AWS EC2 + RDS

1. Launch EC2 instance (Ubuntu 22.04)
2. Create RDS PostgreSQL database
3. SSH into EC2 and clone your repo
4. Install dependencies and configure
5. Use Nginx as reverse proxy with Gunicorn

### DigitalOcean App Platform

1. Connect GitHub
2. Select your Django repo
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy

### PythonAnywhere

1. Create account at pythonanywhere.com
2. Upload or clone your project
3. Configure virtualenv
4. Set up PostgreSQL
5. Configure web app settings

---

## 🔧 Troubleshooting

### Issue: Static Files Not Loading

**Solution:**
```bash
python manage.py collectstatic --noinput
```

### Issue: Database Connection Error

**Check:**
- DATABASE_URL is correctly set
- PostgreSQL is running
- Database credentials are correct
- Network/firewall allows connection

### Issue: 500 Server Error

**Check logs:**
```bash
# Railway
# View in Railway dashboard under Logs

# Local testing
DEBUG=True python manage.py runserver
```

### Issue: CSRF Token Verification Failed

**Solution:** Update CSRF_TRUSTED_ORIGINS in environment variables

---

## 📱 Custom Domain Setup

### After Deploying to Railway

1. Go to your Railway project settings
2. Go to **Custom Domain**
3. Add your domain (e.g., crm.yourdomain.com)
4. Railway provides CNAME records to add to your DNS

### Add CNAME Record to DNS

In your domain registrar:
1. Go to DNS settings
2. Add CNAME record:
   - Name: crm (or your subdomain)
   - Value: (provided by Railway)
3. Wait 5-15 minutes for DNS to propagate

---

## 📊 Monitoring & Maintenance

### Check Application Logs

```bash
# Railway - view in dashboard
# Use Railway CLI
railway logs
```

### Database Backups

PostgreSQL on Railway automatically backs up. You can:
1. Access database shell in Railway
2. Use `pg_dump` for manual backups
3. Store backups securely

### Update & Redeploy

1. Make changes locally
2. Commit and push to GitHub
3. Railway automatically redeploys

---

## 🚨 Common Issues & Solutions

### Issue: Cannot Access Admin Panel

```bash
# Ensure you created a superuser
python manage.py createsuperuser
```

### Issue: Static Files Return 404

Check STATIC_ROOT and STATIC_URL in settings.py are correct

### Issue: Email Not Sending

If implementing email:
- Configure EMAIL_BACKEND in settings.py
- Set email provider credentials in env vars

---

## 📞 Getting Help

- Railway Support: https://railway.app/support
- Django Deployment Docs: https://docs.djangoproject.com/en/5.2/howto/deployment/
- Check Railway Logs for error messages
- Test locally with `DEBUG=False` before deploying

---

## ✅ Post-Deployment

1. Test all features in production
2. Monitor error logs
3. Set up automated backups
4. Configure email notifications for errors
5. Document any custom configurations

**Your CRM is now live! 🎉**
