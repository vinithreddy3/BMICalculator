import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type ButtonDetails = {
    key?: string,
    label: string
}

export type ButtonGroupProps = {
    buttons: ButtonDetails[],
    selectedButton?: ButtonDetails,
    onPress: (button: any) => void,
}

export const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
    const { selectedButton, buttons, onPress } = props
    return (
        <View style={styles.container}>
            {
                buttons.map((data, index) => {
                    const isSelected = selectedButton ? (selectedButton === data && true) : (index === 0 ? true : false);
                    return (
                        <TouchableOpacity
                            key={data.key ?? data.label}
                            style={[styles.defaultButton, { flex: 1 / buttons.length }, isSelected && styles.selectedButton]}
                            onPress={() => { onPress(data) }}
                        >
                            <Text style={[styles.text, isSelected && styles.selectedText]}>{data.label}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#CCCBCB'
    },
    selectedButton: {

    },
    defaultButton: {
        flexDirection: "row", alignItems: 'center', justifyContent: 'center', borderColor: 'gray', borderWidth: 0.6, paddingVertical: 10
    },
    text: { fontSize: 16, opacity: 0.6, color: '#815B43', letterSpacing: 1.3 },
    selectedText: { fontWeight: 'bold', fontStyle: 'italic', opacity: 1 }
})