"use client";

import { useRouter, useParams } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();
  const close = () => router.back();

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <button onClick={close} className={css.backBtn}>
          Back
        </button>
        {isLoading && <p>Loading, please wait...</p>}
        {error && !note && <p>Something went wrong.</p>}
        <div key={note?.id} className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}
