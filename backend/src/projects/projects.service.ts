import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';

@Injectable()
export class ProjectsService {
	constructor(private prisma: PrismaService) { }

	async create(createProjectDto: CreateProjectDto, rawImages: Array<Express.Multer.File>) {

		if (typeof createProjectDto.users == "string") createProjectDto.users = this.strToArray(createProjectDto.users)
		if (typeof createProjectDto.skills == "string") createProjectDto.skills = this.strToArray(createProjectDto.skills)

		const users = createProjectDto.users.map((userID) => {
			return {
				assignedAt: new Date(),
				user: { connect: { id: Number(userID) } }
			}
		})

		const skills = createProjectDto.skills.map((skillName) => {
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

		const images = rawImages.map((image: Express.Multer.File) => image.originalname)

		await this.prisma.projects.create({
			data: {
				...createProjectDto,
				users: { create: users },
				skills: { create: skills },
				images: images
			}
		})
	}

	async findAll() { return await this.prisma.projects.findMany() }

	async findOne(id: number) { return await this.prisma.projects.findFirst({ where: { id: id } }) }

	async update(id: number, updateProjectDto: UpdateProjectDto, rawImages: Array<Express.Multer.File>) {

		if (typeof updateProjectDto.users == "string") updateProjectDto.users = this.strToArray(updateProjectDto.users)
		if (typeof updateProjectDto.skills == "string") updateProjectDto.skills = this.strToArray(updateProjectDto.skills)

		const users = updateProjectDto.users.map((userID) => {
			return {
				assignedAt: new Date(),
				user: { connect: { id: Number(userID) } }
			}
		})

		const skills = updateProjectDto.skills.map((skillName) => {
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

		const images = rawImages.map((image: Express.Multer.File) => image.originalname)

		await this.prisma.projects.update({
			where: { id: id },
			data: {
				...updateProjectDto,
				users: { create: users },
				skills: { create: skills },
				images: images
			}
		})
	}

	async remove(id: number) { return await this.prisma.projects.delete({ where: { id: id } }) }

	strToArray(str: string) { return str.split(",") }
}
