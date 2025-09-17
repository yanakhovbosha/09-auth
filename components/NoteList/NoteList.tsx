import css from "./NoteList.module.css";
import { Note } from "@/types/note";
import Link from "next/link";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError() {
      console.log("Error");
    },
  });

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
            <Link scroll={false} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => {
                mutate(note.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
