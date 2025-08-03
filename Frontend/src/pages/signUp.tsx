import { Input, Button, Link } from "@heroui/react";
import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase';

interface SignUpFormData {
  email: string;
  password: string;
}

const auth = getAuth(app);

export default function SignUpPage() {
  const [form, setForm] = useState<SignUpFormData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      navigate("/"); // Redirige al home tras registro exitoso
    } catch (err: any) {
      setError("No se pudo crear el usuario. Intenta con otro correo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center">
      <div className="flex w-full max-w-6xl items-center justify-between gap-10 pt-40">
        
        {/* Welcome */}
        <div className="w-1/2 text-left pl-30">
          <h1 className="text-5xl font-bold p-30 pb-10">Hello, Welcome!
          </h1>

          <p className="pb-4">Already have an account?</p>          
            <Button
            as={Link}
            className="w-60"
            color="primary"
            size="lg"
            variant="shadow"
            href="/login"
            >
            Log In
            </Button>
        </div>

        {/* Form - Sign Up */}
        <div className="w-1/2 flex justify-start">
          <div className="w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/40 shadow-2xl rounded-3xl px-10 py-12">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Sign Up
            </h2>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <Input
                isRequired
                className="max-w-md"
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              <Input
                isRequired
                className="max-w-md"
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <Button
                color="primary"
                variant="shadow"
                size="lg"
                className="mt-2 font-semibold"
                type="submit"
                isLoading={loading}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
    </DefaultLayout>
  );
}