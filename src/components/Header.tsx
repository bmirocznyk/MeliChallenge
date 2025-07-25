import React, { useState } from 'react';
import { MapPin, ChevronDown, Bell, ShoppingCart } from 'lucide-react';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if the search query is a number
    const number = parseInt(searchQuery);
    if (!isNaN(number) && number > 0) {
      // Redirect to the numbered route
      window.location.href = `/${number}`;
    } else {
      // Handle regular search (you can add your search logic here)
      // TODO: Implement search functionality
    }
  };

  return (
    <header className="bg-ml-yellow w-full">
      {/* Top Row */}
      <div className="flex items-center justify-between w-full px-4 pt-2">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img
            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.5.1/mercadolibre/logo__large_plus.png"
            alt="Mercado Libre"
            className="h-8 md:h-10"
          />
        </div>
        {/* Search Bar */}
        <form className="flex-1 mx-4 md:mx-8 max-w-2xl flex" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 md:px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ml-blue text-sm md:text-base"
          />
          <button type="submit" className="bg-ml-blue text-white px-3 md:px-4 py-2 rounded-r hover:bg-blue-700 text-sm md:text-base flex-shrink-0">
            Buscar
          </button>
        </form>
        {/* Empty div to maintain layout balance */}
        <div className="w-16 md:w-32 flex-shrink-0"></div>
      </div>
      
      {/* Bottom Row */}
      <div className="flex items-center justify-between w-full px-4 pb-2 mt-1">
        {/* Location */}
        <div className="flex items-center text-xs text-gray-800 gap-1 flex-shrink-0">
          <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
          <span className="hidden sm:inline">Enviar a <b>Bruno</b> Cabildo 500</span>
          <span className="sm:hidden">Enviar a <b>Bruno</b></span>
        </div>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-800 flex-shrink-0">
          <a href="#" className="flex items-center hover:text-ml-blue whitespace-nowrap">Categorías <ChevronDown className="w-3 h-3 ml-1" /></a>
          <a href="#" className="hover:text-ml-blue whitespace-nowrap">Ofertas</a>
          <a href="#" className="hover:text-ml-blue whitespace-nowrap">Cupones</a>
          <a href="#" className="hover:text-ml-blue whitespace-nowrap">Supermercado</a>
          <a href="#" className="hover:text-ml-blue whitespace-nowrap">Moda</a>
          <a href="#" className="hover:text-ml-blue whitespace-nowrap">Vender</a>
          <a href="#" className="hover:text-ml-blue whitespace-nowrap">Ayuda</a>
        </nav>
        
        {/* User Section */}
        <div className="flex items-center gap-2 md:gap-4 text-sm text-gray-800 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-ml-blue rounded-full flex items-center justify-center text-white font-medium text-xs md:text-sm">BM</div>
            <span className="font-medium hidden md:inline">Bruno</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </div>
          <a href="#" className="hidden md:block hover:text-ml-blue whitespace-nowrap">Mis compras</a>
          <a href="#" className="hidden md:flex items-center hover:text-ml-blue whitespace-nowrap">Favoritos <ChevronDown className="w-3 h-3 ml-1" /></a>
          <button className="hover:text-ml-blue"><Bell className="w-4 h-4 md:w-5 md:h-5" /></button>
          <button className="relative hover:text-ml-blue"><ShoppingCart className="w-4 h-4 md:w-5 md:h-5" /></button>
        </div>
      </div>
    </header>
  );
}; 