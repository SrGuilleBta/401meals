import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Alert,
  Linking
} from 'react-native';
import { styles } from '../StyleSheets/MealDetailScreen.css.js';
import HeaderWithNav from './HeaderWithNav';

const MealDetailScreen = ({ meal, navigateTo }) => {

  // Función para abrir el video de YouTube
  const openYouTubeVideo = () => {
    if (meal.strYoutube) {
      Linking.openURL(meal.strYoutube).catch(err => {
        console.error('Error opening YouTube:', err);
        Alert.alert('Error', 'Could not open YouTube video');
      });
    }
  };

  // Función para refrescar (volver a home)
  const refreshHome = () => {
    navigateTo('Home');
  };

  return (
    <View style={styles.container}>
      <HeaderWithNav onRefreshHome={refreshHome} navigateTo={navigateTo} />
      
      <ScrollView style={styles.content}>
        {/* Imagen de la comida */}
        <Image 
          source={{ uri: meal.strMealThumb }} 
          style={styles.mealImage}
        />
        
        {/* Nombre de la comida */}
        <View style={styles.headerSection}>
          <Text style={styles.mealName}>{meal.strMeal}</Text>
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
            <TouchableOpacity onPress={openYouTubeVideo}>
              <Text style={styles.videoText}>
                Watch on YouTube: {meal.strYoutube}
              </Text>
            </TouchableOpacity>
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