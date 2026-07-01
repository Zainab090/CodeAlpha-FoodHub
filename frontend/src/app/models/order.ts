export interface Order {

  id: number;

  customerName: string;

  phone: string;

  address: string;

  total: number;

  items: any[];

  status:
    | 'pending'
    | 'preparing'
    | 'ready'
    | 'delivered';

}