"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  setFilter,
  setSearchTerm,
  toggleForm,
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../features/todos";
import { TodoItem } from "../TodoItem";
import { TodoForm } from "./TodoForm";
import { TodoFilters } from "./TodoFilters";
import { DarkModeToggle } from "../common/DarkModeToggle";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorBanner } from "../common/ErrorBanner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  CalendarDays,
  ListTodo,
  User,
  Plus,
  Home,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { addDays, format } from "date-fns";

export function TodoApp() {
  const dispatch = useDispatch();
  const { filter, searchTerm, isFormOpen } = useSelector(
    (state: RootState) => state.todoUI
  );

  // Tabs state and days data (dynamic from today)
  const today = new Date();
  const days = Array.from({ length: 5 }).map((_, i) => {
    const date = addDays(today, i);
    return {
      key: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE"),
      dateNum: format(date, "d"),
      month: format(date, "MMM"),
      fullDate: date,
    };
  });
  const [selectedTab, setSelectedTab] = useState(days[0].key);
  // Mock todos for each day (with createdAt, updatedAt)
  const mockTodosByDay: Record<string, { id: string; title: string; completed: boolean; createdAt: string; updatedAt: string }[]> = {};
  days.forEach((d, idx) => {
    mockTodosByDay[d.key] = [
      { id: `${d.key}-1`, title: `Task A for ${d.label}`, completed: idx % 2 === 0, createdAt: d.fullDate.toISOString(), updatedAt: d.fullDate.toISOString() },
      { id: `${d.key}-2`, title: `Task B for ${d.label}`, completed: false, createdAt: d.fullDate.toISOString(), updatedAt: d.fullDate.toISOString() },
      { id: `${d.key}-3`, title: `Task C for ${d.label}`, completed: idx % 2 === 1, createdAt: d.fullDate.toISOString(), updatedAt: d.fullDate.toISOString() },
    ];
  });
  const todos = mockTodosByDay[selectedTab] || [];
  const isLoading = false;
  const error = undefined;

  const [createTodo, { isLoading: isCreating, error: createError }] =
    useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating, error: updateError }] =
    useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTodoMutation();

  // Filter and search todos
  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Calculate counts
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  // Calculate progress
  const percent =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const handleCreateTodo = async (title: string) => {
    try {
      await createTodo({ title }).unwrap();
      dispatch(toggleForm());
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      await updateTodo({ id, completed }).unwrap();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleUpdateTodo = async (id: string, title: string) => {
    try {
      await updateTodo({ id, title }).unwrap();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // Show error banner for any mutation error
  const mutationError = createError || updateError || deleteError;

  if (error) {
    return <ErrorBanner message="Failed to load todos. Please try again." />;
  }

  const selectedDay = days.find((d) => d.key === selectedTab) || days[0];

  return (
    <div className="w-full max-w-none mx-auto h-screen min-h-0 flex flex-col bg-gradient-to-br from-gray-300 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-8 pt-11 overflow-hidden">
      {/* Top Row: Header + (Date Tabs + Filter) */}
      <div className="flex flex-row gap-10 min-h-0 flex-shrink-0 h-[260px]">
        {/* Header Section */}
        <div className="flex-1 min-h-0 h-full w-1/2 flex flex-col">
          <div className="flex flex-col justify-between bg-gradient-to-r from-[#4eb7a0] to-[#198b76] rounded-t-2xl pt-8 h-full">
            <div className="flex flex-col gap-5 items-start px-8">
              <div className="text-4xl font-title text-white">Today</div>
              <div className="text-lg font-light text-white">
                {activeCount} uncompleted tasks
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="text-7xl font-title text-white leading-none">
                {percent}
                <span className="text-3xl align-bottom pl-1 pr-3">%</span>
              </span>
              <Progress value={percent} className="h-1 rounded-none w-full" />
            </div>
          </div>
        </div>
        {/* Date Tabs + Filter */}
        <div className="flex-1 min-h-0 h-full w-1/2 flex flex-col">
          <div className="flex flex-col gap-4 bg-gradient-to-r from-[#4eb7a0] to-[#198b76] rounded-t-2xl pt-8 px-8 h-full">
            <div className="text-4xl font-title text-white">{selectedDay.month} {selectedDay.dateNum}th</div>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full flex justify-between rounded-xl-main p-1">
                {days.map((d) => (
                  <TabsTrigger key={d.key} value={d.key}>
                    {d.label}
                    <br />
                    <span>{String(d.dateNum).padStart(2, "0")}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <TodoFilters
              filter={filter}
              searchTerm={searchTerm}
              onFilterChange={(filter: "all" | "active" | "completed") =>
                dispatch(setFilter(filter))
              }
              onSearchChange={(term: string) => dispatch(setSearchTerm(term))}
              todoCount={filteredTodos.filter((todo) => !todo.completed).length}
              totalCount={todos.length}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          </div>
        </div>
      </div>
      {/* Bottom Row: Completed Tasks + Uncompleted Tasks */}
      <div className="flex flex-row gap-10 flex-1 min-h-0">
        {/* Left Column: Completed Tasks */}
        <div className="flex-1 min-h-0 h-full w-1/2 flex flex-col">
          <Card className="rounded-b-2xl rounded-t-none bg-white/80 dark:bg-gray-900/80 p-8 h-full flex flex-col">
            <CardHeader className="p-0 flex flex-col items-start gap-2 md:gap-4">
              <CardTitle className="text-2xl font-title text-gray-900 dark:text-white w-full flex items-center justify-between gap-2">
                Completed Tasks
                <span>
                  {String(
                    filteredTodos.filter((todo) => todo.completed).length
                  ).padStart(2, "0")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto h-full min-h-0 flex-1">
              <div className="relative">
                <div className="space-y-2">
                  {filteredTodos.filter((todo) => todo.completed).length ===
                  0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No completed tasks yet.
                    </div>
                  ) : (
                    filteredTodos
                      .filter((todo) => todo.completed)
                      .map((todo) => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onToggle={handleToggleTodo}
                          onUpdate={handleUpdateTodo}
                          onDelete={handleDeleteTodo}
                        />
                      ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Column: Uncompleted Tasks */}
        <div className="flex-1 min-h-0 h-full w-1/2 flex flex-col">
          <Card className="rounded-b-2xl rounded-t-none bg-white/80 dark:bg-gray-900/80 p-8 h-full flex flex-col">
            <CardHeader className="p-0 flex flex-col items-start gap-2 md:gap-4">
              <CardTitle className="text-2xl font-title text-gray-900 dark:text-white w-full flex items-center justify-between gap-2">
                Uncompleted Tasks
                <span>
                  {String(
                    filteredTodos.filter((todo) => !todo.completed).length
                  ).padStart(2, "0")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto h-full min-h-0 flex-1">
              <div className="relative">
                {(isCreating || isUpdating || isDeleting) && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 rounded-3xl">
                    <LoadingSpinner />
                  </div>
                )}
                {mutationError && (
                  <ErrorBanner message="An error occurred while saving. Please try again." />
                )}
                <div className="space-y-2">
                  {filteredTodos.filter((todo) => !todo.completed).length ===
                  0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No uncompleted tasks yet.
                    </div>
                  ) : (
                    filteredTodos
                      .filter((todo) => !todo.completed)
                      .map((todo) => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onToggle={handleToggleTodo}
                          onUpdate={handleUpdateTodo}
                          onDelete={handleDeleteTodo}
                        />
                      ))
                  )}
                </div>
                {isFormOpen && (
                  <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl w-11/12 max-w-md">
                      <TodoForm
                        onSubmit={handleCreateTodo}
                        onCancel={() => dispatch(toggleForm())}
                        placeholder="What needs to be done?"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Floating Action Buttons: Add Todo + DarkModeToggle */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-5 items-end">
        <DarkModeToggle />
        <button
          onClick={() => dispatch(toggleForm())}
          className="accent-cyan w-15 h-15 rounded-full flex items-center justify-center text-xl font-title focus-ring"
          aria-label="Add Todo"
        >
          <Plus className="w-10 h-10 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
