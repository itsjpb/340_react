/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darkPrimary : Colors.primary,
  };

  return (

      <View
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={[
            styles.myHeading,
          {color: isDarkMode ? Colors.light: Colors.black},
        ]}>
          Jason's Practice App</Text>
        <Text style={[styles.appDescription,
          {color: isDarkMode ? Colors.light: Colors.black}]}>This is my little react app for AD340. Below is a list of movies
        I like to watch while doing homework, because they are pretty</Text>
        <FlatList
            style={styles.item}
            data={[
              {key: 'Parasite'},
              {key: 'Children of Men'},
              {key: 'Memories of Murder'},
              {key: '2001: A space Odyssey'},
              {key: 'Akira'},
              {key: '7 Samurai'},
              {key: 'Cure'},
              {key: 'Mad Max: Fury Road'},
              {key: 'Midsommar'}
            ]}
            renderItem={({item}) => <Text style={[styles.item,
              {color: isDarkMode ? Colors.light: Colors.black},]}>{item.key}</Text>}
        />

      </View>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  myHeading: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  appDescription: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight : '500'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  item: {
    fontSize: 16,
    margin: 2,
    fontWeight: '500',


  }
});

export default App;
