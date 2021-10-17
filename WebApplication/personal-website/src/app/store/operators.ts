import { filter } from "rxjs/operators";

export function filterEmpty<T>() {
    return filter((x:T) => {
        const emptyObject = x && Object.getPrototypeOf(x) === Object.prototype && Object.keys(x).length === 0;
        const emptyList = Array.isArray(x) && x.length === 0;
        const isFalsyValue = [false, -0, '', null, undefined, NaN].includes(x as any);
        if(emptyList || emptyObject || isFalsyValue) {
            return false;
        }

        return true
    })
}