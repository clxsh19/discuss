'use server'
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
        cookieOptions.sameSite = trimmedAttr.split('=')[1] as 'strict' | 'lax' | 'none';
      } else if (trimmedAttr.toLowerCase().startsWith('path=')) {
        cookieOptions.path = trimmedAttr.split('=')[1];
      } else if (trimmedAttr.toLowerCase().startsWith('expires=')) {
        cookieOptions.expires = new Date(trimmedAttr.split('=')[1]);
      }
    });
    cookies().set(cookieName, decodedCookieValue, cookieOptions);
  }
}

export async function logIn(formData: FormData) {
  try {
    const res = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Failed to login.", message: "" }
    }

    setCookiesFromHeader(res);
    return { error: "", message: data.message }
  } catch(error) {
    return { error: "Unknown : Failed to login.", message: "" }
  }
}

export async function userRegister(formData:FormData) {
  try {
    const res = await fetch('http://localhost:5000/api/user/register', {
      method: 'POST',
      credentials: 'include',    
      body: formData,
    });
    const data = await res.json();
    
    if (!res.ok) {
      return { error: data.error || "Failed to Register.", message: "" }
    }

    setCookiesFromHeader(res);
    // revalidatePath('/');
    // redirect('/');
    return { error: "", message: data.message }
  } catch (error) {
    console.error('Registration failed', error);
    return { error: "Unknown : Failed to create account.", message: "" }
  }
}

export async function logOut() {
  try {
    const res = await fetch('http://localhost:5000/api/user/logout', {
      method: 'GET',
    });
    const res_code = await res.json();
    console.log(res_code);
  } catch (error) {
    console.error('logout failed');
    throw new Error('Failed to logout.');
  }
}
