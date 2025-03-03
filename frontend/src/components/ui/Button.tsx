import ButtonProps from "@/interface/ui/ButtonProps";

const Button = ({
  type,
  label,
  style,
  isLoading
} : ButtonProps) => {
  return (
    <button 
      disabled={isLoading}
      type={type} 
      className={`${style} ${isLoading? "cursor-not-allowed" : "" }`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  )
}

export default Button;
