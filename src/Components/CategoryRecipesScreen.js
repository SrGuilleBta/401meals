import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { styles } from '../StyleSheets/CategoryRecipesScreen.css.js';
import HeaderWithNav from './HeaderWithNav';

const CategoryRecipesScreen = ({ navigateTo, goBack, category }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener recetas por categoría
  const fetchRecipesByCategory = async (categoryName) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
      );
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error('Error fetching recipes by category:', err);
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

  // Cargar recetas cuando el componente se monta o cambia la categoría
  useEffect(() => {
    if (category) {
      fetchRecipesByCategory(category.strCategory);
    }
  }, [category]);

  if (!category) {
    return (
      <View style={styles.container}>
        <HeaderWithNav onRefreshHome={refreshHome} navigateTo={navigateTo} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No category selected</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderWithNav onRefreshHome={refreshHome} navigateTo={navigateTo} />
      
      <ScrollView style={styles.content}>
        {/* Header de la categoría */}
        <View style={styles.categoryHeader}>
          <Image 
            source={{ uri: category.strCategoryThumb }} 
            style={styles.categoryImage}
          />
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{category.strCategory}</Text>
            <Text style={styles.categoryDescription} numberOfLines={4}>
              {category.strCategoryDescription}
            </Text>
          </View>
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
                onPress={() => fetchRecipesByCategory(category.strCategory)}
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
                No recipes found in {category.strCategory} category
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryRecipesScreen;