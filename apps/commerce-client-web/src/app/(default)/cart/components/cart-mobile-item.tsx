import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { CartItem as CartItemType } from '@/types/cart-types';

type CartMobileItemProps = {
  item: CartItemType;
  checkedItems: number[];
  onToggleItem: (productId: number, checked: boolean) => void;
  onRemoveItem: (shoppingCartId: number) => Promise<void>;
  onChangeQuantity: (shoppingCartId: number, quantity: number) => Promise<void>;
  withLoading: (fn: () => Promise<void>) => void;
};

const CartMobileItem = ({
  item,
  checkedItems,
  onToggleItem,
  onRemoveItem,
  onChangeQuantity,
  withLoading,
}: CartMobileItemProps) => (
  <div key={item.shoppingCartId} className="rounded-lg border bg-white p-4 shadow-sm">
    <div className="mb-2 flex items-center justify-between">
      <Checkbox
        checked={checkedItems.includes(item.productId)}
        onCheckedChange={(checked) =>
          withLoading(async () => onToggleItem(item.productId, checked === true))
        }
        className="cursor-pointer"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => withLoading(() => onRemoveItem(item.shoppingCartId))}
        className="text-red-500 hover:bg-red-50"
      >
        삭제
      </Button>
    </div>
    <div className="flex items-start space-x-4">
      <Image
        src={item.coverImage}
        alt={item.title}
        width={80}
        height={80}
        className="rounded-lg border"
      />
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col items-start gap-y-4">
          <div className="max-w-[150px] truncate text-sm font-semibold">{item.title}</div>
          <div className="flex items-center justify-center text-sm text-slate-500">
            <div className="flex gap-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  onChangeQuantity(item.shoppingCartId, Math.max(item.quantity - 1, 1))
                }
                className="p-1"
              >
                -
              </Button>
              <Input
                type="number"
                value={item.quantity}
                min={1}
                readOnly
                className="w-10 rounded border text-center text-xs"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => onChangeQuantity(item.shoppingCartId, item.quantity + 1)}
                className="p-1"
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-500">상품금액 :</span>
          <span className="font-bold">{item.discountedPrice.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  </div>
);

export default CartMobileItem;
