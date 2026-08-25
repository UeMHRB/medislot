import connectDB from "@/lib/db";
import Test from "@/models/Test";

export async function GET() {
  try {
    await connectDB();
    const doc = await Test.create({ message: "hello from medislot" });
    return Response.json({ status: "connected", doc });
  } catch (error) {
    return Response.json({ status: "failed", error: error.message }, { status: 500 });
  }
}