import { Injectable } from '@nestjs/common';
import { DEFAULT_SIZE } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    skip = 0,
    take = DEFAULT_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      skip,
      take,
    });
  }
  async count() {
    return await this.prisma.post.count();
  }
}
