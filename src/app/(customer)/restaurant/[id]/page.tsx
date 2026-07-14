import { mockRestaurants } from "@/lib/mockData";
import RestaurantClient from "./RestaurantClient";

export async function generateStaticParams() {
  return mockRestaurants.map((r) => ({
    id: r.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <RestaurantClient params={params} />;
}
