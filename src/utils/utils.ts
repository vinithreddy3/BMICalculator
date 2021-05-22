import { AsyncStorage } from 'react-native';
import { localeStrings } from '../Locales';

// Set value in Async storage specific to a key
const setASyncItem = async (data: any) => {
    try {
        await AsyncStorage.setItem(data.key, data.value)
    }
    catch (error) {
        console.log('Some error while using async storage setItem: ', error)
    }
}

// Get value from Async storage based on key
const getAsyncItem = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (error) {
        console.log('Some error while using async storage getItem: ', error)
    }
}

// Function to get BMI category based on input provided
const getBMIcategory = (bmivalue: number) => {
    let bmiCategory = ''
    if (bmivalue < 16.5) {
        bmiCategory = localeStrings.bmiCategories.severelyUnderweight.title
    }
    else if (bmivalue < 18.5) {
        bmiCategory = localeStrings.bmiCategories.underweight.title
    }
    else if (bmivalue < 25) {
        bmiCategory = localeStrings.bmiCategories.normal.title
    }
    else if (bmivalue < 30) {
        bmiCategory = localeStrings.bmiCategories.overweight.title
    }
    else if (bmivalue < 35) {
        bmiCategory = localeStrings.bmiCategories.obese1.title
    }
    else if (bmivalue < 40) {
        bmiCategory = localeStrings.bmiCategories.obese2.title
    }
    else {
        bmiCategory = localeStrings.bmiCategories.obese3.title
    }
    return bmiCategory
}

// Function to calculate BMI(default weight is kgs, height is cms)
// Used formula for BMI calculation - kilogram/meter*meter
const calculateBMI = (weight: number = 0, height: number = 0) => {
    return (weight && height && weight/(height*height)) * 10000 || '??'
}

export { setASyncItem, getAsyncItem, getBMIcategory, calculateBMI }