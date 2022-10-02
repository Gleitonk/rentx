import { CarImage, CarImageWrapper, Container, ImageIndex, ImageIndexes } from './styles';

type Props = {
    imageUrl: string[];
}

export function ImageSlider({ imageUrl }: Props) {
    return (
        <Container>
            <ImageIndexes>

                <ImageIndex active={false} />
                <ImageIndex active={true} />
                <ImageIndex active={false} />

            </ImageIndexes>


            <CarImageWrapper>

                <CarImage
                    source={{ uri: imageUrl[0] }}
                    resizeMode='contain'
                />

            </CarImageWrapper>
        </Container>
    );
}