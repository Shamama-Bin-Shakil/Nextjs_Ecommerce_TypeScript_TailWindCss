"use client";
import React, { useState, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import { userLoad } from "./store/Authentication";

const RTKQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getUserLoad = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`, {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      console.log("call User Load Method");
      if (result.success !== false) {
        setData(result.data);
      }
    };
    getUserLoad();
  }, []);

  if (data !== null) {
    store.dispatch(userLoad({ data }));
  }

  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default RTKQueryProvider;
