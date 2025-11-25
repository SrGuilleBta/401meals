import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { styles } from '../StyleSheets/AboutScreen.css.js';
import HeaderWithNav from './HeaderWithNav';

const AboutScreen = ({ navigateTo, goBack }) => {
  // Función para refrescar (volver a home)
  const refreshHome = () => {
    navigateTo('Home');
  };

  // Función para abrir enlaces
  const openLink = (url) => {
    Linking.openURL(url).catch(err => 
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithNav onRefreshHome={refreshHome} navigateTo={navigateTo} />
      
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>About 401 MEALS</Text>
          <Text style={styles.subtitle}>
            Your Ultimate Recipe Companion
          </Text>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the App</Text>
          <Text style={styles.sectionText}>
            401 MEALS is a comprehensive recipe application that brings you thousands 
            of delicious recipes from around the world. Explore diverse cuisines, 
            discover new ingredients, and find inspiration for your next meal.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Discover recipes from 25+ countries</Text>
            <Text style={styles.featureItem}>• Browse by food categories</Text>
            <Text style={styles.featureItem}>• Search recipes by name or ingredient</Text>
            <Text style={styles.featureItem}>• Step-by-step cooking instructions</Text>
            <Text style={styles.featureItem}>• High-quality recipe images</Text>
            <Text style={styles.featureItem}>• YouTube video tutorials</Text>
            <Text style={styles.featureItem}>• Detailed ingredient lists</Text>
          </View>
        </View>

        {/* Data Source */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Source</Text>
          <Text style={styles.sectionText}>
            All recipe data is provided by TheMealDB API, a free and open-source 
            database with thousands of recipes from around the world.
          </Text>
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('https://www.themealdb.com/')}
          >
            <Text style={styles.linkText}>Visit TheMealDB Website</Text>
          </TouchableOpacity>
        </View>

        {/* Technology */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Built With</Text>
          <View style={styles.techList}>
            <Text style={styles.techItem}>• React Native</Text>
            <Text style={styles.techItem}>• Expo</Text>
            <Text style={styles.techItem}>• TheMealDB API</Text>
            <Text style={styles.techItem}>• FlagsAPI for country flags</Text>
          </View>
        </View>

        {/* Developer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer</Text>
          <Text style={styles.sectionText}>
            This app was created with the purpose of demonstrating the knowledge acquired 
            in the mobile application development class.
          </Text>
          <Text style={styles.sectionText}>
            Version: 1.0.0{"\n"}
            Last Updated: {new Date().getFullYear()}
          </Text>
        </View>

        

        {/* Credits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credits</Text>
          <Text style={styles.sectionText}>
            Special thanks to TheMealDB for providing the comprehensive recipe database 
            that powers this application.
          </Text>
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('https://www.themealdb.com/')}
          >
            <Text style={styles.linkText}>TheMealDB API</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for food lovers everywhere
          </Text>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} 401 MEALS. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;