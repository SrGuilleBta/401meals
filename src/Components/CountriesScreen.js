import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { styles } from '../StyleSheets/CountriesScreen.css.js';
import HeaderWithNav from './HeaderWithNav';

const CountriesScreen = ({ navigateTo, goBack }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener la lista de países
  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
      );
      const data = await response.json();
      
      if (data.meals) {
        // Mapear los países y agregar URLs de banderas
        const countriesWithFlags = data.meals.map(country => ({
          name: country.strArea,
          flag: `https://flagsapi.com/${getCountryCode(country.strArea)}/flat/64.png`
        }));
        
        setCountries(countriesWithFlags);
      } else {
        setCountries([]);
      }
    } catch (err) {
      console.error('Error fetching countries:', err);
      setError('Failed to load countries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener el código del país
  const getCountryCode = (countryName) => {
    const countryCodes = {
      'American': 'US',
      'Argentinian': 'AR',
      'Australian': 'AU',
      'British': 'GB',
      'Canadian': 'CA',
      'Chinese': 'CN',
      'Croatian': 'HR',
      'Dutch': 'NL',
      'Egyptian': 'EG',
      'Filipino': 'PH',
      'French': 'FR',
      'Greek': 'GR',
      'Indian': 'IN',
      'Irish': 'IE',
      'Italian': 'IT',
      'Jamaican': 'JM',
      'Japanese': 'JP',
      'Kenyan': 'KE',
      'Malaysian': 'MY',
      'Mexican': 'MX',
      'Moroccan': 'MA',
      'Norwegian': 'NO',
      'Polish': 'PL',
      'Portuguese': 'PT',
      'Russian': 'RU',
      'Saudi Arabian': 'SA',
      'Slovakian': 'SK',
      'Spanish': 'ES',
      'Syrian': 'SY',
      'Thai': 'TH',
      'Tunisian': 'TN',
      'Turkish': 'TR',
      'Ukrainian': 'UA',
      'Uruguayan': 'UY',
      'Vietnamese': 'VN',
      'Unknown': 'UN'
    };
    
    return countryCodes[countryName] || 'UN';
  };

  // Función para navegar a recetas del país
  const navigateToCountryRecipes = (country) => {
    navigateTo('CountryRecipes', { country });
  };

  // Función para refrescar (volver a home)
  const refreshHome = () => {
    navigateTo('Home');
  };

  // Cargar países cuando el componente se monta
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderWithNav onRefreshHome={refreshHome} navigateTo={navigateTo} />
      
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore by Country</Text>
          <Text style={styles.subtitle}>
            Discover traditional dishes from around the world
          </Text>
        </View>

        {/* Lista de países */}
        <View style={styles.countriesSection}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B6B" />
              <Text style={styles.loadingText}>Loading countries...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={fetchCountries}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : countries.length > 0 ? (
            <View style={styles.countriesGrid}>
              {countries.map((country, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.countryCard}
                  onPress={() => navigateToCountryRecipes(country)}
                >
                  <Image
                    source={{ uri: country.flag }}
                    style={styles.flagImage}
                  />
                  <Text style={styles.countryName} numberOfLines={2}>
                    {country.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.noCountriesContainer}>
              <Text style={styles.noCountriesText}>
                No countries found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CountriesScreen;