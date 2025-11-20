import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  Animated 
} from 'react-native';
import { styles } from '../StyleSheets/HeaderWithNav.css.js';
import MenuModal from './MenuModal';

const HeaderWithNav = ({ onRefreshHome, navigateTo }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const openMenu = () => {
    setShowMenu(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowMenu(false);
    });
  };

  const handleMenuSelect = (option) => {
    console.log(`Selected: ${option}`);
    closeMenu();
    
    // Navegar a diferentes pantallas basado en la selección
    switch (option) {
      case 'Countries':
        navigateTo('Countries');
        break;
      case 'Categories':
        console.log('Navigate to Categories');
        break;
      case 'About':
        console.log('Navigate to About');
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>401 MEALS</Text>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={onRefreshHome}>
          <Text style={styles.navText}>🏠 HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>🔍 SEARCH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>❤️ Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={openMenu}>
          <Text style={styles.navText}>☰ More</Text>
        </TouchableOpacity>
      </View>

      <MenuModal
        visible={showMenu}
        fadeAnim={fadeAnim}
        onClose={closeMenu}
        onMenuSelect={handleMenuSelect}
      />
    </View>
  );
};

export default HeaderWithNav;