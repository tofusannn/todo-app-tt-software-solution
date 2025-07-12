# Todo App (TT Software Solution)

แอปพลิเคชัน Todo ที่ทันสมัยและครบทุกฟีเจอร์ สร้างด้วย Next.js, React, Redux Toolkit และ Tailwind CSS

## ภาพรวมของโปรเจกต์

แอป Todo นี้ช่วยให้ผู้ใช้สามารถจัดการงานประจำวันได้อย่างมีประสิทธิภาพ มี UI ที่สะอาดตา รองรับการใช้งานบนมือถือและเดสก์ท็อป มีโหมดกลางคืน และอัปเดตข้อมูลแบบเรียลไทม์ผ่าน mock API ออกแบบมาเพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีสำหรับนักพัฒนา

## ฟีเจอร์หลัก

- เพิ่ม ลบ แก้ไข (Todo) รวมถึงการอัพเดตสถานะว่าเสร็จแล้วหรือยัง
- ค้นหา (Todo) ตามชื่อเรื่อง
- รองรับการใช้งานบนมือถือและเดสก์ท็อป
- สลับโหมดกลางวัน/กลางคืน
- แสดงสถานะโหลดและข้อผิดพลาดขณะทำงานกับ API
- ใช้ React สมัยใหม่ (hooks, functional components)
- จัดการ state ด้วย Redux Toolkit และ RTK Query
- ใช้ TypeScript เต็มรูปแบบ
- มีการทดสอบด้วย Vitest และ Testing Library

## เทคโนโลยีที่ใช้

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) สำหรับ UI components
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) สำหรับการทดสอบ

## เหตุผลของการเลือกใช้เทคโนโลยี

- **Next.js**: เลือกใช้เพราะเป็นเฟรมเวิร์กที่ทันสมัยสำหรับ React รองรับ SSR/SSG และ API Routes ทำให้พัฒนาแอปพลิเคชันที่มีประสิทธิภาพและขยายต่อได้ง่าย
- **React**: เป็นไลบรารีที่ได้รับความนิยมสูง มี ecosystem ที่แข็งแกร่ง และเหมาะกับการสร้าง UI ที่ตอบสนองเร็ว
- **Redux Toolkit & RTK Query**: ช่วยให้การจัดการ state และการดึงข้อมูล API มีความสะดวกและปลอดภัยจากข้อผิดพลาด ลด boilerplate code
- **Tailwind CSS**: ทำให้การออกแบบ UI เร็วขึ้นและปรับแต่งได้ง่าย โดยไม่ต้องเขียน CSS เองมาก
- **shadcn/ui**: เป็นชุด UI component ที่สวยงามและปรับแต่งได้ง่าย ช่วยให้พัฒนา UI ได้รวดเร็ว
- **TypeScript**: เพิ่มความปลอดภัยในการเขียนโค้ด ลด bug และช่วยให้โค้ดอ่านง่ายขึ้น
- **Vitest**: เป็น testing framework ที่เร็วและใช้งานง่าย เหมาะกับโปรเจกต์ React/TypeScript

## เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- Node.js (แนะนำ v18 ขึ้นไป)
- npm (แนะนำ v9 ขึ้นไป)

### วิธีติดตั้ง

1. **โคลนโปรเจกต์:**
   ```bash
   git clone <repo-url>
   cd todo-app-tt-software-solution
   ```
2. **ติดตั้ง dependencies:**
   ```bash
   npm install
   ```

### การรันแอปพลิเคชัน

- **โหมดพัฒนา:**

  ```bash
  npm run dev
  ```

  แอปจะใช้งานได้ที่ [http://localhost:3000](http://localhost:3000)

- **โหมด production:**
  ```bash
  npm run build
  npm start
  ```

### การตรวจสอบคุณภาพโค้ด

```bash
npm run lint
```

### การรันทดสอบ

```bash
npm test
```

หรือสำหรับ UI test runner:

```bash
npm run test:ui
```

## โครงสร้างโปรเจกต์

- `app/` - โฟลเดอร์หลักของ Next.js (routing, API, layout)
- `components/` - คอมโพเนนต์ UI และฟีเจอร์ต่าง ๆ
- `features/todos/` - Redux slice, API, และ types สำหรับ todo
- `store/` - การตั้งค่า Redux store
- `lib/` - ฟังก์ชันช่วยเหลือ (utility)
- `__tests__/` - เทสต์แบบ unit และ integration

## API

แอปนี้ใช้ mock API route (`/api/todos`) สำหรับ CRUD โดยใช้ Next.js API routes ข้อมูลจะถูกเก็บไว้ในหน่วยความจำและรีเซ็ตเมื่อรีสตาร์ทเซิร์ฟเวอร์

## การ Deploy ด้วย Vercel

โปรเจกต์นี้ถูก deploy และออนไลน์อยู่ที่ Vercel สามารถเข้าใช้งานแอป Todo ได้ที่ลิงก์นี้:

[https://todo-app-tt-software-solution.vercel.app/](https://todo-app-tt-software-solution.vercel.app/)
