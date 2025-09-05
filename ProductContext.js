import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductContext = createContext();

const defaultProducts = [
  {
    id: "1",
    title: "M&M Peanut Chocolate 37g.",
    image: "https://assets.tops.co.th/MM-MMPeanutChocolate37g-0000093682978-1",
    price: 30,
    status: "not_purchased",
  },
  {
    id: "2",
    title: "M&M Almond Block 45g.",
    image: "https://assets.tops.co.th/MM-MMAlmondBlock45g-6914973613027-1",
    price: 30,
    status: "not_purchased",
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  //AsyncStorage
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem("products");
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        } else {
          setProducts(defaultProducts);
          await AsyncStorage.setItem("products", JSON.stringify(defaultProducts));
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts(defaultProducts);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (products !== null) {
      const saveProducts = async () => {
        try {
          await AsyncStorage.setItem("products", JSON.stringify(products));
        } catch (error) {
          console.error("Error saving products:", error);
        }
      };
      saveProducts();
    }
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
