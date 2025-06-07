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

const fetchWithConfig = async (
  url: string,
  data: FormData | string,
  content_type?: string,
) => {
  const headers: HeadersInit = {};
  if (content_type) headers['Content-Type'] = content_type;
  headers['Cookie'] = cookies().toString();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/${url}`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: data,
  });

  if (!res.ok) {
    const { success, status, message, details } = await res
      .json()
      .catch(() => null);
    let errorText = message || 'Unknown Api Error';
    if (errorText == 'Validation Error') {
      const error = details.errors;

      if (Array.isArray(error)) {
        errorText = error.map((err: any) => err.msg).join(', ');
      } else {
        errorText = error;
      }
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

export async function createPost(prevState: any, formData: FormData) {
  try {
    const post_type = formData.get('post_type');
    const res = await fetchWithConfig(
      `post/create?type=${post_type}`,
      formData,
    );
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
    const payload = JSON.stringify({
      post_id,
      vote_type: voteType,
    });
    const res = await fetchWithConfig('post/vote', payload, 'application/json');
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
    const payload = JSON.stringify({
      post_id,
      parent_comment_id,
      comment,
    });
    const res = await fetchWithConfig(
      'comment/create',
      payload,
      'application/json',
    );
    return res.comment_id;
  } catch (error) {
    console.error('Create comment failed', error);
    throw new Error('Failed to create comment.');
  }
}

export async function updateComment(comment_id: number, comment: string) {
  try {
    const payload = JSON.stringify({
      comment_id,
      comment,
    });
    const res = await fetchWithConfig(
      'comment/update',
      payload,
      'application/json',
    );
  } catch (error) {
    console.error('update comment failed', error);
    throw new Error('Failed to update comment.');
  }
}

export async function deleteComment(comment_id: number) {
  try {
    const payload = JSON.stringify({
      comment_id,
    });
    const res = await fetchWithConfig(
      'comment/delete',
      payload,
      'application/json',
    );
  } catch (error) {
    console.error('Failed to delete comment.', error);
    throw new Error('Failed to delete comment.');
  }
}

export async function submitCommentVote(comment_id: number, voteType: -1 | 1) {
  try {
    const payload = JSON.stringify({
      comment_id,
      vote_type: voteType,
    });
    const res = await fetchWithConfig(
      'comment/vote',
      payload,
      'application/json',
    );
  } catch (error) {
    console.error('Failed to submit comment_vote', error);
    throw new Error('Failed to submit comment_vote.');
  }
}

// sub

export async function createCommunity(prevState: any, formData: FormData) {
  try {
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
      throw new Error('Select atleast two tags!');
    }
    console.log(formData);

    await fetchWithConfig('subreddit/create', formData);
    const name = formData.get('sub_name');
    redirect(`/d/${name}`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    } else {
      // console.error('Failed to create community,', error);
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
    const payload = JSON.stringify({
      sub_id,
    });
    const res = await fetchWithConfig(
      'subreddit/join',
      payload,
      'application/json',
    );
  } catch (error) {
    console.error('Failed to join community', error);
    throw new Error('Failed to leave community.');
  }
}

export async function unsubscribeUser(sub_id: number) {
  try {
    const payload = JSON.stringify({
      sub_id,
    });
    const res = await fetchWithConfig(
      'subreddit/leave',
      payload,
      'application/json',
    );
  } catch (error) {
    console.error('Failed to leave community', error);
    throw new Error('Failed to leave community.');
  }
}
