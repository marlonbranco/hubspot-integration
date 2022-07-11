import { Request, Response } from 'express';
import GetContactsListDomainSum from '@shared/providers/HubSpot/useCases/GetContactsListDomainSum';

const getContactsListDomainSum = new GetContactsListDomainSum();

class GetContactsListDomainsSumController {
  public async index(request: Request, response: Response) {
    const { list_id } = request.params;

    const domainSum = await getContactsListDomainSum.execute(list_id);

    return response.json(domainSum);
  }
}

export const getContactsListDomainsSumController = new GetContactsListDomainsSumController();
