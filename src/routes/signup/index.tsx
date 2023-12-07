import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeAction$,
  zod$,
  z,
  Form,
  routeLoader$,
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

export const useSignupUser = routeAction$(
  async (values, event) => {
    const authRequest = auth.handleRequest(event);
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: values.username,
        password: values.password,
      },
      attributes: {
        username: values.username,
        names: values.names,
        last_names: values.lastNames,
      },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    authRequest.setSession(session);

    // redirect to home page
    throw event.redirect(303, "/");
  },
  zod$({
    username: z.string().min(2),
    password: z.string().min(5),
    names: z.string().min(2),
    lastNames: z.string().min(2),
  }),
);

export default component$(() => {
  const signupUserAction = useSignupUser();
  return (
    <>
      <Form action={signupUserAction} class="mx-auto max-w-sm space-y-6 mt-32">
        <div class="space-y-2 text-center">
          <h1 class="text-3xl font-bold">Sign Up</h1>
          <p class="text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>

        <div
          class="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
          data-v0-t="card"
        >
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="names"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="names"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="names"
                  placeholder="Lee"
                  required
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="lastNames"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastNames"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="lastNames"
                  placeholder="Robinson"
                  required
                />
              </div>
            </div>
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
                placeholder="lrobinson"
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
              Signup
            </button>
          </div>
        </div>
        <div class="text-center">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?
          </span>
          <Link
            href="/login/"
            class="text-sm text-blue-500 hover:underline ml-1"
          >
            Login
          </Link>
        </div>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: "Signup Page",
  meta: [
    {
      name: "description",
      content: "This is the signup page",
    },
  ],
};
