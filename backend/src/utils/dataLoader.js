import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let salesData = [];

export const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, '../../data/sales_data.csv');

    console.log('Loading CSV from:', csvPath);

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        // Log first row to see actual column names
        if (results.length === 0) {
          console.log('First row columns:', Object.keys(row));
        }

        // Parse with flexible column mapping
        const record = {
          customerId: row['Customer ID'] || row['customer_id'] || row['CustomerID'] || '',
          customerName: row['Customer Name'] || row['customer_name'] || row['CustomerName'] || '',
          phoneNumber: row['Phone Number'] || row['phone_number'] || row['PhoneNumber'] || '',
          gender: row['Gender'] || row['gender'] || '',
          age: parseInt(row['Age'] || row['age'] || 0),
          customerRegion: row['Customer Region'] || row['customer_region'] || row['Region'] || '',
          customerType: row['Customer Type'] || row['customer_type'] || row['Type'] || '',
          productId: row['Product ID'] || row['product_id'] || row['ProductID'] || '',
          productName: row['Product Name'] || row['product_name'] || row['ProductName'] || '',
          brand: row['Brand'] || row['brand'] || '',
          productCategory: row['Product Category'] || row['product_category'] || row['Category'] || '',
          tags: row['Tags'] || row['tags'] || '',
          quantity: parseInt(row['Quantity'] || row['quantity'] || 0),
          pricePerUnit: parseFloat(row['Price per Unit'] || row['price_per_unit'] || row['Price'] || 0),
          discountPercentage: parseFloat(row['Discount Percentage'] || row['discount_percentage'] || row['Discount'] || 0),
          totalAmount: parseFloat(row['Total Amount'] || row['total_amount'] || row['Total'] || 0),
          finalAmount: parseFloat(row['Final Amount'] || row['final_amount'] || row['FinalAmount'] || 0),
          date: row['Date'] || row['date'] || '',
          paymentMethod: row['Payment Method'] || row['payment_method'] || row['PaymentMethod'] || '',
          orderStatus: row['Order Status'] || row['order_status'] || row['Status'] || '',
          deliveryType: row['Delivery Type'] || row['delivery_type'] || row['DeliveryType'] || '',
          storeId: row['Store ID'] || row['store_id'] || row['StoreID'] || '',
          storeLocation: row['Store Location'] || row['store_location'] || row['Location'] || '',
          salespersonId: row['Salesperson ID'] || row['salesperson_id'] || row['SalespersonID'] || '',
          employeeName: row['Employee Name'] || row['employee_name'] || row['EmployeeName'] || '',
        };
        
        results.push(record);
      })
      .on('end', () => {
        salesData = results;
        console.log(`✅ Successfully loaded ${salesData.length} records`);
        
        // Log sample data to verify
        if (salesData.length > 0) {
          console.log('Sample record:', salesData[0]);
        }
        
        resolve(salesData);
      })
      .on('error', (error) => {
        console.error('❌ Error loading CSV:', error);
        reject(error);
      });
  });
};

export const getSalesData = () => salesData;