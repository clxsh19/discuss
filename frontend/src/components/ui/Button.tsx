import ButtonProps from "@/interface/ui/ButtonProps";

// const Button = ({
//   type,
//   label,
//   style,
//   isLoading,
//   onClick,
// } : ButtonProps) => {
//   return (
//     <button 
//       disabled={isLoading}
//       type={type} 
//       className={`${style} ${isLoading? "cursor-not-allowed" : "" }`}
//       onClick={onClick}
//     >
//       {isLoading ? "Loading..." : label}
//     </button>
//   )
// }
const Button = ({
  type,
  label,
  style,
  isLoading,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={isLoading}
      type={type}
      className={`${style} flex items-center justify-center gap-2 
        ${isLoading ? "cursor-not-allowed opacity-70" : ""}`
      }
      onClick={onClick}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white" />
      )}
      {label}
    </button>
  );
};
export default Button;
