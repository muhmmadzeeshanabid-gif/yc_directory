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
    description: 'Organic, plastic-free products from local vendors.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop',
    pitch: `## Welcome to GreenMart Eco Shop

GreenMart is not just a grocery store; it's a movement towards a more sustainable future. We believe that everyone should have access to fresh, organic produce without the environmental cost of plastic packaging and long-distance transport.

### Our Mission
To empower local communities by providing a direct marketplace for farmers and eco-conscious producers.

### Why Choose Us?
- **Zero Plastic:** We use 100% biodegradable or reusable packaging.
- **Local First:** Most of our products travel less than 50 miles.
- **Organic Certified:** We only work with verified organic vendors.

Join the revolution today and help us make the world a bit greener.`
  },
  {
    _id: '72d8b43e-4b17-44d1-8e71-9c14ebf50f1b',
    description: '24/7 digital gateway to professional mental health support.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop',
    pitch: `## Mental Health is Wealth

MindEase Therapy is here to bridge the gap between you and professional care. We understand that finding a therapist can be daunting and expensive.

### How it Works
1. **Match:** Take a short assessment to find the right therapist for you.
2. **Chat:** Start messaging your therapist immediately.
3. **Grow:** Schedule video calls and use our mindfulness tools.

### Our Commitment
Your privacy is our priority. All sessions are end-to-end encrypted and anonymous. Take the first step towards a happier you.`
  },
  {
    _id: '858e64de-3ff2-42e1-9b4d-cccb23609e9c',
    description: 'The all-in-one workspace for digital nomads.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
    pitch: `## Work From Anywhere, Better

NomadHub Workspace is the ultimate tool for the modern professional who calls the world their office.

### Features
- **Wi-Fi Heatmaps:** Real-time Wi-Fi speed data for every location.
- **Community Events:** Connect with other nomads in your city.
- **Desk Booking:** Instant reservations at over 5,000 co-working spaces.

### Testimonial
"NomadHub transformed my travels. I no longer worry about finding a quiet spot for my meetings." - *Sarah J., Software Engineer*`
  },
  {
    _id: 'c41267c6-e71c-4dd9-a3ac-593f162514e7',
    description: 'A smart banking app designed for teenagers.',
    image: 'https://images.unsplash.com/photo-1518458028434-518f2b33a0c7?w=800&auto=format&fit=crop',
    pitch: `## Master Your Money

PennyWise is the bank account that grows with you. We're teaching teens how to save, spend, and invest responsibly.

### What's Inside?
- **Savings Goals:** Set targets and track progress with fun animations.
- **Smart Spending:** Real-time notifications and categorization.
- **Learning Hub:** Interactive courses on taxes, investing, and more.

### Parents' Peace of Mind
Parents can set spending limits, approve large purchases, and monitor activity through their own dashboard.`
  },
  {
    _id: 'df563f04-78e1-4443-a8d6-bbe08ff8f44a',
    description: 'Fitness routines that adapt to your mood and energy.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop',
    pitch: `## Listen to Your Body with FitFlow

Most fitness apps give you a rigid plan. FitFlow gives you a partner that adapts to your daily life.

### The Science
We sync with your Apple Watch, Oura Ring, or Garmin to analyze your heart rate variability (HRV) and sleep scores.

### Adaptive Workouts
- **High Energy:** Intense HIIT or heavy lifting.
- **Low Energy:** Restorative Yoga or light walking.
- **Medium Energy:** Steady-state cardio or functional training.

Your workout should help you feel better, not burned out.`
  },
  {
    _id: 'ebf09e6c-f85d-434e-a2cc-0947f3280fef',
    description: 'AI assistant that helps developers write code 10x faster.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop',
    pitch: `## CodeCompanion: Your AI Pair Programmer

Stop wasting time on boilerplate and debugging. CodeCompanion AI uses advanced machine learning to predict your next line of code.

### Core Capabilities
- **Predictive Typing:** Write functions in seconds with context-aware suggestions.
- **Auto-BugFix:** Identify and fix syntax errors as you type.
- **Documentation Gen:** Automatically generate JSDoc and README files.

### Support
Works with VS Code, IntelliJ, and NeoVim. Supporting over 50 programming languages.`
  }
];

async function updateStartups() {
  for (const doc of updates) {
    try {
      // First delete any drafts to ensure we are seeing the published version
      try {
        await client.delete(`drafts.${doc._id}`);
      } catch (e) {
        // ignore if no draft exists
      }

      await client
        .patch(doc._id)
        .set({ 
          description: doc.description,
          image: doc.image,
          pitch: doc.pitch
        })
        .commit();
      console.log(`Updated: ${doc._id}`);
    } catch (err) {
      console.error(`Error updating ${doc._id}:`, err.message);
    }
  }
}

updateStartups();
