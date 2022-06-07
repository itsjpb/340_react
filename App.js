/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
    TouchableOpacity,
    Button
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.light : Colors.lighter,
    };
    return (
        <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen component={Home} name={"Home"}
                             options={{headerShown : false}}/>
                <Stack.Screen component={Contacts} name={"Contacts"}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Home = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.light : Colors.lighter,
    };
    return (

      <View
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={[styles.myHeading]}>
          Jason's Practice App</Text>
        <Text style={[styles.appDescription,
          {color: isDarkMode ? Colors.light: Colors.black}]}>This is my little react app for AD340. Below is a list of movies
        I like to watch while doing homework, because they are pretty</Text>
          <Button
              title = "Go to contacts"
              onPress={() => navigation.navigate('Contacts')}
          />
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

const Contacts = () => {
    const isDarkMode = useColorScheme() === 'dark';
    let [contacts, setContacts] = useState([]);

    useEffect(() => {
        console.log("usefeect");
        fetch('https://fakerapi.it/api/v1/users?_quantity=10')
        .then((response) => response.json())
        .then((json) => {
            contacts = json.data;
            //console.log(contacts);
            setContacts(json.data);
            })
        .catch((error) => {
            console.error(error);
        });
    }, []);
    console.log(contacts);

   return (
        <View>
            <FlatList
                style={styles.item}
                data={contacts}
                renderItem={({contact}) => <TouchableOpacity>
                    <View>
                    <Text style={[styles.item,
                    {color: isDarkMode ? Colors.light: Colors.black},]}>{contact.firstname}</Text>
                    </View>
                </TouchableOpacity>}
            />

        </View>

    );

}

const ContactDetail = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.light : Colors.lighter,
    };
    return (
        <View
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>

        </View>
    );

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  myHeading: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
      backgroundColor: Colors.darkPrimary,
      color: Colors.light
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
