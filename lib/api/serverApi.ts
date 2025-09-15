import { NoteFormValues } from "@/components/NoteForm/NoteForm";
import { Note } from "@/types/note";
import { nextServer } from "./api";

export interface NoteProps {
  notes: Note[];
  totalPages: number;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchNotes = async (
  search: string,
  page: number,
  tag: string | undefined
): Promise<NoteProps> => {
  const response = await nextServer.get<NoteProps>("/notes", {
    params: {
      search: search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Authorization: `Bearer ${baseURL}`,
    },
  });

  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${baseURL}`,
    },
  });
  return response.data;
};

export const createNote = async (noteData: NoteFormValues): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${baseURL}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: Note["id"]) => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${baseURL}`,
    },
  });
  return response.data;
};
