import { hubSpotApi } from '../infra/http/hubSpotApiConnect';

export default class GetContactsDomainSum {
  async getData(): Promise<any> {
    const hubSpotApiKey = process.env.HUBSPOT_API_KEY;

    const contactList = await hubSpotApi.get('/contacts/v1/lists/all/contacts/all', {
      params: {
        hapikey: hubSpotApiKey,
        property: 'email',
        count: 25,
        /* vidOffset: */
      }
    });
    return contactList.data;
  }

  async execute(): Promise<any> {
    // try {
    //   // let vidOffset;
    //   await getData(resolve, j);
    //   hasMore = contactList.data['has-more'];
    //   console.log(JSON.stringify(contactList.data['vid-offset']));
    //   return contactList;
    // } catch (err) {
    //   console.log(err);
    // }
  }
}
