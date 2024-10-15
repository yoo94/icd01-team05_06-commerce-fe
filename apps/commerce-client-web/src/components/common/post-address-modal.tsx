import DaumPostcode from 'react-daum-postcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface PostAddress {
  zonecode?: string;
  address: string;
}

const PostAddressModal = ({
  isOpen,
  onClose,
  onComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: PostAddress) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>우편번호 검색</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <DaumPostcode
            onComplete={(data) => {
              onComplete({
                zonecode: data.zonecode,
                address: data.address,
              });
              onClose();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostAddressModal;
