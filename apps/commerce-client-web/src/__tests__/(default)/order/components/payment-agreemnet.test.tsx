import PaymentAgreement from '@/app/(default)/order/components/payment-agreement';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';

test('renders PaymentAgreement component correctly', () => {
  render(<PaymentAgreement />);

  // "전체 동의" 체크박스가 화면에 있는지 확인
  const agreeAllCheckbox = screen.getByLabelText('전체 동의');
  expect(agreeAllCheckbox).toBeInTheDocument();

  // "개인정보 수집 및 이용 동의" 체크박스가 화면에 있는지 확인
  const agreePersonalCheckbox = screen.getByLabelText('개인정보 수집 및 이용 동의');
  expect(agreePersonalCheckbox).toBeInTheDocument();

  // "구매조건 확인 및 결제 진행에 동의" 체크박스가 화면에 있는지 확인
  const agreePurchaseCheckbox = screen.getByLabelText('구매조건 확인 및 결제 진행에 동의');
  expect(agreePurchaseCheckbox).toBeInTheDocument();

  // 결제 버튼이 화면에 있는지 확인
  const paymentButton = screen.getByRole('button', { name: '결제하기' });
  expect(paymentButton).toBeInTheDocument();

  // 체크박스 클릭 시 상태 변화 확인
  fireEvent.click(agreeAllCheckbox);
  expect(agreeAllCheckbox).toBeChecked();

  fireEvent.click(agreePersonalCheckbox);
  expect(agreePersonalCheckbox).toBeChecked();

  fireEvent.click(agreePurchaseCheckbox);
  expect(agreePurchaseCheckbox).toBeChecked();
});
