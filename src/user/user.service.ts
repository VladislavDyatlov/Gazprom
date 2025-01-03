import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByLogin(email: string) {
    return this.prisma.user.findFirst({
      where: { email }
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
