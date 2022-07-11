"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _GetContactsListDomainsSumController = require("../controllers/GetContactsListDomainsSumController");

const getContactsListDomainsSumRouter = (0, _express.Router)();
getContactsListDomainsSumRouter.get('/contacts/:list_id/domain-sum', _GetContactsListDomainsSumController.getContactsListDomainsSumController.index);
var _default = getContactsListDomainsSumRouter;
exports.default = _default;