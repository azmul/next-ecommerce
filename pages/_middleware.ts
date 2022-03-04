import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import absoluteUrl from 'next-absolute-url'

export function middleware(request) {
  const { cookies } = request;
  const { origin } = absoluteUrl(request);

  const tokenInfo = cookies?.sessionToken;
  const url = request.url;

  if (url.includes("/account")) {
    if (tokenInfo === undefined) {
      return NextResponse.redirect(`${origin}/login`)
    }

    const jwt = JSON.parse(tokenInfo).accessToken;

    try {
      verify(jwt, process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(`${origin}/login`)
    }
  }

  return NextResponse.next();
}
