"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";

const CreateComponent = () => {
  const searchParams = useSearchParams();
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle"));
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  const addLink = () => {
    setLinks(links.concat([{ link: "", linktext: "" }]));
  };

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links: links,
      handle: handle,
      pic: pic,
      desc: desc,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${BASE_URL}/api/create/`, requestOptions);
    
    const result = await res.json();
    if (result.success) {
      toast.success(result.message);
      setLinks([{ link: "", linktext: "" }]);
      setPic("");
      setHandle("");
    } else {
      toast.error(result.message);
    }
  };

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) =>
      initialLinks.map((item, i) =>
        i === index ? { link, linktext } : item
      )
    );
  };

  return (
    <div className="bg-green-200 min-h-screen grid grid-cols-2 pt-24">
      <div className="col1 flex justify-center items-center flex-col mt-12 text-gray-900">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-4xl">Create your Linktree</h1>
          <div className="item">
            <h2 className="font-semibold text-2xl">Step 1: Claim your Handle</h2>
            <div className="mx-4">
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="bg-white px-4 py-2 mx-2 my-2 focus:outline-black rounded-xl"
                type="text"
                placeholder="Choose a Handle"
              />
            </div>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">Step 2: Add Links</h2>
            {links.map((item, index) => (
              <div key={index} className="mx-4">
                <input
                  value={item.linktext || ""}
                  onChange={(e) => handleChange(index, item.link, e.target.value)}
                  className="bg-white px-4 py-2 mx-2 my-2 focus:outline-black rounded-xl"
                  type="text"
                  placeholder="Enter link text"
                />
                <input
                  value={item.link || ""}
                  onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                  className="bg-white px-4 py-2 mx-2 my-2 focus:outline-black rounded-xl"
                  type="text"
                  placeholder="Enter link"
                />
              </div>
            ))}
            <button onClick={addLink} className="p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-3xl">
              + Add Link
            </button>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">Step 3: Add Picture and Description</h2>
            <div className="mx-4 flex flex-col">
              <input
                value={pic || ""}
                onChange={(e) => setPic(e.target.value)}
                className="bg-white px-4 py-2 mx-2 my-2 focus:outline-black rounded-xl"
                type="text"
                placeholder="Enter link to your Picture"
              />
              <input
                value={desc || ""}
                onChange={(e) => setDesc(e.target.value)}
                className="bg-white px-4 py-2 mx-2 my-2 focus:outline-black rounded-xl"
                type="text"
                placeholder="Enter description"
              />
              <button
                disabled={pic === "" || handle === "" || links[0].linktext === ""}
                onClick={submitLinks}
                className="disabled:bg-slate-500 p-5 py-2 mx-2 w-fit my-5 bg-slate-900 text-white font-bold rounded-3xl"
              >
                Create your LinkTree
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col2 flex justify-center items-center h-full">
        <ToastContainer />
      </div>
    </div>
  );
};

const Create = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateComponent />
    </Suspense>
  );
};

export default Create;
