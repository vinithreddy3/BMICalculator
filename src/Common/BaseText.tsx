import React, { Component } from 'react'
import { Text, TextProps } from 'react-native'
import { getThemeColor } from '../Utils'

interface BaseTextProps extends TextProps {
    darkMode?: boolean
}

export class BaseText extends Component<BaseTextProps>{
    constructor(props: BaseTextProps) {
        super(props)
    }
    render() {

        return (
            <Text {...this.props} style={{ ...this.props.style, color: getThemeColor(this.props.darkMode) }} >
                {this.props.children}
            </Text>
        )
    }
}