import SearchForm from "@/components/SearchForm";
import StartupCards from "@/components/StartupCards";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }) {
    const query = (await searchParams).query;
    const params = { search: query || null };

    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

   return (
    <>
    <section className="pink_container relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: "linear-gradient(to right, transparent 49.5%, rgba(255, 255, 255, 0.15) 49.5%, rgba(255, 255, 255, 0.15) 50.5%, transparent 50.5%)", 
          backgroundSize: "60px 100%",
          backgroundRepeat: "repeat"
        }} 
      />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="heading">Pitch Your Startup, <br/> Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and get Noticed in Virtual Competitions.</p>
        <SearchForm query={query}/>
      </div>
    </section>
    
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"`: "All Startups"}
      </p>
      <ul className="mt-7 card_grid">
        {posts?.length > 0 ? (
            posts.map((post) => (
                <StartupCards key={post?._id} post={post} />
            ))
        ) : (
            <p className="no-result">No startups found</p>
        )}
      </ul>
    </section>

    <SanityLive />
    </>
   )
}