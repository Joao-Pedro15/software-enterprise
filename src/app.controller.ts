import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('video')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileFieldsInterceptor(
      [],
      {
        dest: './upload', storage: diskStorage({
          destination: './uploads', filename(_req, file, callback) {
            return callback(null, `${Date.now()}-${randomUUID()}${extname(file.originalname)}`)
          },
        }),
        fileFilter(_req, file, callback) {
          if (file.mimetype !== 'video/mp4' && file.mimetype !== 'image/jpeg') {
            return callback(new BadRequestException(`Invalid file type. Only video/mp4 and image/jpeg are supported.`), false)
          }
          return callback(null, true)
        },
      }
    )
  )
  async uploadVideo(
    @Req() _req: Request,
    @UploadedFiles() files: { videos?: Express.Multer.File[], thumbnails?: Express.Multer.File[] }
  ): Promise<string> {
    console.log(files)
    return 'video uploaded'
  }
}