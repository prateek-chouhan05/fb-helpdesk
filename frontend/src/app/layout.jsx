import React from "react";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>FB Helpdesk</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
