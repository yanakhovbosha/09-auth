"use client";

import { Tags } from "@/types/note";
import css from "./TagsMenu.module.css";
import { useState } from "react";
import Link from "next/link";

const tags: Tags[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const [tags, setTags] = useState();

  // useEffect(() => {});
  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={"/notes/filter/All"}
              onClick={toggle}
              className={css.menuLink}
            >
              All notes
            </Link>
          </li>
          {/* список тегів */}
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
