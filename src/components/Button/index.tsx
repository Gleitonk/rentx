import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

import { useTheme } from 'styled-components/native';

import { Container, Title } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    color?: string;
    light?: boolean;
    loading?: boolean;
}

export function Button({ title, color, light = false, onPress, disabled = false, loading = false, ...rest }: Props) {
    const theme = useTheme();

    return (
        <Container
            {...rest}
            onPress={onPress}
            color={color ? color : theme.colors.main}
            disabled={disabled}
            style={{ opacity: disabled ? .5 : 1 }}
        >
            {loading ?
                <ActivityIndicator
                    color={theme.colors.shape}
                    style={{ padding: 2 }}
                /> :
                <Title
                    light={light}
                >
                    {title}
                </Title>
            }
        </Container >
    );
}
