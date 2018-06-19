import path from 'path';
import fileLoader from '../../../utils/fileLoader';

const customerDataPathname = path.join(__dirname, '../../../data/customers.json');

function getCustomersByMatchingTerm(customerList, term) {
  return customerList.reduce((filteredCustomerList, customer) => {
    if (customer.name.includes(term) || customer.email.includes(term)) {
      return filteredCustomerList.concat(customer);
    }

    return filteredCustomerList;
  }, []);
}

function getCustomer(req, res) {
  fileLoader.load(customerDataPathname, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error in retrieving customer data' });
    } else {
      const customerList = req.query.term ?
        getCustomersByMatchingTerm(data, req.query.term) :
        data;
      res.status(200).json(customerList);
    }
  });
}

export default getCustomer;
