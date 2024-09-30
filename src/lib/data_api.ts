'use server'

import { cookies } from "next/headers";
import { JSDOM } from 'jsdom';

export async function fetchAllPosts(offset : number) {
  try {
    const res = await fetch(`http://localhost:5000/api/post/all?offset=${offset}`, {
      cache: 'no-cache',
    });
    const data = await res.json();
    
    // console.log(data);
    return {
      posts: data.posts,
      hasMore: data.hasMore,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all posts data.');
  }
}

// export async function fetchPostById(postid:string) {
//   try {
//     const res = await fetch(`http://localhost:5000/api/poscaht/${postid}`);
//     const data = await res.json();
//     return data.posts;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch post by id.');
//   }
// }

export async function fetchPostComments(postid: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/comment/${postid}`,{
      cache: 'no-cache',
    });
    const data = await res.json();
    console.log(data.comments);
    return data.comments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post comments.');
  }
}

export async function fetchPostById(postid: string) {
  try {
    const post_detail_res = await fetch(`http://localhost:5000/api/post/id/${postid}`, {
      cache: 'no-cache',
    });
    const post_comments_res = await fetch(`http://localhost:5000/api/comment/${postid}`, {
      cache: 'no-cache',
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

export async function userStatus() {
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
    const status = data.authenticated;
    return status;
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

