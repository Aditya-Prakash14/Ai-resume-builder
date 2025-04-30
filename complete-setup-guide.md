# Complete Setup Guide for ResumeLM

This guide will walk you through the complete setup process for the ResumeLM application, including:

1. Setting up the Supabase database
2. Configuring authentication
3. Testing the application

## 1. Database Setup

### 1.1. Run the Schema SQL

1. Go to the Supabase SQL Editor: https://supabase.com/dashboard/project/iugftgmpjgavmequpbmt/sql

2. Create a new SQL query by clicking on the "New Query" button

3. Copy and paste the contents of the `schema.sql` file into the editor

4. Click the "Run" button to execute the SQL code

### 1.2. Set Up the User Trigger

1. Create another SQL query in the Supabase SQL Editor

2. Copy and paste the contents of the `supabase-trigger-setup.sql` file into the editor

3. Click the "Run" button to execute the SQL code

## 2. Authentication Setup

### 2.1. Configure Email Authentication

1. Go to the Supabase Authentication settings: https://supabase.com/dashboard/project/iugftgmpjgavmequpbmt/auth/providers

2. Make sure "Email" is enabled

3. Configure the following settings:
   - **Confirm email**: Enable this option to require email confirmation
   - **Secure email change**: Enable this option for secure email changes

### 2.2. Configure URL Settings

1. Go to the Supabase URL Configuration: https://supabase.com/dashboard/project/iugftgmpjgavmequpbmt/auth/url-configuration

2. Set the "Site URL" to `http://localhost:3000`

3. Add the following redirect URLs:
   - `http://localhost:3000`
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/confirm`

4. Save the configuration

### 2.3. (Optional) Configure GitHub OAuth

If you want to enable GitHub authentication:

1. Go to GitHub: https://github.com/settings/applications/new

2. Create a new OAuth application:
   - **Application name**: ResumeLM
   - **Homepage URL**: http://localhost:3000
   - **Authorization callback URL**: https://iugftgmpjgavmequpbmt.supabase.co/auth/v1/callback

3. Copy the Client ID and Client Secret

4. Go to the Supabase Authentication providers: https://supabase.com/dashboard/project/iugftgmpjgavmequpbmt/auth/providers

5. Find "GitHub" in the list and enable it

6. Enter the Client ID and Client Secret from GitHub

7. Save the configuration

## 3. Testing the Application

### 3.1. Start the Development Server

1. Make sure your `.env.local` file is properly configured with the Supabase credentials

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open the application in your browser: http://localhost:3000/auth/login

### 3.2. Sign Up for an Account

1. Click on the "Sign Up" tab

2. Enter your email, name, and password

3. Click "Create Account"

4. You should receive a confirmation email (check your spam folder if you don't see it)

5. Click the confirmation link in the email

6. You should be redirected to the application and logged in

### 3.3. Explore the Application

Once you're logged in, you should be able to:

1. Create a new resume
2. Edit your profile
3. Use all the features of the application

## Troubleshooting

If you encounter any issues:

1. Check the browser console for error messages

2. Make sure all the SQL scripts executed successfully

3. Verify that your Supabase authentication settings are correctly configured

4. Ensure that your `.env.local` file has the correct Supabase credentials

5. Check the application logs for any server-side errors

If you continue to experience issues, try:

1. Clearing your browser cache and cookies

2. Restarting the development server

3. Checking the Supabase logs for any authentication or database errors
