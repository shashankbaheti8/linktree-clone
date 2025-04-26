import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const data = await collection.findOne({ handle: handle });

  if (!data) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen bg-purple-400 justify-center items-center py-10 px-4 relative">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <img
          src={data.pic}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-purple-500"
        />

        <span className="font-bold text-xl mt-4 text-purple-700">
          @{data.handle}
        </span>

        <span className="desc w-80 text-center text-gray-600">{data.desc}</span>

        <div className="mt-4 w-full">
          {data.links.map((item, index) => (
            <Link key={index} href={item.link} target="_blank">
              <div className="bg-purple-100 py-4 shadow-md px-4 text-center rounded-md my-3 transition-all hover:bg-purple-200 hover:shadow-lg">
                {item.linktext}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 right-6 text-white">
        <p className="text-sm">
          Want to create your own Linktree?
        </p>
        <Link href="/">
          <span className="font-semibold underline cursor-pointer hover:text-purple-600">
            Get Started Now!
          </span>
        </Link>
      </div>
    </div>
  );
}
