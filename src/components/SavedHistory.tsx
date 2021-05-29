
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { BaseText } from '../common/BaseText';
import { localeStrings } from '../Locales';
import { themes } from '../themes';
import { ThemeContext } from '../utils/ThemeProvider';
import { getAsyncItem, getBMIcategory } from '../utils/utils';

let bmiHistory: any

// Component to render saved BMI data
const History: React.FC = () => {

    const [savedData, updateSavedData] = useState([])
    const { theme } = React.useContext(ThemeContext);

    // Fetch Saved bmi data from async storage on DidMount
    useEffect(() => {
        getAsyncItem('history').then((data: any) => {
            bmiHistory = data ? JSON.parse(data) : []
            updateSavedData(bmiHistory)
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: themes[theme].color }}>
            <View style={[styles.listItem, { borderBottomColor: themes[theme].inverted }]}>
                <BaseText ellipsizeMode={'tail'} numberOfLines={1} style={[styles.date, styles.bold]}>{localeStrings.date}</BaseText>
                <BaseText ellipsizeMode={'tail'} numberOfLines={1} style={[styles.category, styles.bold]}>{localeStrings.category}</BaseText>
                <BaseText ellipsizeMode={'tail'} numberOfLines={1} style={[styles.bmi, styles.bold]}>{localeStrings.bmiWeightHeight}</BaseText>
            </View>
            <FlatList
                data={savedData}
                keyExtractor={(item: any, index: number) => {
                    return item.bmiWeightHeight + index
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.listItem, { borderBottomColor: themes[theme].inverted }]}>
                            <BaseText numberOfLines={1} ellipsizeMode={'tail'} style={styles.date}>{item?.date}</BaseText>
                            <BaseText numberOfLines={1} ellipsizeMode={'tail'} style={styles.category}>{getBMIcategory(item?.bmi)}</BaseText>
                            <BaseText numberOfLines={1} ellipsizeMode={'tail'} style={styles.bmi}>{item?.bmiWeightHeight}</BaseText>
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
        borderBottomWidth: 1, paddingHorizontal: 12
    },
    listItemHeaders: { fontSize: 14, fontWeight: 'bold' },
    date: { flex: 1.6 },
    category: { flex: 2.2, paddingHorizontal: 5 },
    bmi: { flex: 2.2 },
    bold: { fontWeight: 'bold' }
});

export default History;
