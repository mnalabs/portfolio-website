import { notFound } from "next/navigation";
import { RawMaterialsPage } from "@/components/sites/rawmaterials/RawMaterialsPage";
import { ROUTE_SLUGS } from "@/components/sites/rawmaterials/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROUTE_SLUGS.filter(Boolean).map((slug) => ({ slug }));
}

export default async function SectionRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = ROUTE_SLUGS.indexOf(slug);
  if (index < 1) notFound();
  return <RawMaterialsPage initialIndex={index} />;
}
