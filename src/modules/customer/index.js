import express from 'express';

import getCustomers from './handlers/getCustomers';
import getCustomer from './handlers/getCustomer';
import createCustomer from './handlers/createCustomer';
import updateCustomer from './handlers/updateCustomer';
import deleteCustomer from './handlers/deleteCustomer';

const router = express.Router();

// Register route
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomer);
router.post('/customers', createCustomer);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

export default router;
