import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPostTag = await prisma.postTag.create({
      data: body, // Make sure req.body contains the required fields
    });
    return new NextResponse(
      JSON.stringify({
        status: "PostTag Created Successfully",
        message: body,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const postTag = prisma.postTag.findMany();
    return new NextResponse(
      JSON.stringify({
        status: "All PostTags",
        message: postTag,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postid");
    const tagId = searchParams.get("tagid");
    const updatedPostTag = await prisma.postTag.update({
      where: {
        postid_tagId: {
          postid: Number(postId),
          tagId: Number(tagId),
        },
      },
      data: body,
    });
    return new NextResponse(
      JSON.stringify({
        status: "PostTag Updated Successfully",
        message: body,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postid");
    const tagId = searchParams.get("tagid");
    const deletedPostTag = await prisma.postTag.delete({
      where: {
        postid_tagId: {
          postid: Number(postId),
          tagId: Number(tagId),
        },
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}
