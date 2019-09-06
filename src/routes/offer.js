const OfferController = require('../controllers/OfferController');
const policies = require('../policies');

module.exports = [
  {
    version: 'v1',
    path: 'offers',
    method: 'get',
    action: OfferController.find
  },
  {
    version: 'v1',
    path: 'offers',
    method: 'post',
    action: OfferController.create,
    policies: [policies.isAuthenticated, policies.isAdmin]
  }
];
