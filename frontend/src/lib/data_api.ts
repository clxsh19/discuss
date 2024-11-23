'use server'

import { cookies } from "next/headers";
import { JSDOM } from 'jsdom';

export async function fetchAllPosts(offset : number, sort: string = 'new', t: string = 'day') {
  try {
    // const cookieStore = cookies();
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      sort,
      t,
    });
    console.log('query params: ', queryParams);

    const res = await fetch(`http://localhost:5000/api/post/all?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      credentials: 'include',
      // cache: 'no-cache',
    });
    const data = await res.json();

    return {
      posts: data.posts,
      hasMore: data.hasMore,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all posts data.');
  }
}

export async function fetchPostComments(postid: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/comment/${postid}`, {
      // cache: 'no-cache',
    });
    const data = await res.json();
    console.log(data.comments);
    return data.comments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post comments.');
  }
}

// Posts data for a post
export async function fetchPostById(postid: string) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const post_detail_res = await fetch(`http://localhost:5000/api/post/id/${postid}`, {
      // cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      credentials: 'include',
    });
    const post_comments_res = await fetch(`http://localhost:5000/api/comment/${postid}`, {
      // cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      credentials: 'include',
    });
    const post_data = await post_detail_res.json();
    const comment_data = await post_comments_res.json();
    const data = {
      post: post_data.post,
      comments: comment_data.comments,
    };
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post data.');
  }
}

export async function fetchPostsBySub(sub_name: string, offset: number, sort: string = 'new', t: string = 'day') {
  try {
    const cookieStore = cookies();
    // Construct the query parameters
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      sort,
      t,
    });
    console.log('query params: ', queryParams);
    const res = await fetch(`http://localhost:5000/api/post/${sub_name}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      credentials: 'include',
    });

    const data = await res.json();

    return {
      posts: data.posts,
      hasMore: data.hasMore,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sub posts.');
  }
}


export async function fetchSubData(sub_name : string) {
  try {
    const cookieStore = cookies();
    // const allCookies = cookieStore.getAll();

    const res = await fetch(`http://localhost:5000/api/subreddit/${sub_name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      credentials: 'include',
      // cache: 'no-cache',
    });
    const data = await res.json();
    
    // console.log(data);
    return data.subreddit_detail;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all posts data.');
  }
}

export async function userStatus(): 
  Promise< false | 
  { status:boolean, 
    user: {
      id: number,
      username: string
    }
  }> {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has('connect.sid');
  if (!hasCookie) {
    // console.log('no cookie');
    return false
  }
  try {
    const res = await fetch('http://localhost:5000/api/user/status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
      },
      credentials: 'include',
      cache: 'no-cache',
    });

    const data = await res.json();

    return {
      status: data.authenticated,
      user: data.user,
    };
  } catch (error) {
    console.error('failed fetching status');
    throw new Error('Failed to fetch status.');
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
    console.error('failed fetching metadata');
    throw new Error('Failed to fetch metadata.');
  }
}

