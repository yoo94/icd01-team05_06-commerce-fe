import React from 'react';

const RefundExchangePolicy = () => {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-lg font-semibold">배송/반품/교환 안내</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 border text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-center text-slate-500">항목</th>
              <th className="px-6 py-3 text-center text-slate-500">내용</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            <tr>
              <td className="px-6 py-4 font-semibold">반품/교환 방법</td>
              <td className="px-6 py-4 text-xs font-extralight leading-5">
                마이페이지 &gt; 반품/교환 신청 및 조회, 1:1 문의, 고객만족센터(1544-3800),
                중고샵(1566-4295)
                <br />
                판매자 배송 상품은 판매자와 반품/교환이 협의된 상품에 한해 가능합니다.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-semibold">반품/교환 가능기간</td>
              <td className="px-6 py-4 text-xs font-extralight leading-5">
                출고 완료 후 10일 이내의 주문 상품
                <br />
                디지털 콘텐츠인 eBook의 경우 구매 후 7일 이내의 상품
                <br />
                중고상품의 경우 출고 완료일로부터 6일 이내의 상품 (구매확정 전 상태)
                <br />
                모바일 쿠폰의 경우 유효기간(발행 후 1년) 내 등록하지 않은 상품
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-semibold">반품/교환 비용</td>
              <td className="px-6 py-4 text-xs font-extralight leading-5">
                고객의 단순변심 및 착오구매일 경우 상품 반송비용은 고객 부담임
                <br />
                직수입양서/직수입일서중 일부는 변심 또는 착오로 취소시 해외주문취소수수료 20%를
                부과할 수 있음
                <br />
                오늘 00시 ~ 06시 30분 주문을 오늘 오전 06시 30분 이전에 취소
                <br />
                오늘 06시 30분 이후 주문을 익일 오전 06시 30분 이전에 취소
                <br />
                직수입 음반/영상물/기프트 중 일부는 변심 또는 착오로 취소 시 해외주문취소수수료
                30%를 부과할 수 있음
                <br />
                단, 당일 00시~13시 사이의 주문은 취소 수수료 면제
                <br />
                박스 포장은 택배 배송이 가능한 규격과 무게를 준수하며, 고객의 단순변심 및 착오구매일
                경우 상품의 반송비용은 박스 당 부과됩니다.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-semibold">반품/교환 불가사유</td>
              <td className="px-6 py-4 text-xs font-extralight leading-5">
                소비자의 책임 있는 사유로 상품 등이 손실 또는 훼손된 경우
                <br />
                소비자의 사용, 포장 개봉에 의해 상품 등의 가치가 현저히 감소한 경우 : 예) 화장품,
                식품, 가전제품, 전자책 단말기 등
                <br />
                복제가 가능한 상품 등의 포장을 훼손한 경우 : 예) CD/LP, DVD/Blu-ray, 소프트웨어,
                만화책, 잡지, 영상 화보집
                <br />
                소비자의 요청에 따라 개별적으로 주문 제작되는 상품의 경우
                <br />
                디지털 컨텐츠인 eBook, 오디오북 등을 1회 이상 다운로드를 받았을 경우
                <br />
                eBook 대여 상품은 대여 기간이 종료 되거나, 2회 이상 대여 했을 경우 취소 불가
                <br />
                모바일 쿠폰 등록 후 취소/환불 불가
                <br />
                중고상품이 구매확정(자동 구매확정은 출고완료일로부터 7일)된 경우
                <br />
                LP상품의 재생 불량 원인이 기기의 사양 및 문제인 경우 (All-in-One 일체형 일부 보급형
                오디오 모델 사용 등)
                <br />
                시간의 경과에 의해 재판매가 곤란한 정도로 가치가 현저히 감소한 경우
                <br />
                전자상거래 등에서의 소비자보호에 관한 법률이 정하는 소비자 청약철회 제한 내용에
                해당되는 경우
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-semibold">소비자 피해보상</td>
              <td className="px-6 py-4 text-xs font-extralight leading-5">
                상품의 불량에 의한 반품, 교환, A/S, 환불, 품질보증 및 피해보상 등에 관한 사항은
                소비자분쟁해결기준(공정거래위원회 고시)에 준하여 처리됨
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-semibold">환불 지연에 따른 배상</td>
              <td className="px-6 py-4 text-xs font-extralight leading-5">
                대금 환불 및 환불 지연에 따른 배상금 지급 조건, 절차 등은 전자상거래 등에서의 소비자
                보호에 관한 법률에 따라 처리
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundExchangePolicy;
