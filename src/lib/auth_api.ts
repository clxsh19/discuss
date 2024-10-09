'use server'
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


// Login response headers:  [
//   'connect.sid=s%3A4i2cEYpDTVANrK3RLUTHsoElSmV1VcET.etxnRrb1h02jCFCFMlZBo1lrT2UUPBsUoEyQxggbz%2BU; Path=/; Expires=Thu, 08 Aug 2024 14:53:17 GMT; HttpOnly; SameSite=Strict'
// ]

export async function logIn(formData: FormData) {
  try {
    const rawFormData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    const res = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(rawFormData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login Failed');
    }

    const setCookieHeader = res.headers.get('Set-Cookie');
    if (setCookieHeader) {
      // Split the Set-Cookie header to extract cookies
      const [cookieNameValue, ...attributes] = setCookieHeader.split(';');
      const [cookieName, cookieValue] = cookieNameValue.split('=');
      const decodedCookieValue = decodeURIComponent(cookieValue);

      // Set the cookie using Next.js `cookies()`
      cookies().set(cookieName, decodedCookieValue, {
        httpOnly: true
      });
    }
    console.log('logged in')
  const pathname = formData.get('pathname') as string;
   revalidatePath(pathname || '/');
  // redirect(pathname || '/');
    return true; // on success returns true

  
  } catch (error) {
    console.error('Login failed', error);
    return false; // false on falieur
  }
}



export async function userRegister(formData:FormData) {
  // 'use server';
  try {
    const rawFormData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    const res = await fetch('http://localhost:5000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',    
      body: JSON.stringify(rawFormData),
    });
    const data = await res.json();
    const setCookieHeader = res.headers.getSetCookie();
    console.log(setCookieHeader);
    console.log("Register response data: ", data);
    if (setCookieHeader) {
      setCookieHeader.forEach((cookieHeader) => {
        // Extract the cookie name and value from the header
        const [cookieNameValue, ...attributes] = cookieHeader.split(';');
        const [cookieName, cookieValue] = cookieNameValue.split('=');
        const decodedCookieValue = decodeURIComponent(cookieValue);
        const cookieAttributes = attributes.join(';').trim();
    
        // Set the cookie with httpOnly attribute
        cookies().set(cookieName, decodedCookieValue, {
          httpOnly: true,
        });
      });
    }
  } catch (error) {
    console.error('Registration failed', error);
    throw new Error('Failed to register.');
  }
  // Assuming you want to revalidate the path after login
  revalidatePath('/');
  redirect('/');
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