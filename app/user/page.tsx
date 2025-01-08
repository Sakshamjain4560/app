"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
import styles from "@/app/user/userform.module.css";

export default function Home() {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = Date.now();
    redirect(`/user/${userId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1 className={styles.title}>Welcome!</h1>
        <p className={styles.subtitle}>Please enter your name to proceed:</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Start Call
          </button>
        </form>
      </div>
    </div>
  );
}
