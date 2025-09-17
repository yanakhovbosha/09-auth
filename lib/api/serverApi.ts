import { cookies } from "next/headers";
import { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface NoteProps {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag: string | undefined
): Promise<NoteProps> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<NoteProps>("/notes", {
    params: {
      search: search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: Note["id"]) => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
