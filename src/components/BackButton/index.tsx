import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

type Props = BorderlessButtonProps & {
    color?: string;
}

export function BackButton({ color, ...rest }: Props) {
    const theme = useTheme();

    return (
        <Container {...rest}>
            <MaterialIcons
                name='chevron-left'
                size={24}
                color={color ? color : theme.colors.text}
            />
        </Container>
    );
}