export interface PropertyImage {
  id: string;
  url: string;
  propertyId: string;
  createdAt: string;
}

export interface PropertyOwner {
  id: string;
  name: string | null;
  image: string | null;
}

export interface PropertyListItem {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  lat: number;
  lng: number;
  category: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  userId: string;
  createdAt: string;
  images: PropertyImage[];
  user: PropertyOwner;
  /** Whether the current user has favorited this property */
  isFavorited: boolean;
  /** Average review rating (null when no reviews yet) */
  averageRating: number | null;
  /** Total number of reviews */
  reviewCount: number;
}
