export type Validation = {
    name: string;
    description: string;
    birthday: string;
    gender: string;
    address: {
        postalcode: string;
        prefecture: string;
        city: string;
        restAddress: string;
    }
    college: {
        faculty: string;
    }
    careers: {
        company: string;
        positon: string;
        startAt: string;
        endAt: string;
    }[];
};
export type ValidationState = {
    isStartValidation: boolean;
    message: Validation;
};