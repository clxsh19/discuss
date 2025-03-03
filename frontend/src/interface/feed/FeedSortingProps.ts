type SortType = 'new' | 'top' | 'hot';
type TimeFramType = 'day' | 'week' | 'month' | 'year' | 'all';

export interface FeedSortingProps {
  handleSortChange: (newSort: SortType , newTimeFrame?: TimeFramType) => Promise<void>;
  sort: SortType;
  isSorting: boolean;
}
