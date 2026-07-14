import { mockFoodItems } from "@/lib/mockData";
import FoodDetailClient from "./FoodDetailClient";

export async function generateStaticParams() {
  return mockFoodItems.map((item) => ({
    id: item.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <FoodDetailClient params={params} />;
}
