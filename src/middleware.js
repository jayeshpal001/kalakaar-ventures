import { NextResponse } from 'next/server';

export function middleware(req) {
  // Check for the authorization header
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Decode the Base64 credentials
    const [user, pwd] = atob(authValue).split(':');

    // Verify against the environment variable (Username is hardcoded as 'admin')
    if (user === 'admin' && pwd === process.env.ADMIN_PASSWORD) {
      return NextResponse.next();
    }
  }

  // If unauthorized, trigger the browser's native login prompt
  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Only apply this security checkpoint to the admin dashboard
export const config = {
  matcher: ['/admin/:path*'],
};