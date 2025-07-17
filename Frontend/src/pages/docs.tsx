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