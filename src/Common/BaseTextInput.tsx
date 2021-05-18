import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { themes } from '../themes';
import { ThemeContext } from '../utils/ThemeProvider';

type BaseTextInputProps = TextInputProps;

export const BaseTextInput: React.FC<BaseTextInputProps> = (props) => {
    const { theme } = React.useContext(ThemeContext);

    return (
        <TextInput {...props}
            style={[
                {
                    color: themes[theme].inverted,
                    borderBottomWidth: 1,
                    borderBottomColor: themes[theme].inverted
                },
                props.style]}
            placeholderTextColor={theme === 'light' ? '#C2C2C2' : '#8A8989'}
        >
            {props.children}
        </TextInput>
    )
}