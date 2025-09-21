import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const unprotectedPathPrefixes = [
    '/api/healthcheck',
    '/join'
];

const isUnprotectedPath = (pathname: string) => {
    return unprotectedPathPrefixes.some(prefix => pathname.startsWith(prefix));
};

export async function middleware(request: NextRequest) {
    if (isUnprotectedPath(request.nextUrl.pathname)) {
        return NextResponse.next({ request });
    }

    return await updateSession(request);
}

export const config = {
    matcher: [
        /**
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - manifest.webmanifest (PWA manifest)
         * - *.webmanifest (just in case you use a different name)
         * - *.json (optional if you serve assetlinks.json for Android)
         * - service-worker.js (for PWA service worker)
         */
        '/((?!_next/static|_next/image|favicon.ico|manifest\\.webmanifest|.*\\.webmanifest|service-worker\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
