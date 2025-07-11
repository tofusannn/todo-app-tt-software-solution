"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/index";
import {
  setSearchTerm,
  toggleForm,
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  Todo,
} from "@features/todos";
import { TodoItem, TodoForm, TodoFilters } from "@components/todos";
import {
  DarkModeToggle,
  LoadingSpinner,
  ErrorBanner,
} from "@components/common";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Progress } from "@components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { addDays, format, parseISO } from "date-fns";
import { Button } from "@components/ui/button";
import { useIsMobile } from "@/lib/useIsMobile";

export function TodoApp() {
  const dispatch = useDispatch();
  const { filter, searchTerm, isFormOpen } = useSelector(
    (state: RootState) => state.todoUI
  );

  const isMobile = useIsMobile();

  const today = new Date();
  const days = Array.from({ length: 5 }).map((_, i) => {
    const date = addDays(today, i);
    return {
      key: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE"),
      dateNum: format(date, "do"),
      month: format(date, "MMM"),
      fullDate: date,
    };
  });
  const [selectedTab, setSelectedTab] = useState(days[0].key);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const { data: todos = [] } = useGetTodosQuery({});

  const searchedTodos = (todos as Todo[]).filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uncompletedTodos = searchedTodos.filter(
    (todo) => !todo.completed && todo.date === selectedTab
  );

  const completedTodos = searchedTodos.filter((todo) => todo.completed);

  const todayStr = format(today, "yyyy-MM-dd");
  const activeCount = searchedTodos.filter(
    (todo) => !todo.completed && todo.date === todayStr
  ).length;
  // Calculate percent for today only
  const todayTodos = searchedTodos.filter((todo) => todo.date === todayStr);
  const todayCompletedCount = todayTodos.filter(
    (todo) => todo.completed
  ).length;
  const percent =
    todayTodos.length > 0
      ? Math.round((todayCompletedCount / todayTodos.length) * 100)
      : 0;

  const [createTodo, { isLoading: isCreating, error: createError }] =
    useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating, error: updateError }] =
    useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTodoMutation();

  const handleCreateTodo = async (title: string, date: string) => {
    try {
      await createTodo({ title, date }).unwrap();
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
  const handleUpdateTodo = async (id: string, title: string, date: string) => {
    try {
      await updateTodo({ id, title, date }).unwrap();
      setEditingTodo(null);
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

  const mutationError = createError || updateError || deleteError;

  if (mutationError) {
    return (
      <ErrorBanner message="An error occurred while saving. Please try again." />
    );
  }

  return (
    <div
      className={
        `w-full max-w-none mx-auto h-screen min-h-0 flex flex-col dark:bg-gradient-to-br bg-white dark:from-gray-900 dark:to-gray-800 p-8 pt-11` +
        (isMobile ? " overflow-auto" : " overflow-hidden")
      }
    >
      {!isMobile ? (
        <>
          <div className="flex flex-row gap-10 md:gap-3 lg:gap-5 min-h-0 flex-shrink-0 h-[260px] xl:h-[260px] lg:h-[220px] md:h-[180px]">
            <div className="flex-1 min-h-0 h-full w-1/2 flex flex-col min-w-[300px]">
              <div className="flex flex-col justify-between bg-gradient-to-r from-[#4eb7a0] to-[#198b76] rounded-t-2xl pt-8 h-full">
                <div className="flex flex-col lg:gap-5 md:gap-2 items-start px-8">
                  <div className="text-4xl font-title text-white">Today</div>
                  <div className="text-lg font-light text-white">
                    {activeCount} uncompleted tasks
                  </div>
                </div>
                <div className="flex flex-col items-end lg:gap-3 md:gap-0">
                  <span className="text-7xl font-title text-white leading-none">
                    {percent}
                    <span className="text-3xl align-bottom pl-1 pr-3">%</span>
                  </span>
                  <Progress
                    value={percent}
                    className="h-1 rounded-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-0 h-full w-1/2 flex flex-col min-w-[300px]">
              <div className="flex flex-col gap-4 bg-gradient-to-r from-[#4eb7a0] to-[#198b76] rounded-t-2xl pt-8 px-8 h-full">
                <div className="text-4xl font-title text-white md:hidden lg:block">
                  {format(parseISO(selectedTab), "MMM do")}
                </div>
                <Tabs
                  value={selectedTab}
                  onValueChange={setSelectedTab}
                  className="w-full lg:mb-0 md:mb-4"
                >
                  <TabsList className="w-full flex justify-between rounded-xl-main p-1 overflow-x-auto md:overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {days.map((d) => (
                      <TabsTrigger
                        key={d.key}
                        value={d.key}
                        className="min-w-[70px]"
                      >
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
                  onSearchChange={(term: string) =>
                    dispatch(setSearchTerm(term))
                  }
                  todoCount={uncompletedTodos.length}
                  totalCount={todos.length}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-10 md:gap-3 lg:gap-5 flex-1 min-h-0 xl:flex-row lg:flex-row md:flex-row sm:flex-col">
            <div className="flex-1 min-h-0 h-full w-1/2 flex flex-col min-w-[300px]">
              <Card className="rounded-b-2xl rounded-t-none bg-white dark:bg-gray-800 p-8 h-full flex flex-col">
                <CardHeader className="p-0 flex flex-col items-start gap-2 md:gap-4">
                  <CardTitle className="text-2xl font-title text-gray-900 dark:text-white w-full flex items-center justify-between gap-2">
                    Completed Tasks
                    <span>
                      {String(completedTodos.length).padStart(2, "0")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto h-full min-h-0 flex-1">
                  <div className="relative">
                    <div className="space-y-2">
                      {completedTodos.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No completed tasks yet.
                        </div>
                      ) : (
                        completedTodos.map((todo) => (
                          <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggleTodo}
                            onEdit={() => setEditingTodo(todo)}
                            onDelete={handleDeleteTodo}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1 min-h-0 h-full w-1/2 flex flex-col min-w-[300px]">
              <Card className="rounded-b-2xl rounded-t-none bg-white dark:bg-gray-800 p-8 h-full flex flex-col">
                <CardHeader className="p-0 flex flex-col items-start gap-2 md:gap-4">
                  <CardTitle className="text-2xl font-title text-gray-900 dark:text-white w-full flex items-center justify-between gap-2">
                    Uncompleted Tasks
                    <span>
                      {String(uncompletedTodos.length).padStart(2, "0")}
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
                      {uncompletedTodos.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No uncompleted tasks yet.
                        </div>
                      ) : (
                        uncompletedTodos.map((todo) => (
                          <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggleTodo}
                            onEdit={() => setEditingTodo(todo)}
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
                            initialDate={selectedTab}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            {/* {row1} */}
            <div>
              <div className=" flex flex-col w-full">
                <div className="flex flex-col justify-between bg-gradient-to-r from-[#4eb7a0] to-[#198b76] rounded-t-2xl pt-8 h-full">
                  <div className="flex flex-col lg:gap-5 md:gap-2 items-start px-8">
                    <div className="text-4xl font-title text-white">Today</div>
                    <div className="text-lg font-light text-white">
                      {activeCount} uncompleted tasks
                    </div>
                  </div>
                  <div className="flex flex-col items-end lg:gap-3 md:gap-0">
                    <span className="text-7xl font-title text-white leading-none">
                      {percent}
                      <span className="text-3xl align-bottom pl-1 pr-3">%</span>
                    </span>
                    <Progress
                      value={percent}
                      className="h-1 rounded-none w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <Card className="rounded-b-2xl rounded-t-none bg-white dark:bg-gray-800 p-8 h-full flex flex-col">
                  <CardHeader className="p-0 flex flex-col items-start gap-2 md:gap-4">
                    <CardTitle className="text-2xl font-title text-gray-900 dark:text-white w-full flex items-center justify-between gap-2">
                      Completed Tasks
                      <span>
                        {String(completedTodos.length).padStart(2, "0")}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 overflow-y-auto h-full min-h-0 flex-1">
                    <div className="relative">
                      <div className="space-y-2">
                        {completedTodos.length === 0 ? (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No completed tasks yet.
                          </div>
                        ) : (
                          completedTodos.map((todo) => (
                            <TodoItem
                              key={todo.id}
                              todo={todo}
                              onToggle={handleToggleTodo}
                              onEdit={() => setEditingTodo(todo)}
                              onDelete={handleDeleteTodo}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* {row2} */}
            <div>
              <div className="flex flex-col w-full">
                <div className="flex flex-col gap-4 bg-gradient-to-r from-[#4eb7a0] to-[#198b76] rounded-t-2xl pt-8 px-8 h-full">
                  <div className="text-4xl font-title text-white md:hidden lg:block">
                    {format(parseISO(selectedTab), "MMM do")}
                  </div>
                  <Tabs
                    value={selectedTab}
                    onValueChange={setSelectedTab}
                    className="w-full lg:mb-0 md:mb-4"
                  >
                    <TabsList className="w-full flex justify-between rounded-xl-main p-1 overflow-x-auto md:overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                      {days.map((d) => (
                        <TabsTrigger
                          key={d.key}
                          value={d.key}
                          className="min-w-[70px]"
                        >
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
                    onSearchChange={(term: string) =>
                      dispatch(setSearchTerm(term))
                    }
                    todoCount={uncompletedTodos.length}
                    totalCount={todos.length}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <Card className="rounded-b-2xl rounded-t-none bg-white dark:bg-gray-800 p-8 h-full flex flex-col">
                  <CardHeader className="p-0 flex flex-col items-start gap-2 md:gap-4">
                    <CardTitle className="text-2xl font-title text-gray-900 dark:text-white w-full flex items-center justify-between gap-2">
                      Uncompleted Tasks
                      <span>
                        {String(uncompletedTodos.length).padStart(2, "0")}
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
                        {uncompletedTodos.length === 0 ? (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No uncompleted tasks yet.
                          </div>
                        ) : (
                          uncompletedTodos.map((todo) => (
                            <TodoItem
                              key={todo.id}
                              todo={todo}
                              onToggle={handleToggleTodo}
                              onEdit={() => setEditingTodo(todo)}
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
                              initialDate={selectedTab}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-5 items-end">
        <DarkModeToggle />
        <Button
          onClick={() => dispatch(toggleForm())}
          className="bg-[#5cd8bd] w-15 h-15 rounded-full flex items-center justify-center text-xl font-title focus-ring"
          aria-label="Add Todo"
        >
          <Plus
            className="text-white"
            style={{ minWidth: 30, minHeight: 30 }}
          />
        </Button>
      </div>

      {editingTodo && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl w-11/12 max-w-md">
            <TodoForm
              onSubmit={(title, date) =>
                handleUpdateTodo(editingTodo.id, title, date)
              }
              onCancel={() => setEditingTodo(null)}
              initialValue={editingTodo.title}
              initialDate={editingTodo.date}
            />
          </div>
        </div>
      )}
    </div>
  );
}
