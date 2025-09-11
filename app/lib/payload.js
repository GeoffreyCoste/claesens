export async function getHomeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/home`, {

  });

  if (!res.ok) {
    throw new Error("Failed to fetch home data");
  }

  return res.json();
}