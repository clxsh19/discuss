export default interface VoteButtonProps {
  id: number;
  votes_count: number;
  vote_type: 1 | -1 | null;
  isVertical: boolean;
  submitVote: (id: number, vote_type: 1 | -1) => Promise<void>;
}
