import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {

    @ApiProperty({ description: "Project name" })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: "About project" })
    @IsNotEmpty()
    about: string;

    @ApiProperty({ description: "Description" })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    images: Express.Multer.File[]

    @ApiProperty({ description: "List of skills" })
    @IsNotEmpty()
    skills: string[];

    @ApiProperty({ description: "List of users ID's" })
    users: string[];

}

export class UpdateProjectDto extends PartialType(CreateProjectDto) { }
