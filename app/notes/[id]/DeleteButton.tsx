"use client";

import css from "@/components/NoteList/NoteList.module.css";
import { deleteNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Note } from "@/lib/api";

interface Props {
  note: Note;
}

export default function DeleteButton({ note }: Props) {
  useRouter();
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

  return (
    <button
      className={css.button}
      onClick={() => {
        mutate(note.id);
      }}
    >
      Delete
    </button>
  );
}
