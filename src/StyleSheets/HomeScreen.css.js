import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, // Espacio extra al final para mejor scroll
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  carouselContainer: {
    minHeight: 280,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  carouselContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  carouselNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  arrowText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  carouselTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center', // ASEGURA CENTRADO
  },
  carouselMealName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
    paddingHorizontal: 10,
  },
  carouselIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  carouselIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  carouselIndicatorActive: {
    backgroundColor: '#333',
  },
  randomMealContainer: {
    minHeight: 280,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  containerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  mealContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mealTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mealImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center', // CENTRADO ASEGURADO
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
    paddingHorizontal: 10,
  },
  refreshText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 8,
    marginTop: 5,
  },
  ingredientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ingredientItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ingredientImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
    alignSelf: 'center', // CENTRADO ASEGURADO
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  inspirationContent: {
    width: '100%',
    alignItems: 'center',
  },


  
});