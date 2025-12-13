import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// 1. Setup Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    const { slotId } = await request.json()

    // 2. Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Tutoring Session (Video Class)',
            },
            // Note: 50 cents is the minimum allowed by Stripe
            unit_amount: 3000, // 50 cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // 3. Where to go after payment? 
      // We pass "?slot_id=" so the success page knows WHICH slot to book
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}&slot_id=${slotId}`,
      cancel_url: `${request.headers.get('origin')}/`,
    })

    // 4. Send the Payment Link back to the Frontend
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}