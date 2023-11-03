/* eslint-disable prefer-const */
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto, UpdateUserDto, SignInDto } from './dto/users.dto';

type Tokens = {
	accessToken: string
	refreshToken: string
}

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) { }

	async signUp(signUpDto: SignUpDto) {

		const emailCheck = await this.prisma.users.findUnique({ where: { email: signUpDto.email } })
		const usernameCheck = await this.prisma.users.findUnique({ where: { username: signUpDto.username } })

		if (emailCheck !== null) return "Error: Email already in use"
		if (usernameCheck !== null) return "Error: Username already in use"

		signUpDto.password = await this.hashData(signUpDto.password);

		const user = await this.prisma.users.create({ data: { ...signUpDto } })

		const tokens = await this.getTokens(user.id, user.username)
		await this.updateRefresh(user.id, tokens.refreshToken)

		return tokens
	}

	async signIn(signInDto: SignInDto) {

		const user = await this.prisma.users.findFirst({ where: { username: signInDto.username } })
		if (!user) return "Error: User with this username does not exist"

		const passwordMatch = await bcrypt.compare(signInDto.password, user.password);
		if (!passwordMatch) return "Error: Invalid password"

		const tokens = await this.getTokens(user.id, user.username)
		await this.updateRefresh(user.id, tokens.refreshToken)

		return tokens
	}

	async update(id: number, updateUserDto: UpdateUserDto, accessToken: string) {
		let { skills, roles, ...user } = updateUserDto

		if (!skills) skills = []
		if (!roles) roles = []

		const token = this.jwtService.verify(accessToken, { secret: process.env.ACCESS_JWT_SECRET })

		if (token.userID !== id) return "You don't have an access to change this profile"

		await this.prisma.users.update({
			where: { id: id },
			data: {
				skills: { set: [] },
				roles: { set: [] }
			}
		})

		const userRoles = roles.map((roleName) => {
			return {
				assignedAt: new Date(),
				role: {
					connectOrCreate: {
						where: { name: roleName },
						create: { name: roleName }
					}
				}
			}
		})

		const userSkills = skills.map((skillName) => {
			return {
				assignedAt: new Date(),
				skill: {
					connectOrCreate: {
						where: { name: skillName },
						create: { name: skillName }
					}
				}
			}
		})


		return await this.prisma.users.update({
			where: { id: id },
			data: {
				...user,
				skills: { create: userSkills },
				roles: { create: userRoles }
			}
		})

	}

	async remove(id: number) { return this.prisma.users.delete({ where: { id: id } }) }

	async getAll() { return await this.prisma.users.findMany({}) }

	async getOne(id: number) { return await this.prisma.users.findFirst({ where: { id: id } }) }

	async refresh(refreshToken: string) {
		const token = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_JWT_SECRET })

		if (token === null || typeof (token) === "string") return "Error: Invalid data"

		const user = await this.prisma.users.findFirst({ where: { id: token.userID } })


		if (user === null || typeof (user) === "string") return "Error: Invalid data"
		if (user.refreshToken === null) return "Error: Invalid data"
		const tokenMatch = await bcrypt.compare(refreshToken, user.refreshToken)

		if (!tokenMatch) return "Error: Invalid data"

		const tokens = await this.getTokens(user.id, user.username)
		await this.updateRefresh(user.id, tokens.refreshToken)

		return tokens

	}

	async getTokens(userID: number, username: string): Promise<Tokens> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync({
				userID: userID,
				username: username,
				time: new Date()
			}, {
				expiresIn: 60 * 60,
				secret: process.env.ACCESS_JWT_SECRET
			}),

			this.jwtService.signAsync({
				userID: userID,
				username: username,
				time: new Date()
			}, {
				expiresIn: 60 * 60 * 24 * 31,
				secret: process.env.REFRESH_JWT_SECRET
			}),
		])
		return { accessToken, refreshToken }
	}

	async updateRefresh(userID: number, refreshToken: string) {
		const hash = await this.hashData(refreshToken)
		await this.prisma.users.update({
			where: { id: userID },
			data: { refreshToken: hash }
		})
	}

	async hashData(data: string) { const salt = await bcrypt.genSalt(); return bcrypt.hash(data, salt) }
}
