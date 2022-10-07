import { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { CarImage, CarImageWrapper, Container, ImageIndex, ImageIndexes } from './styles';

type Props = {
    imageUrl: string[];
}

type ChangeImageProps = {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ imageUrl }: Props) {
    const [imageIndex, setImageIndex] = useState(0);

    const indexChanged = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!;
        setImageIndex(index);
    });

    return (
        <Container>
            <ImageIndexes>
                {
                    imageUrl.map((_, index) => (
                        < ImageIndex
                            key={String(index)}
                            active={index === imageIndex}
                        />
                    ))
                }
            </ImageIndexes>

            <FlatList
                data={imageUrl}
                keyExtractor={key => key}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item }}
                            resizeMode='contain'
                        />
                    </CarImageWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChanged.current}
            />

        </Container>
    );
}