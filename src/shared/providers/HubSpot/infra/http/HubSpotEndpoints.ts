import ErrorsApp from '@errors/ErrorsApp';
import delayBetweenRequests from '@shared/utils/delayBetweenRequests';
import { hubSpotApi } from './hubSpotApiConnect';
import IHubSpotEndpoints from '../../implementations/IHubSpotEndpoints';

const hubSpotApiKey = process.env.HUBSPOT_API_KEY;

export default class HubSpotEndpoints implements IHubSpotEndpoints {
  public async createContactList(firstName: string, lastName: string): Promise<number> {
    await delayBetweenRequests(100);
    const contactList = await hubSpotApi.post('/contacts/v1/lists', {
      name: `${firstName}.${lastName}.${Date.now()}`,
    }, {
      params: {
        hapikey: hubSpotApiKey,

      }
    })
      .catch((err) => {
        throw new ErrorsApp(err.message, 400);
      });

    const { name, listId } = contactList.data;

    console.log(`\nCONTACT LIST CREATED:\n     name: ${name} \n     listID: ${listId}\n`);

    return listId;
  }

  public async addExistentContactsToAList(listId: number, emailsBatch: []): Promise<void> {
    await delayBetweenRequests(100);
    hubSpotApi.post(`/contacts/v1/lists/${listId}/add/`, {
      emails: emailsBatch
    }, {
      params: {
        hapikey: hubSpotApiKey,
      }
    })
      .catch((err) => {
        throw new ErrorsApp(err.message, 400);
      });
  }

  public async createContactsInBatch(body: []): Promise<void> {
    await delayBetweenRequests(100);
    hubSpotApi.post('/contacts/v1/contact/batch/', body,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          hapikey: hubSpotApiKey,
        },
      })
      .catch((err) => {
        throw new ErrorsApp(err.message, 400);
      });
  }

  public async getContactsInAList(listId: number, offset?: number): Promise<any> {
    const { data }: any = await hubSpotApi.get(`/contacts/v1/lists/${listId}/contacts/all`, {
      params: {
        hapikey: hubSpotApiKey,
        count: 100,
        property: 'email',
        vidOffset: offset
      }
    })
      .catch((err) => {
        console.log(err);
      });

    return data;
  }
}
