import css from "./NoteList.module.css";
import { Note } from "@/lib/api";
import Link from "next/link";
import DeleteButton from "@/app/notes/[id]/DeleteButton";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className={css.list}>
      {notes?.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <DeleteButton note={note} />
          </div>
        </li>
      ))}
    </ul>
  );
}
