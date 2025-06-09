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

function setCookiesFromHeader(res: Response) {
  const setCookieHeader = res.headers.get('set-cookie');
  if (setCookieHeader) {
    const cookieData = parseCookie(setCookieHeader);

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
}

export async function userLogin(formData: FormData) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.details.errors || 'Unknown: Failed to login.',
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
  const local_cookies = cookies();
  const hasCookie = local_cookies.has('sessionid');
  if (!hasCookie) {
    return { error: '', message: '' };
  }
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
