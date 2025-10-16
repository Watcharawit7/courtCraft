import jwt  from('jsonwebtoken');

const {JWT_SECRET} = process.env

export const auth = (roles = []) => {
  // roles: [] = อนุญาตทุก role ที่ login
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) return res.status(401).json({ message: "Missing token" }); //ตรวจสอบว่ามี token มั้ย

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload; //บันทึกข้อมูลผู้ใช้ที่ถอดรหัสแล้วไว้ใน req.user
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
