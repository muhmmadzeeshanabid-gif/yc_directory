import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <>

      <section className="pink_container !min-h-[230px] relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 pointer-events-none" 
          style={{ 
            backgroundImage: "linear-gradient(to right, transparent 49.5%, rgba(255, 255, 255, 0.15) 49.5%, rgba(255, 255, 255, 0.15) 50.5%, transparent 50.5%)", 
            backgroundSize: "60px 100%",
            backgroundRepeat: "repeat"
          }} 
        />        <h1 className="heading">Submit Your Startup Pitch</h1>

      </section>
<StartupForm />
    </>
  )
}

export default page