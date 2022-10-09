import React, { useState } from 'react';
import { TouchableWithoutFeedback, TextInputProps } from "react-native";
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, InputText } from './styles';

type InputProps = TextInputProps & {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}



export function PasswordInput({ iconName, value, ...rest }: InputProps) {
    const theme = useTheme();

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    function handlePasswordVisibility() {
        setIsPasswordVisible(prevState => !prevState)
    }

    return (
        <Container>

            <IconContainer
                isFocused={isFocused}
            >

                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_details}
                />

            </IconContainer>

            <InputText
                {...rest}
                secureTextEntry={isPasswordVisible}
                isFocused={isFocused}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />

            <TouchableWithoutFeedback
                onPress={handlePasswordVisibility}
            >
                <IconContainer
                    isFocused={isFocused}
                >

                    <Feather
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_details}
                    />

                </IconContainer>
            </TouchableWithoutFeedback>

        </Container>
    );
}