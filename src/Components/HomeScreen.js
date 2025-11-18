import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Animated 
} from 'react-native';
import { styles } from '../StyleSheets/HomeScreen.css.js';

const HomeScreen = () => {
  const [randomMeal, setRandomMeal] = useState(null);
  const [randomIngredients, setRandomIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [carouselRecipes, setCarouselRecipes] = useState([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef(null);

  // Array de ingredientes populares (del 1 al 4)
  const popularIngredients = [
    { id: 1, name: 'Chicken', image: 'https://www.themealdb.com/images/ingredients/chicken.png' },
    { id: 2, name: 'Beef', image: 'https://www.themealdb.com/images/ingredients/beef.png' },
    { id: 3, name: 'Salmon', image: 'https://www.themealdb.com/images/ingredients/salmon.png' },
    { id: 4, name: 'Pork', image: 'https://www.themealdb.com/images/ingredients/pork.png' }
  ];

  // Función para obtener 5 comidas aleatorias para el carrusel
  const fetchCarouselRecipes = async () => {
    try {
      const promises = Array(5).fill().map(() => 
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
          .then(response => response.json())
      );
      
      const results = await Promise.all(promises);
      const recipes = results
        .filter(data => data.meals && data.meals.length > 0)
        .map(data => data.meals[0]);
      
      setCarouselRecipes(recipes);
    } catch (error) {
      console.error('Error fetching carousel recipes:', error);
    }
  };

  // Función para iniciar/reiniciar el intervalo automático
  const startAutoRotation = () => {
    // Limpiar intervalo existente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Iniciar nuevo intervalo
    intervalRef.current = setInterval(() => {
      nextRecipe();
    }, 3000);
  };

  // Función para cambiar a la siguiente receta con animación
  const nextRecipe = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentCarouselIndex((prevIndex) => 
        (prevIndex + 1) % carouselRecipes.length
      );
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  // Función para cambiar a la receta anterior con animación
  const prevRecipe = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentCarouselIndex((prevIndex) => 
        prevIndex === 0 ? carouselRecipes.length - 1 : prevIndex - 1
      );
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  // Función para manejar navegación manual (reinicia el contador)
  const handleManualNavigation = (navigationFunction) => {
    // Reiniciar el intervalo automático
    startAutoRotation();
    // Ejecutar la función de navegación
    navigationFunction();
  };

  // Iniciar auto-rotación cuando hay recetas
  useEffect(() => {
    if (carouselRecipes.length > 0) {
      startAutoRotation();
    }

    // Limpiar intervalo al desmontar el componente
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [carouselRecipes.length]);

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
    fetchCarouselRecipes();
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
            {carouselRecipes.length > 0 ? (
              <View style={styles.carouselContent}>
                <View style={styles.carouselNavigation}>
                  <TouchableOpacity 
                    style={styles.arrowButton} 
                    onPress={() => handleManualNavigation(prevRecipe)}
                  >
                    <Text style={styles.arrowText}>‹</Text>
                  </TouchableOpacity>
                  
                  <Animated.View style={[styles.carouselItem, { opacity: fadeAnim }]}>
                    <Image 
                      source={{ uri: carouselRecipes[currentCarouselIndex].strMealThumb }} 
                      style={styles.carouselImage}
                    />
                    <Text style={styles.carouselMealName}>
                      {carouselRecipes[currentCarouselIndex].strMeal}
                    </Text>
                  </Animated.View>
                  
                  <TouchableOpacity 
                    style={styles.arrowButton} 
                    onPress={() => handleManualNavigation(nextRecipe)}
                  >
                    <Text style={styles.arrowText}>›</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Indicadores de posición */}
                <View style={styles.carouselIndicators}>
                  {carouselRecipes.map((_, index) => (
                    <View 
                      key={index}
                      style={[
                        styles.carouselIndicator,
                        index === currentCarouselIndex && styles.carouselIndicatorActive
                      ]}
                    />
                  ))}
                </View>
              </View>
            ) : (
              <Text style={styles.containerText}>Loading recipes...</Text>
            )}
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
          <View>
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