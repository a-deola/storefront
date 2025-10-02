import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-8 sm:p-20">
        <h2 className="text-3xl font-semibold">Welcome to our Store!</h2>
      </main>

      <Footer />
    </div>
  );
}
