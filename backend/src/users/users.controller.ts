import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { SignUpDto, SignInDto, UpdateUserDto } from './dto/users.dto';
import { UserGuard } from 'src/guards/user.guard'
import { UsersService } from './users.service';
import { Response, Request } from 'express'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("signUp")
  async signUp(@Body() signUpDto: SignUpDto) { return await this.usersService.signUp(signUpDto); }

  @Post("signIn")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const tokens = await this.usersService.signIn(signInDto);

    if (typeof (tokens) === "string") { return tokens }

    response.cookie("accessToken", tokens.accessToken, {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 2),
      sameSite: 'strict',
      httpOnly: false,
    })

    response.cookie("refreshToken", tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 31 * 2),
      sameSite: 'strict',
      httpOnly: true,
    })

    return tokens
  }

  @Get()
  @UseGuards(UserGuard)
  findAll() { return this.usersService.getAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.usersService.getOne(+id); }

  @Patch(':id')
  @UseGuards(UserGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: Request,) { return this.usersService.update(+id, updateUserDto, req.cookies.accessToken); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.usersService.remove(+id); }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    if (!req.cookies.refreshToken) return "RefreshToken not found"

    const tokens = await this.usersService.refresh(req.cookies.refreshToken)

    if (typeof (tokens) === "string") {
      res.status(400)
      return tokens
    }

    res.cookie("accessToken", tokens.accessToken, {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60),
      sameSite: 'strict',
      httpOnly: false,
    })

    res.cookie("refreshToken", tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 31 * 2),
      sameSite: 'strict',
      httpOnly: true,
    })

    return tokens
  }
}
