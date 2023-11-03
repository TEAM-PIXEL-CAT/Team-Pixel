import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService, private prisma: PrismaService) { }
    async canActivate(context: ExecutionContext,): Promise<boolean> {
        const req = await context.switchToHttp().getRequest().cookies

        const tokens = {
            accessToken: req.accessToken,
            refreshToken: req.refreshToken
        }

        if (tokens.accessToken === undefined) return false
        const userToken = this.jwtService.verify(tokens.accessToken, { secret: process.env.ACCESS_JWT_SECRET })

        if (userToken.exp <= Math.round(Date.now() / 1000)) return false;

        const user = await this.prisma.users.findFirst({ where: { id: userToken.userID } })
        if (user.admin) return true

        return false
    }
}