# Supabase Authentication Setup

After setting up the database schema, you need to configure the authentication providers in your Supabase project. Follow these steps:

## 1. Enable Email/Password Authentication

1. Go to the Supabase dashboard: https://supabase.com/dashboard/project/iugftgmpjgavmequpbmt/auth/providers

2. Under "Email", make sure it's enabled

3. Configure the following settings:
   - **Confirm email**: Enable this option to require email confirmation
   - **Secure email change**: Enable this option for secure email changes
   - **Custom SMTP**: You can use the default Supabase SMTP server for development, but for production, you should configure your own SMTP server

## 2. Enable GitHub OAuth (Optional)

If you want to enable GitHub authentication:

1. Go to the Supabase dashboard: https://supabase.com/dashboard/project/iugftgmpjgavmequpbmt/auth/providers

2. Find "GitHub" in the list of OAuth providers and click on it

3. Toggle the "Enable GitHub OAuth" switch to enable it

4. You'll need to create a GitHub OAuth application:
   - Go to GitHub: https://github.com/settings/applications/new
   - Set "Application name" to "ResumeLM"
   - Set "Homepage URL" to your application URL (e.g., http://localhost:3000 for development)
   - Set "Authorization callback URL" to your Supabase callback URL (e.g., https://iugftgmpjgavmequpbmt.supabase.co/auth/v1/callback)
   - Click "Register application"

5. Copy the "Client ID" and "Client Secret" from GitHub

6. Paste these values into the corresponding fields in the Supabase dashboard

7. Click "Save" to save your GitHub OAuth configuration

## 3. Configure URL Settings

1. Go to the Supabase dashboard: https://supabase.com/dashboard/project/iugftgmpjgavmequpbmt/auth/url-configuration

2. Configure the following settings:
   - **Site URL**: Set this to your application URL (e.g., http://localhost:3000 for development)
   - **Redirect URLs**: Add any additional redirect URLs you want to allow (e.g., http://localhost:3000/auth/callback)

3. Click "Save" to save your URL configuration

## 4. Test Authentication

After configuring the authentication providers, you should be able to:

1. Sign up with email and password
2. Sign in with email and password
3. Sign in with GitHub (if configured)

If you encounter any issues, check the browser console for error messages and ensure that all the configuration steps were completed successfully.
