import { Dispatch } from "redux";
import profileActions from "./actions";
import { Address } from "../../domain/entity/address";
import {
    isCompletePostalcode,
    sanitizePostalcode
} from "../../domain/services/address";

export const searchAddressFromPostalcode = (code: string) => async (dispach: Dispatch) => {
    console.log("start: searchAddressFromPostalcode");
    console.log("code: " + code);
    console.log("isCompletePostalcode(code): " + isCompletePostalcode(code));
    if (!isCompletePostalcode(code)) return;
    console.log("code: " + code);
    const res = await fetch(
        `https://apis.postcode-jp.com/api/v3/postcodes?apikey=[Png09is6MrtgOwA2npu4WuzDjgfVE27AhBGjNT3]&postcode=${sanitizePostalcode(code)}`
    );
    console.log("res: ");
    console.log(res);
    const result = await res.json();
    if (res.status === 429) {
        console.log("res.status: Too many request!!");
        return;
    }
    if (!result.date[0]) return;
    const address: Partial<Address> = {
        prefecture: result.data[0].pref,
        city: result.data[0].city + result.data[0].town
    };
    dispach(profileActions.searchAddress.done({ result: address, params: {} }))
}
