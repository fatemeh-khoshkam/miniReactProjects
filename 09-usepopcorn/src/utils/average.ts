export default function average (arr:number[]):number {
    if(arr.length === 0) return 0;
    return Number(arr.reduce((total:number, cur:number) => total + cur / arr.length, 0).toFixed(1));
}