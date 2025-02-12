'use server'

import { cookies } from "next/headers";
import { JSDOM } from 'jsdom';

const fetchWithConfig = async (
  url: string,
  options: RequestInit = {}
) => {
  const res = await fetch(`http://localhost:5000/api/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      // Cookie: cookies().toString(),
    },
    ...options,
    // credentials: 'include', // cache: 'no-cache',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error((errorData?.errors || errorData?.error ) || `HTTP Error ${res.status}`);
  }

  return res.json();
}

export async function fetchAllPosts(offset : number, sort: string = 'new', t: string = 'all') {
  try {
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      sort,
      t,
    });
    const data = await fetchWithConfig(`post/all?${queryParams}`);
    return {
      posts: data.posts ?? [],
      hasMore: data.hasMore ?? false,
    };
  } catch (error) {
    console.error('Unkown Error fetching posts', error);
    throw new Error('An unkonw error occurred while fetching data.');
  }
}

// fetch post detail by id
export async function fetchPostDetail(post_id: number) {
  try {
    const data = await fetchWithConfig(`post/id/${post_id}`);
    return data.post; // try doing data.post = {} for error testing
  } catch (error) {
    console.error('Unknow Error fecthing post detail', error);
    throw new Error('An unkonw error occurred while fetching data.');
  }
}

export async function fetchPostComments(post_id: number, offset: number, sort: string = 'new') {
  try {
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      sort
    });
    const data = await fetchWithConfig(`comment/${post_id}?${queryParams}`);
    return data.comments ?? [];
  } catch (error) {
    console.error('Unkown Error fetching comments', error);
    return [];
    // throw new Error('An unkonw error occurred while fetching data.');
  }
}

export async function fetchPostsBySub(sub_name: string, offset: number, sort: string = 'new', t: string = 'all') {
  try {
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      sort,
      t,
    });
    const data = await fetchWithConfig(`post/${sub_name}?${queryParams}`);
    return {
      posts: data.posts ?? [],
      hasMore: data.hasMore ?? false,
    };
  } catch (error) {
    console.error('Unkown Error fetching posts by sub', error);
    // retrun
    throw new Error('An unkonw error occurred while fetching data.');
  }
}

export async function fetchAllCommunityNames() {
  try {
    const data = await fetchWithConfig('subreddit/all_names');
    return data.communities;
  } catch (error) {
    console.error('Unknown Error fetching all communities name.', error);
    return [];
    // throw new Error('An unkonw error occurred while fetching data.');
  }
}

export async function fetchSubData(sub_name : string) {
  try {
    const data = await fetchWithConfig(`subreddit/${sub_name}`);
    return data.subreddit_detail;
  } catch (error) {
    console.error('Unknow Error fetching sub data', error);
    throw new Error('An unkonw error occurred while fetching data.');
  }
}

export async function userData(): Promise<{
  status:boolean, 
  user: { id: number, username: string } | null,
}> {
  const local_cookies = cookies();
  const hasCookie = local_cookies.has('connect.sid');
  if (!hasCookie) {
    return { status: false, user: null };
  }

  try {
    const data = await fetchWithConfig('user/status', {
      headers: { 
        Cookie: local_cookies.toString(), 
      },
      credentials: 'include',
      cache: 'no-cache',
    })

    return {
      status: !!data.authenticated,
      user: data.authenticated? data.user: null,
    }
  } catch (error) {
    console.error('Unknown Error fetching user status');
    return { status: false, user: null };
    // throw new Error('Failed to fetch status.');
  }
}

export async function fetchUrlMetaData(url: string) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null;
    const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || null;

    const metadata = {
      image: ogImage,
      title: ogTitle,
      description: ogDescription,
    };
    return metadata.image;
  } catch (error) {
    console.error(`Failed to fetch meta-data of url: ${url}\n`);
    // throw new Error('Failed to fetch metadata.');
  }
}

export async function checkIfCommunityExist(name: string) {
  try {
    const data = await fetchWithConfig(`subreddit/check_sub?sub_name=${name}`);
    return data.sub ?? 0;
  } catch (error) {
    console.error('Unknown Error fetching if community exist.', error);
    return 0;
    // throw new Error('Failed to fetch sub status.');
  }
}
