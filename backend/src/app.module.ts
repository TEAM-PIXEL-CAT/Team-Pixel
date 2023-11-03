import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { OptionalModule } from './optional/optional.module';

@Module({
  imports: [
    ProjectsModule, UsersModule, PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, }),
    OptionalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
