import React from 'react';

interface ProductDescriptionProps {
  product: any;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product: _product }) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Descripción</h2>
      
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          Descubre Adidas Vibes Full Recharge Eau de Parfum, un perfume que busca una fragancia fresca y energizante. 
          Con un formato de spray de 100 ml, este perfume se convierte en el compañero ideal para cualquier ocasión, 
          ya sea un día en la oficina o una salida nocturna.
        </p>
        
        <p>
          La familia olfativa Fougére aporta una mezcla equilibrada de notas de hojas de cedro y menta, 
          creando una experiencia olfativa única que resalta la masculinidad y la vitalidad. 
          Su aroma envolvente y duradero te acompañará a lo largo del día, dejando una estela de frescura 
          que no pasará desapercibida.
        </p>
      </div>
    </div>
  );
}; 