import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

const Invoice = ({ order }) => (
  <Document>
    <Page>
      <Text fixed>{new Date().toLocaleDateString()}</Text>
      <View style={styles.header}>
        <Text>Order Invoice</Text>
        <Text>Order Summary</Text>
      </View>
      <Table data={order.products}>
        <TableHeader>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Color</TableCell>
        </TableHeader>
        <TableBody>
          <DataTableCell getContent={(r) => r.product.title} />
          <DataTableCell getContent={(r) => `$${r.product.price}`} />
          <DataTableCell getContent={(r) => r.count} />
          <DataTableCell getContent={(r) => r.product.brand} />
          <DataTableCell getContent={(r) => r.product.color} />
        </TableBody>
      </Table>
      <View style={styles.section}>
        <View style={styles.sectionLeft}>
          <Text>Date </Text>
          <Text>Order ID </Text>
          <Text>Order Status </Text>
          <Text>Total Paid </Text>
        </View>
        <View>
          <Text>
            : {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          <Text>: {order.paymentIntent.id}</Text>
          <Text>: {order.orderStatus}</Text>
          <Text>: {order.paymentIntent.amount}</Text>
        </View>
      </View>
      <Text style={styles.footer}>~ Thanks for shopping with us ~</Text>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
  },
  sectionLeft: {
    width: 100,
  },
  header: {
    fontSize: 13,
    textAlign: 'center',
    color: 'green',
    marginVertical: 5,
  },
  footer: {
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    backgroundColor: 'gray',
    color: '#ccc',
  },
});

export default Invoice;
