import DefaultLayout from "@/layouts/default";
import { Input, Button, Autocomplete, AutocompleteItem } from "@heroui/react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const categories = [
    {label: "Ciencia", key: "science"},
    {label: "Biologia", key: "biology"},
    {label: "Quimica", key: "chemistry"},
    {label: "Fisica", key: "fisic"},
    {label: "Tecnologia", key: "tech"},
    {label: "Redes Neuronales", key: "redNeu"}
];

export default function UploadDocsPage() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleCategoryChange = (key: string) => {
        setCategory(key);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!title || !file || !category) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        setLoading(true);

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                setError("Usuario no autenticado.");
                setLoading(false);
                return;
            }
            const token = await user.getIdToken();

            const formData = new FormData();
            console.log(file);
            formData.append("file", file);
            formData.append("nombre", title);
            formData.append("categoria", category);
            
            const userInfo = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };
            formData.append("user", JSON.stringify(userInfo));
            console.log("Form data prepared:", formData.getAll("file"), title, category, userInfo);
            await axios.post("http://localhost:3000/files/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccess("Documento subido correctamente.");
            setTitle("");
            setFile(null);
            setCategory("");

            navigate("/categories"); 
        } catch (err) {
            setError("Error al subir el documento.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DefaultLayout>
            <div>
                <h1 className="text-3xl font-bold text-center my-10">Upload Document</h1>
                <div className="flex flex-col items-center justify-center">
                    <form className="flex flex-col gap-6 items-center w-full" onSubmit={handleSubmit}>
                        <Input
                            isRequired
                            className="w-96 max-w-full"
                            label="Title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <Input
                            isRequired
                            className="w-96 max-w-full"
                            label="File"
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />

                        <Autocomplete
                            className="w-96 max-w-full"
                            label="Select a category"
                            selectedKey={category}
                            onSelectionChange={key => handleCategoryChange(key as string)}
                        >
                            {categories.map((category) => (
                                <AutocompleteItem key={category.key}>{category.label}</AutocompleteItem>
                            ))}
                        </Autocomplete>          

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}
                        {success && (
                            <div className="text-green-600 text-sm text-center">{success}</div>
                        )}

                        <Button
                            color="primary"
                            variant="shadow"
                            size="lg"
                            className="w-96 max-w-full"
                            type="submit"
                            isLoading={loading}
                        >
                            Upload a new document
                        </Button>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    )
}