import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 25,
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 12,
  },
  featuresList: {
    marginLeft: 8,
  },
  featureItem: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 4,
  },
  techList: {
    marginLeft: 8,
  },
  techItem: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 4,
  },
  linkButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  linkText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  supportLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  copyright: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});