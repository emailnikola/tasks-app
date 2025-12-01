import { CreateUserDto } from '@app/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { Test, TestingModule } from '@nestjs/testing'

const mockUsersService = {
  create: jest.fn(),
  findByEmail: jest.fn()
}

// 2. Define Mock Payloads and Results
const mockCreateUserDto: CreateUserDto = {
  email: 'newuser@test.com',
  password: 'securePassword',
  firstName: 'Test',
  lastName: 'User'
}

const mockCreatedUser = {
  id: 'abc-123',
  ...mockCreateUserDto,
  password: 'hashed-password',
  createdAt: new Date(),
  updatedAt: new Date()
}

const mockEmail = 'lookup@example.com'
const mockFoundUser = {
  id: 'def-456',
  email: mockEmail,
  firstName: 'Lookup',
  lastName: 'User'
}

// --- Test Suite ---

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService
        }
      ]
    }).compile()

    usersController = module.get<UsersController>(UsersController)
    usersService = module.get<UsersService>(UsersService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(usersController).toBeDefined()
  })

  describe('create', () => {
    it('should call usersService.create with the correct CreateUserDto payload', async () => {
      mockUsersService.create.mockResolvedValueOnce(mockCreatedUser)
      const result = await usersController.create(mockCreateUserDto)
      expect(usersService.create).toHaveBeenCalledWith(mockCreateUserDto)
      expect(result).toEqual(mockCreatedUser)
    })
  })

  describe('findByEmail', () => {
    it('should call usersService.findByEmail with the correct email string', async () => {
      mockUsersService.findByEmail.mockResolvedValueOnce(mockFoundUser)
      const result = await usersController.findByEmail(mockEmail)
      expect(usersService.findByEmail).toHaveBeenCalledWith(mockEmail)
      expect(result).toEqual(mockFoundUser)
    })
  })
})
