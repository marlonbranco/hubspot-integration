// CRIAR UMA LISTA NO HUBSPOT
// CRIAR OS CONTATOS DO CSV NO HUBSPOT
// ADICIONA OS CONTATOS CRIARDOS A LISTA CRIADA

import CreateContactList from '@sharedProviders/HubSpot/useCases/CreateContactList';
import CreateContactsInBatch from '@sharedProviders/HubSpot/useCases/CreateContactsInBatch';
import AddExistentContactsToAList from '@sharedProviders/HubSpot/useCases/AddExistentContactsToAList';
import Uploader from '@sharedProviders/Papaparser/index';
import { performance } from 'perf_hooks';

const firstName = 'marlon';
const lastName = 'valentino';
const createContactList = new CreateContactList();
const createContactsInBatch = new CreateContactsInBatch();
const addExistentContactsToAList = new AddExistentContactsToAList();
const uploader = new Uploader();

export default class CreateContactsFromCsvFile {
  public async execute(): Promise<void> {
    const initTime = performance.now();

    const listId = await createContactList.execute(firstName, lastName).catch((err) => {
      console.log(err);
    });

    const contactsBatch: any = await uploader.readFile('Contatos.csv');

    if (!contactsBatch) {
      process.stdout.write('\nDATA NOT FOUND');
    }
    const emails = await createContactsInBatch.execute(contactsBatch);
    await addExistentContactsToAList.execute(listId, emails);
    const endTime = performance.now();
    const executionTime = ((endTime - initTime) * 100) / 1000 / 100;
    process.stdout.write(`\nPROCESS COMPLETED IN ${executionTime}s\n`);
  }
}
