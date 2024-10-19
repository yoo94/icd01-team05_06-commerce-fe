import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type CartActionButtonsProps = {
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onClearCart: () => void;
};

const CartActionButtons = ({ allSelected, onSelectAll, onClearCart }: CartActionButtonsProps) => (
  <div className="flex w-full items-center justify-between rounded-lg bg-slate-50 p-4">
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={allSelected}
        onCheckedChange={onSelectAll}
        className="cursor-pointer"
        id="select-all"
      />
      <Label htmlFor="select-all" className="text-sm font-medium text-gray-700">
        전체 선택
      </Label>
    </div>

    <Button variant="outline" onClick={onClearCart}>
      전체삭제
    </Button>
  </div>
);

export default CartActionButtons;
