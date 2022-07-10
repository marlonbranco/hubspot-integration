import HubSpotEndpoints from '@sharedProviders/HubSpot/infra/http/HubSpotEndpoints';

const hubSpotEndpoints = new HubSpotEndpoints();

export default class GetContactsListDomainSum {
  async execute(listId: number): Promise<any> {
    const queryReturn = await hubSpotEndpoints.getContactsInAList(listId);
    return queryReturn;
  }
}
