import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Page for creating a note.",
  openGraph: {
    title: "Create note",
    description: "Page for creating a note.",
    url: "https://notehub-public.goit.study/api/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <div className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </div>
  );
}
