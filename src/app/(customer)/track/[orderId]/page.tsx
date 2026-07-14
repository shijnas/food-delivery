import { mockOrders } from "@/lib/mockData";
import TrackOrderClient from "./TrackOrderClient";

export async function generateStaticParams() {
  return mockOrders.map((o) => ({
    orderId: o.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  return <TrackOrderClient params={params} />;
}
