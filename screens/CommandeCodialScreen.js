import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const backgroundImage = require('../assets/Fond.jpg');

const sectionsData = [
  {
    title: '1. CVC',
    subs: [
      {
        title: 'Laiton',
        items: [
          'Raccord laiton à souder et à visser',
          'Vanne laiton et vanne à bride',
        ],
      },
      {
        title: 'Cuivre',
        items: [
          'Tube et Raccord cuivre à souder et collet battu',
        ],
      },
      {
        title: 'PVC',
        items: [
          'Tube et Raccords PVC',
          'Tube Raccord PVC pression à coller',
          'Raccord PVC pression à visser',
        ],
      },
      {
        title: 'PER',
        items: [
          'Couronne et Raccord PER à sertir',
        ],
      },
      {
        title: 'PEHD',
        items: [
          'Tube - Couronne - Raccord électro soudable - Raccord à compression',
        ],
      },
      {
        title: 'Multicouche',
        items: [
          'Tube - Couronne et Raccord multicouche laiton',
          'Raccord multicouche PVDF',
        ],
      },
      {
        title: 'Acier',
        items: [
          'Tube et Raccord acier noir à souder',
          'Raccord acier noir à visser',
          'Tube et Raccord acier galvanisé',
        ],
      },
      {
        title: 'Radiateur',
        items: [
          'Robinet radiateur danfos/OVENTROP',
        ],
      },
      {
        title: 'Calorifuge',
        items: [
          'Épaisseur 13 19 25',
        ],
      },
      {
        title: 'Frigo',
        items: [
          'Raccord frigo à souder',
          'Raccord frigo à sertir',
          'Tube frigo couronne et barre',
          'Accessoires climatisation',
        ],
      },
    ],
  },
  {
    title: '2. ÉLECTRICITÉ',
    subs: [
      {
        title: 'Câble Gaines Fils',
        items: [
          'Câbles',
          'Fil Rigide',
          'Fil Souple',
          'IRL et Accessoires',
        ],
      },
      {
        title: 'Appareillage',
        items: [
          'MOSAIC',
          'ODACE',
          'CELIANE',
          'MUREVA',
        ],
      },
      {
        title: 'Consommable',
        items: [
          'Boîte de dérivation',
          'Étanchéité boîte',
          'Boîtes PLACO',
          'WAGO, Chevilles, filin',
          'Tableaux logements',
          'Photovoltaïque',
        ],
      },
    ],
  },
  {
    title: '3. CONSOMMABLE',
    subs: [
      {
        title: 'Chimie - Étanchéité',
        items: [
          'Silicone PU - Mousse - Colle PVC - bombe aérosol - joints fibres',
        ],
      },
      {
        title: 'Visserie',
        items: [
          'Bois',
          'Boulonnerie',
          'Vis Autoforeuse',
          'Chevilles',
        ],
      },
      {
        title: 'Supportage',
        items: [
          'Colliers Atlas',
          'Collier M8',
          'Collier VMS',
          'Rails et accessoires',
          'Colliers',
        ],
      },
      {
        title: 'Outillage Consommable',
        items: [
          'Mèches',
          'Embout visseuse',
        ],
      },
      {
        title: 'Divers consommable',
        items: [
          'Protection, Hygiène',
          'Calfeutrement / rebouchage',
          'Marqueur',
        ],
      },
    ],
  },
  {
    title: '4. DÉPANNAGE',
    subs: [
      {
        title: '',
        items: [
          'Vase',
          'Sécu et soupape',
          'Filtres',
        ],
      },
    ],
  },
  {
    title: '5. EPI',
    subs: [
      {
        title: '',
        items: [
          'Gants',
          'Lunettes',
          'Oreilles',
          'Tee shirt - Veste',
        ],
      },
    ],
  },
];

export default function CommandeCodialScreen({ navigation }) {
  const [expandedSubs, setExpandedSubs] = useState({});
  const scrollViewRef = useRef(null);

  const toggleSub = (key) => {
    setExpandedSubs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.topBar}>
        <Text style={styles.title}>SOMMAIRE</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
        {sectionsData.map((section, secIndex) => (
          <View key={`section-${secIndex}`}>
            <Text style={styles.section}>{section.title}</Text>

            {section.subs.map((sub, subIndex) => {
              const key = `${secIndex}-${subIndex}`;
              const isExpanded = expandedSubs[key];

              if (!sub.title) {
                return (
                  <View key={key} style={{ marginLeft: 20, marginTop: 8 }}>
                    {sub.items.map((item, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          if (item === 'Raccord laiton à souder et à visser') {
                            navigation.navigate('RaccordLaitonASouderEtVisser');
                          }
                        }}
                      >
                        <Text style={styles.item}>- {item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                );
              }

              return (
                <View key={key} style={{ marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => toggleSub(key)}
                    style={styles.subContainer}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.sub}>{sub.title}</Text>
                    <Text style={styles.arrow}>{isExpanded ? '▼' : '▶'}</Text>
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.itemsContainer}>
                      {sub.items.map((item, itemIndex) => (
                        <TouchableOpacity
                          key={itemIndex}
                          onPress={() => {
                            if (item === 'Raccord laiton à souder et à visser') {
                              navigation.navigate('RaccordLaitonASouderEtVisser');
                            }
                          }}
                        >
                          <Text style={styles.item}>- {item}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#005864',
    fontWeight: 'bold',
    marginTop: 10,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#005864',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  section: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 15,
    backgroundColor: '#005864',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#005864',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 15,
    minWidth: '65%',
  },
  sub: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  itemsContainer: {
    marginLeft: 30,
    marginTop: 5,
  },
  item: {
    fontSize: 14,
    color: 'black',
    marginLeft: 15,
    marginTop: 2,
  },
});

















