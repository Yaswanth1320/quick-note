import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BackToTopButton from "@/components/BackToTopButton";
import Testimonials from "@/components/Testimonials";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Features Section */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8">
        <Features />
      </section>

      <Testimonials />

      <Footer />
      <BackToTopButton />
    </main>
  );
}
