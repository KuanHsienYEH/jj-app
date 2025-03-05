"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Job } from "@/types/jobs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #eee",
  boxShadow: 24,
  p: 4,
};

interface JobPopupProps {
  jobs: Job[];
  updateJobsList: (jobs: Job[]) => void;
  job: Job | null;
  emitPopup: (open: boolean) => void;
  open: boolean;
}

export default function JobPopup({ jobs, updateJobsList, job, emitPopup, open }: JobPopupProps) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Job>({
        defaultValues: {
          jobTitle: "",
          location: "",
          jobType: "",
          salary: "",
          education: "",
          seniority: "",
          jobDetail: "",
          requirement: "",
        }
      });

      useEffect(() => {
        if (open) {
          if (job) {
            Object.keys(job).forEach((key) => {
              setValue(key as keyof Job, job[key as keyof Job]);
            });
          } else {
            reset();
          }
        }
      }, [job, open, setValue, reset]);

  const setModalClose = () => {
    reset(); // ✅ 關閉視窗時清空表單
    emitPopup(false);
  };

  const onFormSubmit = async (data: Job) => {
    try {
      if (job) {
        // ✅ 更新職缺
        const res = await fetch(`/api/admin/jobs/${job._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const updatedJob = await res.json();
          emitPopup(false);
          updateJobsList([updatedJob.data, ...jobs.filter(j => j._id !== job._id)]);
          reset();
          alert("更新成功");
        }
      } else {
        // ✅ 新增職缺
        const res = await fetch("/api/admin/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const newJob = await res.json();
          emitPopup(false);
          updateJobsList([newJob.data, ...jobs]);
          reset();
          alert("新增成功");
        }
      }
    } catch (error) {
      alert("操作失敗");
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={setModalClose} aria-labelledby="job-popup-title">
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <Typography variant="h6">{job ? "編輯職缺" : "新增職缺"}</Typography>
          <FontAwesomeIcon onClick={setModalClose} cursor="pointer" icon={faXmark} size="lg" />
        </div>
        <Box component="form" sx={{ overflowY: "auto", maxHeight: "70vh" }} onSubmit={handleSubmit(onFormSubmit)}>
          <TextField {...register("jobTitle", { required: "必填" })} error={!!errors.jobTitle} label="職務名稱" fullWidth sx={{ mb: 2 }} />
          <TextField {...register("location", { required: "必填" })} error={!!errors.location} label="工作地點" fullWidth sx={{ mb: 2 }} />
          <TextField {...register("jobType", { required: "必填" })} error={!!errors.jobType} label="工作性質" fullWidth sx={{ mb: 2 }} />
          <TextField {...register("salary", { required: "必填" })} error={!!errors.salary} label="薪資待遇" fullWidth sx={{ mb: 2 }} />
          <TextField {...register("education", { required: "必填" })} error={!!errors.education} label="學歷科系" fullWidth sx={{ mb: 2 }} />
          <TextField {...register("seniority", { required: "必填" })} error={!!errors.seniority} label="工作年資" fullWidth sx={{ mb: 2 }} />
          <TextField {...register("jobDetail", { required: "必填" })} error={!!errors.jobDetail} label="工作內容" fullWidth multiline rows={4} sx={{ mb: 2 }} />
          <TextField {...register("requirement", { required: "必填" })} error={!!errors.requirement} label="其他條件" fullWidth multiline rows={4} sx={{ mb: 2 }} />
          <Stack direction="row" spacing={2} mt={2}>
            <Button type="submit" variant="contained">儲存</Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
