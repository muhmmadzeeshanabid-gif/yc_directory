import { getCliClient } from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-10-21'})

async function main() {
  await client
    .patch('25943dcd-8e93-4b86-8120-f5465a785eea')
    .set({ image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop' }) // Food
    .commit()

  await client
    .patch('54d6a155-1a82-4a61-bf0f-687fc663396c')
    .set({ image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop' }) // Mountains
    .commit()

  await client
    .patch('76f595b3-b8d2-4fa3-97bb-4f5d8fb29794')
    .set({ image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop' }) // Another Food
    .commit()

  // Patch author image
  await client
    .patch('30a16e8c-91c4-4fd6-9e27-f3b7e2cf8dda')
    .set({ image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' })
    .commit()

  console.log("Images patched successfully!")
}

main().catch(console.error)
