import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col rounded-3xl items-center justify-center gap-6 py-12 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full">

          {/*TEXTO */}
          <div className="flex-1 text-center md:text-left">
            <h1 className={title()}>About us</h1>
            <p className="text-gray-600 dark:text-gray-300  ">
              Welcome to our platform! We are dedicated to promoting scientific knowledge
            </p>
          </div>
                    {/* Imagen */}
          <div className="flex-1 flex justify-center">
            <img src = '../public/company.JPG' alt="Our Company"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">

          {/* Tarjeta 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl sahdow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 ">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To inspire curiosity and critical thinking through accessible scientific content.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl sahdow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 ">Our Team</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A passionate group of educators, researchers, and developers working together.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl sahdow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Our Goals</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To bridge the gap between scientific research and public understanding.
            </p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
