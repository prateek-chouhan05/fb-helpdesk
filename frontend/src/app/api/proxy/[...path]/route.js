// src/app/api/proxy/[...path]/route.js
import { NextResponse } from "next/server";

const proxyRequest = async (req, contextPromise) => {
  const params = await contextPromise.params;

  const token = req.cookies.get("token")?.value;

  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/${params.path.join(
    "/"
  )}`;

  const fetchOptions = {
    method: req.method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
    body: req.method !== "GET" ? await req.text() : undefined,
  };

  try {
    const res = await fetch(backendUrl, fetchOptions);
    const data = await res.text();

    return new NextResponse(data, {
      status: res.status,
      headers: res.headers,
    });
  } catch (err) {
    console.error("🚀 ~ proxyRequest ~ err:", err);

    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
};

export async function GET(req, context) {
  return proxyRequest(req, context);
}

export async function POST(req, context) {
  return proxyRequest(req, context);
}

export async function PUT(req, context) {
  return proxyRequest(req, context);
}

export async function DELETE(req, context) {
  return proxyRequest(req, context);
}
