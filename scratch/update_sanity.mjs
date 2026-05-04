import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'mf5hh3ap',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-10-21',
  token: 'skoWSLSuqpNqYxD9PCcJgkuoIWhLgHWoAPoh7mVjFCoeS0cWIUJPziHXQDKIyvgcGgzWzdsN99zTuV1oD6bYc85l5i9fCRdhlMz3hJLeKq4CmQTCcrKj2HqSPdCdCjdUN7WNh0j7mo9ldtT0DCZ8BsqBB3tjodz3Nu1jvwl4ZNsvIcx9S81D',
});

const updates = [
  {
    id: 'ebf09e6c-f85d-434e-a2cc-0947f3280fef',
    views: 1250,
    pitch: `# Welcome to the Future of Coding 🚀\nCodeCompanion AI is not just another autocomplete tool. It understands your codebase context and suggests entire features based on simple comments.\n\n## Key Features:\n- **Context-Aware**: Scans your entire project patterns.\n- **Security First**: Your code never leaves your local environment.\n- **Speed**: Build features 10x faster.`
  },
  {
    id: '31c11579-027c-43cc-ba73-0252cb7417bc',
    views: 840,
    pitch: `# Sustainable Shopping Made Easy 🌿\nGreenMart is your one-stop shop for everything organic and zero-waste.\n\n## Why GreenMart?\n- **Verified Vendors**: Every product is eco-certified.\n- **Zero-Waste Packaging**: We use 100% recyclable materials.\n- **Carbon Neutral**: Every delivery is offset by planting trees.`
  },
  {
    id: 'df563f04-78e1-4443-a8d6-bbe08ff8f44a',
    views: 2100,
    pitch: `# Work out based on your energy ⚡\nFitFlow uses AI to sync with your Apple Watch or Fitbit and suggest the perfect workout.\n\n- **Feeling Tired?** Let's do some 15-min restorative yoga.\n- **Feeling Charged?** It's time for a high-intensity HIIT session!`
  },
  {
    id: '858e64de-3ff2-42e1-9b4d-cccb23609e9c',
    views: 1560,
    pitch: `# Find your next office anywhere 🌍\nThe ultimate community for digital nomads. Find co-working spaces with verified Wi-Fi.\n\n- **Bali to Berlin**: We have locations in 100+ cities.\n- **Verified Speeds**: Never guess the Wi-Fi speed again.`
  },
  {
    id: 'c41267c6-e71c-4dd9-a3ac-593f162514e7',
    views: 920,
    pitch: `# Finance is finally fun 💰\nPennyWise teaches teens how to save and invest through games and challenges.\n\n- **Saving Streaks**: Compete with friends to reach goals.\n- **Parental Controls**: Total visibility for parents.`
  },
  {
    id: '72d8b43e-4b17-44d1-8e71-9c14ebf50f1b',
    views: 3400,
    pitch: `# Mental Health in your pocket 🧠\nConnect with certified therapists instantly via chat or video. \n\n- **24/7 Support**: Someone is always there to listen.\n- **Affordable**: Professional help shouldn't break the bank.`
  }
];

async function run() {
  for (const update of updates) {
    try {
      await client
        .patch(update.id)
        .set({ views: update.views, pitch: update.pitch })
        .commit();
      console.log(`Updated ${update.id} successfully`);
    } catch (err) {
      console.error(`Failed to update ${update.id}:`, err.message);
    }
  }
}

run();
