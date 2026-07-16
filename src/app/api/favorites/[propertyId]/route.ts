import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ propertyId: string }>;
}

// Toggle favorite: POST to add, DELETE to remove
export async function POST(_req: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { propertyId } = await params;

    const existing = await prisma.favorite.findUnique({
      where: { userId_propertyId: { userId: session.user.id, propertyId } },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ isFavorited: false });
    }

    await prisma.favorite.create({
      data: { userId: session.user.id, propertyId },
    });

    return NextResponse.json({ isFavorited: true });
  } catch (error) {
    console.error("[POST /api/favorites]", error);
    return NextResponse.json(
      { message: "Failed to toggle favorite" },
      { status: 500 }
    );
  }
}
