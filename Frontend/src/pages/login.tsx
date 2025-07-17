import { Input, Button, Link } from "@heroui/react";
import DefaultLayout from "@/layouts/default";

export default function LoginPage() {
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center">
      <div className="flex w-full max-w-6xl items-center justify-between gap-10 pt-40">

        {/* Form - Login */}
        <div className="w-1/2 flex justify-start">
          <div className="w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/40 shadow-2xl rounded-3xl px-10 py-12">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Log In
            </h2>

            <form className="flex flex-col gap-6">
              <Input
                isRequired
                className="max-w-md"
                label="Email"
                type="email"
              />

              <Input
                isRequired
                className="max-w-md"
                label="Password"
                type="password"
              />
              
              <Button
                color="primary"
                variant="shadow"
                size="lg"
                className="mt-2 font-semibold"
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
        
        {/* Welcome */}
        <div className="w-1/2 text-left pl-30">
          <h1 className="text-5xl font-bold p-30 pb-10">Hello, Welcome!</h1>

          <p className="pb-4">Don't have an account?</p>
          
            <Button
            as={Link}
            className="w-60"
            color="primary"
            size="lg"
            variant="shadow"
            href="/signUp"
            >
            Register
            </Button>
        </div>

      </div>
    </div>
    </DefaultLayout>
  );
}