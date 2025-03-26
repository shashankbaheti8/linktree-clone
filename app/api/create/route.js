import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const body = await req.json();
  const doc = await collection.findOne({ handle: body.handle });
  console.log(doc);
  if (doc) {
    return Response.json({
      success: false,
      error: true,
      message: "This Linktree already exists!",
      result: null,
    });
  }
  const result = await collection.insertOne(body);
  console.log(result);
  return Response.json({
    success: true,
    message: "Linktree created.",
    result: result,
  });
}
