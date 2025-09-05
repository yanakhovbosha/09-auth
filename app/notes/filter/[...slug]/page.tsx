import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Tags } from "@/types/note";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = slug[0];
  return {
    title: `Create Next App: ${note}`,
    description: note,
    openGraph: {
      title: `Create Next App: ${note}`,
      description: note,
      url: `https://notehub-public.goit.study/api/notes/${note}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Create Next App: ${note}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : (slug[0] as Tags);

  await queryClient.prefetchQuery({
    queryKey: ["note", { search: "", page: 1, tag }],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
