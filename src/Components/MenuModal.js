import React from 'react';
import { 
  Modal,
  TouchableOpacity,
  View,
  Text,
  Animated
} from 'react-native';
import { styles } from '../StyleSheets/MenuModal.css.js';

const MenuModal = ({ visible, fadeAnim, onClose, onMenuSelect }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.menuOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View 
          style={[
            styles.menuContainer,
            { 
              opacity: fadeAnim,
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0]
                })
              }]
            }
          ]}
        >
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Menu</Text>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => onMenuSelect('Countries')}
            >
              <Text style={styles.menuItemText}>Countries</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => onMenuSelect('Categories')}
            >
              <Text style={styles.menuItemText}>Categories</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => onMenuSelect('About')}
            >
              <Text style={styles.menuItemText}>About</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MenuModal;