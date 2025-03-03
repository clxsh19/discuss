import { SortType, TimeFrameType } from "./Types";

export interface SortDropDownProps {
  onSortChange: (sort: SortType, timeframe?: TimeFrameType) => void;
  isSorting: boolean;
}
