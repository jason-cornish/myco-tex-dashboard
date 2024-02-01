export type LiveSteamerDataType = {
  temp1: number | boolean;
  temp2: number | boolean;
  temp3: number | boolean;
  temp4: number | boolean;
};

export type HistoricalDataType = {
  name: string;
  color: string;
  data: number[][];
}[];

export type DropdownOption = {
  option: string;
  onClick: any;
  icon: string | boolean;
};

export type LiveReadingType = {
  lastUpdated: number;
  value: number;
};
