import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import axios from "axios";
import badmintonBg from "../../../../src/assets/bg/badminton-bg.jpg";

const {VITE_API_URL} = import.meta.env

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  //ยกเลิกการรีเฟรชหน้าเว็บเมื่อส่งฟอร์ม
    setError("");
    if (!email || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${VITE_API_URL}/api/auth/login`, { email, password });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/booking");

      } else {
        setError("เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  }
  return (
    <Box
      sx={{
        height: "100vh",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${badmintonBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        '::before': {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(30,30,30,0.5)",
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.82)",
          boxShadow: 8,
          position: "relative",
          zIndex: 2,
          backdropFilter: "blur(2px)",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 60,
            height: 60,
            margin: "0 auto",
            mb: 2,
          }}
        >
          <SportsTennisIcon fontSize="large" />
        </Avatar>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          เข้าสู่ระบบสนามแบดมินตัน
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="อีเมล"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
          <TextField
            label="รหัสผ่าน"
            type="password"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="จำฉันไว้ในระบบ"
            sx={{ mb: 2 }}
          />

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              background: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #6600cc 0%, #b300cc 100%)",
              },
            }}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          ยังไม่มีบัญชี?
          <a onClick={handleRegisterRedirect} style={{ textDecoration: "none", color: "#7F00FF" , cursor: "pointer"}}>
            สมัครสมาชิก
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
