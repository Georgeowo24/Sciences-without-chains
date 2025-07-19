import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import React, { useState } from "react";

export default function DocsPage() {
  const [formData, setFormData]= useState({
    nombre:"",
    email:"",
    mensaje:"",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

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
                <label htmlFor="nombre" className="block text-sm font-medium">
                  Nombre:
                </label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm p-2"/>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm p-2"/>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium">
                  Mensaje
                </label>
                <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm p-2">
                </textarea>

              </div>
              <button type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                Enviar Mensaje
              </button>
            </form>
          </div>
          {/*Imagen*/}
          <div className="flex-1 flex justify-center">
            <img
            src="../public/AtencionCliente.jpg"
            alt="Our Company"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
