import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from './tasks.service'

describe('TasksService', () => {
  let tasksService: TasksService

  const mockClientProxy = {
    send: jest.fn().mockReturnValue({ toPromise: () => Promise.resolve() }),
    emit: jest.fn().mockReturnValue({ toPromise: () => Promise.resolve() }),
    connect: jest.fn().mockResolvedValue(true),
    close: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: 'TASKS_CLIENT',
          useValue: mockClientProxy
        }
      ]
    }).compile()

    tasksService = module.get<TasksService>(TasksService)
  })

  it('should be defined', () => {
    expect(tasksService).toBeDefined()
  })
})
