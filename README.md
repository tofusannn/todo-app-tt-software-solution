# Todo App (TT Software Solution)

แอปพลิเคชัน Todo ที่ทันสมัยและครบทุกฟีเจอร์ สร้างด้วย Next.js, React, Redux Toolkit และ Tailwind CSS

## ภาพรวมของโปรเจกต์

แอป Todo นี้ช่วยให้ผู้ใช้สามารถจัดการงานประจำวันได้อย่างมีประสิทธิภาพ มี UI ที่สะอาดตา รองรับการใช้งานบนมือถือและเดสก์ท็อป มีโหมดกลางคืน และอัปเดตข้อมูลแบบเรียลไทม์ผ่าน mock API ออกแบบมาเพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีสำหรับนักพัฒนา

## ฟีเจอร์หลัก

- ✅ เพิ่ม ลบ แก้ไข (Todo) รวมถึงการอัพเดตสถานะว่าเสร็จแล้วหรือยัง
- 🔍 ค้นหา (Todo) ตามชื่อเรื่อง
- 📱 รองรับการใช้งานบนมือถือและเดสก์ท็อป (Responsive Design)
- 🌙 สลับโหมดกลางวัน/กลางคืน (Dark/Light Mode)
- ⚡ แสดงสถานะโหลดและข้อผิดพลาดขณะทำงานกับ API
- 📅 Date Picker สำหรับกำหนดวันที่
- 🎨 UI Components ที่สวยงามจาก shadcn/ui
- 🧪 Unit Testing ครอบคลุมทุกส่วนสำคัญ

## เทคโนโลยีที่ใช้

