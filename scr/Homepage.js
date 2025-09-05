import { StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProducts } from "../ProductContext";
import { myStyle } from "./myStyle";
import DarkModeSwitch from "../ModeDark";

const shoppage = ({ navigation ,isDarkMode, setIsDarkMode}) => {
  const { products, setProducts } = useProducts();
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem("products");
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.log("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  //AsyncStorage 
  useEffect(() => {
    const saveProducts = async () => {
      try {
        await AsyncStorage.setItem("products", JSON.stringify(products));
      } catch (error) {
        console.log("Error saving products:", error);
      }
    };

    if (products.length > 0) {
      saveProducts();
    }
  }, [products]);


  const togglePurchased = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "purchased" ? "not_purchased" : "purchased" }
          : item
      )
    );
  };


  const handlePurchase = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemove = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };


  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);


  const handleCheckout = () => {
    setProducts((prev) =>
      prev.map((item) =>
        cart.find((cartItem) => cartItem.id === item.id)
          ? { ...item, status: "purchased" }
          : item
      )
    );
    setCart([]);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkBackground]}>
      <DarkModeSwitch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <TextInput
        style={[myStyle.input, { marginTop: 60 }]}
        placeholder="ค้นหา..."
        value={searchText}
        onChangeText={setSearchText}
      />


      <FlatList
        data={products.filter((item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[myStyle.card ,isDarkMode && styles.darkCard]}>
            <Image source={{ uri: item.image }} style={myStyle.image} />
            <View style={myStyle.infoContainer}>
              <Text style={myStyle.title}>{item.title}</Text>
              <Text style={myStyle.price}>{item.price} บาท</Text>
              <View style={myStyle.buttonContainer}>
                <TouchableOpacity
                  style={myStyle.addButton}
                  onPress={() => handlePurchase(item)}
                >
                  <Text style={myStyle.buttonText}>เพิ่มลงตะกร้า</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    myStyle.statusButton,
                    { backgroundColor: item.status === "purchased" ? "#4CAF50" : "#d7c500" },
                  ]}
                  onPress={() => togglePurchased(item.id)}
                >
                  <Text style={myStyle.buttonText}>
                    {item.status === "purchased" ? "✔ ซื้อแล้ว" : "🛒 ยังไม่ได้ซื้อ"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {cart.length > 0 && (
        <View style={myStyle.cartContainer}>
          <View style={myStyle.cartTitleContainer}>
            <Text style={myStyle.cartTitle}>🛒 ตะกร้าสินค้า</Text>
            <TouchableOpacity onPress={clearCart} style={myStyle.clearButton}>
              <Text style={myStyle.buttonText}>เคลียร์ตะกร้า</Text>
            </TouchableOpacity>
          </View>
          <Text>ราคา: {totalPrice} บาท</Text>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={myStyle.cartItem}>
                <Text>{item.title} x {item.quantity}</Text>
                <TouchableOpacity onPress={() => handleRemove(item.id)} style={myStyle.removeButton}>
                  <Text style={myStyle.removeButtonText}>ลบ</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Button title="ไปชำระเงิน" onPress={handleCheckout} color="pink" />
        </View>
      )}

      <TouchableOpacity
        style={myStyle.editButton}
        onPress={() => navigation.navigate("Edit")}
      >
        <Text style={myStyle.buttonText}>เพิ่มสินค้าใหม่</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create ({
  darkBackground: { 
    backgroundColor: "#333" 
  },
  darkCard: { 
    backgroundColor: "#555",
  },
  darkText: { 
    color: "#fff" 
},
buttonText: {
  color: "black",
},
infoContainer:{
  paddingTop: 100,
}
})
export default shoppage;
