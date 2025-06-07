import ButtonProps from "@/interface/ui/ButtonProps";

const Button = ({
  type,
  label,
  style,
  isLoading,
  onClick,
} : ButtonProps) => {
  return (
    <button 
      disabled={isLoading}
      type={type} 
      className={`${style} ${isLoading? "cursor-not-allowed" : "" }`}
      onClick={onClick}
    >
      {isLoading ? "Loading..." : label}
    </button>
  )
}

export default Button;
