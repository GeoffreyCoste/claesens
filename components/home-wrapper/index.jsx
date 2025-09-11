import { getHomeData } from "@/app/lib/payload";

export default async function HomeWrapper({ children }) {
  const home = await getHomeData(); // fetch côté serveur

  // Passe les données via props aux enfants
  return children(home);
}