import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDB } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const importCSVToMongo = async () => {
  const db = getDB();
  const collection = db.collection('sales');
  
  const count = await collection.countDocuments();
  if (count > 0) {
    console.log(`✅ Database already has ${count} records`);
    return;
  }

  console.log('📂 Importing CSV to MongoDB...');
  
  const records = [];
  const csvPath = path.join(__dirname, '../../data/sales_data.csv');
  let processed = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        records.push({
          transactionId: row['Transaction ID'],
          customerId: row['Customer ID'],
          customerName: row['Customer Name'],
          phoneNumber: row['Phone Number'],
          gender: row['Gender'],
          age: parseInt(row['Age']) || 0,
          customerRegion: row['Customer Region'],
          customerType: row['Customer Type'],
          productId: row['Product ID'],
          productName: row['Product Name'],
          brand: row['Brand'],
          productCategory: row['Product Category'],
          tags: row['Tags'] ? row['Tags'].split(',').map(t => t.trim()) : [],
          quantity: parseInt(row['Quantity']) || 0,
          pricePerUnit: parseFloat(row['Price per Unit']) || 0,
          discountPercentage: parseFloat(row['Discount Percentage']) || 0,
          totalAmount: parseFloat(row['Total Amount']) || 0,
          finalAmount: parseFloat(row['Final Amount']) || 0,
          date: new Date(row['Date']),
          paymentMethod: row['Payment Method'],
          orderStatus: row['Order Status'],
          deliveryType: row['Delivery Type'],
          storeId: row['Store ID'],
          storeLocation: row['Store Location'],
          salespersonId: row['Salesperson ID'],
          employeeName: row['Employee Name'],
        });

        if (records.length === 10000) {
          collection.insertMany(records).then(() => {
            processed += records.length;
            console.log(`📊 Imported ${processed} records...`);
          });
          records.length = 0;
        }
      })
      .on('end', async () => {
        if (records.length > 0) {
          await collection.insertMany(records);
          processed += records.length;
        }
        
        await collection.createIndex({ customerName: 'text', phoneNumber: 'text' });
        await collection.createIndex({ date: 1 });
        
        console.log(`✅ Imported ${processed} records to MongoDB`);
        resolve();
      })
      .on('error', reject);
  });
};