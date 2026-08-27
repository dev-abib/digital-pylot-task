import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get('timeframe') || '7d';
  const year = searchParams.get('year') || '2023';

  // Dynamic calculations based on timeframe/year
  let weeklyEarning = 95000.45;
  let growthRate = 48;
  let totalSales = '10,000+';
  let purchasedGoods = '800+';

  if (timeframe === '30d') {
    weeklyEarning = 384500.0;
    growthRate = 52;
    totalSales = '42,500+';
    purchasedGoods = '3,200+';
  } else if (timeframe === '90d') {
    weeklyEarning = 1120000.0;
    growthRate = 61;
    totalSales = '130,000+';
    purchasedGoods = '9,800+';
  }

  const bestSellers = [
    { id: '1', name: 'Range Rover', price: '$260', sales: 6547, image: '/car_full_1.jpg' },
    { id: '2', name: 'Audi S3', price: '$1474', sales: 3474, image: '/car_full_2.jpg' },
    { id: '3', name: 'Blue Nissan', price: '$8784', sales: 1478, image: '/car_rush.jpg' },
    { id: '4', name: 'Toyota Corolla', price: '$3240', sales: 987, image: '/why_choose_us_car.jpg' },
    { id: '5', name: 'Compact car', price: '$597', sales: 784, image: '/promo_banner_1.jpg' },
  ];

  const recentTransactions = [
    {
      id: 1,
      carName: 'Range Rover',
      timeAgo: '15 Mins',
      image: '/car_full_1.jpg',
      paymentMethod: 'Paypal',
      transactionCode: '#416645453773',
      status: 'Success',
      amount: '$1099.00',
    },
    {
      id: 2,
      carName: 'Red Toyota',
      timeAgo: '15 Mins',
      image: '/car_full_2.jpg',
      paymentMethod: 'Apple Pay',
      transactionCode: '#147784454554',
      status: 'Cancelled',
      amount: '$600.55',
    },
    {
      id: 3,
      carName: 'blue Nissan',
      timeAgo: '15 Mins',
      image: '/car_rush.jpg',
      paymentMethod: 'Stripe',
      transactionCode: '#147784454554',
      status: 'Pending',
      amount: '$200.10',
    },
    {
      id: 4,
      carName: 'Toyota Corolla',
      timeAgo: '15 Mins',
      image: '/why_choose_us_car.jpg',
      paymentMethod: 'PayU',
      transactionCode: '#147784454554',
      status: 'Success',
      amount: '$1569.00',
    },
    {
      id: 5,
      carName: 'Range Rover',
      timeAgo: '15 Mins',
      image: '/promo_banner_1.jpg',
      paymentMethod: 'Paytm',
      transactionCode: '#147784454554',
      status: 'Success',
      amount: '$1478.00',
    },
  ];

  // Dynamic spline chart data based on year
  const chartData =
    year === '2024'
      ? [
          { month: 'Jan', value: 34 },
          { month: 'Feb', value: 42 },
          { month: 'Mar', value: 28 },
          { month: 'Apr', value: 35 },
          { month: 'May', value: 39 },
          { month: 'Jun', value: 48 },
          { month: 'July', value: 29 },
          { month: 'Aug', value: 24 },
          { month: 'Sep', value: 38 },
        ]
      : [
          { month: 'Jan', value: 24 },
          { month: 'Feb', value: 31 },
          { month: 'Mar', value: 17 },
          { month: 'Apr', value: 21 },
          { month: 'May', value: 22 },
          { month: 'Jun', value: 32 },
          { month: 'July', value: 18 },
          { month: 'Aug', value: 16 },
          { month: 'Sep', value: 21 },
        ];

  return NextResponse.json({
    success: true,
    timeframe,
    year,
    stats: {
      weeklyEarning,
      growthRate,
      totalSales,
      purchasedGoods,
    },
    bestSellers,
    recentTransactions,
    chartData,
    countrySales: {
      topCountry: 'Africa',
      topSales: 3455,
      growth: 48,
    },
  });
}
