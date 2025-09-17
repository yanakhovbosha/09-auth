"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/app/loading";
import Error from "./error";
import NoteList from "@/components/NoteList/NoteList";
import { Tags } from "@/types/note";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";
import { NoteProps } from "@/lib/api/serverApi";

interface Props {
  tag?: Tags;
}

export default function NotesClient({ tag }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}
      {isError && <Error error={error} />}
      {data?.notes && <NoteList notes={data?.notes ?? []} />}
    </div>
  );
}
