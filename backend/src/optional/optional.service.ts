import { Injectable } from '@nestjs/common';
import { CreateReview, CreateRole, CreateSkill, UpdateReview, UpdateRole, UpdateSkill } from './dto/optional.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OptionalService {
  constructor(private prisma: PrismaService) { }

  async createReview(
    createReview: CreateReview,
    image: Express.Multer.File
  ) {
    return await this.prisma.reviews.
      create({
        data: {
          ...createReview,
          image: image.originalname
        }
      })
  }


  async createSkill(
    createSkill: CreateSkill,
    image: Express.Multer.File
  ) {
    return await this.prisma.skills.
      create({
        data: {
          ...createSkill,
          image: image.originalname
        }
      })
  }


  async createRole(createRole: CreateRole) {
    return await this.prisma.skills.
      create({ data: { ...createRole, } })
  }


  async updateReview(
    id: string,
    updateReview: UpdateReview,
    image: Express.Multer.File
  ) {
    return await this.prisma.reviews.
      update({
        where: { id: Number(id) },
        data: {
          ...updateReview,
          image: image.originalname
        }
      })
  }


  async updateSkill(
    id: string,
    updateSkill: UpdateSkill,
    image: Express.Multer.File
  ) {
    return await this.prisma.skills.
      update({
        where: { id: Number(id) },
        data: {
          ...updateSkill,
          image: image.originalname
        }
      })
  }


  async updateRole(
    id: string,
    updateRole: UpdateRole,
  ) {
    return await this.prisma.roles.
      update({
        where: { id: Number(id) },
        data: {
          ...updateRole,
        }
      })
  }

  async getReviews() { return await this.prisma.reviews.findMany() }
  async getSkills() { return await this.prisma.skills.findMany() }
  async getRoles() { return await this.prisma.roles.findMany() }
  async getReview(id: number) { return await this.prisma.reviews.findFirst({ where: { id: id } }) }

  async removeReview(id: number) { return await this.prisma.reviews.delete({ where: { id: id } }) }
  async removeSkill(id: number) { return await this.prisma.skills.delete({ where: { id: id } }) }
  async removeRole(id: number) { return await this.prisma.roles.delete({ where: { id: id } }) }
}
