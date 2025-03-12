"use client";

import React, { useState } from "react";
import {
  Snackbar,
  Alert,
  Link,
  Checkbox,
  TextField,
  Button,
  Box,
  Modal,
  Typography,
  Stack,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import * as yup from "yup";
import { Job } from "@/types/jobs";
import CustomSnackbar from "./CustomSnackbar";

// Define modal style
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// Styled input for file upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Child Modal for Terms of Use
function ChildModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Link onClick={handleOpen} href="#" underline="hover">
        {"個資使用同意書"}
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style} className="job-modal">
          <Typography variant="h6" gutterBottom>
            個資使用聲明
          </Typography>
          <br />
          <Typography variant="subtitle1" gutterBottom>
            資料蒐集之目的：
          </Typography>
          <Typography variant="body2" gutterBottom>
            (包括但不限於建立原始求職者資料檔案、提供推薦報告給徵才企業等待爭)，獲取應徵職務之始，所提供各項得以直接或間接識別之個人資料。
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            個人資料類別：
          </Typography>
          <Typography variant="body2" gutterBottom>
            包含個人基本資料、技術專業背景、工作經歷、工作期望、自傳、通訊資料等。
          </Typography>
          <Typography variant="body2" gutterBottom>
            個資利用期間： 自投遞履歷日起一年期間。
          </Typography>
          <Typography variant="body2" gutterBottom>
            個資利用對象： 委託求才之企業及本公司。
          </Typography>
          <Typography variant="body2" gutterBottom>
            個資利用地區： 台灣及海外地區。
          </Typography>
          <Typography variant="body2" gutterBottom>
            個資利用方法： 電子郵件、書面、傳真、電話。
          </Typography>
          <br />
          <Typography variant="body2" paragraph>
            您可以書面或電子郵件方式通知本公司，並針對您的資料請求查詢、閱覽、複製補充、更正、停止蒐集利用、刪除等權利。
          </Typography>
          <Typography variant="body2" paragraph>
            您得以自由選擇是否提供資料與本公司。若您不提供個人資料與本公司，本公司亦將無法提供您求職相關服務，進而可能影響您的就業機會。
          </Typography>
          <Button sx={{ mx: "auto", display: "block" }} onClick={handleClose}>
            我知道了
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

interface JobModalProps {
  jobTitle: string;
  modalOpen: boolean;
  toggleModal: () => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  resume?: string;
  agreement?: string;
}

interface SnackbarState {
  open: boolean;
  message?: string;
  severity?: "success" | "error";
}

export default function JobModal({ jobTitle, modalOpen, toggleModal }: JobModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxFileSize = 1024 * 1024; // 1MB
      if (file.size > maxFileSize) {
        alert("文件大小不能超過1MB");
        return;
      }
      setFile(file);
    }
  };

  const applyJob = async (info: FormData) => {
    try {
      // Replace with your actual API call logic
      // const res = await agent.jobSeeker.applyJob(info);
      const res = "ok"; // Mock response for now
      if (res === "ok") {
        setSnackbar({
          message: "履歷已成功上傳",
          open: true,
          severity: "success",
        });
      }
    } catch (err) {
      setSnackbar({
        message: "上傳履歷時出錯",
        open: true,
        severity: "error",
      });
      throw err;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const validData = await schema.validate(
        {
          name: form.name.value,
          phone: form.phone.value,
          email: form.email.value,
          gender: form.gender.value,
          resume: file,
          agreement: form.agreement.checked,
        },
        { abortEarly: false }
      );

      const formData = new FormData();
      Object.entries(validData).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });

      await applyJob(formData);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const formattedErrors = err.inner.reduce<FormErrors>((acc, currentError) => {
          acc[currentError.path as keyof FormErrors] = currentError.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
        console.log(formattedErrors);
      } else {
        console.error(err);
      }
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    name: yup.string().required("姓名為必填項"),
    phone: yup.string().matches(phoneRegExp, "電話號格式錯誤").required("電話為必填項"),
    email: yup.string().email("請輸入有效的電子郵件地址").required("電子郵件為必填項"),
    resume: yup.mixed().required("請上傳履歷"),
    agreement: yup.boolean().oneOf([true], "您必須同意條款才能繼續"),
  });

  const toggleModalClose = () => {
    setErrors({});
    toggleModal();
  };

  return (
    <Modal
      open={modalOpen}
      onClose={toggleModalClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style} className="job-modal">
        <form onSubmit={handleSubmit}>
          <Typography variant="subtitle1" gutterBottom>
            應徵職缺： {jobTitle}
          </Typography>

          <TextField
            id="name"
            label="姓名"
            error={!!errors.name}
            helperText={errors.name}
            onBlur={() => {
              setErrors({ ...errors, name: "" });
            }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl className="job-modal__gender">
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              className="job-modal__radio"
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="gender"
            >
              <FormControlLabel value="female" control={<Radio />} label="小姐" />
              <FormControlLabel value="male" control={<Radio />} label="先生" />
            </RadioGroup>
          </FormControl>

          <TextField
            id="phone"
            label="電話"
            error={!!errors.phone}
            helperText={errors.phone}
            onBlur={() => {
              setErrors({ ...errors, phone: "" });
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            id="email"
            label="email"
            error={!!errors.email}
            helperText={errors.email}
            onBlur={() => {
              setErrors({ ...errors, email: "" });
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          {!file ? (
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              {"上傳履歷"}
              <VisuallyHiddenInput
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                type="file"
              />
            </Button>
          ) : (
            <Stack direction="row">
              <a href={URL.createObjectURL(file)} download={file.name} style={{ marginRight: 8 }}>
                {file.name}
              </a>
              <ClearIcon sx={{ ml: 1 }} onClick={() => setFile(null)} style={{ cursor: "pointer" }} />
            </Stack>
          )}
          {!file && errors.resume && (
            <Typography variant="body2" color="error">
              {errors.resume}
            </Typography>
          )}
          <Typography color="text.secondary" variant="body2">
            請上傳文件格式為 .pdf, .doc, 或 .docx 的履歷
          </Typography>

          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              sx={{ mr: "2px" }}
              control={
                <Checkbox
                  onChange={() => {
                    setErrors({ ...errors, agreement: "" });
                  }}
                  name="agreement"
                />
              }
              label="我已詳讀並同意"
            />
            <ChildModal />
            {errors.agreement && (
              <Typography variant="body2" color="error">
                {errors.agreement}
              </Typography>
            )}
          </Box>
          <Button variant="contained" type="submit" size="large">
            確認送出
          </Button>
        </form>

        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message || ""}
          severity={snackbar.severity || "success"}
          onClose={handleSnackbarClose}
        />
      </Box>
    </Modal>
  );
}