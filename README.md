# MIT class group chats for Matrix

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Environment variables needed

In order to use this project, you need to set the following environment variables in `.env`:

* `MATRIX_TOKEN`: A Matrix access token for the bot or app service.
* `API_SHARED_SECRET`: A shared secret that trusted clients of the API can use to perform actions. Generate with `pwgen -s 64 -n 1`
* `MULESOFT_CLIENT_ID`: A client ID to access developer.mit.edu APIs
* `MULESOFT_CLIENT_SECRET`: A client secret to access developer.mit.edu APIs

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

Note: the Matrix dependency prefers `yarn`, but `npm` seems to work fine.

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
