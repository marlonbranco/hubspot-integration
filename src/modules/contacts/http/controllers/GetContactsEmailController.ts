import { Request, Response } from 'express';
import HubSpotEndpoints from '@shared/providers/HubSpot/infra/http/HubSpotEndpoints';

const hubSpotEndpoints = new HubSpotEndpoints();

export default class GetContactsEmailController {
  public async index(request: Request, response: response) {
    const { data } = request.query;

    const data = await hubSpotEndpoints.getContactsInAList(data);
  }
}
