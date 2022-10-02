import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Period,
    Price,
    Type,
    Rent,
    CarImage
} from './styles';

import GasolineSvg from '@assets/gasoline.svg'

type CarData = {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    },
    thumbnail: string;
}

type Props = {
    data: CarData;
}

export function Car({ data }: Props) {
    return (
        <Container>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg />
                    </Type>

                </About>
            </Details>

            <CarImage
                source={{ uri: data.thumbnail }}
                // resizeMode='contain'
            />


        </Container>
    );
}