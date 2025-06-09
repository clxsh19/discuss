'use server';

import { cookies } from 'next/headers';

function parseCookie(setCookieHeader: string) {
  const cookie: any = {};

  // Split by semicolon and process each part
  setCookieHeader.split(';').forEach((part, index) => {
    const trimmed = part.trim();

    if (index === 0) {
      // First part is name=value
      const [name, value] = trimmed.split('=');
      cookie.name = name;
      cookie.value = decodeURIComponent(value);
    } else {
      // Handle attributes
      if (trimmed.toLowerCase() === 'httponly') {
        cookie.httpOnly = true;
      } else if (trimmed.toLowerCase() === 'secure') {
        cookie.secure = true;
      } else if (trimmed.toLowerCase().startsWith('samesite=')) {
        cookie.sameSite = trimmed.split('=')[1].toLowerCase();
      } else if (trimmed.toLowerCase().startsWith('path=')) {
        cookie.path = trimmed.split('=')[1];
      } else if (trimmed.toLowerCase().startsWith('expires=')) {
        cookie.expires = new Date(trimmed.split('=')[1]);
      } else if (trimmed.toLowerCase().startsWith('max-age=')) {
        cookie.maxAge = parseInt(trimmed.split('=')[1]);
      }
    }
  });

  return cookie;
}

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

    if (!res.ok) {
      return {
        error: data.details.errors || 'Unknown: Failed to loginn hb.',
        message: '',
      };
    }
    // Parse and set cookie using backend values
    const setCookieHeader = res.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookieData = parseCookie(setCookieHeader);
      console.log('Parsed cookie data:', cookieData);

      // Set cookie using parsed values from backend
      cookies().set(cookieData.name, cookieData.value, {
        httpOnly: cookieData.httpOnly || false,
        secure: cookieData.secure || false,
        sameSite: cookieData.sameSite || 'lax',
        path: cookieData.path || '/',
        maxAge: cookieData.maxAge,
        expires: cookieData.expires,
      });
    }
    // setCookiesFromHeader(res);
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

    cookies().set('sessionid', '');
    return { error: '', message: data.message };
  } catch (error) {
    console.error('Logout failed', error);
    return { message: '', error: 'An unexpected error occurred!' };
  }
}
