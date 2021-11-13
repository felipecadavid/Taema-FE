import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ProductsCarousel.css'

function ProductsCarousel({ products, details }) {
  console.log("PRODUCTS CAROUSEL: ", products);
  return (
    <Carousel className="products-carousel__carousel" swipeable={false}>
      {products.map((product) => {
        return (
          <div key={product._id}>
            <img src={product.image} alt={product.name} />
            {details && (
              <>
                <p className="legend" id="productsCarouselCustomlegend">
                  <span>Producto: {product.name}</span>
                  <span>Precio: ${product.totalPrice}</span>
                  <span>Cantidad: {product.quantity}</span>
                </p>
              </>
            )}
          </div>
        );
      })}
    </Carousel>
  );
}

export default ProductsCarousel;
