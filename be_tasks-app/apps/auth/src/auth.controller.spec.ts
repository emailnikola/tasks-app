import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from '../../../libs/common/src'

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
  validateToken: jest.fn()
}

const mockRegisterDto: RegisterDto = {
  email: 'test@example.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'User'
}

const mockLoginDto: LoginDto = {
  email: 'test@example.com',
  password: 'password123'
}

const mockToken = 'mocked-jwt-token-string'
const mockValidationResult = { valid: true, payload: { userId: '123' } }

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    }).compile()

    authController = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  describe('register', () => {
    it('should call authService.register with the correct RegisterDto payload', async () => {
      mockAuthService.register.mockResolvedValueOnce({ success: true })
      const result = await authController.register(mockRegisterDto)
      expect(authService.register).toHaveBeenCalledWith(mockRegisterDto)
      expect(result).toEqual({ success: true })
    })
  })

  describe('login', () => {
    it('should call authService.login with the correct LoginDto payload', async () => {
      mockAuthService.login.mockResolvedValueOnce({ accessToken: mockToken })
      const result = await authController.login(mockLoginDto)
      expect(authService.login).toHaveBeenCalledWith(mockLoginDto)
      expect(result).toEqual({ accessToken: mockToken })
    })
  })

  describe('validateToken', () => {
    it('should call authService.validateToken with the correct token string', async () => {
      mockAuthService.validateToken.mockResolvedValueOnce(mockValidationResult)
      const result = await authController.validateToken(mockToken)
      expect(authService.validateToken).toHaveBeenCalledWith(mockToken)
      expect(result).toEqual(mockValidationResult)
    })
  })
})
