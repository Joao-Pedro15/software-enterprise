import { Injectable } from "@nestjs/common";
import { VideoDAO } from "@src/persistence/dao/video.dao";

export interface CreateContentData {
  title: string
  description: string
  url: string
  thumbnailUrl: string
  sizeInKb: number
}

@Injectable()
export class ContentManagementService {
  constructor(private readonly videoDAO: VideoDAO) { }

  async createContent(createContentData: CreateContentData) {
    const createdVideo = await this.videoDAO.create(createContentData)
    return createdVideo
  }

}