import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { styles } from '../StyleSheets/HomeScreen.css.js';

const HomeScreen = () => {
  const [randomMeal, setRandomMeal] = useState(null);
  const [randomIngredients, setRandomIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  // Array de ingredientes populares (del 1 al 4)
  const popularIngredients = [
    { id: 1, name: 'Chicken', image: 'https://www.themealdb.com/images/ingredients/chicken.png' },
    { id: 2, name: 'Beef', image: 'https://www.themealdb.com/images/ingredients/beef.png' },
    { id: 3, name: 'Salmon', image: 'https://www.themealdb.com/images/ingredients/salmon.png' },
    { id: 4, name: 'Pork', image: 'https://www.themealdb.com/images/ingredients/pork.png' }
  ];

  // Función para obtener una comida aleatoria
  const fetchRandomMeal = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setRandomMeal(data.meals[0]);
      }
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  // Función para obtener todos los ingredientes
  const fetchAllIngredients = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      if (data.meals) {
        setAllIngredients(data.meals);
        generateRandomIngredients(data.meals);
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  // Función para generar 4 ingredientes aleatorios (excluyendo los primeros 4 populares)
  const generateRandomIngredients = (ingredientsList = allIngredients) => {
    if (ingredientsList.length === 0) return;
    
    // Excluimos los primeros 4 ingredientes (los populares)
    const availableIngredients = ingredientsList.slice(4);
    
    // Generamos 4 índices aleatorios únicos
    const randomIndices = new Set();
    while (randomIndices.size < 4 && randomIndices.size < availableIngredients.length) {
      const randomIndex = Math.floor(Math.random() * availableIngredients.length);
      randomIndices.add(randomIndex);
    }
    
    // Obtenemos los ingredientes aleatorios
    const selectedIngredients = Array.from(randomIndices).map(index => ({
      id: availableIngredients[index].idIngredient,
      name: availableIngredients[index].strIngredient,
      image: `https://www.themealdb.com/images/ingredients/${availableIngredients[index].strIngredient}.png`
    }));
    
    setRandomIngredients(selectedIngredients);
  };

  // Función para refrescar ingredientes aleatorios
  const refreshRandomIngredients = () => {
    if (allIngredients.length > 0) {
      generateRandomIngredients();
    }
  };

  // Cargar datos al iniciar
  useEffect(() => {
    fetchRandomMeal();
    fetchAllIngredients();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>401 MEALS</Text>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>🏠 HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>🔍 SEARCH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>❤️ Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>☰ More</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Discover Recipes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discover Recipes</Text>
          <View style={styles.carouselContainer}>
            <Text style={styles.carouselText}>
              Recipe Carousel Container
            </Text>
          </View>
        </View>

        {/* Popular Ingredients Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Ingredients</Text>
          <View style={styles.ingredientsGrid}>
            {popularIngredients.map((ingredient) => (
              <View key={ingredient.id} style={styles.ingredientItem}>
                <Image 
                  source={{ uri: ingredient.image }} 
                  style={styles.ingredientImage}
                />
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Random Meal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Don't Know What to Cook?</Text>
          <View style={styles.randomMealContainer}>
            {randomMeal ? (
              <View style={styles.mealContent}>
                <Image 
                  source={{ uri: randomMeal.strMealThumb }} 
                  style={styles.mealImage}
                />
                <Text style={styles.mealName}>{randomMeal.strMeal}</Text>
                <TouchableOpacity onPress={fetchRandomMeal}>
                  <Text style={styles.refreshText}>Tap to refresh</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.containerText}>Loading...</Text>
            )}
          </View>
        </View>

        {/* Inspiration Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Inspired</Text>
          <View >
            {randomIngredients.length > 0 ? (
              <View style={styles.inspirationContent}>
                <View style={styles.ingredientsGrid}>
                  {randomIngredients.map((ingredient) => (
                    <View key={ingredient.id} style={styles.ingredientItem}>
                      <Image 
                        source={{ uri: ingredient.image }} 
                        style={styles.ingredientImage}
                      />
                      <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity onPress={refreshRandomIngredients}>
                  <Text style={styles.refreshText}>Tap to refresh ingredients</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.containerText}>Loading ingredients...</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;