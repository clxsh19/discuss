interface ButtonProps {
  type?: "submit";
  label: string;
  style: string;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

}

export default ButtonProps;
