// Graph.js
import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, Text, Image, Modal, TouchableOpacity, Animated } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';


const Graph = ({ data, hiveData }) => {
  if (!data || data.length === 0) return null;
  const chartConfig = {
    backgroundGradientFrom: '#E8E5E5',
    backgroundGradientTo: '#E8E5E5',
    color: (opacity = 9) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 0,
    },
  };
  
  
  const weightData = data.map((entry) => entry['weight']);
  const temperatureData = data.map((entry) => entry['temperature']);
  const humidityData = data.map((entry) => entry['humidity']);

  const monthData = data.map((entry) => entry['month']);
  const yearData = data.map((entry) => entry['year']);
  const dayData = data.map((entry) => entry['day']);
  
  
  const selectedPointsWeight = [20, 80, 160, 230, 300];
  const selectedPointsTemperature = [20, 80, 160, 230, 300];
  const selectedPointsHumidity = [20, 80, 160, 230, 300];
  
  const mostRecentData = data[data.length - 1];
  const currentTemperature = mostRecentData.temperature;
  const currentWeight = mostRecentData.weight;
  const currentHumidity = mostRecentData.humidity;
  
  // Calculate "Last Month" based on weight data
  const lastMonthWeightIndex = weightData.length - 31;
  const lastMonthWeight = lastMonthWeightIndex >= 0 ? weightData[lastMonthWeightIndex] : 0;
  
  const yesterdayWeightIndex = data.length > 1 ? data.length - 2 : 0;
  const yesterdayWeight = data.length > 1 ? data[yesterdayWeightIndex].weight : 0;
  const weightDifference = currentWeight - yesterdayWeight;
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  
  const uniqueMonths = Array.from(new Set(data.map(entry => `${entry['month']}/${entry['year']}`)));
  const xLabels = uniqueMonths; // Use the last 30 unique months
  
  const [alertMessage, setAlertMessage] = useState('Unexpected Weight Increase!');
  
  const [showAlert, setShowAlert] = useState(false);
  const alertOpacity = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
      const unexpectedDecrease = weightDifference < -3;
      
      if (unexpectedDecrease && hiveData === 1) {
      setAlertMessage(`Unexpected Weight Decrease!`);
      setShowAlert(true);
    }
  }, [data]); 


  const showSpecificMessage = () => {
    setAlertMessage(`Yesterday Lost: ${weightDifference.toFixed(1)} Kg`);
    setShowAlert(true); // open alert
  };



  return (
    <ScrollView>
      <View style={{ marginLeft: 0, marginBottom: 20, marginTop: 100 }}>
          <Image
          source={require('../logov2.png')} 
          style={{ width: '100%', height: 50, resizeMode: 'contain', alignItems: 'center', marginLeft: -3, marginTop: -50, marginBottom: -10 }}
         />
         {/* Box with Current Stats */}
        <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginBottom: 10,
                marginLeft: 0,
                height: 200 
              }}
        >
            {/* Box 1 */}
            <View style={{ flex: 1,  borderRadius: 10, padding: 30, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
                Weight:
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'rgba(255, 165, 0, 1)' }}>
              {`${currentWeight.toFixed(1)} Kg`}
              </Text>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                Temperature:
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center',color: 'rgba(225, 70, 70, 1)' }}>
              {`${currentTemperature.toFixed(1)}°C`}
              </Text>
            </View>

            {/* Box 2 */}
            <View style={{ flex: 1,  borderRadius: 10, padding: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10, marginTop:10 }}>
                Humidity
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'rgba(0, 128, 255, 1)' }}>
              {`${currentHumidity.toFixed(1)}%`}
              </Text>
              <Text style={{ fontSize: 20,  textAlign: 'center' }}>
                Last Month:
              </Text>
              <Text style={{ fontSize: 20,  textAlign: 'center', fontWeight: 'bold', }}>
                {`${(currentWeight - lastMonthWeight).toFixed(1)} Kg`} 
              </Text>
            </View>
        </View>

        {showAlert && (hiveData===1) && (
        <Animated.View
          style={{
            marginTop: 160,
            position: 'absolute',
            top: 10,
            left: 70,
            zIndex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            opacity: alertOpacity,
          }}
        >
          <TouchableOpacity onPress={showSpecificMessage}>
          <FontAwesome name="exclamation-triangle" size={24} color="red" />
          <Text
            style={{
              color: 'red',
              marginLeft: 30,
              marginBottom: 60,
              marginTop: -20,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {alertMessage}
          </Text>
            <FontAwesome />
          </TouchableOpacity>
        </Animated.View>
      )}
      <View style={{ marginBottom: 20, marginLeft: 0, marginTop: 10 }}>
          {/* Weight Chart */}
          <View style={{ backgroundColor: 'rgba(255, 165, 0, 1)', padding: 20, borderRadius: 45, marginLeft:70, marginRight: 70, marginBottom: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>WEIGHT</Text>
          </View>
            <ScrollView horizontal={true}>
            <LineChart
              data={{
                labels: xLabels,
                datasets: [
                  {
                    data: weightData,
                    color: (opacity = 1) => 'rgba(255, 165, 0, 1)',
                    strokeWidth: 2,
                  },
                ],
              }}
              width={1000}
              height={400}
              yAxisSuffix=" "
              bezier
              yAxisLabel={''}
              yAxisInterval={23.809}
              chartConfig={chartConfig}
              style={{
                borderRadius: 0,
                elevation: 6,
                backgroundColor: 'transparent',
              }}
              withVerticalLabels
              withDots
              onDataPointClick={({ value, index }) => {
                setModalContent(
                  <Text>
                    <Text style={{ fontWeight: 'bold' }}>Weight:</Text>{` ${weightData[index].toFixed(1)}KG\n${dayData[index]}/${monthData[index]}/${yearData[index]}`}
                  </Text>
                );
                setModalVisible(true);
              }}
              renderDotContent={({ x, y, index }) => {
                if (selectedPointsWeight.includes(index)) {
                  return (
                    <View key={index}>
                      <Text
                        key={index}
                        style={{
                          position: 'absolute',
                          left: x - 20,
                          top: y - 35,
                          backgroundColor: 'rgba(255, 165, 0, 1)',
                          padding: 5,
                          textAlign: 'center',
                          color: 'black',
                        }}
                      >
                        {`${weightData[index].toFixed(1)} Kg`}
                      </Text>
                    </View>
                  );
                }
                return null;
              }}
            />
          </ScrollView>
      </View>
      
      <View style={{ marginBottom: 20, marginLeft: 1, marginTop: 10 }}>
        {/* Temperature Chart */}
        <View style={{ backgroundColor: 'rgba(225, 70, 70, 1)', padding: 20, borderRadius: 45, marginLeft:70, marginRight: 70, marginBottom: 10 }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>TEMPERATURE</Text>
        </View>
         <ScrollView horizontal={true}>
            <LineChart
              data={{
                labels: xLabels,
                datasets: [
                  {
                    data: temperatureData,
                    color: (opacity = 1) => 'rgba(225, 70, 70, 1)',
                    strokeWidth: 2,
                  },
                ],
              }}
              width={1000} 
              height={400}
              yAxisSuffix=""
              bezier
              yAxisLabel={''}
              yAxisInterval={28}
              chartConfig={chartConfig}
              style={{
                borderRadius: 0,
                elevation: 6,
                backgroundColor: 'transparent',
              }}
              withVerticalLabels
              withDots
              onDataPointClick={({ value, index }) => {
                setModalContent(
                  <Text>
                    <Text style={{ fontWeight: 'bold' }}>Temperature:</Text>{` ${temperatureData[index].toFixed(1)}°C\n${dayData[index]}/${monthData[index]}/${yearData[index]}`}
                  </Text>
                );
                setModalVisible(true);
              }}
              renderDotContent={({ x, y, index }) => {
                if (selectedPointsTemperature.includes(index)) {
                  return (
                    <View key={index}>
                      <Text
                        key={index}
                        style={{
                          position: 'absolute',
                          left: x - 20,
                          top: y - 30,
                          backgroundColor: 'rgba(225, 70, 70, 1)',
                          padding: 5,
                          borderRadius: 5,
                          textAlign: 'center',
                          color: 'black',
                        }}
                      >
                        {`${temperatureData[index].toFixed(1)}°C`}
                      </Text>
                    </View>
                  );
                }
                return null;
              }}
            />
          </ScrollView>
      </View>

       <View style={{ marginBottom: 20, marginLeft: 1, marginTop: 5 }}>
        {/* Humidity Chart */}
        <View style={{ backgroundColor: 'rgba(0, 128, 255, 1)', padding: 20, borderRadius: 45, marginLeft:70, marginRight: 70, marginBottom: 10 }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>HUMIDITY</Text>
        </View>
         <ScrollView horizontal={true}>
            <LineChart
              data={{
                labels: xLabels,
                datasets: [
                  {
                    data: humidityData,
                    color: (opacity = 1) => 'rgba(0, 128, 255, 1)',
                    strokeWidth: 2,
                  },
                ],
              }}
              width={1000} 
              height={400}
              yAxisSuffix=""
              bezier
              yAxisLabel={''}
              yAxisInterval={28}
              chartConfig={chartConfig}
              style={{
                borderRadius: 0,
                elevation: 6,
                backgroundColor: 'transparent',
              }}
              withVerticalLabels
              withDots
              onDataPointClick={({ value, index }) => {
                setModalContent(
                  <Text>
                    <Text style={{ fontWeight: 'bold' }}>Humidity:</Text>{` ${temperatureData[index].toFixed(1)}%\n${dayData[index]}/${monthData[index]}/${yearData[index]}`}
                  </Text>
                );
                setModalVisible(true);
              }}
              renderDotContent={({ x, y, index }) => {
                if (selectedPointsHumidity.includes(index)) {
                  return (
                    <View key={index}>
                      <Text
                        key={index}
                        style={{
                          position: 'absolute',
                          left: x - 20,
                          top: y - 30,
                          backgroundColor: 'rgba(0, 128, 255, 1)',
                          padding: 5,
                          borderRadius: 5,
                          textAlign: 'center',
                          color: 'black',
                        }}
                      >
                        {`${humidityData[index].toFixed(1)}%`}
                      </Text>
                    </View>
                  );
                }
                return null;
              }}
            />
          </ScrollView>
      </View>
      
          
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 128, 255, 0.5)', 
        }}>
          <View style={{
            height: 300,
            width:300,
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Text style={{ fontSize: 30, marginBottom: 10, fontWeight: 'bold', textAlign: 'center' }}>Details</Text>
          <Text style={{ fontSize: 24, marginBottom: 10, marginTop:30, textAlign: 'center' }}>{modalContent}</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              marginTop: 'auto', 
              padding: 10,
              backgroundColor: 'blue',
              borderRadius: 5,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
    </ScrollView>
  );
};

export default Graph;
