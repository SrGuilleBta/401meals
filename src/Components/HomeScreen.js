import React from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity 
} from 'react-native';
import { styles } from '../StyleSheets/HomeScreen.css.js';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>401 MEALS</Text>
            </View>

            {/* Navigation Bar */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navText}>[ ] HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navText}>[ ] SEARCH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navText}>[ ] Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navText}>[ ] More</Text>
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
                    <View style={styles.ingredientsContainer}>
                        <Text style={styles.containerText}>
                            Popular ingredients will be displayed here
                        </Text>
                    </View>
                </View>

                {/* Random Meal Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Don't Know What to Cook?</Text>
                    <View style={styles.randomMealContainer}>
                        <Text style={styles.containerText}>
                            Get a random meal suggestion
                        </Text>
                    </View>
                </View>

                {/* Inspiration Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Get Inspired</Text>
                    <View style={styles.inspirationContainer}>
                        <Text style={styles.containerText}>
                            Random ingredients for inspiration
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;