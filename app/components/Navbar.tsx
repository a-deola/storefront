import Cart from "../components/Cart"
export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl  font-mono">Storefront</h1>
      <Cart />
    </nav>
  );
}
