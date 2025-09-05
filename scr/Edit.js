import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useProducts } from "../ProductContext";
import { myStyle } from "./myStyle";
import { launchImageLibrary } from "react-native-image-picker";
import DarkModeSwitch from "../ModeDark";

const Edit = ({ isDarkMode, setIsDarkMode }) => {
  const navigation = useNavigation();
  const { setProducts, products } = useProducts();
  const { params } = useRoute();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (params?.product) {
      const productToEdit = params.product;
      setSelectedProduct(productToEdit);
      setTitle(productToEdit.title);
      setPrice(productToEdit.price.toString());
      setImage(productToEdit.image);
    }
  }, [params?.product]);

  const validateField = (field, value) => {
    let error = "";
    if (!value.trim()) {
      error = "กรุณากรอกข้อมูล!";
    } else {
      if (field === "price" && (isNaN(value) || parseFloat(value) <= 0)) {
        error = "ราคาต้องเป็นตัวเลขที่มากกว่า 0!";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error;
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.5 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleAddProduct = () => {
    const titleError = validateField("title", title);
    const priceError = validateField("price", price);
    const imageError = validateField("image", image);

    if (titleError || priceError || imageError) {
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      title: title.trim(),
      price: parseFloat(price),
      image,
      status: "not_purchased",
    };

    setProducts((prev) => [...prev, newProduct]);
    setTitle("");
    setPrice("");
    setImage("");
    setErrors({});
  };

  const handleEditProduct = () => {
    const titleError = validateField("title", title);
    const priceError = validateField("price", price);
    const imageError = validateField("image", image);

    if (titleError || priceError || imageError) {
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === selectedProduct.id
          ? { ...item, title: title.trim(), price: parseFloat(price), image }
          : item
      )
    );

    setTitle("");
    setPrice("");
    setImage("");
    setSelectedProduct(null);
    setErrors({});
  };

  const handleDeleteProduct = () => {
    setProducts((prev) => prev.filter((item) => item.id !== selectedProduct.id));
    setTitle("");
    setPrice("");
    setImage("");
    setSelectedProduct(null);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkBackground]}>
      <DarkModeSwitch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        {selectedProduct ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
      </Text>

      {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
      <TextInput
        style={[myStyle.editbutton, isDarkMode && styles.darkInput]}
        placeholder="ชื่อสินค้า"
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        value={title}
        onChangeText={setTitle}
        onBlur={() => validateField("title", title)}
      />

      {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
      <TextInput
        style={[myStyle.editbutton, isDarkMode && styles.darkInput]}
        placeholder="ราคา"
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        onBlur={() => validateField("price", price)}
      />

      {errors.image ? <Text style={styles.errorText}>{errors.image}</Text> : null}
      <TextInput
        style={[myStyle.editbutton, isDarkMode && styles.darkInput]}
        placeholder="ลิงก์รูปภาพ"
        placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
        value={image}
        onChangeText={setImage}
        onBlur={() => validateField("image", image)}
      />

      <TouchableOpacity onPress={pickImage} style={myStyle.imagePickerButton}>
        <Text style={myStyle.buttonText}>เลือกภาพสินค้า</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={myStyle.selectedImage} />}

      {selectedProduct ? (
        <View style={styles.buttonContainer}>
          <Button title="บันทึกการแก้ไข" onPress={handleEditProduct} />
          <TouchableOpacity onPress={handleDeleteProduct} style={styles.deleteButton}>
            <Text style={{ color: "white" }}>ลบสินค้า</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Button title="เพิ่มสินค้า" onPress={handleAddProduct} />
      )}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.text, isDarkMode && styles.darkText]}>{item.title}</Text>
              <Text style={[styles.text, isDarkMode && styles.darkText]}>{item.price} บาท</Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Button
                  title="แก้ไข"
                  onPress={() => {
                    setSelectedProduct(item);
                    setTitle(item.title);
                    setPrice(item.price.toString());
                    setImage(item.image);
                  }}
                />
                <Button title="ลบ" onPress={() => setProducts((prev) => prev.filter((prod) => prod.id !== item.id))} />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 15 ,
    paddingTop: 60,
},
  text: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 10, 
},  
  errorText: { 
    color: "red",
    marginBottom: 5 ,
},
  darkBackground: { 
    backgroundColor: "#333" 
},
  darkText: { 
    color: "#fff" 
},
  darkInput: { 
    backgroundColor: "#555", 
    color: "#fff" 
},
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 10 ,
    position: "static",
    
},
  deleteButton: { 
    backgroundColor: "red", 
    padding: 10 
},
  productItem: { 
    flexDirection: "row", 
    marginVertical: 10 ,
    
},
});

export default Edit;
