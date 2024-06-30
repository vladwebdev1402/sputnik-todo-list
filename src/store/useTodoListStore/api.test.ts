import { axiosInstance } from '@/api';

import { CreateTaskData, GetTasksResponse } from './types';
import { TaskApi } from './api';
import { Task } from '@/types';

describe('TaskApi test', () => {
  test('getTasks test', async () => {
    const response: GetTasksResponse = {
      data: [
        {
          id: 0,
          attributes: {
            title: 'title 1',
            description: 'description 1',
            status: 'Не выполнено',
          },
        },
      ],
      meta: { pagination: { total: 1 } },
    };

    jest.spyOn(axiosInstance, 'get').mockResolvedValue({ data: response });

    const data = await TaskApi.getTasks(3, {
      name: 'Все',
      value: 'Все',
      field: '',
    });
    expect(data).toEqual(response);
  });

  test('getTask test', async () => {
    const response: Task = {
      id: 0,
      attributes: {
        title: 'Title 1',
        description: 'Description 1',
        status: 'Не выполнено',
      },
    };

    jest
      .spyOn(axiosInstance, 'get')
      .mockResolvedValue({ data: { data: response } });

    const data = await TaskApi.getTask(0);

    expect(response).toEqual(data);
  });

  test('createTask test', async () => {
    const response: Task = {
      id: 0,
      attributes: {
        title: 'New title',
        description: 'Description',
        status: 'Выполнено',
      },
    };

    const newTask: CreateTaskData = {
      title: 'New title',
      description: 'Description',
      status: 'Выполнено',
    };

    jest
      .spyOn(axiosInstance, 'post')
      .mockResolvedValue({ data: { data: response } });

    const data = await TaskApi.createTask(newTask);

    expect(response).toEqual(data);
  });

  test('updateTask test', async () => {
    const task: Task = {
      id: 0,
      attributes: {
        title: 'New title',
        description: 'Description',
        status: 'Выполнено',
      },
    };

    jest
      .spyOn(axiosInstance, 'put')
      .mockResolvedValue({ data: { data: task } });

    const data = await TaskApi.updateTask(task);

    expect(task).toEqual(data);
  });

  test('updateTask test', async () => {
    const task: Task = {
      id: 0,
      attributes: {
        title: 'New title',
        description: 'Description',
        status: 'Выполнено',
      },
    };

    jest
      .spyOn(axiosInstance, 'put')
      .mockResolvedValue({ data: { data: task } });

    const data = await TaskApi.updateTask(task);

    expect(task).toEqual(data);
  });

  test('getFavorite test', async () => {
    const task1: Task = {
      id: 1,
      attributes: {
        title: 'Title 1',
        description: 'Description 1',
        status: 'Выполнено',
      },
    };

    const task2: Task = {
      id: 2,
      attributes: {
        title: 'Title 2',
        description: 'Description 2',
        status: 'Выполнено',
      },
    };

    jest
      .spyOn(axiosInstance, 'get')
      .mockResolvedValueOnce({ data: { data: task1 } })
      .mockResolvedValueOnce({ data: { data: task2 } });

    const data = await TaskApi.getFavorites([1, 2]);

    expect({ successTask: [task1, task2], rejectedIdFavorites: [] }).toEqual(
      data
    );
  });
});
