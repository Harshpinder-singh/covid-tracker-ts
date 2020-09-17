import numeral from "numeral";

export const printStat = (stat: number): any => {
  return stat ? `+${numeral(stat).format("0,0a")}` : "";
};
