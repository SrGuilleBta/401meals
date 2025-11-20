import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import HomeScreen from './src/Components/HomeScreen';
import MealDetailScreen from './src/Components/MealDetailScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [screenParams, setScreenParams] = useState({});

  const navigateTo = (screenName, params = {}) => {
    setScreenParams(params);
    setCurrentScreen(screenName);
  };

  const goBack = () => {
    setCurrentScreen('Home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigateTo={navigateTo} />;
      case 'MealDetail':
        return (
          <MealDetailScreen 
            navigateTo={navigateTo} 
            goBack={goBack}
            meal={screenParams.meal}
          />
        );
      default:
        return <HomeScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {renderScreen()}
    </View>
  );
}