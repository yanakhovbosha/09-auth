"use client";

import { useState } from "react";
import { fetchNotes, NoteProps } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/app/loading";
import Error from "./error";
import NoteList from "@/components/NoteList/NoteList";
import { Tags } from "@/types/note";

interface Props {
  tag?: Tags;
}

export default function NotesClient({ tag }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery<NoteProps>({
    queryKey: ["notes", { search: searchQuery, page: currentPage, tag }],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  const handleChange = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onChange={handleChange} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <Error error={error} />}
      {data?.notes && <NoteList notes={data?.notes ?? []} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {isModalOpen && (
            <NoteForm
              initialValues={{ title: "", content: "", tag: "Todo" }}
              onClose={() => {
                setIsModalOpen(false);
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
