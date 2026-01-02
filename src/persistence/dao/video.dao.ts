import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateContentData } from "@src/core/service/content-management.service";
import { randomUUID } from "crypto";

@Injectable()
export class VideoDAO {
  constructor(private readonly prismaService: PrismaService) { }

  async create(videoData: CreateContentData) {
    const { description, sizeInKb, thumbnailUrl, title, url } = videoData

    return this.prismaService.video.create({
      data: {
        id: randomUUID(),
        description,
        sizeInKb,
        title,
        url,
        thumbnailUrl,
        duration: 100,
        updatedAt: new Date(),
        createdAt: new Date(),
      }
    })

  }

}