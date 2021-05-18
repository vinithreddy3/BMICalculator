import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { BaseText } from '../common/BaseText';
import { BaseTextInput } from '../common/BaseTextInput';
import { localeStrings } from '../Locales';
import { calculateBMI, getAsyncItem, setASyncItem } from '../utils/utils';
import Toast from 'react-native-simple-toast';
import { ThemeContext } from '../utils/ThemeProvider';
import { themes } from '../themes';
var dateFormat = require('dateformat');

// stores current bmi value
let bmi: any

//Component to render inputs for calculating BMI
export const BMICalculator: React.FC = () => {

    // Method to handle saving bmi data locally
    const handleBMISave = async () => {
        let updatedData: any = await getAsyncItem('history')
        updatedData = updatedData ? JSON.parse(updatedData) : []
        if (bmi && bmi != '??' && bmi?.toString()?.toUpperCase() != 'INFINITY') {
            updatedData?.unshift({
                bmi: bmi,
                date: dateFormat(new Date(), "mediumDate"),
                bmiWeightHeight: `${bmi.toFixed(2)}/${weight}/${height}`
            })
            await setASyncItem({ key: 'history', value: JSON.stringify(updatedData) })
            Toast.show(localeStrings.bmiSaved, Toast.SHORT);
        }
    }

    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    bmi = calculateBMI(weight, height)

    const { theme } = React.useContext(ThemeContext);

    return (
        <ScrollView style={[styles.container, { backgroundColor: themes[theme].color }]}>
            <View style={styles.bmiContainer}>
                <View style={styles.heightWeightView}>
                    <BaseText style={styles.heightWeightText}>{localeStrings.weight}</BaseText>
                    <BaseTextInput maxLength={4} keyboardType={'numeric'} placeholder={localeStrings.kgPlaceholder}
                        value={weight} onChangeText={(value: any) => setWeight(value)} />
                </View>
                <View style={styles.heightWeightView}>
                    <BaseText style={styles.heightWeightText} >{localeStrings.height}</BaseText>
                    <BaseTextInput maxLength={4} keyboardType={'numeric'} placeholder={localeStrings.cmPlaceholder}
                        value={height} onChangeText={(value: any) => setHeight(value)} />
                </View>
                <View style={[styles.heightWeightView, { marginTop: 10 }]}>
                    <TouchableOpacity onPress={() => { handleBMISave() }}>
                        <Image style={styles.saveIcon} source={require('../icons/save.png')} />
                    </TouchableOpacity>
                    <BaseText>{localeStrings.bmi}{bmi}</BaseText>
                </View>
            </View>
            <View style={styles.categoriesContainer}>
                {
                    Object.values(localeStrings.bmiCategories).map((item: any, index: any) => {
                        return (
                            <View key={index} style={styles.category}>
                                <BaseText style={{ flex: 1 }}>{item.title}</BaseText>
                                <BaseText style={{ flex: 1, textAlign: 'center' }}>{item.range}</BaseText>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignContent: 'center' },
    bmiContainer: { margin: 15 },
    heightWeightView: { flexDirection: 'row', alignItems: 'center' },
    heightWeightText: { marginRight: 15 },
    saveIcon: { height: 30, width: 30, resizeMode: 'contain', marginRight: 25 },
    categoriesContainer: { borderTopColor: 'gray', borderTopWidth: 1, marginHorizontal: 20, paddingTop: 15 },
    category: { marginHorizontal: 10, padding: 5, flexDirection: 'row' }
});