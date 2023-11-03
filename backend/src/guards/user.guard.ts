import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    async canActivate(context: ExecutionContext,): Promise<boolean> {
        const req = await context.switchToHttp().getRequest().cookies

        const tokens = {
            accessToken: req.accessToken,
            refreshToken: req.refreshToken
        }

        if (tokens.accessToken === undefined) return false
        const user = this.jwtService.verify(tokens.accessToken, { secret: process.env.ACCESS_JWT_SECRET })

        if (user.exp > Math.round(Date.now() / 1000)) return true;
        else return false
    }
}