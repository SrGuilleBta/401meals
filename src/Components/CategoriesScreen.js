import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { styles } from '../StyleSheets/CategoriesScreen.css.js';
import HeaderWithNav from './HeaderWithNav';

const CategoriesScreen = ({ navigateTo, goBack }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las categorías
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      );
      const data = await response.json();
      
      if (data.categories) {
        setCategories(data.categories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Función para navegar a recetas de la categoría
  const navigateToCategoryRecipes = (category) => {
    navigateTo('CategoryRecipes', { category });
  };

  // Función para refrescar (volver a home)
  const refreshHome = () => {
    navigateTo('Home');
  };

  // Cargar categorías cuando el componente se monta
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderWithNav onRefreshHome={refreshHome} navigateTo={navigateTo} />
      
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Food Categories</Text>
          <Text style={styles.subtitle}>
            Explore recipes by category
          </Text>
        </View>

        {/* Lista de categorías */}
        <View style={styles.categoriesSection}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B6B" />
              <Text style={styles.loadingText}>Loading categories...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={fetchCategories}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : categories.length > 0 ? (
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.idCategory}
                  style={styles.categoryCard}
                  onPress={() => navigateToCategoryRecipes(category)}
                >
                  <Image
                    source={{ uri: category.strCategoryThumb }}
                    style={styles.categoryImage}
                  />
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.strCategory}</Text>
                    <Text style={styles.categoryDescription} numberOfLines={3}>
                      {category.strCategoryDescription}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.noCategoriesContainer}>
              <Text style={styles.noCategoriesText}>
                No categories found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;