import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPostCategory = await prisma.postCategory.create({
      data: body, // Make sure req.body contains the required fields
    });
    return new NextResponse(
      JSON.stringify({
        status: "PostCategory Created Successfully",
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
    const postCategory = prisma.postCategory.findMany();
    return new NextResponse(
      JSON.stringify({
        status: "All PostCategorys",
        message: postCategory,
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
    const categoryId = searchParams.get("categoryid");
    const updatedPostCategory = await prisma.postCategory.update({
      where: {
        postid_categoryId: {
          postid: Number(postId),
          categoryId: Number(categoryId),
        },
      },
      data: body,
    });
    return new NextResponse(
      JSON.stringify({
        status: "PostCategory Updated Successfully",
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
    const categoryId = searchParams.get("categoryid");
    const deletedPostCategory = await prisma.postCategory.delete({
      where: {
        postid_categoryId: {
          postid: Number(postId),
          categoryId: Number(categoryId),
        },
      },
    });
    return new NextResponse(
      JSON.stringify({
        status: "PostCategory Deleted Successfully",
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
