import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    PrismaModule, JwtModule,
    MulterModule.register({ dest: './public' }),
  ]
})
export class ProjectsModule { }
