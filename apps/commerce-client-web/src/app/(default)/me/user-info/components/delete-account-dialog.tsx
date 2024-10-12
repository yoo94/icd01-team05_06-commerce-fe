import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the dialog
  onConfirm: () => void; // Function to confirm account deletion
}

const DeleteAccountDialog = ({ isOpen, onClose, onConfirm }: DeleteAccountDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원탈퇴</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-1.5 text-sm font-light">
          <span>
            회원 탈퇴 시, 회원님의{' '}
            <b className="underline underline-offset-4">
              모든 계정 정보 및 서비스 이용 내역이 삭제
            </b>
            되며, 이 작업은 되돌릴 수 없습니다.
          </span>{' '}
          <span>계속 진행하시려면 [ 탈퇴 ] 버튼을 눌러 주십시오.</span>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            탈퇴
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
