import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SortOptionSelect = () => {
  return (
    <Select defaultValue="latest">
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="latest">최근순</SelectItem>
          <SelectItem value="oldest">과거순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortOptionSelect;
