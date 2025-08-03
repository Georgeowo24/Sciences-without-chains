import { Input, Button, Link } from "@heroui/react";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import app from '../firebase/firebase'
import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const auth = getAuth(app)

export default function LoginPage() {

  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
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
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/"); // Redirige al home tras login exitoso
    } catch (err: any) {
      setError("Credenciales incorrectas o usuario no encontrado.");
    } finally {
      setLoading(false);
    }
  };

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
                  type="submit"
                  className="mt-2 font-semibold"
                  isLoading={loading}
                >
                  Log In
                </Button>
            </form>
          </div>
        </div>
        
        {/* Welcome */}
        <div className="w-1/2 text-left pl-30">
          <h1 className="text-5xl font-bold p-30 pb-10">Welcome Back!</h1>

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