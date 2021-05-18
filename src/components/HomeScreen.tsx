
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Switch, Image } from 'react-native';
import { BMICalculator } from './BMICalculator';
import { ButtonDetails, ButtonGroup } from '../common/ButtonGroup';
import { buttonTypes, localeStrings } from '../Locales';
import History from './SavedHistory';
import { ThemeContext } from '../utils/ThemeProvider';
import { themes } from '../themes';

const HomeScreen: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<ButtonDetails>(localeStrings.buttons[0]);
    const { toggleTheme, theme } = React.useContext(ThemeContext);

    const updateSelectedButton = (selectedButton: ButtonDetails) => {
        setSelectedButton(selectedButton);
    }

    // Render calculator/saved screen based on selected button
    const renderScreen = () => {
        if (selectedButton.label.toLowerCase() === buttonTypes.home)
            return <BMICalculator />
        else if (selectedButton.label.toLowerCase() === buttonTypes.saved)
            return <History />
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.image} source={require('../icons/bmi.png')} />
                    <Text style={[styles.navBarText]}>{localeStrings.title}</Text>
                </View>
                <Switch thumbColor={themes[theme].color} trackColor={{ true: themes.light.color, false: themes.light.inverted }} value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>
            {renderScreen()}
            <ButtonGroup selectedButton={selectedButton} buttons={localeStrings.buttons} onPress={updateSelectedButton} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    navBar: {
        height: 60, flexDirection: 'row', backgroundColor: '#CCCBCB',
        justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: '#CCCBCB'
    },
    navBarText: { fontWeight: 'normal', fontSize: 20, marginLeft: 10, letterSpacing: 1.3 },
    image: { height: 30, width: 30, resizeMode: 'contain' }
});

export default HomeScreen;
