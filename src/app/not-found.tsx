import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 lg:pt-20 min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-8xl font-bold text-navy-100 mb-4" aria-hidden="true">404</p>
          <h1 className="text-3xl font-bold text-navy-900 mb-3">Page Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Go to Home
            </Link>
            <Link href="/about#contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
