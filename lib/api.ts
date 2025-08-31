import axios from "axios";
import { NoteFormValues } from "@/components/NoteForm/NoteForm";
import { Note } from "@/types/note";

export interface NoteProps {
  notes: Note[];
  totalPages: number;
}

const notehubKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  search: string,
  page: number,
  tag: string | undefined
): Promise<NoteProps> => {
  const response = await axios.get<NoteProps>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search: search,
        page,
        perPage: 12,
        tag,
      },
      headers: {
        Authorization: `Bearer ${notehubKey}`,
      },
    }
  );

  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${notehubKey}`,
      },
    }
  );
  return response.data;
};

export const createNote = async (noteData: NoteFormValues): Promise<Note> => {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${notehubKey}`,
      },
    }
  );
  return response.data;
};

export const fetchNoteById = async (id: Note["id"]) => {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${notehubKey}`,
      },
    }
  );
  return response.data;
};
