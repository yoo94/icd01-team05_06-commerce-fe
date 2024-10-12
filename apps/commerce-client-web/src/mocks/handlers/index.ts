import { handlers as productHandlers } from './product';
import { handlers as orderHandlers } from './order';

export const handlers = [...productHandlers, ...orderHandlers];
