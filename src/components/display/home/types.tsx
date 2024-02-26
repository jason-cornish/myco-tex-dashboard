export type LiveSteamerDataType = {
  [key: string]: any;
};

export type LiveMixerDataType = {
  [key: string]: any;
};

export type HistoricalDataType = {
  name: string;
  color: string;
  data: number[][];
}[];

export type DropdownOptions = DropdownOption[];

export type DropdownOption = {
  option: string;
  onClick: any;
  icon: string | boolean;
};

export type LiveReadingType = {
  lastUpdated: number;
  value: number;
};
