import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { ProjectsService } from './projects.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  @UseGuards(AdminGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 20, {
    storage: diskStorage({
      filename: (req, file, cb) => {
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extension = path.parse(file.originalname).ext

        cb(null, `${filename}${extension}`)
      }
    })
  }))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() images: Array<Express.Multer.File>
  ) { return this.projectsService.create(createProjectDto, images); }

  @Get()
  findAll() { return this.projectsService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.projectsService.findOne(+id); }

  @Patch(':id')
  @UseGuards(AdminGuard) @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 20, {
    storage: diskStorage({
      filename: (req, file, cb) => {
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extension = path.parse(file.originalname).ext

        cb(null, `${filename}${extension}`)
      }
    })
  }))
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles() images: Array<Express.Multer.File>
  ) { return this.projectsService.update(+id, updateProjectDto, images); }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) { return this.projectsService.remove(+id); }
}
