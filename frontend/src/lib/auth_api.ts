'use server';
// import { revalidatePath } from "next/cache";
// import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const setCookiesFromHeader = (res: Response) => {
  const setCookieHeader = res.headers.get('Set-Cookie');
  if (setCookieHeader) {
    // Split the Set-Cookie header to extract cookies
    const [cookieNameValue, ...attributes] = setCookieHeader.split(';');
    const [cookieName, cookieValue] = cookieNameValue.split('=');
    const decodedCookieValue = decodeURIComponent(cookieValue);

    // Initialize cookie options
    const cookieOptions: Record<string, any> = {};
    attributes.forEach((attr) => {
      const trimmedAttr = attr.trim();

      if (trimmedAttr.toLowerCase() === 'httponly') {
        cookieOptions.httpOnly = true;
      } else if (trimmedAttr.toLowerCase().startsWith('samesite=')) {
        cookieOptions.sameSite = trimmedAttr.split('=')[1] as
          | 'strict'
          | 'lax'
          | 'none';
      } else if (trimmedAttr.toLowerCase().startsWith('path=')) {
        cookieOptions.path = trimmedAttr.split('=')[1];
      } else if (trimmedAttr.toLowerCase().startsWith('expires=')) {
        cookieOptions.expires = new Date(trimmedAttr.split('=')[1]);
      }
    });
    cookies().set(cookieName, decodedCookieValue, cookieOptions);
  }
};

export async function userLogin(formData: FormData) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', // required for CORS and cookies
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    // await new Promise(r => setTimeout(r, 2000));

    if (!res.ok) {
      return {
        error: data.details.errors || 'Unknown: Failed to loginn hb.',
        message: '',
      };
    }

    setCookiesFromHeader(res);
    return { error: '', message: data.message };
  } catch (error) {
    console.error('Unknow Error: ', error);
    return { error: 'Unknown: Failed to login.', message: '' };
  }
}

export async function userRegister(formData: FormData) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/user/register`,
      {
        method: 'POST',
        credentials: 'include',
        body: formData,
      },
    );
    const data = await res.json();
    console.log(res);

    if (!res.ok) {
      return {
        error: data.details.errors || 'Unknown: Failed to Register.',
        message: '',
      };
    }

    setCookiesFromHeader(res);
    // revalidatePath('/');
    // redirect('/');
    return { error: '', message: data.message };
  } catch (error) {
    console.error('Registration failed', error);
    return { error: 'Unknown: Failed to create account.', message: '' };
  }
}

export async function userLogout() {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Cookie: cookies().toString(),
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.details.errors || 'Unknown: Failed to Register.',
        message: '',
      };
    }

    cookies().set('connect.sid', '');
    return { error: '', message: data.message };
  } catch (error) {
    console.error('Logout failed', error);
    return { message: '', error: 'An unexpected error occurred!' };
  }
}
