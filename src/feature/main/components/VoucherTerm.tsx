const VoucherTerm = () => {
  return (
    <div className="max-h-screen">
      <div className="mt-2">
        <h1 className="text-sm font-semibold">รายละเอียด</h1>
        <p className="text-xs md:text-sm">
          อาหารเช้า ซิกเนเจอร์ เคมปินสกี้
          รวมเครื่องดื่มสปาร์คกลิ้งไวน์อย่างไม่จำกัด สำหรับ 2 ท่าน (วันจันทร์ –
          วันพฤหัสบดี) ราคาปกติ 2,942.50 บาทสุทธิ
        </p>
      </div>
      <div>
        <h1 className="text-sm font-semibold">เงื่อนไขและข้อกำหนด</h1>
        <ul className="list-inside list-disc text-xs md:text-sm">
          <li>
            บัตรกำนัล E-voucher ราคานี้รวมค่าบริการ 10% และภาษีมูลค่าเพิ่ม 7%
          </li>
          <li>
            บัตรกำนัล E-voucher ไม่สามารถขอคืนเงิน ยกเลิก
            แลกเปลี่ยนหรือทอนเป็นเงินสดได้
          </li>
          <li>
            บัตรกำนัล E-voucher ไม่สามารถใช้ร่วมกับรายการส่งเสริมการขายอื่นๆ
            และขอสงวนสิทธิ์ไม่ร่วมรายการในวันที่มีกิจกรรมพิเศษของห้องอาหาร
          </li>
          <li>
            บัตรกำนัลนี้ใช้ได้วันจันทร์ – วันพฤหัสบดี เวลา 06:30 - 11:00 น.
            ในกรณีสำรองที่นั่งล่วงหน้าได้ระหว่างเวลา 06:30 - 08:00 น.
            หลังจากนั้นจะเป็นการรอคิวตามลำดับที่หน้าห้องอาหาร
          </li>
          <li>บัตรกำนัล E-voucher ใช้ได้ถึง 30 ธันวาคม 2567</li>
          <li>
            กรุณาสำรองที่นั่งล่วงหน้า โทร. 02 162 9000
            และแสดงบัตรกำนัลต่อเจ้าหน้าที่ ณ วันที่ใช้บริการ
          </li>
        </ul>
        <p className="text-sm">
          Signature Kempinski Breakfast with free-flow sparkling wine for 2
          persons (Monday–Thursday) Regular price THB 2,942.50 net
        </p>
      </div>
      <div>
        <h1 className="text-sm font-semibold">รายละเอียด</h1>
        <ul className="list-inside list-disc text-xs md:text-sm">
          <li>
            The e-voucher includes a 10% service charge and a 7% government tax.
          </li>
          <li>
            The e-voucher is non-refundable and cannot be redeemed for cash.
          </li>
          <li>
            The e-voucher is not valid during special events and cannot be
            combined with other discounts or third-party promotions.
          </li>
          <li>
            The e-voucher can be used from Monday to Thursday between 6:30 and
            11:00. Advanced reservation is accepted between 6:30 and 08:00.
            After this time, walk-in options will be on a first-come,
            first-served basis.
          </li>
          <li>The e-voucher is valid until 31 December 2024.</li>
          <li>
            Advanced reservations are required. Please call Hotel Guest Services
            at 02 162 9000. Presentation of the e-voucher is required upon
            redemption.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VoucherTerm;
