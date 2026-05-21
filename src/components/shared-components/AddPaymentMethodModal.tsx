"use client";

import React from "react";

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
  hasError?: boolean;
}

export const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({
  isOpen,
  onClose,
  onPay,
  hasError = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="relative flex w-full max-w-[600px] flex-col gap-6 rounded-[10px] bg-white p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.10)] md:p-[40px]">
        <button type="button" aria-label="Close" onClick={onClose} className="absolute right-6 top-6 cursor-pointer border-none bg-transparent md:right-[40px] md:top-[40px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.67083 9.30417L1.95417 15.0208C1.74028 15.2347 1.46806 15.3417 1.1375 15.3417C0.806944 15.3417 0.534722 15.2347 0.320833 15.0208C0.106944 14.8069 0 14.5347 0 14.2042C0 13.8736 0.106944 13.6014 0.320833 13.3875L6.0375 7.67083L0.320833 1.95417C0.106944 1.74028 0 1.46806 0 1.1375C0 0.806944 0.106944 0.534722 0.320833 0.320833C0.534722 0.106944 0.806944 0 1.1375 0C1.46806 0 1.74028 0.106944 1.95417 0.320833L7.67083 6.0375L13.3875 0.320833C13.6014 0.106944 13.8736 0 14.2042 0C14.5347 0 14.8069 0.106944 15.0208 0.320833C15.2347 0.534722 15.3417 0.806944 15.3417 1.1375C15.3417 1.46806 15.2347 1.74028 15.0208 1.95417L9.30417 7.67083L15.0208 13.3875C15.2347 13.6014 15.3417 13.8736 15.3417 14.2042C15.3417 14.5347 15.2347 14.8069 15.0208 15.0208C14.8069 15.2347 14.5347 15.3417 14.2042 15.3417C13.8736 15.3417 13.6014 15.2347 13.3875 15.0208L7.67083 9.30417Z" fill="black" />
          </svg>
        </button>

        <div className="mt-8 flex w-full items-center justify-center gap-[10px] rounded-[10px] border-[0.5px] border-[#E4E4E7] bg-[#BBF7D0] px-[10px] py-[15px] md:mt-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1.33203 8.00033C1.33203 5.48617 1.33203 4.22909 2.11308 3.44804C2.89413 2.66699 4.15121 2.66699 6.66536 2.66699H9.33203C11.8462 2.66699 13.1033 2.66699 13.8843 3.44804C14.6654 4.22909 14.6654 5.48617 14.6654 8.00033C14.6654 10.5145 14.6654 11.7716 13.8843 12.5526C13.1033 13.3337 11.8462 13.3337 9.33203 13.3337H6.66536C4.15121 13.3337 2.89413 13.3337 2.11308 12.5526C1.33203 11.7716 1.33203 10.5145 1.33203 8.00033Z" stroke="black" strokeWidth="1.5" />
            <path d="M6.66667 10.667H4" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9.33203 10.667H8.33203" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M1.33203 6.66699L14.6654 6.66699" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-sans text-[14px] font-medium text-[#0C0E0D]">Credit or Debit Card</span>
        </div>

        <div className="flex flex-col gap-[40px] rounded-[16px] border-[0.5px] border-[#CBCECD] bg-white p-6 md:p-[50px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="card-holder" className="font-sans text-[14px] font-medium text-[#0C0E0D]">Card Holder`s Name</label>
            <input id="card-holder" type="text" placeholder="Name" className="w-full rounded-[6px] border border-[#DFE4EA] bg-[#FAFAFA] px-[20px] py-[12px] font-sans text-[16px] font-normal leading-[24px] text-[#0C0E0D] outline-none placeholder:text-[#A1A1AA]" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="card-number" className="font-sans text-[14px] font-medium text-[#0C0E0D]">Card Number</label>
            <div className="flex items-center gap-2 rounded-[6px] border border-[#DFE4EA] bg-[#FAFAFA] px-[20px] py-[12px]">
              <input id="card-number" type="text" placeholder="0000 0000 0000 0000" className="flex-1 bg-transparent font-sans text-[16px] font-normal leading-[24px] text-[#0C0E0D] outline-none placeholder:text-[#A1A1AA]" />
              <div className="flex shrink-0 items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none">
                  <path d="M11.5137 1.56543V9.95898H7.1377V1.56543H11.5137Z" fill="#6B7280" stroke="#6B7280" strokeWidth="0.666667" />
                  <path d="M7.12316 5.76253C7.12316 3.92175 7.98751 2.289 9.31605 1.23251C8.3397 0.464187 7.10719 0 5.7626 0C2.57709 0 0 2.57709 0 5.76253C0 8.94797 2.57709 11.5251 5.76253 11.5251C7.10711 11.5251 8.33962 11.0609 9.31605 10.2925C7.98751 9.25203 7.12316 7.60331 7.12316 5.76253Z" fill="#EB001B" />
                  <path d="M18.6481 5.76253C18.6481 8.9479 16.071 11.5251 12.8856 11.5251C11.541 11.5251 10.3085 11.0609 9.33203 10.2925C10.6766 9.23606 11.525 7.60331 11.525 5.76253C11.525 3.92175 10.6606 2.289 9.33203 1.23251C10.3084 0.464187 11.541 0 12.8856 0C16.071 0 18.6481 2.59314 18.6481 5.76253Z" fill="#F79E1B" />
                </svg>
                <span className="font-sans text-[14px] font-medium text-[#0C0E0D]">MasterCard</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="card-expiry" className="font-sans text-[14px] font-medium text-[#0C0E0D]">Card Expiry</label>
              <input id="card-expiry" type="text" placeholder="MM /YY" className="w-full rounded-[6px] border border-[#DFE4EA] bg-[#FAFAFA] px-[20px] py-[12px] font-sans text-[16px] font-normal leading-[24px] text-[#0C0E0D] outline-none placeholder:text-[#A1A1AA]" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="card-cvv" className="font-sans text-[14px] font-medium text-[#0C0E0D]">CVV</label>
              <input id="card-cvv" type="text" placeholder="CVV" className="w-full rounded-[6px] border border-[#DFE4EA] bg-[#FAFAFA] px-[20px] py-[12px] font-sans text-[16px] font-normal leading-[24px] text-[#0C0E0D] outline-none placeholder:text-[#A1A1AA]" />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" defaultChecked className="peer sr-only" />
            <span className="flex h-4 w-4 items-center justify-center rounded-[10px] border border-[#005F5A] bg-[#005F5A] p-[2.4px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9.33385 2.7998L4.20052 7.93314L1.86719 5.5998" stroke="#F6F7F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-sans text-[14px] font-medium text-[#0C0E0D]">Remember Bank Card</span>
          </label>
        </div>

        {hasError && (
          <div className="flex items-center gap-[8px] rounded-[8px] bg-[#FCE9E9] px-[5px] py-[8px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z" fill="#DC2626" />
            </svg>
            <span className="font-sans text-[14px] font-normal text-[#0C0E0D]">Your payment details couldn`t be verified. Check your card details and try again</span>
          </div>
        )}

        <button type="button" onClick={onPay} className="flex w-full items-center justify-center gap-2 rounded-[8px] border-[0.5px] border-[#9E9F9E] bg-[#005F5A] px-[20px] py-[12px] text-center font-sans text-[16px] font-bold text-[#F6F7F7] transition-all hover:opacity-90 cursor-pointer">
          PAY NOW
        </button>
      </div>
    </div>
  );
};
