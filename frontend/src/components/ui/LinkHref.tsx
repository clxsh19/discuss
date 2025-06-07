import Link from "next/link"
import LinkProps from "@/interface/ui/LinkProps";

const LinkHref = ({
  href,
  style,
  children
} : LinkProps) => {
  return (
    <Link 
      href={href} 
      className={style}
    >
      {children}
    </Link>
  )
}

export default LinkHref;
