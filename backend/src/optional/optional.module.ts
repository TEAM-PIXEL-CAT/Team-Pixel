import { Module } from '@nestjs/common';
import { OptionalService } from './optional.service';
import { OptionalController } from './optional.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [OptionalController],
  providers: [OptionalService],
  imports: [PrismaModule, JwtModule,],
})
export class OptionalModule { }
