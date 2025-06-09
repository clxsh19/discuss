'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';

interface CreateCommentParams {
  post_id: number;
  parent_comment_id?: number | null;
  comment: string;
}

const fetchWithConfig = async (url: string, options: RequestInit = {}) => {
  const cookieStore = cookies();
  const cookieString = cookieStore.toString();
  const headers: HeadersInit = {};

  if (cookieString) headers['Cookie'] = cookieString;
  if (options.body && typeof options.body === 'string') {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/${url}`, {
    method: 'POST',
    headers,
    cache: 'no-cache',
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({
      success: false,
      message: 'Unknown API Error',
      details: { errors: 'Failed to parse error response' },
    }));

    const { success, status, message, details } = errorData;
    let errorText = message || 'Unknown API Error';

    if (errorText === 'Validation Error') {
      const error = details?.errors;
      if (Array.isArray(error)) {
        errorText = error.map((err: any) => err.msg || err).join(', ');
      } else if (typeof error === 'string') {
        errorText = error;
      }
    }

    console.error('API Error:', {
      url: `${process.env.BACKEND_API_URL}/api/${url}`,
      success,
      status,
      message,
      location: details?.location,
      errors: details?.errors,
    });

    throw new Error(errorText);
  }

  return res.json();
};

// post

export async function createPost(prevState: any, formData: FormData) {
  try {
    const post_type = formData.get('post_type');
    const res = await fetchWithConfig(`post/create?type=${post_type}`, {
      body: formData,
    });
    const sub_name = formData.get('sub_name');

    revalidatePath(`/d/${sub_name}`);
    redirect(`/d/${sub_name}/${res.post_id}`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    } else {
      console.error('Failed to create post,', error);
      return {
        error:
          error instanceof Error ? error.message : 'Failed to create post.',
      };
    }
  }
}

export async function submitPostVote(post_id: number, voteType: -1 | 1) {
  try {
    await fetchWithConfig('post/vote', {
      body: JSON.stringify({
        post_id,
        vote_type: voteType,
      }),
    });
  } catch (error) {
    console.error('Failed to submit post_vote', error);
    throw new Error('Failed to submit post_vote.');
  }
}

// comment

export async function createComment({
  post_id,
  parent_comment_id = null,
  comment,
}: CreateCommentParams) {
  try {
    const res = await fetchWithConfig('comment/create', {
      body: JSON.stringify({
        post_id,
        parent_comment_id,
        comment,
      }),
    });
    return res.comment_id;
  } catch (error) {
    console.error('Create comment failed', error);
    throw new Error('Failed to create comment.');
  }
}

export async function updateComment(comment_id: number, comment: string) {
  try {
    await fetchWithConfig('comment/update', {
      body: JSON.stringify({
        comment_id,
        comment,
      }),
    });
  } catch (error) {
    console.error('update comment failed', error);
    throw new Error('Failed to update comment.');
  }
}

export async function deleteComment(comment_id: number) {
  try {
    await fetchWithConfig('comment/delete', {
      body: JSON.stringify({
        comment_id,
      }),
    });
  } catch (error) {
    console.error('Failed to delete comment.', error);
    throw new Error('Failed to delete comment.');
  }
}

export async function submitCommentVote(comment_id: number, voteType: -1 | 1) {
  try {
    await fetchWithConfig('comment/vote', {
      body: JSON.stringify({
        comment_id,
        vote_type: voteType,
      }),
    });
  } catch (error) {
    console.error('Failed to submit comment_vote', error);
    throw new Error('Failed to submit comment_vote.');
  }
}

// sub

export async function createCommunity(prevState: any, formData: FormData) {
  try {
    // Handle empty files
    const bannerFile = formData.get('banner');
    const logoFile = formData.get('logo');

    if (bannerFile instanceof File && bannerFile.size === 0) {
      formData.delete('banner');
    }
    if (logoFile instanceof File && logoFile.size === 0) {
      formData.delete('logo');
    }

    const formTags = formData.getAll('tags');
    if (formTags.length < 2) {
      throw new Error('Select at least two tags!');
    }

    await fetchWithConfig('subreddit/create', {
      body: formData,
    });

    const name = formData.get('sub_name');
    redirect(`/d/${name}`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    } else {
      return {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create community.',
      };
    }
  }
}

export async function subscribeUser(sub_id: number) {
  try {
    await fetchWithConfig('subreddit/join', {
      body: JSON.stringify({ sub_id }),
    });
  } catch (error) {
    console.error('Failed to join community:', error);
    throw new Error('Failed to join community.');
  }
}

export async function unsubscribeUser(sub_id: number) {
  try {
    await fetchWithConfig('subreddit/leave', {
      body: JSON.stringify({ sub_id }),
    });
  } catch (error) {
    console.error('Failed to leave community:', error);
    throw new Error('Failed to leave community.');
  }
}
