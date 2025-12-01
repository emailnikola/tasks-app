import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { setLogout } from './authSlice'
import {
  fetchTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService
} from '../services/taskService'
// TYPES
import { FetchTasksPayload } from '../types/apiTypes'
import {
  CreateTaskPayload,
  Task,
  TaskQuery,
  TasksState,
  UpdateTaskPayload
} from '../types/tasksTypes'

const initialState: TasksState = {
  tasks: [],
  totalCount: 0,
  status: 'idle',
  error: null,
  shouldRefetch: false
}

export const fetchTasks = createAsyncThunk<FetchTasksPayload, TaskQuery, { state: RootState }>(
  'tasks/fetchTasks',
  async (queryBody, { rejectWithValue }) => {
    try {
      const responseData = await fetchTasksService(queryBody)
      return responseData
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch tasks.')
    }
  }
)

export const createTask = createAsyncThunk<Task, CreateTaskPayload, { rejectValue: string }>(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const newTask = await createTaskService(taskData)
      return newTask
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create task.')
    }
  }
)

export const updateTask = createAsyncThunk<Task, UpdateTaskPayload, { rejectValue: string }>(
  'tasks/updateTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const updatedTask = await updateTaskService(taskData)
      return updatedTask
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update task.')
    }
  }
)

export const deleteTask = createAsyncThunk<string, string, { rejectValue: string }>(
  'tasks/deleteTask',
  async (taskId: string, { rejectWithValue }) => {
    try {
      await deleteTaskService(taskId)
      return taskId
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete task')
    }
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<FetchTasksPayload>) => {
        state.status = 'succeeded'
        state.tasks = action.payload.tasks
        state.totalCount = action.payload.totalCount
        state.error = null
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) || 'Unknown error occurred.'
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload)
        state.totalCount += 1
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload!
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload!
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTaskId = action.payload
        state.tasks = state.tasks.filter((task) => task.id !== deletedTaskId)
        state.totalCount -= 1
        state.shouldRefetch = !state.shouldRefetch
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload!
      })
      .addCase(setLogout, () => {
        return initialState
      })
  }
})

export default tasksSlice.reducer
