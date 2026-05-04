const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'mf5hh3ap',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-30',
  token: 'skoWSLSuqpNqYxD9PCcJgkuoIWhLgHWoAPoh7mVjFCoeS0cWIUJPziHXQDKIyvgcGgzWzdsN99zTuV1oD6bYc85l5i9fCRdhlMz3hJLeKq4CmQTCcrKj2HqSPdCdCjdUN7WNh0j7mo9ldtT0DCZ8BsqBB3tjodz3Nu1jvwl4ZNsvIcx9S81D'
});

const updates = [
  {
    _id: '31c11579-027c-43cc-ba73-0252cb7417bc',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop' // Health Food Salad
  },
  {
    _id: '72d8b43e-4b17-44d1-8e71-9c14ebf50f1b',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop' // Nature Yoga
  },
  {
    _id: '858e64de-3ff2-42e1-9b4d-cccb23609e9c',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop' // Nature/Lake Workspace
  },
  {
    _id: 'c41267c6-e71c-4dd9-a3ac-593f162514e7',
    image: 'https://images.unsplash.com/photo-1454165833767-1317d7299066?q=80&w=1200&auto=format&fit=crop' // Clean workspace/growth
  },
  {
    _id: 'df563f04-78e1-4443-a8d6-bbe08ff8f44a',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop' // Exercise/Health
  },
  {
    _id: 'ebf09e6c-f85d-434e-a2cc-0947f3280fef',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop' // Tech/Nature clean look
  }
];

async function updateStartups() {
  for (const doc of updates) {
    try {
      await client
        .patch(doc._id)
        .set({ image: doc.image })
        .commit();
      console.log(`Updated Image: ${doc._id}`);
    } catch (err) {
      console.error(`Error updating ${doc._id}:`, err.message);
    }
  }
}

updateStartups();
