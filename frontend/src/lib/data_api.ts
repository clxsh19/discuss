'use server';

import { cookies } from 'next/headers';
import { JSDOM } from 'jsdom';

const fetchWithConfig = async (url: string, options: RequestInit = {}) => {
  // Get all cookies as string
  const cookieStore = cookies();
  const cookieString = cookieStore.toString();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Origin:
        process.env.FRONTEND_URL || 'https://discuss-peach-rho.vercel.app',
      'User-Agent': 'Next.js/Vercel',
      ...(cookieString && { Cookie: cookieString }),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const { success, status, message, details } = await res
      .json()
      .catch(() => null);
    const error = details.errors;
    let errorText = 'Unkown http error';
    if (Array.isArray(error)) {
      errorText = error.map((err: any) => err.msg).join(', ');
    } else {
      errorText = error;
    }

    console.error({
      success,
      status,
      message,
      location: details.location,
      errors: details.errors,
    });

    throw new Error(errorText);
  }
  return res.json();
};

// post

export async function fetchAllPosts(
  offset: number,
  sort: string = 'new',
  t = 'all',
) {
  try {
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      sort,
      t,
    });
    //console.log(queryParams);
    const data = await fetchWithConfig(`post/all?${queryParams}`);
    // data.hasMore = Array.isArray(data.posts) && data.posts.length > 0;
    // await new Promise(r=> setTimeout(r, 2000))
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

// fetch posts by subname
export async function fetchPostsBySub(
  sub_name: string,
  offset: number,
  sort: string = 'new',
  t: string = 'all',
) {
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
  } catch (error: any) {
    console.error('Unkown Error fetching posts by sub', error);
    // retrun
    throw new Error('An unkonw error occurred while fetching data.');
  }
}

// comment

export async function fetchPostComments(
  post_id: number,
  offset: number,
  sort: string = 'new',
) {
  try {
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      sort,
    });
    const data = await fetchWithConfig(`comment/${post_id}?${queryParams}`);
    return data.comments ?? [];
  } catch (error) {
    console.error('Unkown Error fetching comments', error);
    return [];
    // throw new Error('An unkonw error occurred while fetching data.');
  }
}

// sub

export async function fetchAllCommunityNames() {
  try {
    const data = await fetchWithConfig('subreddit/all_names', {
      headers: {
        Cookie: cookies().toString(),
      },
      credentials: 'include',
      cache: 'no-cache',
    });
    return data.communities || [];
  } catch (error) {
    console.error('Unknown Error fetching all communities name.', error);
    return [];
    // throw new Error('An unkonw error occurred while fetching data.');
  }
}

export async function fetchSubData(sub_name: string) {
  try {
    const data = await fetchWithConfig(`subreddit/${sub_name}`, {
      headers: {
        Cookie: cookies().toString(),
      },
      credentials: 'include',
      cache: 'no-cache',
    });
    return data.subreddit_detail;
  } catch (error) {
    console.error('Unknow Error fetching sub data', error);
    throw new Error('An unkonw error occurred while fetching data.');
  }
}

export async function checkIfCommunityExist(name: string) {
  try {
    const data = await fetchWithConfig(`subreddit/check_sub?sub_name=${name}`);
    return data.exist;
  } catch (error) {
    console.error('Unknown Error fetching if community exist.', error);
    return 0;
    // throw new Error('Failed to fetch sub status.');
  }
}

export async function fetchByTag(tag: string, offset: number) {
  try {
    let queryParams;
    if (tag != 'All') {
      queryParams = new URLSearchParams({
        tag,
        offset: offset.toString(),
      });
    } else {
      queryParams = new URLSearchParams({
        offset: offset.toString(),
      });
    }
    const data = await fetchWithConfig(`subreddit/communities?${queryParams}`);
    return data;
  } catch (error) {
    console.error('Unknown Error fetching communities by tag.', error);
    return 0;
  }
}

// user

export async function userData(): Promise<{
  status: boolean;
  user: { id: number; username: string } | null;
}> {
  const local_cookies = cookies();
  const hasCookie = local_cookies.has('sessionid');
  if (!hasCookie) {
    return { status: false, user: null };
  }

  try {
    const data = await fetchWithConfig('user/status');

    return {
      status: !!data.authenticated,
      user: data.authenticated ? data.user : null,
    };
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
    const cleanHtml = html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    const dom = new JSDOM(cleanHtml);
    const document = dom.window.document;

    const ogImage =
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content') || null;
    const ogTitle =
      document
        .querySelector('meta[property="og:title"]')
        ?.getAttribute('content') || null;
    const ogDescription =
      document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content') || null;

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
