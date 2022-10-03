import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';

import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
    color?: string;
    onPress: () => void;
}

export function BackButton({ color, onPress }: Props) {
    const theme = useTheme();

    return (
        <Container
            onPress={onPress}
        >
            <MaterialIcons
                name='chevron-left'
                size={24}
                color={color ? color : theme.colors.text}
            />
        </Container>
    );
}