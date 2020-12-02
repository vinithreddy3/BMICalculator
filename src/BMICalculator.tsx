
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { BaseText } from './Common/BaseText';
import { BaseTextInput } from './Common/BaseTextInput';
import { localeStrings } from './Locales';
import { calculateBMI, getAsyncItem, getBMIcategory, getThemeColor, setASyncItem } from './Utils';
import Toast from 'react-native-simple-toast';
var dateFormat = require('dateformat');

// stores current bmi value
let bmi: any

//Component to render inputs for calculating BMI
export const BMICalculator = (props: any) => {

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
            Toast.show("BMI record saved successfully", Toast.SHORT);
        }
    }

    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    bmi = calculateBMI(weight, height)

    return (
        <ScrollView style={[styles.container, { backgroundColor: getThemeColor(props.darkMode) }]}>
            <View style={{ margin: 15 }}>
                <View style={styles.heightWeightView}>
                    <BaseText style={styles.heightWeightText} darkMode={!props.darkMode}>{localeStrings.weight}</BaseText>
                    <BaseTextInput darkMode={!props.darkMode} maxLength={4} keyboardType={'numeric'} placeholder='kilograms'
                        value={weight} onChangeText={(value: any) => setWeight(value)} />
                </View>
                <View style={styles.heightWeightView}>
                    <BaseText style={styles.heightWeightText} darkMode={!props.darkMode}>{localeStrings.height}</BaseText>
                    <BaseTextInput darkMode={!props.darkMode} maxLength={4} keyboardType={'numeric'} placeholder='centimeter'
                        value={height} onChangeText={(value: any) => setHeight(value)} />
                </View>
                <View style={[styles.heightWeightView, { marginTop: 10 }]}>
                    <TouchableOpacity onPress={async () => {
                        await handleBMISave()
                    }}>
                        <Image style={{ height: 30, width: 30, resizeMode: 'contain', marginRight: 25 }} source={require('./icons/save.png')} />
                    </TouchableOpacity>
                    <BaseText darkMode={!props.darkMode} style={{ fontWeight: 'normal' }}>
                        BMI :  {bmi}
                    </BaseText>
                </View>
            </View>
            <View style={styles.categories}>
                {
                    Object.values(localeStrings.bmiCategories).map((item: any, index: any) => {
                        return (
                            <View key={index} style={{ marginHorizontal: 10, padding: 5, flexDirection: 'row' }}>
                                <BaseText darkMode={!props.darkMode} style={{ width: '50%' }}>{item.title}</BaseText>
                                <BaseText darkMode={!props.darkMode} style={{ width: '50%', textAlign: 'center' }}>{item.range}</BaseText>
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
    heightWeightView: { flexDirection: 'row', alignItems: 'center' },
    heightWeightText: { marginRight: 15 },
    categories: { borderTopColor: 'gray', borderTopWidth: 1, marginHorizontal: 20, paddingTop: 15 }
});