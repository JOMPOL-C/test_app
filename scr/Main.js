import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import DarkModeSwitch from "../ModeDark";

const Main = ({ navigation ,isDarkMode, setIsDarkMode}) => {
    return (
        <View style={[styles.container, isDarkMode && styles.darkBackground]}>
            <DarkModeSwitch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <Text style={[styles.text ,isDarkMode && styles.darkText]}>Welcome to my Screen</Text>
            <View style={styles.ButtonContainer}>
            <CustomButton 
                title="Edit Mode"
                onPress={() => navigation.navigate("Edit")}
                backgroundColor="blue"
            />
            <CustomButton 
                title="Shop Made"
                onPress={() => navigation.navigate("Shoppage")}
                backgroundColor="green"
            />
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    darkBackground: { 
        backgroundColor: "#333" 
      },
      darkText: { 
        color: "#fff" 
    },
});

export default Main;
