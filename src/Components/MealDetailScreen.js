import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { styles } from '../StyleSheets/MealDetailScreen.css.js';
import HeaderWithNav from './HeaderWithNav';
import * as FileSystem from 'expo-file-system';

const MealDetailScreen = ({ meal, goBack }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Función para agregar a favoritos (guardar en txt)
  const addToFavorites = async () => {
    try {
      const favoritesPath = `${FileSystem.documentDirectory}favorites.txt`;
      
      // Leer favoritos existentes
      let favorites = [];
      try {
        const fileContent = await FileSystem.readAsStringAsync(favoritesPath);
        favorites = JSON.parse(fileContent);
      } catch (error) {
        // Archivo no existe, empezar con array vacío
      }

      // Verificar si ya está en favoritos
      const alreadyFavorite = favorites.some(fav => fav.idMeal === meal.idMeal);
      
      if (!alreadyFavorite) {
        // Agregar a favoritos
        favorites.push(meal);
        await FileSystem.writeAsStringAsync(favoritesPath, JSON.stringify(favorites));
        setIsFavorite(true);
        Alert.alert('Success', 'Added to favorites!');
      } else {
        Alert.alert('Info', 'Already in favorites!');
      }
    } catch (error) {
      console.error('Error saving favorite:', error);
      Alert.alert('Error', 'Failed to add to favorites');
    }
  };

  // Función para refrescar (volver a home)
  const refreshHome = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderWithNav onRefreshHome={refreshHome} />
      
      <ScrollView style={styles.content}>
        {/* Imagen de la comida */}
        <Image 
          source={{ uri: meal.strMealThumb }} 
          style={styles.mealImage}
        />
        
        {/* Nombre y botón de favoritos */}
        <View style={styles.headerSection}>
          <Text style={styles.mealName}>{meal.strMeal}</Text>
          <TouchableOpacity 
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={addToFavorites}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? '❤️ Added' : '🤍 Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categoría y Área */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>Category: {meal.strCategory}</Text>
          <Text style={styles.infoText}>Area: {meal.strArea}</Text>
        </View>

        {/* Ingredientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {getIngredients(meal).map((ingredient, index) => (
              <Text key={index} style={styles.ingredientText}>
                • {ingredient}
              </Text>
            ))}
          </View>
        </View>

        {/* Instrucciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>
            {meal.strInstructions}
          </Text>
        </View>

        {/* Video (si existe) */}
        {meal.strYoutube && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Video Tutorial</Text>
            <Text style={styles.videoText}>
              Watch on YouTube: <a href='{meal.strYoutube}'>{meal.strYoutube}</a>
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Función auxiliar para obtener ingredientes
const getIngredients = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }
  return ingredients;
};

export default MealDetailScreen;