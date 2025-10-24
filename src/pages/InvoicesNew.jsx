// Temporary file with new Invoices page content
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContextValue';
import InvoiceForm from '../components/InvoiceForm';
import ModalPopup from '../components/ModalPopup';
import FilterBar from '../components/FilterBar';

const filtersList = [
  { label: 'All', value: 'all' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Partial', value: 'partial' },
  { label: 'By Client', value: 'client' }
];

const agencyInfo = {
  name: 'Your Agency Name',
  address: 'Your Business Address\nCity, Country',
  phone: '+1 234 567 890',
  email: 'contact@youragency.com',
  bankDetails: {
    accountName: 'Your Agency LLC',
    accountNumber: '1234567890',
    bankName: 'Your Bank Name',
    swiftCode: 'BANKCODE123'
  }
};