import React from 'react'
import { Text, TextProps } from 'react-native'
import { themes } from '../themes';
import { ThemeContext } from '../utils/ThemeProvider';

type BaseTextProps = TextProps;

export const BaseText: React.FC<BaseTextProps> = (props) => {
    const { theme } = React.useContext(ThemeContext);

    return (
        <Text {...props} style={[{ color: themes[theme].inverted }, props.style]} >
            {props.children}
        </Text>
    )
}