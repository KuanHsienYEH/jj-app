"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

interface User {
  _id: string;
  username: string;
}

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", pwd: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  // ✅ Fetch users list on load
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/user/list");
      const data = await res.json();
      if (data.status === "success") setUsers(data.users);
    }
    fetchUsers();
  }, []);

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

    // ✅ Only store username and _id
    setUsers((prevUsers) => [...prevUsers, { _id: data.user._id, username: data.user.username }]);
    setForm({ username: "", pwd: "", confirmPassword: "" });
  }

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        Add Admin
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
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
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
          {error && <Typography color="error" textAlign="center">{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Register Admin
          </Button>
        </form>
      </Paper>

      {/* ✅ User List */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Admin List
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id}>
                <ListItem>
                  <ListItemText primary={`Username: ${user.username}`} />
                </ListItem>
                <Divider />
              </div>
            ))
          ) : (
            <Typography textAlign="center">No admins registered.</Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
}
