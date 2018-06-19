import uuid from 'uuid/v4';
import isEmail from 'validator/lib/isEmail';
import path from 'path';

import fileLoader from '../../../utils/fileLoader';

const customerDataPathname = path.join(__dirname, '../../../data/customers.json');

function serialisedCustomerInput(data) {
  const { name, email } = data;

  return {
    id: uuid(),
    name,
    email,
  };
}

function createCustomer(req, res) {
  if (
    !req.body.name ||
    !req.body.email ||
    !isEmail(req.body.email)
  ) {
    res.status(400).json({ message: 'Missing or invalid name or email' });
  } else {
    const newCustomer = serialisedCustomerInput(req.body);
    fileLoader.load(customerDataPathname, (loadErr, data) => {
      if (loadErr) {
        res.status(500).json({ message: 'Fail to process data' });
      } else {
        const isExistingEmail = !!data.find(customer => customer.email === newCustomer.email);

        if (isExistingEmail) {
          res.status(400).json({ message: 'Email already exists' });
        } else {
          const newCustomerList = [newCustomer, ...data];
          fileLoader.update(customerDataPathname, newCustomerList, (updateErr) => {
            if (updateErr) {
              res.status(500).json({ message: 'Error in creating customer profile' });
            } else {
              res.status(201).json(newCustomer);
            }
          });
        }
      }
    });
  }
}

export default createCustomer;
