import { Injectable } from "@nestjs/common";
import { VideoNotFoundException } from "../exception/video-not-found-exception";
import { VideoRepository } from "@contentModule/persistence/repository/video.repository";

@Injectable()
export class MediaPlayerService {
  constructor(private readonly videoRepostory: VideoRepository) { }

  async prepareStreaming(videoId: string) {
    const video = await this.videoRepostory.findOneById(videoId)
    if (!video) {
      throw new VideoNotFoundException(`video with id ${videoId} not found`)
    }

    return video.url
  }
}