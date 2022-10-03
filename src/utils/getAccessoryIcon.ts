import CarSvg from '@assets/car.svg';
import SpeedSvg from '@assets/speed.svg';
import AccelerationSvg from '@assets/acceleration.svg';
import ExchangeSvg from '@assets/exchange.svg';
import ForceSvg from '@assets/force.svg';
import PeopleSvg from '@assets/people.svg';

import GasolineSvg from '@assets/gasoline.svg';
import EnergySvg from '@assets/energy.svg';
import HybridSvg from '@assets/hybrid.svg';

export function getAccessoryIcon(type: string) {
    switch (type) {
        case 'speed':
            return SpeedSvg;
        case 'acceleration':
            return AccelerationSvg;
        case 'exchange':
            return ExchangeSvg;
        case 'turning_diameter':
            return ForceSvg;
        case 'seats':
            return PeopleSvg;
        case 'gasoline_motor':
            return GasolineSvg;
        case 'electric_motor':
            return EnergySvg;
        case 'hybrid_motor':
            return HybridSvg;

        default:
            return CarSvg;
    }
}


// const icons: { [key: string]: React.FC<SvgProps> } = {
//     'speed': SpeedSvg,
//     'acceleration': AccelerationSvg,
//     'turning_diameter': ForceSvg,
//     'gasoline_motor': GasolineSvg,
//     'electric_motor': EnergySvg,
//     'hybrid_motor': HybridSvg,
//     'exchange': ExchangeSvg,
//     'seats': PeopleSvg,
//   }
  
  
//   export function getAccessoryIcon(type: string) {
  
//     return icons[type] || CarSvg
//   }