'use client';

import CheckoutWizard from '@/components/CheckoutWizard';
import { saveShippingAddress } from '@/redux/slices/cartSlice';
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
  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );

    router.push('/payment');
  };
  return (
    <div>
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Endereço para envio</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Nome completo</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Endereço</label>
          <input
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Por favor, digite o endereço completo de envio',
              minLength: {
                value: 5,
                message: 'Endereço deve ter mais que 5 caracteres',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">Cidade</label>
          <input
            className="w-full"
            id="city"
            {...register('city', {
              required: 'Por favor, digite a Cidade para envio',
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Código Postal</label>
          <input
            className="w-full"
            id="postalCode"
            {...register('postalCode', {
              required: 'Por favor, digite o CEP para envio',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">País</label>
          <input
            className="w-full"
            id="country"
            {...register('country', {
              required: 'Por favor, escolha um pais para envio',
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Próximo</button>
        </div>
      </form>
    </div>
  );
}
