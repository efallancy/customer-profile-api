import omit from 'lodash.omit';
import isEmail from 'validator/lib/isEmail';
import path from 'path';

import fileLoader from '../../../utils/fileLoader';

const customerDataPathname = path.join(__dirname, '../../../data/customers.json');

function serialisedCustomerInput(data) {
  const { name, email, id } = data;

  return {
    id,
    name,
    email,
  };
}

function updateCustomerList(customerList, newCustomerData) {
  return customerList.reduce((newList, existingCustomerData) => {
    if (existingCustomerData.id === newCustomerData.id) {
      const updatedCustomerData = Object.assign(existingCustomerData, newCustomerData);
      return newList.concat(updatedCustomerData);
    }

    return newList.concat(existingCustomerData);
  }, []);
}

function updateCustomer(req, res) {
  if (
    !req.body.name ||
    !req.body.email ||
    !isEmail(req.body.email)
  ) {
    res.status(400).json({ message: 'Missing or invalid name or email' });
  } else {
    fileLoader.load(customerDataPathname, (loadErr, currentCustomerList) => {
      if (loadErr) {
        res.status(500).json({ message: 'Fail to process data' });
      } else {
        const existingCustomer = currentCustomerList
          .find(customer => customer.id === req.params.id);

        if (existingCustomer) {
          const newCustomerData = serialisedCustomerInput(Object.assign(
            existingCustomer,
            omit(req.body, ['id']),
          ));

          const isExistingEmail = !!currentCustomerList.find(customer =>
            customer.email === newCustomerData.email &&
            customer.id !== newCustomerData.id);

          if (isExistingEmail) {
            res.status(400).json({ message: 'Email already exists' });
          } else {
            const newCustomerList = updateCustomerList(currentCustomerList, newCustomerData);
            fileLoader.update(customerDataPathname, newCustomerList, (updateErr) => {
              if (updateErr) {
                res.status(500).json({ message: 'Error in updating customer profile' });
              } else {
                res.status(200).json(newCustomerData);
              }
            });
          }
        } else {
          res.status(400).json({ message: `Invalid customer ID ${req.params.id}` });
        }
      }
    });
  }
}

export default updateCustomer;
