
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { BaseText } from './Common/BaseText';
import { localeStrings } from './Locales';
import { getAsyncItem, getBMIcategory, getThemeColor } from './Utils';

let bmiHistory: any

// Component to render saved BMI data
const History = (props: any) => {

    const [savedData, updateSavedData] = useState([])
    // Fetch Saved bmi data from async storage on DidMount
    useEffect(() => {
        getAsyncItem('history').then((data: any) => {
            bmiHistory = data ? JSON.parse(data) : []
            updateSavedData(bmiHistory)
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: getThemeColor(props.darkMode) }}>
            <View style={[styles.listItem, { borderBottomColor: getThemeColor(!props.darkMode) }]}>
                <BaseText ellipsizeMode={'tail'} numberOfLines={1} darkMode={!props.darkMode} style={{ flex: 1.5, fontSize: 14, fontWeight: 'bold' }}>{localeStrings.date}</BaseText>
                <BaseText ellipsizeMode={'tail'} numberOfLines={1} darkMode={!props.darkMode} style={{ flex: 2.5, fontSize: 14, fontWeight: 'bold' }}>{localeStrings.category}</BaseText>
                <BaseText ellipsizeMode={'tail'} numberOfLines={1} darkMode={!props.darkMode} style={{ flex: 2, fontSize: 14, fontWeight: 'bold' }}>{localeStrings.bmiWeightHeight}</BaseText>
            </View>
            <FlatList
                data={savedData}
                keyExtractor={(item: any, index: any) => {
                    return item.bmiWeightHeight + index
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.listItem, { borderBottomColor: getThemeColor(!props.darkMode) }]}>
                            <BaseText numberOfLines={1} ellipsizeMode={'tail'} darkMode={!props.darkMode} style={{ flex: 1.5 }}>{item?.date}</BaseText>
                            <BaseText numberOfLines={1} ellipsizeMode={'tail'} darkMode={!props.darkMode} style={{ flex: 2.5 }}>{getBMIcategory(item?.bmi)}</BaseText>
                            <BaseText numberOfLines={1} ellipsizeMode={'tail'} darkMode={!props.darkMode} style={{ flex: 2 }}>{item?.bmiWeightHeight}</BaseText>
                        </View>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row', justifyContent: 'space-around',
        alignContent: 'space-around', paddingVertical: 15,
        borderBottomWidth: 1, paddingHorizontal: 15
    },
    listItemHeaders: { fontSize: 14, fontWeight: 'bold' }
});

export default History;
