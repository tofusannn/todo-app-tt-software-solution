import { NextRequest, NextResponse } from 'next/server';

const todos = [
  {
    id: '1',
    title: 'Learn Next.js',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Build Todo App',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  const newTodo = {
    id: Date.now().toString(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, title, completed } = await req.json();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  todos[idx] = {
    ...todos[idx],
    ...(title !== undefined ? { title } : {}),
    ...(completed !== undefined ? { completed } : {}),
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json(todos[idx]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  todos.splice(idx, 1);
  return new NextResponse(null, { status: 204 });
} 