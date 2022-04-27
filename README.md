# Trigger Exception issue

Example Supabase application showing the issue with trigger exceptions and also email being sent when a transaction fails on signup.

This project is built with:

- [SvelteKit](https://kit.svelte.dev/)
- [Svelte Form Library](https://github.com/tjinauyeung/svelte-forms-lib)
- [Bulma](https://bulma.io/)
- [Vest](https://vestjs.dev/)
- [Supabase](https://supabase.com/)
- [ley](https://github.com/lukeed/ley)

## Features

- Sign Up
- Sign in
- Forgot Password

## Getting started

Clone the project from GitHub

```sh
git clone https://github.com/silentworks/trigger-exception
cd trigger-exception
```

> Note: the `@next` is temporary

## Developing

Copy the `env.example` and name it `.env`

Edit the file and enter all the required variable values

```
VITE_APP_URL=http://localhost:3000/
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
CONNECTION_STRING=
```

The "CONNECTION_STRING" can be found under **Settings/Database** inside the Supabase Dashboard

### Run database migrations

```sh
pnpm m:up
```

### Creating user

Once the project server is running you can visit the signup path `/auth/signup` to create your user.

> Note that once you have created your admin user, this route will no longer be accessible.

### Start development server

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
pnpm build
```

> You can preview the built app with `pnpm preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Recreating the issue

- Go to the signup page and register a user with a username
- Check your email and confirm the user
- Go to the signup page again and register a user with the same username (you must use a different email address)
- You will get a generic database error (`Database error saving new user`), but this should have been the exception message of "username already exists" from the `username_exists` trigger functiion in `migrations/00001-check_if_username_exists.js`
- You can see the exception being thrown when you try to do an insert into the `auth.users` table, just run the following SQL inside the SQL editor for this project

```sql
INSERT INTO auth.users ("email", "raw_app_meta_data", "raw_user_meta_data") VALUES ('any_email_address', '{"provider": "email", "providers": ["email"]}', '{"username": "same_username_that_was_used_before", "full_name": "Testing"}');
```

> Replace the `any_email_address` placeholder with an actual email address and `same_username_that_was_used_before` with a username you've registered with before

### Expected result

The error message should bubble back up to the API call level and be forwarded as an error message in the json response from the `/auth/v1/signup` api call.
