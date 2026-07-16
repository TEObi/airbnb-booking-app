import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") ?? undefined;
    const location = searchParams.get("location") ?? undefined;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const guestCount = searchParams.get("guestCount");

    // Build where clause
    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    if (guestCount) {
      where.guestCount = { gte: parseInt(guestCount, 10) };
    }

    // Exclude properties that have confirmed bookings overlapping the date range
    if (startDate && endDate) {
      where.NOT = {
        bookings: {
          some: {
            status: "confirmed",
            AND: [
              { startDate: { lte: new Date(endDate) } },
              { endDate: { gte: new Date(startDate) } },
            ],
          },
        },
      };
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        images: { take: 1, orderBy: { createdAt: "asc" } },
        user: { select: { id: true, name: true, image: true } },
        ...(session?.user?.id
          ? { favorites: { where: { userId: session.user.id }, select: { id: true } } }
          : {}),
        _count: { select: { reviews: true } },
        reviews: { select: { rating: true } },
      },
    });

    // Shape the response
    const result = properties.map((p) => {
      const totalRating = p.reviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating =
        p.reviews.length > 0
          ? Math.round((totalRating / p.reviews.length) * 10) / 10
          : null;

      return {
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        location: p.location,
        lat: p.lat,
        lng: p.lng,
        category: p.category,
        guestCount: p.guestCount,
        roomCount: p.roomCount,
        bathroomCount: p.bathroomCount,
        userId: p.userId,
        createdAt: p.createdAt.toISOString(),
        images: p.images.map((img) => ({
          ...img,
          createdAt: img.createdAt.toISOString(),
        })),
        user: p.user,
        isFavorited: Array.isArray(p.favorites) && p.favorites.length > 0,
        averageRating,
        reviewCount: p._count.reviews,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/properties]", error);
    return NextResponse.json(
      { message: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
