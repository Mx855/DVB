import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';

const vehiclesByCategory = {
  'Moyen utilitaire': [
    '5645-XF-85', 'GT-594-QL', 'FY-270-NM', 'HD-818-FP', 'HD-820-FP', 'FY-747-CF',
    'GR-162-EE', 'GR-138-EE', 'GW-453-BW', 'GW-403-BW', 'DM-102-GA', 'ES-477-QD',
    'FY-054-MN', 'GD-617-VJ', 'GH-062-EQ', 'GM-883-AK'
  ],
  // Ajoutez ici les autres catégories plus tard
};

export default function VehicleListScreen({ route, navigation }) {
  const { category } = route.params;
  const vehicles = vehiclesByCategory[category] || [];

  return (
    <ImageBackground source={require('../assets/Fond.jpg')} style={styles.bg}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ReservationForm', { selectedPlaque: item })}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, resizeMode: 'cover', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: 'black', marginBottom: 20 },
  button: {
    backgroundColor: '#005864',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonText: { color: 'black', fontSize: 16, textAlign: 'center' },
});


