import path from 'path';

import fileLoader from '../../../utils/fileLoader';

const customerDataPathname = path.join(__dirname, '../../../data/customers.json');

function removeCustomerFromList(customerList, customer) {
  return customerList.reduce((newList, existingCustomerData) => {
    if (existingCustomerData.id !== customer.id) {
      return newList.concat(existingCustomerData);
    }

    return newList;
  }, []);
}

function deleteCustomer(req, res) {
  fileLoader.load(customerDataPathname, (loadErr, currentCustomerList) => {
    if (loadErr) {
      res.status(500).json({ message: 'Fail to process data' });
    } else {
      const existingCustomer = currentCustomerList
        .find(customer => customer.id === req.params.id);

      if (existingCustomer) {
        const updatedCustomerList = removeCustomerFromList(currentCustomerList, existingCustomer);
        fileLoader.update(customerDataPathname, updatedCustomerList, (updateErr) => {
          if (updateErr) {
            res.status(500).json({ message: 'Error in deleting customer profile' });
          } else {
            res.status(204).json({});
          }
        });
      } else {
        res.status(400).json({ message: `Invalid customer ID ${req.params.id}` });
      }
    }
  });
}

export default deleteCustomer;
