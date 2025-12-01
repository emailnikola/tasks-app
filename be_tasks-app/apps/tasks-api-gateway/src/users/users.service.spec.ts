import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'

const mockClientProxy = {
  send: jest.fn().mockReturnValue({ toPromise: () => Promise.resolve() }),
  emit: jest.fn().mockReturnValue({ toPromise: () => Promise.resolve() }),
  connect: jest.fn().mockResolvedValue(true),
  close: jest.fn()
}

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USERS_CLIENT',
          useValue: mockClientProxy
        }
      ]
    }).compile()

    service = module.get(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
