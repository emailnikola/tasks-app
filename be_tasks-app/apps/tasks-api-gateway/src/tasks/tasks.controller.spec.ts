import { Test, TestingModule } from '@nestjs/testing'
import { TasksController } from './tasks.controller'

const mockTasksService = {
  queryTasks: jest.fn(),
  createTask: jest.fn()
}

const mockAuthService = {
  validateToken: jest.fn()
}

describe('TasksController', () => {
  let tasksController: TasksController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: 'TASKS_SERVICE',
          useValue: mockTasksService
        },
        {
          provide: 'AUTH_SERVICE',
          useValue: mockAuthService
        }
      ]
    }).compile()

    tasksController = module.get<TasksController>(TasksController)
  })

  it('should be defined', () => {
    expect(tasksController).toBeDefined()
  })
})
