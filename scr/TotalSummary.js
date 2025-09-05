import React from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { myStyle } from "./myStyle";

const TotalSummary = ({ cart, onRemove, onCheckout, onClear }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={myStyle.cartContainer}>
      <View style={myStyle.cartTitleContainer}>
        <Text style={myStyle.cartTitle}>🛒 ตะกร้าสินค้า</Text>
        <TouchableOpacity onPress={onClear} style={myStyle.clearButton}>
          <Text style={myStyle.buttonText}>เคลียร์ตะกร้า</Text>
        </TouchableOpacity>
      </View>
      <Text>ราคารวม: {totalPrice} บาท</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={myStyle.cartItem}>
            <Text>{item.title} x {item.quantity}</Text>
            <TouchableOpacity onPress={() => onRemove(item.id)} style={myStyle.removeButton}>
              <Text style={myStyle.removeButtonText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="ไปชำระเงิน" onPress={onCheckout} color="pink" />
    </View>
  );
};

export default TotalSummary;
