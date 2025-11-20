import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import HomeScreen from './src/Components/HomeScreen';
import MealDetailScreen from './src/Components/MealDetailScreen';
import IngredientRecipesScreen from './src/Components/IngredientRecipesScreen';
import CountriesScreen from './src/Components/CountriesScreen';
import CountryRecipesScreen from './src/Components/CountryRecipesScreen';

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
      case 'IngredientRecipes':
        return (
          <IngredientRecipesScreen 
            navigateTo={navigateTo} 
            goBack={goBack}
            ingredient={screenParams.ingredient}
          />
        );
      case 'Countries':
        return (
          <CountriesScreen 
            navigateTo={navigateTo} 
            goBack={goBack}
          />
        );
      case 'CountryRecipes':
        return (
          <CountryRecipesScreen 
            navigateTo={navigateTo} 
            goBack={goBack}
            country={screenParams.country}
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