import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Image, Button, TouchableOpacity } from "react-native";

const Pay = ({ route, navigation }) => {
  const { cart, setCart } = route.params || { cart: [], setCart: () => {} };


const handleRemove = (id) => {
  const updatedCart = cart.filter((item) => item.id !== id);
  setCart(updatedCart); 
};
  


  useEffect(() => {
    
  }, [cart]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>จำนวน: {item.quantity} ชิ้น</Text>
            </View>

            <Text style={styles.price}>{item.price * item.quantity} บาท</Text>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemove(item.id)}
>
              <Text style={styles.removeButtonText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.text}>ยอดรวม: {totalPrice} บาท</Text>

      <Button title="สั่งซื้อสินค้า" onPress={() => navigation.navigate("Homepage")} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 5,
    borderRadius: 5,
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    textAlign: "right",
    flex: 1,
  },
  removeButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Pay;
