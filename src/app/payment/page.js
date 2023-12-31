'use client';

import CheckoutWizard from '@/components/CheckoutWizard';
import { savePaymentMethod } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export default function ShippingAddressPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setValue('paymentMethod', paymentMethod);
  }, [paymentMethod, router, setValue, shippingAddress]);

  const submitHandler = ({ paymentMethod }) => {
    dispatch(savePaymentMethod(paymentMethod));

    router.push('/placeorder');
  };
  return (
    <div>
      <CheckoutWizard activeStep={2} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Escolha como pagar</h1>
        {['Pix', 'Mercado Pago', 'Cartão de crédito'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              value={payment}
              {...register('paymentMethod', {
                required: 'Por favor, selecione um método de pagamento',
              })}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        {errors.paymentMethod && (
          <div className="text-red-500 ">{errors.paymentMethod.message}</div>
        )}
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Próximo</button>
        </div>
      </form>
    </div>
  );
}
