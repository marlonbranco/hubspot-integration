import HubSpotEndpoints from '@sharedProviders/HubSpot/infra/http/HubSpotEndpoints';

const hubSpotEndpoints = new HubSpotEndpoints();

export default class CreateContactList {
  async execute(firstName: string, lastName: string): Promise<any> {
    try {
      return hubSpotEndpoints.createContactList(firstName, lastName);
    } catch (err) {
      console.log(err);
    }
  }
}
