"use client";

import { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


interface User {
  _id: string;
  username: string;
}

export default function Register() {
  const [form, setForm] = useState({ username: "", pwd: "" });
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState(false); // 🔥 控制列表顯示/隱藏

  const fetchCalled = useRef(false); // 🔥 防止 `useEffect` 重複執行

  
  useEffect(() => {
    if (fetchCalled.current) return; // 🚀 防止第二次執行
    fetchCalled.current = true;
  
    async function fetchUsers() {
      const res = await fetch("/api/user/list");
      const data = await res.json();
      if (data.status === "success") setUsers(data.users);
    }
    fetchUsers();
  }, []);

  // ✅ 註冊新使用者
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.status !== "success") {
      setError(data.message);
      return;
    }

    // ✅ 新增使用者至列表
    setUsers((prevUsers) => [...prevUsers, { _id: data.user._id, username: data.user.username }]);
    setForm({ username: "", pwd: "" });
  }

  // ✅ 刪除使用者
  async function handleDelete(userId: string) {
    const res = await fetch(`/api/user/delete?id=${userId}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.status === "success") {
      // ✅ 從 UI 移除該使用者
      setUsers(users.filter((user) => user._id !== userId));
    } else {
      alert("Failed to delete user.");
    }
  }

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Add Admin
          </Typography>

          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.pwd}
            onChange={(e) => setForm({ ...form, pwd: e.target.value })}
          />
          {error && <Typography color="error" textAlign="center">{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Register Admin
          </Button>
        </form>

{/* 🔥 切換顯示 Admin List 的按鈕 */}
      <Button
        variant="outlined"
        fullWidth
        sx={{ mb: 2 , mt:2 }}
        onClick={() => setShowUsers(!showUsers)}
      >
        {showUsers ? "隱藏 Admin List" : "顯示 Admin List"}
      </Button>

      {/* ✅ Admin List，只有當 `showUsers` 為 true 才顯示 */}
      {showUsers && (
        <Paper sx={{ p: 2 }}>
          {users.length > 0 ? (
            users.map((user) => (
              <Box
                key={user._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography> {user.username}</Typography>
                {/* 刪除按鈕 */}
                <IconButton onClick={() => handleDelete(user._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography textAlign="center">No admins registered.</Typography>
          )}
        </Paper>
      )}
      </Paper>
    </Box>
  );
}
