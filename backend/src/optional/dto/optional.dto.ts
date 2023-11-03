import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReview {
    @ApiProperty({ description: "Client" })
    @IsNotEmpty()
    client: string;

    @ApiProperty({ description: "Content" })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: "Project ID" })
    @IsNotEmpty()
    projectId: number;
}

export class CreateSkill {
    @ApiProperty({ description: "Skill" })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: "About" })
    @IsNotEmpty()
    about: string;

    @ApiProperty({ description: "Image" })
    @IsNotEmpty()
    image: string;
}

export class CreateRole {
    @ApiProperty({ description: "Role" })
    @IsNotEmpty()
    name: string;
}

export class UpdateReview extends PartialType(CreateReview) { }
export class UpdateSkill extends PartialType(CreateSkill) { }
export class UpdateRole extends PartialType(CreateRole) { }
