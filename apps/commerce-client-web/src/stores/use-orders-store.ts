import { format, subDays } from 'date-fns';
import { create } from 'zustand';
import { DateRange, Order, OrderStatus, SortBy } from '@/types/order-types';
import { Pagination } from '@/types/pagination-types';
import { getOrders } from '@/app/actions/order-action';

interface OrdersState {
  startDate: Date;
  endDate: Date;
  sortBy: SortBy;
  orderStatus: OrderStatus;
  orders: Order[];
  pagination: Pagination | null;
}

interface OrdersAction {
  changeStartDate: (date: Date) => void;
  changeEndDate: (date: Date) => void;
  changeSortBy: (sortBy: SortBy) => void;
  changeOrderStatus: (status: OrderStatus) => void;
  fetchOrders: (page: number) => Promise<void>;
}

export const useOrdersStore = create<OrdersState & OrdersAction>((set, get) => ({
  startDate: subDays(new Date(), 7),
  endDate: new Date(),
  sortBy: SortBy.RECENT,
  orderStatus: OrderStatus.ALL,
  orders: [],
  pagination: null,
  changeStartDate: (startDate: Date) => set(() => ({ startDate })),
  changeEndDate: (endDate: Date) => set(() => ({ endDate })),
  changeSortBy: (sortBy: SortBy) => set(() => ({ sortBy })),
  changeOrderStatus: (orderStatus: OrderStatus) => set(() => ({ orderStatus })),
  fetchOrders: async (page: number) => {
    const pageSize = 10;

    const { sortBy, orderStatus, startDate, endDate } = get();

    const response = await getOrders({
      dateRange: DateRange.CUSTOM,
      sortBy: sortBy,
      status: orderStatus === OrderStatus.ALL ? undefined : orderStatus,
      orderStartDate: format(startDate, 'yyyy-MM-dd'),
      orderEndDate: format(endDate, 'yyyy-MM-dd'),
      page: page,
      size: pageSize,
    });

    set({ orders: response.products, pagination: response.paginationInfo });
  },
}));
