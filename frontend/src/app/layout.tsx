import '@/globals.css';
import HeaderNav from '@/components/HeaderNav';
import { AuthProvider } from '@/components/context/AuthContext';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading';
import { Suspense } from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
      {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
      </head>
      <body className='bg-neutral-950'>
        <AuthProvider>
        <HeaderNav />
        <ToastContainer 
          position='bottom-left'
          hideProgressBar={true}
          closeOnClick={true}
          autoClose={3500}
          theme='colored'
          transition={Zoom}
        />
        <Suspense fallback={<Loading/>}>
        <main>
          {children}
        </main>
        </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
