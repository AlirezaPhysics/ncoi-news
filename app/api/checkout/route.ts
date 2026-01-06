import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    const { slotId, bookingType, studentDetails } = await request.json()

    // Price Logic
    const priceAmount = bookingType === 'in_person' ? 5500 : 3500;
    const title = bookingType === 'in_person' ? 'In-Person Session' : 'Online Session';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: { name: title },
            unit_amount: priceAmount, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Pass the details to the Success Page via URL parameters (Encoding them safely)
      // Note: In a massive app we'd use Webhooks, but URL params work for MVP.
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&slot_id=${slotId}&type=${bookingType}&data=${encodeURIComponent(JSON.stringify(studentDetails))}`,
      cancel_url: `${request.headers.get('origin')}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}