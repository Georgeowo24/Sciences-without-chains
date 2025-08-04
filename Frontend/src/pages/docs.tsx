import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from "@/layouts/default";
import axios from 'axios';

interface DocumentData {
  nombre: string;
  usuario: string;
  direccionDoc: string;
}

const DocsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("ID recibido:", id);
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/catalog/${id}`);
        setDocument(res.data);
      } catch (err) {
        setError("Error al cargar el documento.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [id]);

  if (loading) return <DefaultLayout><div className="text-center py-10">Cargando documento...</div></DefaultLayout>;
  if (error || !document) return <DefaultLayout><div className="text-center text-red-500 py-10">{error || "Documento no encontrado."}</div></DefaultLayout>;

  
  return (
    <DefaultLayout>
      {/* Datos del artículo */}
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold md:text-4xl mb-2">{document.nombre}</h1>
        <h3 className="text-xl font-semibold text-gray-600 mb-5">Subido por: {document.usuario}</h3>
      </div>

      {/* PDF incrustado */}
      <div className="mt-10 border border-gray-300 rounded-lg overflow-hidden">
        <iframe
          src={`http://localhost:3000${document.direccionDoc}`}
          title={document.nombre}
          width="100%"
          height="800px"
          style={{ border: 'none' }}
        />
      </div>
    </DefaultLayout>
  );
};

export default DocsPage;