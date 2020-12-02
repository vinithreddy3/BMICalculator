import React, { Component } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { getThemeColor } from '../Utils'

interface BaseTextInputProps extends TextInputProps {
    darkMode?: boolean
}

export class BaseTextInput extends Component<BaseTextInputProps>{
    constructor(props: BaseTextInputProps) {
        super(props)
    }
    render() {

        return (
            <TextInput {...this.props} style={{ ...this.props.style, color: getThemeColor(this.props.darkMode || false),
            borderBottomWidth: 1, borderBottomColor: getThemeColor(this.props.darkMode)}}
                placeholderTextColor={this.props.darkMode ? '#C2C2C2': '#8A8989'} >
                {this.props.children}
            </TextInput>
        )
    }
}