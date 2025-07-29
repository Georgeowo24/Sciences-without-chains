import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import React, { useState } from "react";
import { Input, Button, Textarea} from "@heroui/react";

export default function HelpPage() {
  const [formData, setFormData]= useState({
    nombre:"",
    email:"",
    mensaje:"",
  });

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    alert ("Mensaje enviado con exito");
    console.log(formData);
    setFormData({nombre: "", email:"", mensaje:""});
  }

  return (
    <DefaultLayout>
      {/* Seccion About Us*/}
      <section className="flex flex-col rounded-3xl items-center justify-center gap-6 py-12 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full">
          {/*Formulario*/}
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className={title()}>Help</h1>
            <p className="text-gray-600 dark:text-gray-300">
              You can contact us using the form below
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium">Name:</label>
                <Input
                  isRequired
                  className="w-100 max-w-full"
                  placeholder="Your Name"
                  type="text"
                />
              </div>

              <div>
                <label htmlFor="Email" className="block text-sm font-medium">Email:</label>
                <Input
                  isRequired
                  className="w-100 max-w-full"
                  placeholder="user@gmail.com"
                  type="email"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium">Message: </label>
                <Textarea
                  isRequired
                  className="max-w-full"
                  placeholder="Write your message here"
                />
              </div>

                <div className="flex justify-center">
                <Button
                  type="submit"
                  color="primary"
                  variant="shadow"
                  size="lg"
                  className="w-96 max-w-full"
                >
                  Send error message
                </Button>
              </div>              
            </form>
          </div>

          {/*Imagen*/}
          <div className="flex-1 flex justify-center">
            <img
            src="./help.jpg"
            alt="Our Company"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>

        </div>
      </section>
    </DefaultLayout>
  );
}
