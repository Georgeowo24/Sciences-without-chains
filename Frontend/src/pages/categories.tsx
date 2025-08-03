import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button, Link } from "@heroui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface DocumentData {
  _id: string;
  nombre: string;
  descripcion?: string;
  categoria: string;
  direccionDoc: string;
}

export default function CategoriesPage() {
  const { category } = useParams<{ category?: string }>();
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "http://localhost:3000/catalog/";
        if (category) {
          url = `http://localhost:3000/catalog/category/${category}`;
        }
        const res = await axios.get(url);
        setDocuments(res.data.documents || res.data);
      } catch (err) {
        setError("Error al cargar los documentos.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [category]);

  return (
    <DefaultLayout>
      <section className="flex rounded-2xl flex-col items-center py-12 px-4 md:px-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
        {/* Título de categoría */}
        <h1 className={`${title()} mb-10 text-center`}>
          {category ? category.toUpperCase() : "TODAS LAS CATEGORÍAS"}
        </h1>

        <Button
          as={Link}
          href="/uploadDocs"
          color="primary"
          variant="shadow"
          size="md"
          className="mb-8"
        >
          Upload a new document
        </Button>

        {loading && <div className="text-center">Cargando documentos...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl w-full">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="bg-gray-200 dark:bg-gray-800 rounded-xl p-6 flex items-start gap-4 shadow-md"
            >
              {/* Icono PDF */}
              <div className="flex-shrink-0">
                <img
                  src="../public/pdf_icono.png"
                  alt="PDF Icon"
                  className="w-30 h-40"
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {doc.nombre}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {doc.descripcion || "Sin descripción"}
                </p>
                <div className="flex gap-1">
                  <Button
                    color="primary"
                    as={Link}
                    href={`http://localhost:3000${doc.direccionDoc}`}
                    variant="shadow"
                    radius="sm"
                    target="_blank"
                  >
                    Ver documento
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
