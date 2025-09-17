import { Note } from "@/types/note";
import { nextServer } from "./api";
import { NoteFormValues } from "@/components/NoteForm/NoteForm";
import { NoteProps } from "./serverApi";
import { User } from "@/types/user";

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
  });

  return response.data;
};

export const fetchNoteById = async (id: Note["id"]) => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const deleteNote = async (id: string) => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: NoteFormValues): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", noteData);
  return response.data;
};
