import { Input, Button } from "@heroui/react";
import DefaultLayout from "@/layouts/default";
import Logo from "@/components/icons";

export default function LoginPage() {
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center">
      <div className="flex w-full max-w-6xl items-center justify-between gap-10 pt-40">
        
        {/* Columna izquierda: Bienvenida */}
        <div className="w-1/2 text-left pl-30">
          <h1 className="text-5xl font-bold p-30 pb-10">¡Bienvenido!</h1>

          <p className="pb-10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, molestias quae? Aliquam dolore necessitatibus eveniet sequi corrupti inventore quas libero veniam quisquam! Cum qui dolor veniam corrupti similique excepturi harum?</p>

          <Logo height={100} className="pl-10"/>
          
            <Button
            className="mt-10 w-60"
            color="primary"
            size="lg"
            variant="shadow"
            >
            About Us
            </Button>
        </div>

        {/* Columna derecha: Login */}
        <div className="w-1/2 flex justify-end">
          <div className="w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/40 shadow-2xl rounded-3xl px-10 py-12">
            <h2 className="text-2xl font-semibold text-center mb-6">
              INICIAR SESIÓN
            </h2>

            <form className="flex flex-col gap-6">
              <Input
                type="email"
                placeholder="CORREO"
                className="text-white placeholder-white"
              />
              <Input
                type="password"
                placeholder="CONTRASEÑA"
                className="text-white placeholder-white"
              />
              <Button
                color="primary"
                variant="shadow"
                size="lg"
                className="mt-2 font-semibold"
              >
                INICIAR SESIÓN
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
}