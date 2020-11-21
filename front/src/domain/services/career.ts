import { Career } from "../entity/career";
const isEmptyCareer = (career: Career) => {
    return Object.values(career).every(v => !v);
}
export const exitEmptyCareers = (careers: Career[]) => careers.some(c => isEmptyCareer(c));