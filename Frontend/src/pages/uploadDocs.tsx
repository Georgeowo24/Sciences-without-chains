import DefaultLayout from "@/layouts/default";
import { Input, Button, Link, Autocomplete, AutocompleteItem } from "@heroui/react";

export const categories = [
    {label: "Ciencia", key: "science"},
    {label: "Biologia", key: "biology"},
    {label: "Quimica", key: "chemistry"},
    {label: "Fisica", key: "fisic"},
    {label: "Tecnologia", key: "tech"},
    {label: "Redes Neuronales", key: "redNeu"}
];


export default function UploadDocsPage() {
    return (
        <DefaultLayout>
            <div>
                <h1 className="text-3xl font-bold text-center my-10  ">Upload Document</h1>
                <div className="flex flex-col items-center justify-center">
                    <form className="flex flex-col gap-6 items-center w-full">
                        <Input
                            isRequired
                            className="w-96 max-w-full"
                            label="Title"
                            type="text"
                        />
                        <Input
                            isRequired
                            className="w-96 max-w-full"
                            label="File"
                            type="file"
                            accept="application/pdf"
                        />

                        <Autocomplete className="w-96 max-w-full" label="Select a category">
                            {categories.map((category) => (
                                <AutocompleteItem key={category.key}>{category.label}</AutocompleteItem>
                            ))}
                        </Autocomplete>          
                        
                        <Button
                            as={Link}
                            href="#"
                            color="primary"
                            variant="shadow"
                            size="lg"
                            className="w-96 max-w-full"
                        >
                            Upload a new document
                        </Button>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    )
}