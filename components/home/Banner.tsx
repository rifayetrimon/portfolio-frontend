import Navbar from "../layout/navbar";

export default function Banner() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        {/* Your banner content here */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg text-gray-600 sm:text-xl">
          Building amazing web experiences
        </p>

        {/* Add your logo, download button, or other banner content */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
            View Projects
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 transition hover:bg-gray-50">
            Download CV
          </button>
        </div>
      </div>
    </div>
  );
}
