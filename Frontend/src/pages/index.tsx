import SearchIndex from "@/components/searchIndex";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="relative w-full h-full min-h-[70vh] rounded-xl flex flex-col items-center justify-center text-center p-8 overflow-hidden">
            
          {/* Blur */}
          <div className="absolute inset-0 bg-[url(./IndexImg.jpg)] bg-cover bg-center blur-[5px] scale-110"></div>
            
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Free scientific documents</h1>
            <p className="mt-2 text-sm md:text-base text-gray-700">
              Access thousands of research papers, journals, and scientific publications. All free, all accessible.
            </p>
            <SearchIndex />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
