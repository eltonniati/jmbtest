import { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Products, { Product } from "@/components/Products";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartModal, { CartItem } from "@/components/CartModal";
import Admin from "@/components/Admin";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CompletedJobs from "@/components/CompletedJobs";

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'main' | 'admin'>('main');
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    // Check URL for admin route - IMPORTANT FOR VERCEL
    const path = window.location.pathname;
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(window.location.search);
    
    if (path === '/admin' || hash === '#admin' || searchParams.get('page') === 'admin') {
      setCurrentPage('admin');
      // Update URL to use hash for Vercel compatibility
      if (path === '/admin') {
        window.history.replaceState({}, '', '/#admin');
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        { id: product.id, name: product.name, price: product.price, quantity: 1 },
      ];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdminLogin = (credentials: { username: string; password: string }) => {
    if (credentials.username === "admin" && credentials.password === "jmb2024") {
      setCurrentPage('admin');
      // Use hash routing for Vercel
      window.history.pushState({}, '', '/#admin');
      toast.success("Welcome to Admin Panel");
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setCurrentPage('main');
    window.history.pushState({}, '', '/');
    toast.info("Logged out successfully");
  };

  const handleBackToSite = () => {
    setCurrentPage('main');
    window.history.pushState({}, '', '/');
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/27724144797", "_blank");
  };

  const handleUpdateProducts = (products: Product[]) => {
    setAdminProducts(products);
  };

  // Render Admin Page
  if (currentPage === 'admin') {
    return <Admin onLogout={handleAdminLogout} onBackToSite={handleBackToSite} onUpdateProducts={handleUpdateProducts} />;
  }

  // Render Main Website
  return (
    <div className="min-h-screen">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onWhatsAppClick={handleWhatsAppClick}
      />
      <main>
        <Hero onWhatsAppClick={handleWhatsAppClick} />
        <Services />
        <CompletedJobs />
        <Testimonials />
        <Team />
        <Products onAddToCart={handleAddToCart} />
        <Contact onWhatsAppClick={handleWhatsAppClick} />
      </main>
      <Footer onWhatsAppClick={handleWhatsAppClick} />
      
      {/* Admin Access Button - COMMENTED OUT FOR PUBLIC RELEASE */}
      {/*
      <button
        onClick={() => {
          setCurrentPage('admin');
          window.history.pushState({}, '', '/#admin');
        }}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-900 hover:scale-110 transition-all duration-300 flex items-center justify-center opacity-20 hover:opacity-100"
        aria-label="Admin Access"
        title="Admin Access"
      >
        <span className="text-xs">Admin</span>
      </button>
      */}
      
      <WhatsAppFloat onClick={handleWhatsAppClick} />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default App;
