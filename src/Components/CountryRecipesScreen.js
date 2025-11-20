import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { styles } from '../StyleSheets/CountryRecipesScreen.css.js';
import HeaderWithNav from './HeaderWithNav';

const CountryRecipesScreen = ({ navigateTo, goBack, country }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener recetas por país
  const fetchRecipesByCountry = async (countryName) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`
      );
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error('Error fetching recipes by country:', err);
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Función para navegar a detalles de comida
  const navigateToMealDetail = async (mealId) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();
      
      if (data.meals && data.meals.length > 0) {
        navigateTo('MealDetail', { meal: data.meals[0] });
      }
    } catch (err) {
      console.error('Error fetching meal details:', err);
    }
  };

  // Función para refrescar (volver a home)
  const refreshHome = () => {
    navigateTo('Home');
  };

  // Cargar recetas cuando el componente se monta o cambia el país
  useEffect(() => {
    if (country) {
      fetchRecipesByCountry(country.name);
    }
  }, [country]);

  if (!country) {
    return (
      <View style={styles.container}>
        <HeaderWithNav onRefreshHome={refreshHome} navigateTo={navigateTo} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No country selected</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithNav onRefreshHome={refreshHome} navigateTo={navigateTo} />
      
      <ScrollView style={styles.content}>
        {/* Header del país */}
        <View style={styles.countryHeader}>
          <Image 
            source={{ uri: country.flag }} 
            style={styles.countryFlag}
          />
          <Text style={styles.countryHeaderName}>
            {country.name} Cuisine
          </Text>
        </View>

        {/* Lista de recetas */}
        <View style={styles.recipesSection}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B6B" />
              <Text style={styles.loadingText}>Loading recipes...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => fetchRecipesByCountry(country.name)}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : recipes.length > 0 ? (
            <View style={styles.recipesGrid}>
              {recipes.map((recipe) => (
                <TouchableOpacity
                  key={recipe.idMeal}
                  style={styles.recipeCard}
                  onPress={() => navigateToMealDetail(recipe.idMeal)}
                >
                  <Image
                    source={{ uri: recipe.strMealThumb }}
                    style={styles.recipeImage}
                  />
                  <Text style={styles.recipeName} numberOfLines={2}>
                    {recipe.strMeal}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.noRecipesContainer}>
              <Text style={styles.noRecipesText}>
                No recipes found from {country.name}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CountryRecipesScreen;