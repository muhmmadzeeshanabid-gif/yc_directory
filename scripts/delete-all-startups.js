import { createClient } from "next-sanity";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function main() {
  console.log("Fetching all startups...");
  const startups = await client.fetch('*[_type == "startup"]{_id}');
  
  if (startups.length === 0) {
    console.log("No startups found.");
    return;
  }
  
  console.log(`Found ${startups.length} startups to delete.`);
  for (const s of startups) {
    await client.delete(s._id);
    console.log(`Deleted ${s._id}`);
  }
  console.log("All dummy startups successfully deleted.");
}
main();
