import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { client } from "@/sanity/lib/client"
import { writeClient } from "@/sanity/lib/write-client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries"
import slugify from "slugify"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      authorization: { params: { prompt: "consent" } },
    }),
    Google({
      authorization: { params: { prompt: "consent" } },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const providerId = profile?.id || profile?.sub;
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: providerId });
      
      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id: providerId,
          name: user?.name,
          username: profile?.login || slugify(user?.name || "", { lower: true, strict: true }),
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || '',
        });
      } else {
        // Update image if it has changed
        if (existingUser.image !== user?.image) {
          await writeClient
            .patch(existingUser._id)
            .set({ image: user?.image })
            .commit();
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const providerId = profile?.id || profile?.sub;
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: providerId });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    }
  }
})