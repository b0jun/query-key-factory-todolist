// handlers.ts
import dayjs from 'dayjs';
import { rest } from 'msw';

const todos = [
  { id: 1, value: '첫번째 할일', date: '2022.01.03', isDone: false },
  { id: 2, value: '두번째 할일', date: '2022.02.05', isDone: true },
  { id: 3, value: '세번째 할일', date: '2022.04.07', isDone: true },
  { id: 4, value: '네번째 할일', date: '2022.06.19', isDone: false },
];

let todosLength = 4;

export const handlers = [
  // 할일 목록 조회
  rest.get('/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  // 할일 상세 조회
  rest.get('/todos/:todoId', async (req, res, ctx) => {
    const { todoId } = req.params;
    const numberTodoId = Number(todoId);
    const foundTodo = todos.find((todo) => todo.id === numberTodoId);
    return res(ctx.status(200), ctx.json({ value: foundTodo?.value, date: foundTodo?.date }));
  }),

  // 할일 추가
  rest.post('/todos', async (req, res, ctx) => {
    const { value } = await req.json();
    todosLength += 1;
    const newTodo = {
      id: todosLength,
      value,
      date: dayjs().format('YYYY.MM.DD'),
      isDone: false,
    };
    todos.push(newTodo);
    return res(ctx.status(201, 'Add Todos'), ctx.json({ id: todosLength }));
  }),

  // 할일 삭제
  rest.delete('/todos', async (req, res, ctx) => {
    const { id } = await req.json();
    const foundTodoIndex = todos.findIndex((todo) => todo.id === id);
    todos.splice(foundTodoIndex, 1);
    return res(ctx.status(201));
  }),

  // 특정 할일 done 추가
  rest.post('/todos/done', async (req, res, ctx) => {
    const { id } = await req.json();
    const foundTodoIndex = todos.findIndex((todo) => todo.id === id);

    if (todos[foundTodoIndex].isDone) {
      return res(ctx.status(400), ctx.json({ message: 'already done' }));
    }

    todos.splice(foundTodoIndex, 1, { ...todos[foundTodoIndex], isDone: true });
    return res(ctx.status(201));
  }),

  // 특정 할일 done 삭제
  rest.delete('/todos/done', async (req, res, ctx) => {
    const { id } = await req.json();
    const foundTodoIndex = todos.findIndex((todo) => todo.id === id);

    if (!todos[foundTodoIndex].isDone) {
      return res(ctx.status(400), ctx.json({ message: 'already undone' }));
    }

    todos.splice(foundTodoIndex, 1, { ...todos[foundTodoIndex], isDone: false });

    return res(ctx.status(201));
  }),
];
