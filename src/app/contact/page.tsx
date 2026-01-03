"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 你可以換成你的 google map embed
  const mapEmbedSrc = useMemo(
    () =>
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d696.8826599496439!2d121.52454224606251!3d25.03474794208517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a982c2b4f6a1%3A0xf85324de5e7f1a89!2z5beo5bCH5Lq65Yqb6LOH5rqQ6aGn5ZWP5pyJ6ZmQ5YWs5Y-4!5e0!3m2!1sen!2sus!4v1767335610342!5m2!1sen!2sus",
    []
  );

  const handleChange =
    (key: keyof ContactFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const validate = (): string | null => {
    if (!values.name.trim()) return "請輸入您的稱呼 / 公司名稱";
    if (!values.email.trim()) return "請輸入您的 E-mail";
    if (!values.subject.trim()) return "請輸入詢問主題";
    if (!values.message.trim()) return "請輸入詢問內容";
    // 基本 email 格式
    if (!/^\S+@\S+\.\S+$/.test(values.email)) return "E-mail 格式不正確";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setSubmitting(true);
    try {
      // TODO: 
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })

      await new Promise((r) => setTimeout(r, 600)); // demo

      setSuccess("已收到您的訊息，我們將儘速回覆您。");
      setValues({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError("送出失敗，請稍後再試或改用電話 / Email 聯絡。");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccess(null);
    setError(null);
    setValues({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        感謝您來到巨將人力資源顧問有限公司。無論您對我們的服務有任何疑問、建議或想進一步了解，歡迎透過下方表單與我們聯繫；也可於上班時間撥打 (02) 2356-9977，或寄信至 service@jujianghr.com.tw
        。我們很樂意為您提供協助，並將盡快回覆。        
        </Typography>

        <Grid container spacing={3} alignItems="stretch">
          {/* Left: Form */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, height: "100%" }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                與我們聯絡
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {success}
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                  <TextField
                    label="您的稱呼 / 公司名稱"
                    value={values.name}
                    onChange={handleChange("name")}
                    fullWidth
                    required
                  />
                  <TextField
                    label="您的 E-mail"
                    value={values.email}
                    onChange={handleChange("email")}
                    fullWidth
                    required
                    type="email"
                  />
                  <TextField
                    label="您的電話"
                    value={values.phone}
                    onChange={handleChange("phone")}
                    fullWidth
                  />
                  <TextField
                    label="詢問主題"
                    value={values.subject}
                    onChange={handleChange("subject")}
                    fullWidth
                    required
                  />
                  <TextField
                    label="詢問內容"
                    value={values.message}
                    onChange={handleChange("message")}
                    fullWidth
                    required
                    multiline
                    minRows={8}
                  />

                  <Stack direction="row" spacing={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={submitting}
                      sx={{ px: 3 }}
                    >
                      {submitting ? "送出中..." : "確認送出"}
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleReset}
                      disabled={submitting}
                      sx={{ px: 3 }}
                    >
                      取消重填
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Right: Map + Info */}
            <Grid item xs={12} md={6} sx={{ display: "flex" }}>
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2, md: 3 },
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                  我們的位置
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    flex: 1,          //  吃掉剩下高度
                    minHeight: 260,   //  手機不要太矮
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box
                    component="iframe"
                    title="Google Map"
                    src={mapEmbedSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sx={{
                      width: "100%",
                      height: "100%", // 佔滿 Box
                      border: 0,
                      display: "block",
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
