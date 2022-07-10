import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import ErrorsApp from '@errors/ErrorsApp';
import CreateContactsFromCsvFile from '@modules/contacts/useCases/CreateContactsFromCsvFile';
import { performance } from 'perf_hooks';
import app from './app';

const PORT = Number(process.env.PORT) || 3333;
const URL = process.env.URL || '0.0.0.0';
const createContactsFromCsvFile = new CreateContactsFromCsvFile();

if (!URL) {
  throw new ErrorsApp('URL_UNDEFINED');
}

app.listen(PORT, URL, async () => {
  process.stdout.write(`Backend running on http://${URL}:${PORT}\n`);
  const initTime = performance.now();
  await createContactsFromCsvFile.execute();
  const endTime = performance.now();
  const executionTime = ((endTime - initTime) * 100) / 1000 / 100;
  process.stdout.write(`\nPROCESS COMPLETED IN ${executionTime}s\n`);
});
