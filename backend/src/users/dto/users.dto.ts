import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {

    @ApiProperty({ description: "Email" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Username" })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: "Fullname" })
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({ description: "Phone" })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ description: "Birth date" })
    @IsNotEmpty()
    birthDate: Date;

    @ApiProperty({ description: "Password" })
    @IsNotEmpty()
    password: string;
}

export class SignInDto {

    @ApiProperty({ description: "Username" })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: "Password" })
    @IsNotEmpty()
    password: string;

}

export class UpdateUserDto extends PartialType(SignUpDto) {

    @ApiProperty({ description: "About" })
    about?: string;

    @ApiProperty({ description: "List of roles" })
    roles?: string[];

    @ApiProperty({ description: "List of skills" })
    skills?: string[];

}
