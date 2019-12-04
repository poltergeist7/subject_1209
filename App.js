import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather';


export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null,
  };

  componentDidMount() {
    this.fetchWeather(0, 0);
  }

  fetchWeather ( lat, lon ) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=37.4&lon=127.12&appid=df383e45caea3bf0b1558c2c29634723`
    ).then(res => res.json())
    .then(json => {
        this.setState({
          temperature: Math.ceil(json.main.temp - 273.15),
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather {temperature}</Text>
          </View>
        ) : (
          <Weather weather={weatherCondition} temperature={temperature} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});