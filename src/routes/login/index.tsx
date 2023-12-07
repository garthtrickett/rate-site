import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  Form,
  Link,
} from "@builder.io/qwik-city";
import { auth } from "~/lib/lucia";

export const useUserLoader = routeLoader$(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (session) {
    throw event.redirect(303, "/");
  }

  return {};
});

export const useLoginAction = routeAction$(
  async (values, event) => {
    const authRequest = auth.handleRequest(event);
    const key = await auth.useKey("username", values.username, values.password);

    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    authRequest.setSession(session);

    throw event.redirect(303, "/");
  },
  zod$({
    username: z.string(),
    password: z.string(),
  }),
);

export default component$(() => {
  const loginAction = useLoginAction();
  return (
    <>
      <Form action={loginAction} class="mx-auto max-w-[350px] space-y-6 mt-32">
        <div class="space-y-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-gray-500 dark:text-gray-400">
            Enter your credentials to login
          </p>
        </div>
        <div
          class="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div class="space-y-4 p-4">
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="username"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              Login
            </button>
          </div>
        </div>
        <div class="text-center">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
          </span>
          <Link
            href="/signup/"
            class="text-sm text-blue-500 hover:underline ml-1"
          >
            Sign Up
          </Link>
        </div>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: "Login Page",
  meta: [
    {
      name: "description",
      content: "This is the login page",
    },
  ],
};
