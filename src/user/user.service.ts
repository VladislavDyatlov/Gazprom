import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(name: string, email: string) {
    return this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
