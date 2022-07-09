import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import ErrorsApp from '@errors/ErrorsApp';
// import CreateContactList from '@sharedProviders/HubSpot/useCases/CreateContactList';
import CreateContactsInBatch from '@sharedProviders/HubSpot/useCases/CreateContactsInBatch';
// import GetContactsDomainSum from '@sharedProviders/HubSpot/useCases/GetContactsDomainSum';
import app from './app';
// import Uploader from '../../providers/Papaparser/index';

const PORT = Number(process.env.PORT) || 3333;
const URL = process.env.URL || '0.0.0.0';
// const uploader = new Uploader();
// const createContactList = new CreateContactList();
const createContactsInBatch = new CreateContactsInBatch();
// const getContactsDomainSum = new GetContactsDomainSum();
// const firstName = 'marlon';
// const lastName = 'valentino';
// const email = 'marlon.valentino@gmail.com';
// const gender = 'male';

if (!URL) {
  throw new ErrorsApp('URL_UNDEFINED');
}

app.listen(PORT, URL, async () => {
  /** createContactList.execute(firstName, lastName); * */
  // getContactsDomainSum.execute();
  console.log(`Backend running on http://${URL}:${PORT}`);
  await createContactsInBatch.execute();
});

// uploader.execute();
