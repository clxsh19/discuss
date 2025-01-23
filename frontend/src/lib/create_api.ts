"use server"
import { cookies } from 'next/headers';

interface CreateCommentParams {
  post_id: number;
  parent_comment_id?: number | null;
  comment: string;
}

export async function createComment({ post_id, parent_comment_id=null, comment }: CreateCommentParams) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();

    const res = await fetch('http://localhost:5000/api/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      credentials: 'include',    
      body: JSON.stringify({
        post_id,
        parent_comment_id,
        comment,
      }),
    });  
    if (!res.ok) {
      const errorData = await res.json();  // Read the error message from the response
      throw new Error(errorData.error || 'Unknown error');
    }
    const data = await res.json();
    console.log(data);
    return data.comment_id;
  } catch (error) {
    console.error('Create comment failed', error);
    throw new Error('Failed to create comment.');
  }
}

export async function createCommunity(formData: FormData) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    
    // Send the request with form data and headers
    const res = await fetch('http://localhost:5000/api/subreddit/create', {
      method: 'POST',
      headers: {
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      body: formData, 
    });

    // Handle the response
    const responseData = await res.json();
    return responseData;

  } catch (error) {
    console.error('Failed to create community:', error);
    throw new Error('Failed to create community.');
  }
}

export async function createPost(formData: FormData, postType: 'TEXT' | 'MEDIA' | 'LINK') {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    
    // Send the request with form data and headers
    const res = await fetch(`http://localhost:5000/api/post/create?type=${postType}`, {
      method: 'POST',
      headers: {
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      body: formData, 
    });

    if (!res.ok) {
      console.log('snjdscn')
    }
    // Handle the response
    const responseData = await res.json();
    return responseData;

  } catch (error) {
    console.error('Failed to create post:', error);
    throw new Error('Failed to create post.');
  }
}


export async function updateComment(comment_id: number, comment: string) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const res = await fetch('http://localhost:5000/api/comment/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      credentials: 'include',    
      body: JSON.stringify({
        comment_id,
        comment
      }),
    });  
    const data = await res.json();
  } catch (error) {
    console.error('update comment failed', error);
    throw new Error('Failed to update comment.');
  }
}

export async function deleteComment(comment_id: number) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const res = await fetch('http://localhost:5000/api/comment/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      credentials: 'include',    
      body: JSON.stringify({
        comment_id
      }),
    });  
    const data = await res.json();
  } catch (error) {
    console.error('Failed to delete comment', error);
    throw new Error('Failed to delete comment.');
  }
}

export async function submitPostVote(post_id: number, voteType: -1|1) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const res = await fetch('http://localhost:5000/api/post/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      credentials: 'include',
      body: JSON.stringify({
        post_id,
        vote_type: voteType
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Couldn\'t submit post vote', error);
  }  
}

export async function submitCommentVote(comment_id: number, voteType: -1|1) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const res = await fetch('http://localhost:5000/api/comment/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      credentials: 'include',
      body: JSON.stringify({
        comment_id,
        vote_type: voteType
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Couldn\'t submit comment vote', error);
  }  
}

export async function subscribeUser(subreddit_id: number) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const res = await fetch('http://localhost:5000/api/subreddit/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      credentials: 'include',
      body: JSON.stringify({
        subreddit_id
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Couldn\'t join subreddit', error);
  } 
}

export async function unsubscribeUser(subreddit_id: number) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const res = await fetch('http://localhost:5000/api/subreddit/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      credentials: 'include',
      body: JSON.stringify({
        subreddit_id
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Couldn\'t leave subreddit', error);
  } 
}

