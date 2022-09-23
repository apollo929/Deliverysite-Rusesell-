import { ReadStream } from 'fs';

export interface ProcessedImage {
  tmpFilePath: string;
  savePath: string;
  addText: string;
}
