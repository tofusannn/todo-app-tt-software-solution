import { NextRequest, NextResponse } from 'next/server';
import { addDays, format } from 'date-fns';


const mockTitles = [
  'Buy groceries',
  'Read a book',
  'Go for a run',
  'Call a friend',
  'Write a blog post',
  'Clean the house',
  'Practice coding',
  'Plan the week',
  'Cook dinner',
  'Watch a movie',
];

function getRandomTitle(usedTitles: Set<string>) {
  let title;
  do {
    title = mockTitles[Math.floor(Math.random() * mockTitles.length)];
  } while (usedTitles.has(title));
  usedTitles.add(title);
  return title;
}

const today = new Date();
const todos = [
  {
    id: '1',
    title: 'Learn Next.js',
    completed: false,
    date: format(today, 'yyyy-MM-dd'),
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: '2',
    title: 'Build Todo App',
    completed: true,
    date: format(today, 'yyyy-MM-dd'),
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
  },

  ...Array.from({ length: 5 }).flatMap((_, i) => {
    const date = format(addDays(today, i), 'yyyy-MM-dd');
    const numTasks = Math.floor(Math.random() * 2) + 2;
    const usedTitles: Set<string> = new Set();
    return Array.from({ length: numTasks }).map((_, j) => ({
      id: `mock-uncomplete-${date}-${j}`,
      title: getRandomTitle(usedTitles),
      completed: false,
      date,
      createdAt: today.toISOString(),
      updatedAt: today.toISOString(),
    }));
  }),
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  let filtered = todos;
  if (date) {
    filtered = todos.filter(t => t.date === date);
  }
  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const { title, date } = await req.json();
  const newTodo = {
    id: Date.now().toString(),
    title,
    completed: false,
    date: date || new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, title, completed, date } = await req.json();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  todos[idx] = {
    ...todos[idx],
    ...(title !== undefined ? { title } : {}),
    ...(completed !== undefined ? { completed } : {}),
    ...(date !== undefined ? { date } : {}),
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