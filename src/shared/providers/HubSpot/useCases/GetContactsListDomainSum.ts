import { performance } from 'perf_hooks';
import HubSpotEndpoints from '@sharedProviders/HubSpot/infra/http/HubSpotEndpoints';
import ErrorsApp from '@errors/ErrorsApp';

const hubSpotEndpoints = new HubSpotEndpoints();

export default class GetContactsListDomainSum {
  private isPositiveInteger(str: string) {
    if (typeof str !== 'string') {
      return false;
    }

    const num = Number(str);

    if (Number.isInteger(num) && num > 0) {
      return true;
    }
    return false;
  }

  private groupDomainsAndCount(domains: string[]) {
    const result = domains.reduce((domain: any, value: any) => {
      domain[value] = (domain[value] || 0) + 1;
      return domain;
    }, {});

    const domainListCount = [];
    const resultLength = Object.keys(result).length;
    const domainsFiltered = Object.keys(result);
    const domainsQuantity = Object.values(result);

    for (let x = 0; x < resultLength; x += 1) {
      domainListCount.push({
        domain: domainsFiltered[x],
        quantity: domainsQuantity[x],
      });
    }

    return domainListCount;
  }

  public async execute(listId: string): Promise<any> {
    const isListIdANumber = this.isPositiveInteger(listId);

    if (!isListIdANumber) {
      throw new ErrorsApp('The provided list_id is Not a Number', 406);
    }
    const parsedListId = parseInt(listId, 10);

    const initTime = performance.now();
    let vidOffset = 0;
    let hasMore;
    let emailList;
    let incomingEmailLists = [];

    let initialResponse = await hubSpotEndpoints
      .getContactsInAList(parsedListId, vidOffset);

    emailList = initialResponse.contacts.map((contact: any) => contact.properties.email.value);
    incomingEmailLists.push(emailList);
    vidOffset = initialResponse['vid-offset'];
    hasMore = initialResponse['has-more'];

    do {
      process.stdout.write(`\nVIDOFFSET: ${vidOffset}`);

      let loopRes = await hubSpotEndpoints.getContactsInAList(parsedListId, vidOffset);

      vidOffset = loopRes['vid-offset'];
      const moreEmails = loopRes.contacts.map((contact: any) => contact.properties.email.value);
      incomingEmailLists.push(moreEmails);

      hasMore = loopRes['has-more'];

      process.stdout.write(`\nHASMORE: ${hasMore}\n`);
    } while (hasMore);

    const flatnedEmailList = incomingEmailLists.flat(1);
    const domains = flatnedEmailList.map((email: string) => email.substring(email.lastIndexOf('@')));
    const filteredDomainList = this.groupDomainsAndCount(domains);

    const endTime = performance.now();
    const executionTime = ((endTime - initTime) * 100) / 1000 / 100;

    process.stdout.write(`\nCONTACTS OBTAINED IN ${executionTime}s\n`);

    const response = filteredDomainList;
    return response;
  }
}