### Frontend Framework
- [Next.js 15](https://nextjs.org/) (App Router) - React framework สำหรับ production
- [React 19](https://react.dev/) - UI library

### State Management
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Redux](https://react-redux.js.org/) - React bindings สำหรับ Redux

### Styling & UI
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible UI primitives
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

### Development Tools
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vitest](https://vitest.dev/) - Testing framework
- [Testing Library](https://testing-library.com/) - Testing utilities
- [ESLint](https://eslint.org/) - Code linting

## เหตุผลของการเลือกใช้เทคโนโลยี

- **Next.js 15**: เลือกใช้เพราะเป็นเฟรมเวิร์กที่ทันสมัยสำหรับ React รองรับ App Router, Turbopack และ API Routes ทำให้พัฒนาแอปพลิเคชันที่มีประสิทธิภาพและขยายต่อได้ง่าย
- **React 19**: เป็นไลบรารีที่ได้รับความนิยมสูง มี ecosystem ที่แข็งแกร่ง และเหมาะกับการสร้าง UI ที่ตอบสนองเร็ว
- **Redux Toolkit**: ช่วยให้การจัดการ state มีความสะดวกและปลอดภัยจากข้อผิดพลาด ลด boilerplate code
- **Tailwind CSS 4**: ทำให้การออกแบบ UI เร็วขึ้นและปรับแต่งได้ง่าย โดยไม่ต้องเขียน CSS เองมาก
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
# รันเทสต์ทั้งหมด
npm test

# รันเทสต์แบบ UI
npm run test:ui

# รันเทสต์แบบ run once
npm run test:run
```

## โครงสร้างโปรเจกต์

```
todo-app-tt-software-solution/
├── app/                    # Next.js App Router
│   ├── api/todos/         # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── common/            # Shared components
│   │   ├── DarkModeToggle.tsx
│   │   ├── DatePicker.tsx
│   │   ├── ErrorBanner.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── index.tsx
│   ├── todos/             # Todo-specific components
│   │   ├── TodoApp.tsx
│   │   ├── TodoFilters.tsx
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   └── index.tsx
│   └── ui/                # shadcn/ui components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       └── tabs.tsx
├── features/todos/         # Todo feature
│   ├── TodoAPI.ts         # API service
│   ├── TodoSlice.ts       # Redux slice
│   ├── types.ts           # TypeScript types
│   └── index.ts           # Feature exports
├── store/                 # Redux store configuration
│   └── index.ts
├── lib/                   # Utility functions
│   ├── useIsMobile.ts
│   └── utils.ts
├── __tests__/             # Test files
│   ├── TodoAPI.test.ts
│   ├── TodoApp.test.tsx
│   ├── TodoFilters.test.tsx
│   ├── TodoForm.test.tsx
│   ├── TodoItem.test.tsx
│   └── TodoSlice.test.ts
└── src/test/              # Test utilities
    ├── setup.ts
    └── test-utils.tsx
```

## Components

### Common Components
- **DarkModeToggle**: สลับโหมดกลางวัน/กลางคืน
- **DatePicker**: เลือกวันที่ด้วย calendar component
- **ErrorBanner**: แสดงข้อผิดพลาด
- **LoadingSpinner**: แสดงสถานะกำลังโหลด

### Todo Components
- **TodoApp**: คอมโพเนนต์หลักของแอป Todo
- **TodoForm**: ฟอร์มสำหรับเพิ่ม/แก้ไข Todo
- **TodoItem**: แสดงรายการ Todo แต่ละรายการ
- **TodoFilters**: ตัวกรองสำหรับค้นหาและจัดเรียง

### UI Components (shadcn/ui)
- **Button**: ปุ่มต่างๆ
- **Card**: การ์ดสำหรับแสดงข้อมูล
- **Dialog**: หน้าต่าง popup
- **Input**: ช่องกรอกข้อมูล
- **Badge**: แท็กแสดงสถานะ
- **Progress**: แถบแสดงความคืบหน้า
- **Tabs**: แท็บสำหรับจัดกลุ่มเนื้อหา

## API

แอปนี้ใช้ mock API route (`/api/todos`) สำหรับ CRUD operations โดยใช้ Next.js API routes ข้อมูลจะถูกเก็บไว้ในหน่วยความจำและรีเซ็ตเมื่อรีสตาร์ทเซิร์ฟเวอร์

### API Endpoints
- `GET /api/todos` - ดึงรายการ Todo ทั้งหมด
- `POST /api/todos` - สร้าง Todo ใหม่
- `PUT /api/todos/:id` - อัปเดต Todo
- `DELETE /api/todos/:id` - ลบ Todo

## Testing

โปรเจกต์นี้มีการทดสอบครอบคลุมทุกส่วนสำคัญ:

### Test Coverage
- ✅ **TodoSlice.test.ts** - Redux slice testing
- ✅ **TodoAPI.test.ts** - API service testing
- ✅ **TodoApp.test.tsx** - Main app component testing
- ✅ **TodoForm.test.tsx** - Form component testing
- ✅ **TodoItem.test.tsx** - Individual todo item testing
- ✅ **TodoFilters.test.tsx** - Filter component testing

### Testing Tools
- **Vitest**: Fast unit testing framework
- **Testing Library**: React component testing utilities
- **Redux Mock Store**: Redux state testing

## การ Deploy

### Vercel (Recommended)

โปรเจกต์นี้ถูก deploy และออนไลน์อยู่ที่ Vercel สามารถเข้าใช้งานแอป Todo ได้ที่ลิงก์นี้:

[https://todo-app-tt-software-solution.vercel.app/](https://todo-app-tt-software-solution.vercel.app/)

### การ Deploy เอง

1. **Build โปรเจกต์:**
   ```bash
   npm run build
   ```

2. **Deploy ไปยัง platform ที่ต้องการ:**
   - Vercel (แนะนำ)
   - Netlify
   - Railway
   - หรือ platform อื่นๆ ที่รองรับ Next.js

## การพัฒนาต่อ

### การเพิ่มฟีเจอร์ใหม่
1. สร้าง component ใหม่ใน `components/`
2. เพิ่ม Redux slice ใน `features/` (ถ้าจำเป็น)
3. เขียนเทสต์ใน `__tests__/`
4. อัปเดต README

### การปรับปรุง UI
- ใช้ shadcn/ui components ที่มีอยู่
- เพิ่ม component ใหม่ตาม [shadcn/ui documentation](https://ui.shadcn.com/docs/components)
- ปรับแต่ง Tailwind CSS classes

## Contributing

1. Fork โปรเจกต์
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

---

**พัฒนาโดย Peerapat Audomsit** 🚀
