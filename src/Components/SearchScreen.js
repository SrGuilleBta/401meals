import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { styles } from '../StyleSheets/SearchScreen.css.js';
import HeaderWithNav from './HeaderWithNav';

const SearchScreen = ({ navigateTo, goBack }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchLetter, setSearchLetter] = useState('a');
  const [searchQuery, setSearchQuery] = useState('');

  // Letras del alfabeto para la búsqueda
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  // Función para buscar comidas por letra
  const fetchMealsByLetter = async (letter) => {
    try {
      setLoading(true);
      setError(null);
      setSearchLetter(letter);
      
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
      );
      const data = await response.json();
      
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (err) {
      console.error('Error fetching meals by letter:', err);
      setError('Failed to load meals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar comidas por nombre
  const fetchMealsByName = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (err) {
      console.error('Error fetching meals by name:', err);
      setError('Failed to load meals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Función para navegar a detalles de comida
  const navigateToMealDetail = (meal) => {
    navigateTo('MealDetail', { meal });
  };

  // Función para refrescar (volver a home)
  const refreshHome = () => {
    navigateTo('Home');
  };

  // Cargar comidas con la letra 'a' al iniciar
  useEffect(() => {
    fetchMealsByLetter('a');
  }, []);

  // Función para manejar búsqueda por nombre
  const handleSearchByName = () => {
    if (searchQuery.trim() !== '') {
      fetchMealsByName(searchQuery);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithNav onRefreshHome={refreshHome} navigateTo={navigateTo} />
      
      <ScrollView style={styles.content}>
        {/* Header y búsqueda */}
        <View style={styles.header}>
          <Text style={styles.title}>Search Recipes</Text>
          
          {/* Búsqueda por nombre */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by meal name..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchByName}
            />
            <TouchableOpacity 
              style={styles.searchButton}
              onPress={handleSearchByName}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Or browse by first letter
          </Text>
        </View>

        {/* Selector de letras */}
        <View style={styles.lettersSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.lettersContainer}>
              {alphabet.map((letter) => (
                <TouchableOpacity
                  key={letter}
                  style={[
                    styles.letterButton,
                    searchLetter === letter && styles.letterButtonActive
                  ]}
                  onPress={() => fetchMealsByLetter(letter)}
                >
                  <Text style={[
                    styles.letterText,
                    searchLetter === letter && styles.letterTextActive
                  ]}>
                    {letter.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Resultados de búsqueda */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : `Meals starting with "${searchLetter.toUpperCase()}"`}
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B6B" />
              <Text style={styles.loadingText}>Loading meals...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => searchQuery ? handleSearchByName() : fetchMealsByLetter(searchLetter)}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : meals.length > 0 ? (
            <View style={styles.mealsGrid}>
              {meals.map((meal) => (
                <TouchableOpacity
                  key={meal.idMeal}
                  style={styles.mealCard}
                  onPress={() => navigateToMealDetail(meal)}
                >
                  <Image
                    source={{ uri: meal.strMealThumb }}
                    style={styles.mealImage}
                  />
                  <Text style={styles.mealName} numberOfLines={2}>
                    {meal.strMeal}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.noMealsContainer}>
              <Text style={styles.noMealsText}>
                {searchQuery ? 
                  `No meals found for "${searchQuery}"` : 
                  `No meals found starting with "${searchLetter.toUpperCase()}"`
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;