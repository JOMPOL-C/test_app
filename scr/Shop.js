import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Shop = ({ title, image, price, status, onPress, onToggleStatus }) => {
  return (
    <View style={myStyle.card}>
      <Image source={{ uri: image }} style={myStyle.image} />
      <View style={myStyle.info}>
        <Text style={myStyle.title}>{title}</Text>
        <Text style={myStyle.price}>ราคา: {price} บาท</Text>
        

        <TouchableOpacity style={myStyle.addButton} onPress={onPress}>
          <Text style={myStyle.buttonText}>🛒 เพิ่มลงตะกร้า</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            myStyle.statusButton,
            { backgroundColor: status === "purchased" ? "#4CAF50" : "#d7c500" }
          ]}
          onPress={onToggleStatus}
        >
          <Text style={myStyle.buttonText}>
            {status === "purchased" ? "✔ ซื้อแล้ว" : "🛒 ยังไม่ได้ซื้อ"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shop;