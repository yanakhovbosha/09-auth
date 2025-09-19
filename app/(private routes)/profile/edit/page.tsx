"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { getMe, patchMe } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfile() {
  const { setUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleCancel = () => router.push("/profile");

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? "");
      setAvatar(user.avatar ?? "");
      setEmail(user.email ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await patchMe({ username: username });
    if (res) {
      setUser(res);
      router.push("/profile");
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            avatar ||
            "https://ac.goit.global/fullstack/react/default-avatar.jpg"
          }
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
