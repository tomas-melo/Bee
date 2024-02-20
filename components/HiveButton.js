import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const HiveButton = ({ hiveId, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.topButton}>
    <Text style={styles.hiveTitleText}>Bee Hive #{hiveId}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
    fontSize: 25,
    marginRight: 5,
    textAlign: 'center',
    color: 'white',
  },
});
   
export default HiveButton;
