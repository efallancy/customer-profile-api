import path from 'path';
import fileLoader from '../../../utils/fileLoader';

const customerDataPathname = path.join(__dirname, '../../../data/customers.json');

function getCustomer(req, res) {
  fileLoader.load(customerDataPathname, (err, data) => {
    if (err) {
      res.status(500).json({});
    } else {
      const customerProfile = data.find(customer => customer.id === req.params.id);

      if (customerProfile) {
        res.status(200).json(customerProfile);
      } else {
        res.status(404).json({ message: `No customer found with ID ${req.params.id}` });
      }
    }
  });
}

export default getCustomer;
