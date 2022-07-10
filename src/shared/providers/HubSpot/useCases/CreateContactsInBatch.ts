// import { inject, injectable } from 'tsyringe';
// import IHubSpotEndpoints from '@sharedProviders/HubSpot/implementations/IHubSpotEndpoints';
import HubSpotEndpoints from '../infra/http/HubSpotEndpoints';

const hubSpotEndpoints = new HubSpotEndpoints();

// @injectable()
export default class CreateContactsInBatch {
  /* constructor(
    @inject('HubSpotEndpoints')
    private hubSpotEndpoints: IHubSpotEndpoints
  ) {} */

  public async execute(contactsBatch: any): Promise<string[]> {
    process.stdout.write('\nCREATING CONTACTS ON HUBSPOT...\n');
    let emailsList: string[] = [];

    for await (const batch of contactsBatch) {
      await hubSpotEndpoints.createContactsInBatch(batch);
      const emails = batch.map(({ email }: any) => email);

      emailsList.push(emails);
    }

    emailsList = emailsList.flat(1);

    process.stdout.write('\nFINISHED CREATING CONTACTS\n');

    return emailsList;
  }
}
