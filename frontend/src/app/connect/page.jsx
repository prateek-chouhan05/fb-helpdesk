"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  checkConnection,
  disconnectFacebookIntegration,
  getCurrentUser,
} from "@/lib/api";
import { getTokenFromCookie, getUserFromLocalStorage } from "@/lib/utils/auth";

const ConnectPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const token = getTokenFromCookie();

      if (!token) {
        router.push("/login");

        return;
      }

      let user = getUserFromLocalStorage();

      if (!user) {
        try {
          user = await getCurrentUser();
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
          console.error("Error fetching user:", err);
          router.push("/login");

          return;
        }
      }

      try {
        const res = await checkConnection();

        setPages(res.pages);
        setIsConnected(res.connected);
      } catch (error) {
        console.error("Connection check error:", error);
        setIsConnected(false);
      }

      setLoading(false);
    };

    init();
  }, [router]);

  const handleConnect = () => {
    window.location.href = `${
      process.env.NEXT_PUBLIC_API_URL
    }/facebook/auth?token=${getTokenFromCookie()}`;
  };

  const handleDisconnect = async () => {
    try {
      await disconnectFacebookIntegration({
        pageId: pages[0].id,
      });

      setIsConnected(false);
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-900">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Facebook Page Connection
        </h1>
        {loading ? (
          <div className="text-center mt-10">
            <div
              className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full mr-2 align-middle"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="text-center mt-10">
            {isConnected ? (
              <>
                {pages.length > 0 ? (
                  <>
                    <p>Total Intergrated pages: {pages.length}</p>
                    <p className="mb-4 text-center">
                      Intergrated pages: <b>{pages[0].title}</b>
                    </p>
                  </>
                ) : (
                  <p className="mb-4 text-center">
                    Add your first page{" "}
                    <a
                      href="https://www.facebook.com/pages/create"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      here
                    </a>
                  </p>
                )}
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleDisconnect}
                    className="bg-red-600 text-center hover:bg-red-700 text-white px-4 py-2 rounded-xl mt-4"
                  >
                    Disconnect Integration
                  </button>
                  <button
                    onClick={() => {
                      router.push("/client/Agent/user");
                    }}
                    className="bg-blue-600 text-center hover:bg-blue-700 text-white px-4 py-2 rounded-xl mt-4"
                  >
                    Reply to a message
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4 text-center">⚠️ No page connected yet.</p>
                <button
                  onClick={handleConnect}
                  className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                >
                  Connect with Facebook
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectPage;
