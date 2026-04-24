"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "@/frontend/styles/login-page.module.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setMessageType(null);
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(data.message ?? "Login failed.");
        setMessageType("error");
        return;
      }

      setMessage(data.message ?? "Login successful.");
      setMessageType("success");
      setPassword("");
    } catch {
      setMessage("Unable to connect to the server.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.shell}>
      <section className={styles.card}>
        <section className={styles.formPanel}>
          <p className={styles.brand}>VELORA</p>
          <h1 className={styles.formTitle}>Login</h1>
          <p className={styles.formSubtitle}>
            Discover curated fashion collections from premium designers.
          </p>

          <button className={styles.googleButton} type="button">
            <span className={styles.googleIcon}>G</span>
            Sign in with Google
          </button>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@gmail.com"
              autoComplete="username"
              required
            />

            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <div className={styles.passwordWrap}>
              <input
                className={styles.input}
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M3 5.7 4.3 4.4 20 20.1l-1.3 1.3-3-3A10.6 10.6 0 0 1 12 19.3C6.8 19.3 3 15.8 1.5 12c.7-1.8 1.8-3.3 3.2-4.5L3 5.7Zm4 4 .1.1a5 5 0 0 0 7.1 7.1l.1.1-1.5-1.5a3 3 0 0 1-4-4L7 9.8Zm5-4.9c5.2 0 9 3.5 10.5 7.2a12 12 0 0 1-4.8 5.5l-1.5-1.5a9.4 9.4 0 0 0 4-4c-1.2-2.8-4.1-5.2-8.2-5.2a8.7 8.7 0 0 0-2.8.5L7.5 5.6A11.3 11.3 0 0 1 12 4.8Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 4.8c5.2 0 9 3.5 10.5 7.2-1.5 3.7-5.3 7.2-10.5 7.2S3 15.7 1.5 12C3 8.3 6.8 4.8 12 4.8Zm0 2C8 6.8 5.1 9.2 3.8 12c1.3 2.8 4.2 5.2 8.2 5.2s6.9-2.4 8.2-5.2c-1.3-2.8-4.2-5.2-8.2-5.2Zm0 2.5a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className={styles.metaRow}>
              <label className={styles.checkboxRow}>
                <input type="checkbox" name="remember" />
                Remember Me
              </label>
              <Link href="/account" className={styles.inlineLink}>
                Forgot password?
              </Link>
            </div>

            <div className={styles.ctaRow}>
              <button className={styles.button} type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <Link href="/account" className={styles.secondaryButton}>
                Create Account
              </Link>
            </div>
          </form>

          {message ? (
            <p
              className={`${styles.message} ${messageType === "error" ? styles.error : styles.success}`}
            >
              {message}
            </p>
          ) : null}
        </section>
      </section>
    </div>
  );
}