'use client';
import CheckoutWizard from '@/components/CheckoutWizard';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function PlaceOrderScreen() {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
    loading,
  } = useSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  return (
    <div>
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Resumo da compra</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : cartItems.length === 0 ? (
        <div>
          O carrinho está vazio{' '}
          <Link href="/">
            <button className="default-button">Voltar</button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Dados para envio</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              <div>
                <Link className="default-button inline-block" href="/shipping">
                  Editar
                </Link>
              </div>
            </div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Método de pagamento</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link className="default-button inline-block" href="/payment">
                  Editar
                </Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Resumo do pedido</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Produto</th>
                    <th className="    p-5 text-right">Quantidade</th>
                    <th className="  p-5 text-right">Preço</th>
                    <th className="p-5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.id}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                            }}
                            className="p-1"
                          ></Image>
                          {item.name}
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.qty}</td>
                      <td className="p-5 text-right">R${item.price}</td>
                      <td className="p-5 text-right">
                        R${item.qty * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className="default-button inline-block" href="/cart">
                  Editar
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Total da compra</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Itens</div>
                    <div>R${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Impostos</div>
                    <div>R${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Frete</div>
                    <div>R${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total calculado</div>
                    <div>R${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    onClick={() =>
                      alert(
                        'Esse é um template, para comprar Amigurumis de verdade, envie inbox no instagram -> @amigurumisvaladao ou pelo site-> www.amigurumisvaladao.com.br'
                      )
                    }
                    className="primary-button w-full"
                  >
                    Finalizar compra
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
