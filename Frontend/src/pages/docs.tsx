<<<<<<< HEAD
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { StarIcon } from "lucide-react"; // Usamos íconos Lucide (puedes cambiarlo)

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex rounded-2xl flex-col items-center py-12 px-4 md:px-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
        {/* Título de categoría */}
        <h1 className={`${title()} mb-10 text-center`}>CATEGORY NAME</h1>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 dark:bg-gray-800 rounded-xl p-6 flex items-start gap-4 shadow-md"
            >
              {/* Icono PDF */}
              <div className="flex-shrink-0">
                <img
                  src="/pdf_icono.png"
                  alt="PDF Icon"
                  className="w-30 h-40"
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Title</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                {/* Estrellas */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={16} className="text-gray-500 dark:text-gray-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
=======
import React from 'react';
import DefaultLayout from "@/layouts/default";

const DocsPage: React.FC = () => (
    <DefaultLayout>
        {/* Datos del articulo */}
        <div className="text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Titulo del Articulo</h1>
            <h3 className="text-xl font-semibold mb-5">Autor</h3>
        </div>

        {/* PDF incrustado */}
        <div style={{ marginTop: '2rem', border: '1px solid #ccc', borderRadius: 8, overflow: 'hidden' }}>
            <iframe
                src="./Ejemplo.pdf"
                title="Artículo PDF"
                width="100%"
                height="800px"
                style={{ border: 'none' }}
            />
        </div>
    </DefaultLayout>
);

export default DocsPage;
>>>>>>> f4bcafb55f76682c83dd07aad655ff434911a292
