import { Router } from 'express';
import getContactsListDomainsSumRouter from '@modules/contacts/infra/http/routes';

const routes = Router();

routes.use('/v1', getContactsListDomainsSumRouter);

export default routes;
