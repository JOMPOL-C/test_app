import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./scr/Homepage";
import Edit from "./scr/Edit";
import Main from "./scr/Main";
import TotalSummary from "./scr/TotalSummary"; 
import { ProductProvider } from "./ProductContext";
import DarkModeSwitch from "./ModeDark";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadDarkMode();
  }, []);

  useEffect(() => {
    saveDarkMode();
  }, [isDarkMode]);

  const loadDarkMode = async () => {
    try {
      const darkModeValue = await AsyncStorage.getItem('darkMode');
      if (darkModeValue !== null) {
        setIsDarkMode(JSON.parse(darkModeValue));
      }
    } catch (error) {
      console.error("Error loading dark mode:", error);
    }
  };

  const saveDarkMode = async () => {
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    } catch (error) {
      console.error("Error saving dark mode:", error);
    }
  };
  return (
    <NavigationContainer>
      <ProductProvider>
        <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main">
          {(props) => <Main {...props} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
        </Stack.Screen>
        <Stack.Screen name="Edit">
          {(props) => <Edit {...props} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
        </Stack.Screen>
        <Stack.Screen name="Shoppage">
          {(props) => <Homepage {...props} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
        </Stack.Screen>
          <Stack.Screen name="TotalSummary" component={TotalSummary} />  
        </Stack.Navigator>
      </ProductProvider>
    </NavigationContainer>
  );
};

export default App;
