import React from 'react'
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { auth } from "@/auth";
import DeleteStartupButton from "@/components/DeleteStartupButton";

const md = markdownit();

const StartupDetails = async ({ params }) => {
  const session = await auth();
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');

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
        />
        <div className="relative z-10 flex flex-col items-center">
          <p className="tag">{formatDate(post?._createdAt)}</p>

          <h1 className="heading">{post.title}</h1>
          <p className="sub-heading !max-w-2xl">{post.description}</p>
        </div>
      </section>

      <section className="section_container">
        <img 
          src={post.image} 
          alt="thumbnail" 
          className="w-full h-auto rounded-xl max-h-[500px] object-cover" 
        />
        
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
              <Image 
                src={post.author?.image || "https://placehold.co/64x64"} 
                alt="author" 
                width={64} 
                height={64} 
                className="rounded-full drop-shadow-lg object-cover w-[64px] h-[64px] shrink-0" 
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">@{post.author?.username || post.author?.name}</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <p className="category-tag">{post.category}</p>
              {session?.id === post.author?._id && (
                <DeleteStartupButton startupId={id} />
              )}
            </div>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article 
              className="prose max-w-4xl font-work-sans break-all" 
              dangerouslySetInnerHTML={{ __html: parsedContent }} 
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        <React.Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </React.Suspense>
      </section>
    </>
  )
}

export default StartupDetails