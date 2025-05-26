import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const vehicles = {
  'Petit utilitaire': ['AC-478-HN', 'AN-393-YQ', 'BX-146-CN'],
  'Moyen utilitaire': [
    '5645-XF-85', 'DM-102-GA', 'ES-477-QD', 'FY-054-MN', 'FY-270-NM',
    'FY-747-CF', 'GD-617-VJ', 'GH-062-EQ', 'GM-883-AK', 'GR-138-EE',
    'GR-162-EE', 'GT-594-QL', 'GW-403-BW', 'GW-453-BW', 'HD-818-FP',
    'HD-820-FP',
  ],
  'Grand utilitaire': [
    'AJ-069-HK', 'DD-291-PQ', 'DV-868-JY', 'EB-859-MS', 'EQ-346-NX',
    'ES-767-QD', 'FH-151-GR', 'FL 181 TM', 'FY-414-SR', 'GM-381-CK',
    'GM-464-CK', 'GQ-126-ZW', 'GQ-127-ZW', 'GQ-129-ZW', 'GR-755-HJ',
    'GV-802-WV', 'GV-937-WV', 'GZ-004-HD', 'HA-386-PV', 'HC-478-AN',
  ],
  'Très grand utilitaire': ['EJ-926-PL'],
};

export default function VehicleListScreen({ route, navigation }) {
  const { category } = route.params;
  const list = (vehicles[category] || []).sort();

  return (
    <ImageBackground
      source={require('../assets/Fond.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Plaques pour {category}</Text>

        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.returnText}>← Retour</Text>
        </TouchableOpacity>

        <FlatList
          contentContainerStyle={styles.listContainer}
          data={list}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('ReservationFormScreen', { plate: item })
              }
            >
              <Text style={styles.plaque}>{item}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Aucun véhicule disponible</Text>
          }
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  returnButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 15,
  },
  returnText: {
    color: '#005864',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 30,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#005864',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#004C50',
  },
  plaque: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: 'gray',
  },
});






