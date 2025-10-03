import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Basket() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="relative">
      <FaShoppingCart className="w-10 h-10 text-black" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
}
