"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const username = usernameRef.current?.value;
    const pwd = pwdRef.current?.value;

    if (!username || !pwd) {
      setError("Please enter username and password.");
      return;
    }

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ 確保 Cookie 傳送
        body: JSON.stringify({ username, pwd }),
      });

      if (!res.ok) {
        setError("Invalid username or password.");
        return;
      }

      router.push("/admin"); // ✅ 後端管理 JWT，前端不存 Token
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Image src="/images/logo.png" alt="logo" width={160} height={60} />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField margin="normal" required fullWidth label="Username" autoComplete="username" autoFocus inputRef={usernameRef} />
          <TextField margin="normal" required fullWidth type="password" label="Password" autoComplete="current-password" inputRef={pwdRef} />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
