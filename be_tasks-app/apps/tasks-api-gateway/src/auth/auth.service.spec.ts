import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService

  const mockClientProxy = {
    send: jest.fn().mockReturnValue({ toPromise: () => Promise.resolve() }),
    emit: jest.fn().mockReturnValue({ toPromise: () => Promise.resolve() }),
    connect: jest.fn().mockResolvedValue(true),
    close: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'AUTH_CLIENT',
          useValue: mockClientProxy
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
