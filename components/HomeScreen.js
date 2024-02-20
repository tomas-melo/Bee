// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, FlatList } from 'react-native';
import Graph from './Graph';
import HiveButton from './HiveButton';



export default function HomeScreen ({  }) {


  const hives = [1, 2, 3, 4];
  const [selectedHive, setSelectedHive] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [hiveData, setHiveData] = useState([]);

  const handleSelectHive = (hiveId) => {
  if (hiveId !== selectedHive) {
    setSelectedHive(hiveId);
  }
  setModalVisible(false);
};

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (selectedHive) {
          case 1:
            response = require('../data/bh1_d.json');
            break;
          case 2:
            response = require('../data/bh2_d.json');
            break;
          case 3:
            response = require('../data/bh3_d.json');
            break;
          case 4:
            response = require('../data/bh4_d.json');
            break;
          default:
            // Handle other cases or show an error
            break;
        }
        //console.log('Fetched data:', response);
        setHiveData(response);
      } catch (error) {
        console.error('Error fetching hive data:', error.message);
      }
    };
    fetchData();
  }, [selectedHive]);

  return (
    <View style={styles.container}>
      <Graph data={hiveData} hiveData={selectedHive}/>

      <View style={styles.topButtonContainer}>
        <TouchableOpacity onPress={toggleModal} style={styles.topButton}>
          <Text style={styles.hiveTitleText}>Bee Hive #{selectedHive}</Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={isModalVisible}>
          <View style={styles.modalContainer}>
            <FlatList
              data={hives}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <HiveButton hiveId={item} onPress={() => handleSelectHive(item)} />
              )}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#E8E5E5'
  },
  topButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  topButton: {
    backgroundColor: '#5cb85c',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 370,
    borderWidth: 2,
    borderColor: 'black',
  },
  hiveTitleText: {
    fontSize: 28,
    marginRight: 5,
    textAlign: 'center',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 160,
  },
});


