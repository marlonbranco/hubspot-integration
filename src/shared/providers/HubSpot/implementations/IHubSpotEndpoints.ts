export default interface IHubSpotEndpoints {
    createContactList(firstName: string, lastName: string): Promise<number>;
    addExistentContactsToAList(listId: number, emailsBatch: []): Promise<void>;
    createContactsInBatch(body: []): Promise<void>;
    getContactsInAList(listId: number, offset?: number): Promise<any>
};
