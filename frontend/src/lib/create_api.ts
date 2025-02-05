"use server"
import { error } from 'console';
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

export async function createCommunity(prevState:any, formData: FormData) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const bannerFile = formData.get("banner");
    const logoFile = formData.get("logo");

    if ( bannerFile instanceof File && bannerFile.size === 0) {
      formData.delete("banner")
    }
    if ( logoFile instanceof File && logoFile.size === 0) {
      formData.delete("logo")
    } 

    // Send the request with form data and headers
    const res = await fetch('http://localhost:5000/api/subreddit/create', {
      method: 'POST',
      headers: {
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      body: formData, 
    });
    const responseData = await res.json();

    if (!res.ok) {
      let error = "Unknown Server Error: Failed to create community."
      if (responseData.errors && Array.isArray(responseData.errors)) {
        error = responseData.errors.map((err:any) => err.msg).join(", ");
      } else if ( responseData.error) {
        error = responseData.error;
      }
      return {
        error,
        message: ''
      }
    }

    return {
      error: '',
      message: responseData.message
    }

  } catch (error) {
    console.error('Failed to create community:', error);
    // throw new Error('Failed to create community.');
    return {
      error: "Unknown Error: Failed to create community!",
      message: ''
    }
  }
}

export async function createPost(prevState:any, formData: FormData) {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();

    const post_type = formData.get("post_type");

    // Send the request with form data and headers
    const res = await fetch(`http://localhost:5000/api/post/create?type=${post_type}`, {
      method: 'POST',
      headers: {
        Cookie: allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
      },
      body: formData, 
    });
    const responseData = await res.json();

    if (!res.ok) {
      let error = "Unknown Server Error: Failed to create post."
      if (responseData.errors && Array.isArray(responseData.errors)) {
        error = responseData.errors.map((err:any) => err.msg).join(", ");
      } else if ( responseData.error) {
        error = responseData.error;
      }
      return {
        error,
        message: ''
      }
    }

    return {
      error: '',
      message: responseData.message || ''
    }

  } catch (error) {
    console.error('Failed to create post:', error);
    return {
      error: "Unknown Error: Failed to create post.",
      message: ''
    }
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

