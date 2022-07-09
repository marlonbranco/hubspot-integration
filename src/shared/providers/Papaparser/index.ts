import fs from 'fs';
import { access } from 'node:fs/promises';
import path from 'path';
import papa from 'papaparse';
import { performance } from 'perf_hooks';
import ErrorsApp from '@errors/ErrorsApp';

export default class Uploader {
  private async checkIfFileExists(file: string): Promise<boolean> {
    try {
      await access(file);
      return true;
    } catch {
      return false;
    }
  }

  private chunkBatch(batch: any, size: number) {
    const chunks = [];

    while (batch.length) {
      chunks.push(
        batch.splice(0, size)
      );
    }

    return chunks;
  }

  public async readFile(): Promise<[]> {
    const initTime = performance.now();
    const config = { delimiter: ',', header: true, chunk: true };
    const parseStream = papa.parse(papa.NODE_STREAM_INPUT, config);
    const filePath = path.resolve('Contatos.csv');
    try {
      await this.checkIfFileExists(filePath);
    } catch (err: any) {
      throw new ErrorsApp(err.message, 404);
    }

    const data: any = [];
    let chunkedData: any;
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .on('error', (err) => {
          reject(err);
        })
        .pipe(parseStream)
        .on('data', (chunk) => {
          const properties = {
            email: chunk.email,
            properties: [
              {
                property: 'firstname',
                value: chunk.first_name
              },
              {
                property: 'lastname',
                value: chunk.last_name
              },
              {
                property: 'gender',
                value: chunk.gender
              }]
          };
          data.push(properties);
        })
        .on('end', () => {
          const endTime = performance.now();
          const executionTime = ((endTime - initTime) * 100) / 1000 / 100;
          chunkedData = this.chunkBatch(data, 1000);
          resolve(chunkedData);
          process.stdout.write(`FILE READ IN ${executionTime}s`);
        });
    });
  }
}
