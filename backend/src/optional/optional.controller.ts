import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { OptionalService } from './optional.service';
import { CreateReview, CreateRole, CreateSkill, UpdateReview, UpdateRole, UpdateSkill } from './dto/optional.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UserGuard } from 'src/guards/user.guard';

@ApiTags('Optional')
@Controller('optional')
export class OptionalController {
  constructor(private readonly optionalService: OptionalService) { }

  @Post("review")
  @UseGuards(AdminGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      filename: (req, file, cb) => {
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extension = path.parse(file.originalname).ext
        cb(null, `${filename}${extension}`)
      }
    })
  }))
  createReview(@Body() createReview: CreateReview, @UploadedFile() file: Express.Multer.File) {
    return this.optionalService.createReview(createReview, file);
  }

  @Post("skill")
  @UseGuards(UserGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      filename: (req, file, cb) => {
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extension = path.parse(file.originalname).ext

        cb(null, `${filename}${extension}`)
      }
    })
  }))
  createSkill(@Body() createSkill: CreateSkill, @UploadedFile() file: Express.Multer.File) {
    return this.optionalService.createSkill(createSkill, file);
  }

  @Post("role")
  createRole(@Body() createRole: CreateRole) { return this.optionalService.createRole(createRole); }


  @Patch("review/:id")
  @UseGuards(AdminGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      filename: (req, file, cb) => {
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extension = path.parse(file.originalname).ext
        cb(null, `${filename}${extension}`)
      }
    })
  }))
  updateReview(
    @Param('id') id: string,
    @Body() updateReview: UpdateReview,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.optionalService.updateReview(id, updateReview, file);
  }

  @Patch("skill/:id")
  @UseGuards(UserGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      filename: (req, file, cb) => {
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extension = path.parse(file.originalname).ext

        cb(null, `${filename}${extension}`)
      }
    })
  }))
  updateSkill(
    @Param('id') id: string,
    @Body() updateSkill: UpdateSkill,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.optionalService.updateSkill(id, updateSkill, file);
  }

  @Patch("role/:id")
  updateRole(
    @Param('id') id: string,
    @Body() updateRole: UpdateRole
  ) { return this.optionalService.updateRole(id, updateRole); }


  @Get("reviews")
  getReviews() { return this.optionalService.getReviews(); }

  @Get("skills")
  getSkills() { return this.optionalService.getSkills(); }

  @Get("roles")
  getRoles() { return this.optionalService.getRoles(); }

  @Get('review/:id')
  getReview(@Param('id') id: string) { return this.optionalService.getReview(+id); }

  @Delete('review/:id')
  @UseGuards(AdminGuard)
  removeReview(@Param('id') id: string) {
    return this.optionalService.removeReview(+id);
  }


  @Delete('skill/:id')
  @UseGuards(AdminGuard)
  removeSkill(@Param('id') id: string) {
    return this.optionalService.removeSkill(+id);
  }


  @Delete('role/:id')
  @UseGuards(AdminGuard)
  removeRole(@Param('id') id: string) {
    return this.optionalService.removeRole(+id);
  }
}