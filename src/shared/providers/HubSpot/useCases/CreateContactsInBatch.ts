import delayBetweenRequests from '@shared/utils/delayBetweenRequests';
import { hubSpotApi } from '../infra/http/hubSpotApiConnect';
import Uploader from '../../Papaparser/index';

export default class CreateContactsInBatch {
  public async execute(): Promise<void> {
    console.log('process started');
    const hubSpotApiKey = process.env.HUBSPOT_API_KEY;
    const uploader = new Uploader();

    const contactsBatch: any = await uploader.readFile();
    if (!contactsBatch) {
      console.log('DATA NOT FOUND');
    }
    console.log('process started');
    for await (const data of contactsBatch) {
      try {
        await hubSpotApi.post('/contacts/v1/contact/batch/',
          data,
          {
            params: {
              hapikey: hubSpotApiKey,

            }
          });
        delayBetweenRequests(100);
      } catch (err) {
        console.log(err);
      }
    }
    console.log('process ended');
  }
}
