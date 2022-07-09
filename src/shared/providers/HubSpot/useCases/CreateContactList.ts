import { hubSpotApi } from '../infra/http/hubSpotApiConnect';

export default class CreateContactList {
  async execute(firstName: string, lastName: string): Promise<any> {
    try {
      const hubSpotApiKey = process.env.HUBSPOT_API_KEY;
      const contactList = await hubSpotApi.post('/contacts/v1/lists', {
        name: `${firstName}.${lastName}.${Date.now()}`
      }, {
        params: {
          hapikey: hubSpotApiKey,

        }
      });
      return contactList;
    } catch (err) {
      console.log(err);
    }
  }
}
