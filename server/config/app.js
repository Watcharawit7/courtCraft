// app.js (ESM)
import path, { dirname } from 'path';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';


const {CORS_ORIGIN} = process.env;

// ใน ESM จะไม่มี __filename / __dirname ให้ใช้ ต้องสร้างเองแบบนี้
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  })
);
// อ่าน JSON body ได้ และจำกัดขนาดไว้ที่ ~50 MB
app.use(express.json({ limit: '50mb' }));

// เปิด CORS (อนุญาต cross-origin) สำหรับทุกโดเมน (ปรับ origin ภายหลังได้)
app.use(cors());

// ให้ Express รู้ว่ามี reverse proxy อยู่ข้างหน้า (เช่น Nginx/Cloudflare)
// เพื่องานที่เกี่ยวกับ IP จริงของลูกค้า, secure cookies, req.protocol ฯลฯ
app.set('trust proxy', true);

// เสิร์ฟไฟล์สาธารณะจากโฟลเดอร์ ../assets ที่ path /assets
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Error-handling middleware (ต้องมี 4 พารามิเตอร์เสมอ)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

export default app;
