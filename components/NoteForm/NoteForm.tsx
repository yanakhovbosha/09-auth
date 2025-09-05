"use client";

import css from "./NoteForm.module.css";
// import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
// import { Note, Tags } from "@/types/note";
// import { useState } from "react";
import { useNoteDraftStore } from "@/lib/store/noteStore";
// import { Tags } from "@/types/note";
// import { title } from "process";

// interface NoteFormProps {
//   initialValues: NoteFormValues;
// }

export interface NoteFormValues {
  title: string;
  content?: string;
  tag: string;
}

// export interface NoteFormProps {
//   categories: Note[];
// }

// const NoteFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Too short!")
//     .max(50, "Too long!")
//     .required("Required!"),
//   content: Yup.string().max(500, "Too long!"),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//     .required("Required!"),
// });

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const router = useRouter();
  const handleCancel = () => router.push("/notes/filter/All");

  // const [values, setValues] = useState<NoteFormValues>({
  //   title: "",
  //   content: "",
  //   tag: "Todo",
  // });

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/All");
    },
  });

  const handleSubmit = () => {
    mutate(draft);
    // setValues({ title: "", content: "", tag: "Todo" });
    // console.log(values);
  };

  return (
    // <Formik
    //   initialValues={initialValues}
    //   validationSchema={NoteFormSchema}
    //   onSubmit={handleSubmit}
    // >
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          className={css.input}
        />
        {/* <ErrorMessage name="title" component="div" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          defaultValue={draft?.content}
          onChange={handleChange}
          className={css.textarea}
        />
        {/* <ErrorMessage name="content" component="div" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          defaultValue={draft?.tag}
          onChange={handleChange}
          className={css.select}
        >
          {/* {categories.map((category) => (
            <option key={category.id} value={category.id}>
              Todo
            </option>
          ))} */}
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <ErrorMessage name="tag" component="div" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
    // </Formik>
  );
}
