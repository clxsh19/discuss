import Link from "next/link"
import LinkProps from "@/interface/ui/LinkProps";

const LinkHref = ({
  href,
  style,
  label
} : LinkProps) => {
  return (
    <Link 
      href={href} 
      className={style}
    >
      {label}
    </Link>
  )
}

export default LinkHref;
