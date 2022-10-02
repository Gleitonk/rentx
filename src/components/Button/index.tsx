import { Container, Title } from './styles';

type Props = {
    title: string;
    color?: string;
    // onPress: () => void;
}

export function Button({ title, color, ...rest }: Props) {
    return (
        <Container
            {...rest}
            color={color || ''}
        >
            <Title>{title}</Title>
        </Container>
    );
}
