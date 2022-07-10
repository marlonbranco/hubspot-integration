import { bigArraySplitter } from '@shared/utils/bigArraySplitter';
import HubSpotEndpoints from '@sharedProviders/HubSpot/infra/http/HubSpotEndpoints';

const hubSpotEndpoints = new HubSpotEndpoints();

export default class AddExistentContactsToAList {
  async execute(listId: number, emails: string[]): Promise<any> {
    process.stdout.write(`\nADDING CONTACTS TO LIST ${listId} ON HUBSPOT...\n`);

    const splittedEmailsBatch = bigArraySplitter(emails, 500);

    for await (const emailsBatch of splittedEmailsBatch) {
      hubSpotEndpoints.addExistentContactsToAList(listId, emailsBatch);
    }
    process.stdout.write(`\nCONTACTS TO ADDED TO THE LIST ${listId} ON HUBSPOT.\n`);
  }
}
