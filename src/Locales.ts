export const localeStrings = {
    title: "BMI Calculator",
    saved: "Saved",
    home: "Home",
    height: "Height",
    cmPlaceholder: 'centimeter',
    weight: "Weight",
    bmi: "BMI :  ",
    kgPlaceholder: 'kilograms',
    date: "Date",
    category: "Category",
    bmiWeightHeight: "BMI/Weight/Height",
    bmiSaved: "BMI record saved successfully",
    bmiCategories: {
        severelyUnderweight: { title: 'Severely Underweight', range: '< 16.5' },
        underweight: { title: 'UnderWeight', range: '< 18.5' },
        normal: { title: 'Normal', range: '18.5 - 24.9' },
        overweight: { title: 'Overweight', range: '25 - 29.9' },
        obese1: { title: 'Obseity Class I', range: '30 - 34.9' },
        obese2: { title: 'Obesity Class II', range: '35 - 39.9' },
        obese3: { title: 'Obesity Class III', range: '> 40' },
    },
    buttons: [
        {
            label: 'HOME',
            key: 'Home'
        },
        {
            label: 'SAVED',
            key: 'Saved'
        }
    ]
}

export enum buttonTypes {
    home = 'home',
    saved = 'saved'
}