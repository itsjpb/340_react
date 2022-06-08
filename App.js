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
    Button,
    Image
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
                <Stack.Screen component={ContactDetail} name={"Contact Detail"}/>

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
          {color: isDarkMode ? Colors.light: Colors.black}]}>This is my little react app for AD340.</Text>
          <Button
              title = "Go to contacts"
              onPress={() => navigation.navigate('Contacts')}
          />
          <Text style={styles.movieHeader}>Study Movies</Text>
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

const Contacts = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';
    let [contacts, setContacts] = useState([]);

    useEffect(() => {
        console.log("usefeect");
        fetch('https://fakerapi.it/api/v1/users?_quantity=40')
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
                data={contacts}
                renderItem={({item}) => <TouchableOpacity
                    onPress={() => navigation.navigate('Contact Detail', item)}>
                    <View>
                    <Text style={styles.contact}>{item.firstname + " " + item.lastname}</Text>
                    </View>
                </TouchableOpacity>}
            />

        </View>

    );

}

const ContactDetail = ({navigation, route}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.light : Colors.lighter,
    };
    return (
        <View>
            <Image
                style={styles.contactPhoto}
                source={{
                    uri: route.params.image,
                }}
            />
            <Text style ={styles.infoHeader}>{"name: "}</Text>
            <Text style ={styles.info}>{route.params.firstname + " " + route.params.lastname}</Text>
            <Text style ={styles.infoHeader}>{"username: "}</Text>
            <Text  style ={styles.info}>{route.params.username}</Text>
            <Text style ={styles.infoHeader}>{"email address: "}</Text>
            <Text style ={styles.info}>{route.params.email}</Text>
            <Text style ={styles.infoHeader}>{"website: "}</Text>
            <Text style ={styles.info}>{route.params.website}</Text>

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
  contact: {
    fontSize: 24,
    fontWeight: '500',
      margin: 1,
      borderWidth: 1.5,
      padding: 3,
      borderColor: Colors.darker,
      borderRadius: 2,
      backgroundColor: Colors.primary
  },
    item: {
        fontSize: 24,
        fontWeight: '500',
        margin: 1,
        marginLeft: 10
    },
    infoHeader: {
        fontSize: 14,
        paddingLeft: 10,
        fontWeight: '500',
        marginTop:4,

    },
    info: {
        fontSize: 22,
        fontWeight: '500',
        paddingLeft: 10,
        borderBottomWidth: 1
    },
    movieHeader: {
        fontSize: 24,
        color: 'black',
        fontWeight: '500',
        marginBottom: 2,
        marginTop: 5
    },
    contactPhoto: {
      width: 150,
        height: 150,
        resizeMode: 'cover'
    }

});

export default App;