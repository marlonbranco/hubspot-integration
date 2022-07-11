import { Router } from 'express';
import { getContactsListDomainsSumController } from '../controllers/GetContactsListDomainsSumController';

const getContactsListDomainsSumRouter = Router();

getContactsListDomainsSumRouter.get('/contacts/:list_id/domain-sum', getContactsListDomainsSumController.index);

export default getContactsListDomainsSumRouter;
