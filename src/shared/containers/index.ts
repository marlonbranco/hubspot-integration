import { container } from 'tsyringe';

import '../providers';

import HubSpotEndpoints from '@shared/providers/HubSpot/infra/http/HubSpotEndpoints';
import IHubSpotEndpoints from '@shared/providers/HubSpot/implementations/IHubSpotEndpoints';

container.registerSingleton<IHubSpotEndpoints>('HubSpotEndpoints', HubSpotEndpoints);
