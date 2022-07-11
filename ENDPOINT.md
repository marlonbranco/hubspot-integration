# HubSpot Integration API endpoint 🚀

This endpoint consults the chosen contact list and will bring you a list with the same email domains and their respective amount. 🗃

``
IMPORTANT: Check the README.md file to see how you can execute the project
``

## GET
`FETCHES DATA FROM HUBSPOT` [/v1/contacts/:list_id/domain-sum](#get-1billingretrieve-billing-datajson) <br/>

**Path variables**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `list_id` | required | number  | Provided the `list_id` of the list you wish to fetch data from.                                                                    |

**Response**

```
// List with the same email domains and their respective amount 
[
    {
        "domain": "@meetup.com",
        "quantity": 15
    },
    {
        "domain": "@free.fr",
        "quantity": 29
    },
    {
        "domain": "@diigo.com",
        "quantity": 19
    }
]