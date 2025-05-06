import LegacyPageView from "./LegacyPageView";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id; // Await is not needed here because params is already resolved
  return <LegacyPageView id={id} />;
}
