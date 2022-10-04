import { CarDTO } from "@dtos/CarDTO";

export declare global {
    namespace ReactNavigation {

        interface RootParamList {
            home: undefined;
            carDetails: {
                car: CarDTO
            };
            scheduling: {
                car: CarDTO
            };
            schedulingDetails: {
                car: carDTO,
                dates: string[]
            };
            schedulingComplete: undefined;
            myCars: undefined;
        }
    }

}