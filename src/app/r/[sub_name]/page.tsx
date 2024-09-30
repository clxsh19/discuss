// import { useRouter } from 'next/router'
import HeaderNav from "@/components/HeaderNav";
interface SubPageProp {
  params: {
    sub_name: string,
  }
}

export default function Page({ params } : SubPageProp) {
  // const router = useRouter();
  // const  sub = router.query.subreddit;
  const { sub_name } = params;
  return (
    <>
    <div>{sub_name}</div>
    </>
  )
}