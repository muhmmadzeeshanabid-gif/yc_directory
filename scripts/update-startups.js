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
    description: 'GreenMart is revolutionizing the way we shop by providing a seamless, eco-friendly marketplace for organic and sustainable goods. Our mission is to reduce plastic waste and support local farmers by delivering fresh, chemical-free produce and plastic-free household essentials directly to your doorstep in 100% biodegradable packaging. Join us in making the planet greener, one delivery at a time.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    _id: '72d8b43e-4b17-44d1-8e71-9c14ebf50f1b',
    description: 'MindEase Therapy provides an accessible, 24/7 digital gateway to professional mental health support. We connect users with certified therapists and empathetic mental health coaches through encrypted chat, voice, and video sessions. Whether you\'re dealing with anxiety, stress, or just need someone to talk to, MindEase offers personalized care plans and daily mindfulness tools to help you navigate life\'s challenges with resilience.',
    image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    _id: '858e64de-3ff2-42e1-9b4d-cccb23609e9c',
    description: 'NomadHub is the ultimate digital ecosystem for remote workers and globe-trotters. Our platform allows digital nomads to discover and book vetted co-working spaces, coliving houses, and hidden gems with guaranteed high-speed Wi-Fi in over 150 countries. Beyond just a booking tool, NomadHub fosters a global community where members can share tips, organize meetups, and find networking opportunities wherever they land.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    _id: 'c41267c6-e71c-4dd9-a3ac-593f162514e7',
    description: 'PennyWise is more than just a banking app; it\'s a financial education powerhouse for the next generation. Designed specifically for teenagers, PennyWise uses gamified saving goals, real-time spending insights, and interactive lessons to teach essential money management skills. With parent-approved controls and a sleek, modern interface, we\'re empowering young people to build healthy financial habits that will last a lifetime.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop'
  },
  {
    _id: 'df563f04-78e1-4443-a8d6-bbe08ff8f44a',
    description: 'FitFlow is the world\'s first fitness application that truly listens to your body. By integrating with your wearable biometric data, FitFlow automatically adjusts your yoga, strength training, and HIIT routines based on your heart rate, sleep quality, and daily energy levels. No more rigid schedules—FitFlow provides a dynamic workout experience that challenges you when you\'re strong and helps you recover when you\'re tired.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop'
  },
  {
    _id: 'ebf09e6c-f85d-434e-a2cc-0947f3280fef',
    description: 'CodeCompanion AI is the ultimate productivity partner for modern software engineers. Using state-of-the-art predictive logic and deep context awareness, our AI assistant helps developers write cleaner, more efficient code at 10x the speed. From real-time bug detection to automated refactoring and complex architectural suggestions, CodeCompanion integrates seamlessly into your workflow to eliminate repetitive tasks and unleash your creativity.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
  }
];

async function updateStartups() {
  for (const doc of updates) {
    try {
      await client
        .patch(doc._id)
        .set({ 
          description: doc.description,
          image: doc.image 
        })
        .commit();
      console.log(`Updated: ${doc._id}`);
    } catch (err) {
      console.error(`Error updating ${doc._id}:`, err.message);
    }
  }
}

updateStartups();
