import { Accessory } from '@components/Accessory';
import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { ImageSlider } from '@components/ImageSlider';

import { About, Accessories, Brand, CarImages, Container, Content, Description, Details, Footer, Header, Name, Period, Price, Rent } from './styles';

import speedSvg from '@assets/speed.svg';
import accelerationSvg from '@assets/acceleration.svg';
import gasolineSvg from '@assets/gasoline.svg';
import exchangeSvg from '@assets/exchange.svg';
import forceSvg from '@assets/force.svg';
import peopleSvg from '@assets/people.svg';


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

                <Accessories>
                    <Accessory icon={speedSvg} name="380Km/h" />
                    <Accessory icon={accelerationSvg} name="3.2s" />
                    <Accessory icon={forceSvg} name="800 HP" />
                    <Accessory icon={gasolineSvg} name="Gasolina" />
                    <Accessory icon={exchangeSvg} name="Auto" />
                    <Accessory icon={peopleSvg} name="2 pessoas" />
                </Accessories>

                <About>
                    Athletes know: top performance requires more than perfect conditions and luck. Relentless training to become stronger and faster.
                </About>
            </Content>

            <Footer>
                <Button
                    title='Confirmar'
                />
            </Footer>
        </Container>
    );
}