import { BackButton } from '@components/BackButton';
import { ImageSlider } from '@components/ImageSlider';
import { About, Brand, CarImages, Container, Content, Description, Details, Header, Name, Period, Price, Rent } from './styles';

export function CarDetail() {
    return (
        <Container>
            <Header>
                <BackButton
                    onPress={() => { }}
                />
            </Header>

            <CarImages>
                <ImageSlider
                    imageUrl={['https://di-uploads-pod15.dealerinspire.com/rusnakwestlakeporsche/uploads/2019/07/2019PRC010464_640_01.png']}
                />
            </CarImages>


            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <About>
                    Athletes know: top performance requires more than perfect conditions and luck. Relentless training to become stronger and faster.
                </About>
            </Content>
        </Container>
    );
}