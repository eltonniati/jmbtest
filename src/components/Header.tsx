import { useState } from "react";
import { Menu, X, ShoppingCart, Zap, MessageCircle } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onWhatsAppClick?: () => void;
}

const Header = ({ cartCount, onCartClick, onWhatsAppClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#feedback", label: "Feedback" },
    { href: "#team", label: "Our Team" },
    { href: "#products", label: "Shop" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleWhatsAppClick = () => {
    if (onWhatsAppClick) {
      onWhatsAppClick();
    } else {
      window.open("https://wa.me/27724144797", "_blank");
    }
  };

  return (
    <header className="bg-secondary text-secondary-foreground py-4 sticky top-0 z-50 shadow-lg">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="w-8 h-8 text-primary" />
          <span className="text-xl font-poppins font-bold">
            JMB <span className="text-primary">ELECTRICAL</span>
          </span>
        </div>

        <button
          className="lg:hidden text-secondary-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`
          ${isMobileMenuOpen ? 'flex' : 'hidden'} lg:flex
          absolute lg:relative top-full left-0 w-full lg:w-auto
          bg-secondary lg:bg-transparent
          flex-col lg:flex-row
          py-4 lg:py-0
          shadow-lg lg:shadow-none
        `}>
          <ul className="flex flex-col lg:flex-row items-center">
            {navLinks.map((link) => (
              <li key={link.href} className="w-full lg:w-auto">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full lg:w-auto px-4 py-3 lg:py-2 lg:ml-8 text-secondary-foreground font-medium text-lg hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="w-full lg:w-auto">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center gap-2 w-full lg:w-auto px-4 py-3 lg:py-2 lg:ml-8 text-secondary-foreground font-medium hover:text-green-500 transition-colors"
              >
                <MessageCircle size={20} className="text-green-500" />
                <span className="text-sm hidden lg:inline">WhatsApp</span>
              </button>
            </li>
            <li className="w-full lg:w-auto">
              <button
                onClick={onCartClick}
                className="flex items-center justify-center gap-2 w-full lg:w-auto px-4 py-3 lg:py-2 lg:ml-8 text-secondary-foreground font-medium hover:text-primary transition-colors"
              >
                <ShoppingCart size={20} />
                <span className="bg-primary text-primary-foreground text-sm px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
