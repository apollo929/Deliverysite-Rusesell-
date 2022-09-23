import { Processor, Process } from '@nestjs/bull';
import { unlinkSync } from 'fs';
import { ProcessedImage } from '../model/processed-image';
import * as canvas from 'canvas';
import { outputFile } from 'image-data-uri';
import { ConfigService } from '@nestjs/config';

@Processor('image')
export class ImageConsumer {
  constructor(private config: ConfigService) {}
  @Process('save-image-with-timestamp')
  async saveImageWithTimestamp(imageData: { data: ProcessedImage }) {
    const { tmpFilePath, addText, savePath } = imageData.data;

    canvas.loadImage(tmpFilePath).then((image) => {
      canvas.registerFont(`${this.config.get('SYSTEM_FONT')}`, {
        family: 'Roboto',
      });
      const cnv = canvas.createCanvas(image.width, image.height);
      const context = cnv.getContext('2d');

      context.drawImage(image, 0, 0);
      context.font = '64px Roboto';
      context.textAlign = 'center';
      context.fillStyle = 'red';
      context.fillText(addText, image.width / 2, image.height * 0.97);
      const imageUri = cnv.toDataURL('image/png');
      outputFile(imageUri, savePath)
        .then(() => {
          unlinkSync(tmpFilePath);
        })
        .catch(() => {});
    });
  }
}
