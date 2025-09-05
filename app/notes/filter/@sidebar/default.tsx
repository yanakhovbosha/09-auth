import { Tags } from "@/types/note";
import css from "./SidebarNotes.module.css";
import Link from "next/link";

const tags: Tags[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default async function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {/* <li>
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </li> */}
      <li className={css.menuItem}>
        <Link href={"/notes/filter/All"} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {/* список тегів */}
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
