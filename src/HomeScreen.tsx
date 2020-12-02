
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Switch, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native';
import { BMICalculator } from './BMICalculator';
import { localeStrings } from './Locales';
import History from './SavedHistory';
// import { Switch } from 'react-native-switch'

const HomeScreen = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [inHistoryMode, renderHistory] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.navBar}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: 30, width: 30, resizeMode: 'contain' }} source={require('./icons/bmi.png')} />
                    <Text style={[styles.navBarText, { marginLeft: 10 }]}>{localeStrings.title}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { renderHistory(!inHistoryMode) }}>
                        <Text style={[styles.navBarText, {fontSize: 18, paddingRight: 15}]}>{inHistoryMode ? localeStrings.home : localeStrings.saved}</Text>
                    </TouchableOpacity>
                    <Switch thumbColor={darkMode ? '#353533': 'white'} trackColor={{false: '#353533', true: 'white'}} value={darkMode} onValueChange={setDarkMode} />
                </View>
            </View>
            {
                inHistoryMode ? <History darkMode={darkMode} /> :
                    <BMICalculator darkMode={darkMode} />
            }

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignContent: 'center', justifyContent: 'center' },
    navBar: {
        height: 60, flexDirection: 'row', backgroundColor: '#CCCBCB',
        justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#CCCBCB'
    },
    navBarText: { fontWeight: 'normal', fontSize: 20 },
});

export default HomeScreen;
