import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DarkModeSwitch = ({ isDarkMode, setIsDarkMode }) => {
  const firstRender = useRef(true);

  useEffect(() => {
    loadDarkMode();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    saveDarkMode(isDarkMode);
  }, [isDarkMode]);

  const loadDarkMode = async () => {
    try {
      const darkModeValue = await AsyncStorage.getItem('darkMode');
      if (darkModeValue !== null) {
        const parsedValue = JSON.parse(darkModeValue);
        if (parsedValue !== isDarkMode) {
          setIsDarkMode(parsedValue);
        }
      }
    } catch (error) {
      console.error("Error loading dark mode:", error);
    }
  };

  const saveDarkMode = useCallback(async (value) => {
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    } catch (error) {
      console.error("Error saving dark mode:", error);
    }
  }, []);

  return (
    <View style={styles.switchContainer}>
      <Text style={[styles.darkModeText, isDarkMode && styles.darkText]}>Dark Mode</Text>
      <Switch 
        value={isDarkMode} 
        onValueChange={() => setIsDarkMode(prev => !prev)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: { 
    position: "absolute",
    top: 10,
    left: 10,
    right: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  darkModeText: { 
    fontSize: 18, 
    color: '#969696' 
  },
  darkText: { 
    color: '#FFF' 
  },
});

export default DarkModeSwitch;
