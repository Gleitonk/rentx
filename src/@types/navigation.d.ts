import { CarDTO } from "@dtos/CarDTO";

export declare global {
    namespace ReactNavigation {

        interface RootParamList {
            splash: undefined;
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
            confirmation: {
                title: string;
                message: string;
                nextScreenRoute: string;
            };
            myCars: undefined;
            signin: undefined;
            signupfirststep: undefined;
            signupsecondstep: {
                user: {
                    name: string;
                    email: string;
                    drivingLicense: string;
                }
            },
            profile: undefined;
        }
    }

}