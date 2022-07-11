"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _perf_hooks = require("perf_hooks");

var _HubSpotEndpoints = _interopRequireDefault(require("../infra/http/HubSpotEndpoints"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hubSpotEndpoints = new _HubSpotEndpoints.default();

class GetContactsListDomainSum {
  groupDomainsAndCount(domains) {
    const result = domains.reduce((domain, value) => {
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
        quantity: domainsQuantity[x]
      });
    }

    return domainListCount;
  }

  async execute(listId) {
    const initTime = _perf_hooks.performance.now();

    const listIdParsedToNumber = parseInt(listId, 10);
    let vidOffset = 0;
    let hasMore;
    let emailList;
    let incomingEmailLists = [];
    let initialResponse = await hubSpotEndpoints.getContactsInAList(listIdParsedToNumber, vidOffset);
    emailList = initialResponse.contacts.map(contact => contact.properties.email.value);
    incomingEmailLists.push(emailList);
    vidOffset = initialResponse['vid-offset'];
    hasMore = initialResponse['has-more'];

    do {
      process.stdout.write(`\nVIDOFFSET: ${vidOffset}`);
      let loopRes = await hubSpotEndpoints.getContactsInAList(listIdParsedToNumber, vidOffset);
      vidOffset = loopRes['vid-offset'];
      const moreEmails = loopRes.contacts.map(contact => contact.properties.email.value);
      incomingEmailLists.push(moreEmails);
      hasMore = loopRes['has-more'];
      process.stdout.write(`HASMORE: ${hasMore}\n`);
    } while (hasMore);

    const flatnedEmailList = incomingEmailLists.flat(1);
    const domains = flatnedEmailList.map(email => email.substring(email.lastIndexOf('@')));
    const filteredDomainList = this.groupDomainsAndCount(domains);

    const endTime = _perf_hooks.performance.now();

    const executionTime = (endTime - initTime) * 100 / 1000 / 100;
    process.stdout.write(`\nCONTACTS OBTAINED IN ${executionTime}s\n`);
    const response = filteredDomainList;
    return response;
  }

}

exports.default = GetContactsListDomainSum;